'use client';

import { Music2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  SPOTIFY_STATUS_BEFORE_TRACK,
  STATUS_LISTENING,
  STATUS_NOTHING,
} from '@/config/constants';

interface SpotifyPayload {
  isPlaying?: boolean;
  name?: string;
  artist?: string;
}

interface TrackState {
  statusText: string;
  songName: string;
  artist: string;
}

const IDLE_TRACK: TrackState = {
  statusText: STATUS_NOTHING,
  songName: '',
  artist: '',
};

async function readSpotifyTrack(): Promise<TrackState> {
  const response = await fetch('/api/spotify');
  if (!response.ok) {
    return IDLE_TRACK;
  }
  const data = (await response.json()) as SpotifyPayload;
  if (!data.isPlaying || !data.name) {
    return IDLE_TRACK;
  }
  return {
    statusText: STATUS_LISTENING,
    songName: data.name,
    artist: data.artist ?? '',
  };
}

export function SpotifyNowPlaying() {
  const [track, setTrack] = useState<TrackState>(IDLE_TRACK);

  useEffect(() => {
    let cancelled = false;

    readSpotifyTrack()
      .then((next) => {
        if (!cancelled) {
          setTrack(next);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTrack(IDLE_TRACK);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const artistDetails = track.artist ? ` — ${track.artist}` : '';

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Music2
        aria-hidden
        className="h-3 w-3 flex-shrink-0 text-primary"
      />
      <span className="font-mono text-[11px]">
        {track.statusText}
        {track.songName ? SPOTIFY_STATUS_BEFORE_TRACK : null}
        {track.songName ? (
          <span className="text-foreground">
            {track.songName}
            {artistDetails}
          </span>
        ) : null}
      </span>
    </div>
  );
}

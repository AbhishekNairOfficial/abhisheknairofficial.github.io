'use client';

import { useEffect, useState } from 'react';
import { Music2 } from 'lucide-react';
import {
  SPOTIFY_STATUS_BEFORE_TRACK,
  STATUS_LISTENING,
  STATUS_NOTHING,
  STATUS_RECENT,
  spotifyTrackLinkAriaLabel,
} from '@/config/constants';

interface SpotifyPayload {
  isPlaying: boolean;
  isRecent?: boolean;
  name?: string | null;
  artist?: string | null;
  songUrl?: string | null;
}

const IDLE_PAYLOAD: SpotifyPayload = {
  isPlaying: false,
  isRecent: false,
  name: null,
  artist: null,
  songUrl: null,
};

function resolveStatus(data: SpotifyPayload): string {
  const hasTrack = Boolean(data.name);
  if (data.isPlaying && hasTrack) {
    return STATUS_LISTENING;
  }
  if (data.isRecent && hasTrack) {
    return STATUS_RECENT;
  }
  return STATUS_NOTHING;
}

function TrackLabel({ data }: { data: SpotifyPayload }) {
  const trackName = data.name;
  if (!trackName) {
    return (
      <span className="text-foreground">
        {STATUS_NOTHING}
      </span>
    );
  }

  const artistSuffix = data.artist ? ` — ${data.artist}` : '';
  const label = `${trackName}${artistSuffix}`;

  if (!data.songUrl) {
    return (
      <span className="text-foreground">
        {label}
      </span>
    );
  }

  return (
    <a
      aria-label={spotifyTrackLinkAriaLabel(trackName)}
      className="text-foreground underline-offset-4 hover:text-primary hover:underline"
      href={data.songUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      {label}
    </a>
  );
}

export function NowPlaying() {
  const [data, setData] = useState<SpotifyPayload>(IDLE_PAYLOAD);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/spotify', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          return IDLE_PAYLOAD;
        }
        return response.json() as Promise<SpotifyPayload>;
      })
      .then((payload) => {
        setData(payload);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setData(IDLE_PAYLOAD);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const statusText = resolveStatus(data);
  const showTrack = statusText !== STATUS_NOTHING;

  return (
    <p className="flex items-start gap-2 text-sm text-muted-foreground">
      <Music2
        aria-hidden
        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
      />
      <span>
        {statusText}
        {showTrack ? SPOTIFY_STATUS_BEFORE_TRACK : ''}
        {showTrack ? (
          <TrackLabel data={data} />
        ) : null}
      </span>
    </p>
  );
}

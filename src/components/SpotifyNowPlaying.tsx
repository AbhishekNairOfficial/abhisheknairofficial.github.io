'use client';

import { useEffect, useState } from 'react';
import { Music2 } from 'lucide-react';
import {
  SPOTIFY_API_PATH,
  SPOTIFY_STATUS_BEFORE_TRACK,
  STATUS_LISTENING,
  STATUS_NOTHING,
} from '@/config/constants';

interface SpotifyFooterPayload {
  songName: string;
  artist: string;
  statusText: string;
}

const DEFAULT_PAYLOAD: SpotifyFooterPayload = {
  songName: STATUS_NOTHING,
  artist: '',
  statusText: STATUS_LISTENING,
};

function isSpotifyPayload(value: unknown): value is SpotifyFooterPayload {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return typeof record.songName === 'string'
    && typeof record.artist === 'string'
    && typeof record.statusText === 'string';
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyFooterPayload>(DEFAULT_PAYLOAD);

  useEffect(() => {
    const controller = new AbortController();

    fetch(SPOTIFY_API_PATH, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json() as Promise<unknown>;
      })
      .then((payload) => {
        if (isSpotifyPayload(payload)) {
          setData(payload);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setData(DEFAULT_PAYLOAD);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const trackDetails = data.artist ? ` — ${data.artist}` : '';

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Music2
        aria-hidden
        className="h-3 w-3 text-primary flex-shrink-0"
      />
      <span className="font-mono text-[11px]">
        {data.statusText}
        {SPOTIFY_STATUS_BEFORE_TRACK}
        <span className="text-foreground">
          {data.songName}
          {trackDetails}
        </span>
      </span>
    </div>
  );
}

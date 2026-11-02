import { NextResponse } from 'next/server';
import {
  STATUS_LISTENING,
  STATUS_NOTHING,
  STATUS_RECENT,
} from '@/config/constants';
import { getFooterSpotifyData } from '@/utils/footer-spotify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const HTTP_STATUS_OK = 200;

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function GET(): Promise<NextResponse> {
  const data = await getFooterSpotifyData();
  const hasTrack = data.songName !== STATUS_NOTHING;
  const isPlaying = hasTrack && data.statusText === STATUS_LISTENING;
  const isRecent = data.statusText === STATUS_RECENT;

  return NextResponse.json(
    {
      isPlaying,
      isRecent,
      name: hasTrack ? data.songName : null,
      artist: data.artist ? data.artist : null,
      songUrl: data.songUrl ? data.songUrl : null,
    },
    {
      status: HTTP_STATUS_OK,
      headers: NO_STORE_HEADERS,
    },
  );
}

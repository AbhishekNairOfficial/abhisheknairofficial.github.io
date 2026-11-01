import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/utils/spotify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const HTTP_STATUS_NO_CONTENT = 204;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_OK = 200;

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
  Pragma: 'no-cache',
  Expires: '0',
};

function idleResponse(): NextResponse {
  return NextResponse.json(
    { isPlaying: false },
    {
      status: HTTP_STATUS_OK,
      headers: NO_STORE_HEADERS,
    },
  );
}

export async function GET(): Promise<NextResponse> {
  const response = await getNowPlaying();

  if (response.status === HTTP_STATUS_NO_CONTENT || response.status > HTTP_STATUS_BAD_REQUEST) {
    return idleResponse();
  }

  const song = await response.json();
  if (!song.is_playing || !song.item) {
    return idleResponse();
  }

  const { name } = song.item;
  const artist = song.item.artists.map((item: { name: string }) => item.name).join(', ');
  const album = song.item.album.name;
  const songUrl = song.item.external_urls.spotify;

  return NextResponse.json(
    {
      album,
      artist,
      isPlaying: true,
      songUrl,
      name,
    },
    {
      status: HTTP_STATUS_OK,
      headers: NO_STORE_HEADERS,
    },
  );
}

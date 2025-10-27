import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/utils/spotify';

const HTTP_STATUS_NO_CONTENT = 204;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_OK = 200;

export async function GET(): Promise<NextResponse> {
  const response = await getNowPlaying();

  if (response.status === HTTP_STATUS_NO_CONTENT || response.status > HTTP_STATUS_BAD_REQUEST) {
    return NextResponse.json(
      { isPlaying: false },
      {
        status: HTTP_STATUS_OK,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
  }

  const song = await response.json();
  const isPlaying = song.is_playing;
  const { name } = song.item;
  const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(', ');
  const album = song.item.album.name;
  const songUrl = song.item.external_urls.spotify;

  return NextResponse.json(
    {
      album,
      artist,
      isPlaying,
      songUrl,
      name,
    },
    {
      status: HTTP_STATUS_OK,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}
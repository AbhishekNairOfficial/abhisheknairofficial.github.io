import { NextApiRequest, NextApiResponse } from 'next';
import { getNowPlaying } from '@/utils/spotify';

const HTTP_STATUS_NO_CONTENT = 204;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_OK = 200;

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const response = await getNowPlaying();

  if (response.status === HTTP_STATUS_NO_CONTENT || response.status > HTTP_STATUS_BAD_REQUEST) {
    return res.status(HTTP_STATUS_OK).json({ isPlaying: false });
  }

  const song = await response.json();
  const isPlaying = song.is_playing;
  const { name } = song.item;
  const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(', ');
  const album = song.item.album.name;
  const songUrl = song.item.external_urls.spotify;

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');

  return res.status(HTTP_STATUS_OK).json({
    album,
    artist,
    isPlaying,
    songUrl,
    name,
  });
}
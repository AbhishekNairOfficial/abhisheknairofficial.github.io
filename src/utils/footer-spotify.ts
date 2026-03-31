import {
  STATUS_LISTENING,
  STATUS_NOTHING,
  STATUS_RECENT,
} from '@/config/constants';
import { getNowPlaying, getSpotifyData } from '@/utils/spotify';

const HTTP_STATUS_OK = 200;

function formatTrackArtists(track: { artists: { name: string }[] }) {
  return track.artists.map((a) => a.name).join(', ');
}

async function readRecentSpotify() {
  const spotifyData = await getSpotifyData();
  if (!spotifyData.responseRecently.ok) {
    return null;
  }
  const recentData = await spotifyData.responseRecently.json();
  const recentSong = recentData.items?.[0]?.track;
  if (!recentSong) {
    return null;
  }
  return {
    songName: recentSong.name as string,
    artist: formatTrackArtists(recentSong),
    statusText: STATUS_RECENT,
  };
}

export async function getFooterSpotifyData() {
  const defaults = {
    songName: STATUS_NOTHING,
    artist: '',
    statusText: STATUS_LISTENING,
  };

  try {
    const nowPlaying = await getNowPlaying();
    if (nowPlaying.status === HTTP_STATUS_OK) {
      const nowPlayingData = await nowPlaying.json();
      if (nowPlayingData.is_playing && nowPlayingData.item) {
        const item = nowPlayingData.item;
        return {
          songName: item.name as string,
          artist: formatTrackArtists(item),
          statusText: STATUS_LISTENING,
        };
      }
    }
    const recent = await readRecentSpotify();
    if (recent) {
      return recent;
    }
  } catch {
    // Use defaults below
  }

  return defaults;
}

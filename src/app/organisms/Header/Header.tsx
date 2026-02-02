import { SocialLinks } from '@/components/SocialLinks';
import { getNowPlaying, getSpotifyData } from '@/utils/spotify';
import { Music2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {
  LOCATION_DESKTOP,
  LOCATION_MOBILE,
  NAME,
  STATUS_LISTENING,
  STATUS_NOTHING,
  STATUS_RECENT,
} from '@/config/constants';

const HTTP_STATUS_OK = 200;

const currentDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'short',
  day: '2-digit',
  year: 'numeric',
});

// eslint-disable-next-line max-statements
async function getSongData() {
  let name = STATUS_NOTHING;
  let artist = '';
  let statusText = STATUS_LISTENING;

  try {
    const nowPlaying = await getNowPlaying();

    // Check if there's currently playing music
    if (nowPlaying.status === HTTP_STATUS_OK) {
      const nowPlayingData = await nowPlaying.json();
      if (nowPlayingData.is_playing && nowPlayingData.item) {
        const item = nowPlayingData.item;
        name = item.name;
        artist = item.artists.map((_artist: { name: string }) => _artist.name).join(', ');
        statusText = STATUS_LISTENING;
        return { name, artist, statusText };
      }
    }

    // No current song, try to get recently played
    const spotifyData = await getSpotifyData();
    if (spotifyData.responseRecently.ok) {
      const recentData = await spotifyData.responseRecently.json();
      const recentSong = recentData.items?.[0]?.track;

      if (recentSong) {
        name = recentSong.name;
        artist = recentSong.artists.map((_artist: { name: string }) => _artist.name).join(', ');
        statusText = STATUS_RECENT;
      }
    }
  } catch {
    // Defaults already set
  }

  return { name, artist, statusText };
}

async function Header() {
  const { name, artist, statusText } = await getSongData();

  return (
    <header className="border-b-4 border-black">
      <div className="bg-black text-white py-0">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between py-0">
            {/* Left: Seattle */}
            <div className="flex items-center">
              <span className="text-xs whitespace-nowrap">
                📍
                {' '}
                {LOCATION_DESKTOP}
              </span>
            </div>

            {/* Center: Currently listening */}
            <div className="flex items-center gap-2 overflow-hidden flex-1 mx-4">
              <Music2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
              <div className="overflow-hidden min-w-0 flex-1">
                <span className="text-xs">
                  {`${statusText}: `}
                  <span className="text-emerald-400">
                    {`${name} - ${artist}`}
                  </span>
                </span>
              </div>
            </div>

            {/* Right: Social Icons */}
            <SocialLinks
              className="flex items-center gap-3"
              variant="header"
            />
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex items-center justify-between py-1">
              <span className="text-xs whitespace-nowrap">
                📍
                {' '}
                {LOCATION_MOBILE}
              </span>
              <SocialLinks
                className="flex items-center gap-3"
                variant="header"
              />
            </div>

            <div className="border-t border-gray-700 pt-1 pb-1">
              <div className="flex items-center gap-2 overflow-hidden">
                <Music2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                <div className="overflow-hidden min-w-0">
                  <div className="animate-scroll whitespace-nowrap inline-block">
                    <span className="text-xs">
                      {`${statusText}:`}
                      <span className="text-emerald-400">
                        {`${name} - ${artist}`}
                      </span>
                    </span>
                    <span className="text-xs ml-8">
                      {`${statusText}:`}
                      <span className="text-emerald-400">
                        {`${name} - ${artist}`}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-2 break-words">
              {NAME}
            </h1>
            <p className="text-sm uppercase tracking-widest border-t border-black pt-2 inline-block">
              {currentDate}
            </p>
          </div>
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-black flex-shrink-0">
            <Image
              alt="Profile"
              className="w-full h-full object-cover"
              height={120}
              src={'/images/profile-picture.jpg'}
              width={120}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
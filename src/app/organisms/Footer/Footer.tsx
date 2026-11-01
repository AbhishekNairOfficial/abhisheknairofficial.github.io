import { SpotifyNowPlaying } from '@/components/SpotifyNowPlaying';
import { FOOTER_COPYRIGHT, NAME } from '@/config/constants';

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <SpotifyNowPlaying />
        <p className="font-mono text-[11px] text-muted-foreground">
          &copy;
          {' '}
          {new Date().getFullYear()}
          {' '}
          {NAME}
          .
          {' '}
          {FOOTER_COPYRIGHT}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

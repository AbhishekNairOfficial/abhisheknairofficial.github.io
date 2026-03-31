import { Music2 } from 'lucide-react';
import { SocialLinks } from '@/components/SocialLinks';
import {
  FOOTER_COPYRIGHT,
  FOOTER_LINKS,
  NAME,
} from '@/config/constants';
import { getFooterSpotifyData } from '@/utils/footer-spotify';

const Footer = async () => {
  const { songName, artist, statusText } = await getFooterSpotifyData();
  const trackDetails = artist ? ` — ${artist}` : '';

  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <span className="font-primary text-xl font-semibold block mb-4">
              {NAME}
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lead Engineer & Architect building scalable frontend systems.
            </p>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-4">
              Navigation
            </span>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-4">
              Connect
            </span>
            <SocialLinks
              className="flex gap-3"
              variant="footer"
            />
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Music2 className="h-3 w-3 text-primary flex-shrink-0" />
            <span className="font-mono text-[11px]">
              {statusText}
              {': '}
              <span className="text-foreground">
                {songName}
                {trackDetails}
              </span>
            </span>
          </div>

          <p className="font-mono text-[11px] text-muted-foreground">
            &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            {FOOTER_COPYRIGHT}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

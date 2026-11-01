import { SocialLinks } from '@/components/SocialLinks';
import { SpotifyNowPlaying } from '@/components/SpotifyNowPlaying';
import {
  FOOTER_BIO,
  FOOTER_CONNECT_HEADING,
  FOOTER_COPYRIGHT,
  FOOTER_NAV_HEADING,
  NAME,
  NAV_LINKS,
} from '@/config/constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <span className="font-display text-xl block mb-4 w-fit border-b-2 border-primary/30 pb-1">
              {NAME}
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {FOOTER_BIO}
            </p>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-4">
              {FOOTER_NAV_HEADING}
            </span>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
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
              {FOOTER_CONNECT_HEADING}
            </span>
            <SocialLinks
              className="flex gap-3"
              variant="footer"
            />
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <SpotifyNowPlaying />

          <p className="font-mono text-[11px] text-muted-foreground">
            &copy;
            {' '}
            {year}
            {' '}
            {FOOTER_COPYRIGHT}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

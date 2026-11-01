import { SocialLinks } from '@/components/SocialLinks';
import {
  COPYRIGHT_YEAR,
  FOOTER_BIO,
  FOOTER_CONNECT_HEADING,
  FOOTER_COPYRIGHT,
  FOOTER_NAV_HEADING,
  NAME,
  NAV_LINKS,
} from '@/config/constants';

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12 grid gap-12 md:grid-cols-3">
          <div>
            <span className="mb-4 block w-fit border-b-2 border-primary/30 pb-1 font-primary text-xl font-semibold">
              {NAME}
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {FOOTER_BIO}
            </p>
          </div>

          <div>
            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {FOOTER_NAV_HEADING}
            </span>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => {
                return (
                  <li key={link.href}>
                    <a
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {FOOTER_CONNECT_HEADING}
            </span>
            <SocialLinks
              className="flex gap-3"
              variant="footer"
            />
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="font-mono text-[11px] text-muted-foreground">
            &copy;
            {' '}
            {COPYRIGHT_YEAR}
            {' '}
            {FOOTER_COPYRIGHT}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

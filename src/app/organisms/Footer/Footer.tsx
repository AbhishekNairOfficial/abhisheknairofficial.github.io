import { SocialLinks } from '@/components/SocialLinks';
import {
  COPYRIGHT_YEAR,
  NAME,
  RESUME_BUTTON_LABEL,
  RESUME_URL,
} from '@/config/constants';

const resumeClassName =
  'inline-flex min-h-11 items-center px-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary';

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-xs text-muted-foreground">
          &copy;
          {' '}
          {COPYRIGHT_YEAR}
          {' '}
          {NAME}
        </p>
        <div className="flex flex-wrap items-center gap-1">
          <SocialLinks
            className="flex items-center gap-1"
            variant="footer"
          />
          <a
            className={resumeClassName}
            href={RESUME_URL}
          >
            {RESUME_BUTTON_LABEL}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

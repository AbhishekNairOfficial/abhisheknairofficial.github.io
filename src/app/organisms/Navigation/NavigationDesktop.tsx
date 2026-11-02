import { Download } from 'lucide-react';
import { ColorSlider } from '@/components/ColorSlider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NAV_LINKS, RESUME_BUTTON_LABEL, RESUME_URL } from '@/config/constants';

const resumeClassName =
  'inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest '
  + 'bg-primary text-primary-foreground px-4 hover:bg-primary/90 transition-colors '
  + 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring '
  + 'focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function NavigationDesktop() {
  return (
    <div className="hidden md:flex items-center gap-2.5 lg:gap-4">
      {NAV_LINKS.map((link) => (
        <a
          className="nav-link-underline inline-flex min-h-11 items-center rounded-sm font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
          href={link.href}
          key={link.href}
        >
          {link.label}
        </a>
      ))}
      <ColorSlider />
      <ThemeToggle />
      <a
        className={resumeClassName}
        download
        href={RESUME_URL}
      >
        <Download
          aria-hidden
          className="h-3 w-3"
        />
        {RESUME_BUTTON_LABEL}
      </a>
    </div>
  );
}

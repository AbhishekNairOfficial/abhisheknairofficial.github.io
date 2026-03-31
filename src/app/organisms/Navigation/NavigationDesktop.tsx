import { Download } from 'lucide-react';
import { ColorSlider } from '@/components/ColorSlider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NAV_LINKS, RESUME_BUTTON_LABEL, RESUME_URL } from '@/config/constants';

const resumeClassName =
  'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest '
  + 'bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-all '
  + 'hover:scale-[1.03] hover:shadow-md active:scale-[0.97] '
  + 'motion-reduce:hover:scale-100 motion-reduce:active:scale-100 '
  + 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring '
  + 'focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function NavigationDesktop() {
  return (
    <div className="hidden md:flex items-center gap-6">
      {NAV_LINKS.map((link) => (
        <a
          className="nav-link-underline font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
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

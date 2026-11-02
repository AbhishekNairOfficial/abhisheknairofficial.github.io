import { ThemeToggle } from '@/components/ThemeToggle';
import { NAV_LINKS, RESUME_BUTTON_LABEL, RESUME_URL } from '@/config/constants';

const linkClassName =
  'inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground';

export function NavigationDesktop() {
  return (
    <div className="hidden items-center gap-6 md:flex">
      {NAV_LINKS.map((link) => (
        <a
          className={linkClassName}
          href={link.href}
          key={link.href}
        >
          {link.label}
        </a>
      ))}
      <a
        className={linkClassName}
        href={RESUME_URL}
      >
        {RESUME_BUTTON_LABEL}
      </a>
      <ThemeToggle />
    </div>
  );
}

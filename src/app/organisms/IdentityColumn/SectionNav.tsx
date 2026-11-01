'use client';

import { NAVIGATION_LANDMARK_LABEL, NAV_LINKS } from '@/config/constants';
import { useActiveSection } from '@/hooks/useActiveSection';
import { FOCUS_RING } from '@/lib/styles';
import { cn } from '@/lib/utils';

interface SectionNavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

function SectionNavItem({ href, label, isActive }: SectionNavItemProps) {
  return (
    <li>
      <a
        aria-current={isActive ? 'location' : undefined}
        className={cn(
          FOCUS_RING,
          'group flex items-center gap-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors motion-reduce:transition-none',
          isActive
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground',
        )}
        href={href}
      >
        <span
          aria-hidden
          className={cn(
            'h-px bg-current transition-[width] duration-200 motion-reduce:transition-none',
            isActive ? 'w-12' : 'w-8 group-hover:w-12',
          )}
        />
        {label}
      </a>
    </li>
  );
}

export function SectionNav() {
  const activeHref = useActiveSection();

  return (
    <nav aria-label={NAVIGATION_LANDMARK_LABEL}>
      <ul className="space-y-1">
        {NAV_LINKS.map((link) => (
          <SectionNavItem
            href={link.href}
            isActive={activeHref === link.href}
            key={link.href}
            label={link.label}
          />
        ))}
      </ul>
    </nav>
  );
}

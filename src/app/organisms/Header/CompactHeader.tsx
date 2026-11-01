'use client';

import { ColorSlider } from '@/components/ColorSlider';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  NAME,
  RESUME_BUTTON_LABEL,
  RESUME_URL,
  brandBackToMainAriaLabel,
} from '@/config/constants';
import { FOCUS_RING, TEXT_LINK } from '@/lib/styles';

const FIRST_NAME = NAME.split(' ')[0];

export function CompactHeader() {
  return (
    <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/85 px-6 backdrop-blur-xl lg:fixed lg:right-6 lg:top-6 lg:z-40 lg:h-auto lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
      <a
        aria-label={brandBackToMainAriaLabel(NAME)}
        className={`font-semibold text-foreground hover:text-primary lg:hidden ${FOCUS_RING}`}
        href="#main"
      >
        {FIRST_NAME}
      </a>
      <div className="ml-auto flex items-center gap-2">
        <a
          className={`hidden font-mono text-xs uppercase tracking-widest sm:inline lg:hidden ${TEXT_LINK}`}
          download
          href={RESUME_URL}
        >
          {RESUME_BUTTON_LABEL}
        </a>
        <ColorSlider />
        <ThemeToggle />
      </div>
    </div>
  );
}

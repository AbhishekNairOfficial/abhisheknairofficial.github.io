import type { RefObject } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MOBILE_MENU_CLOSE_LABEL, MOBILE_MENU_OPEN_LABEL } from '@/config/constants';

const MOBILE_MENU_DIALOG_ID = 'mobile-site-menu';

interface NavigationMobileToolbarProps {
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  mobileOpen: boolean;
  onToggleMenu: () => void;
}

export function NavigationMobileToolbar({
  menuButtonRef,
  mobileOpen,
  onToggleMenu,
}: NavigationMobileToolbarProps) {
  return (
    <div className="flex items-center gap-1 md:hidden">
      <ThemeToggle />
      <button
        aria-controls={MOBILE_MENU_DIALOG_ID}
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? MOBILE_MENU_CLOSE_LABEL : MOBILE_MENU_OPEN_LABEL}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground"
        onClick={onToggleMenu}
        ref={menuButtonRef}
        type="button"
      >
        {mobileOpen ? (
          <X
            aria-hidden
            className="h-5 w-5"
          />
        ) : (
          <Menu
            aria-hidden
            className="h-5 w-5"
          />
        )}
      </button>
    </div>
  );
}

export { MOBILE_MENU_DIALOG_ID };

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  NAME,
  NAVIGATION_LANDMARK_LABEL,
  brandBackToMainAriaLabel,
} from '@/config/constants';
import { STAGGER_MOBILE_LINK } from '@/lib/motion';
import { NavigationDesktop } from './NavigationDesktop';
import { NavigationMobileDialog } from './NavigationMobileDialog';
import { NavigationMobileToolbar } from './NavigationMobileToolbar';
import { useNavigationScroll } from './useNavigationScroll';

const MENU_OVERLAY_DURATION = 0.2;

export function Navigation() {
  const reduceMotion = useReducedMotion();
  const scrolled = useNavigationScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const focusMenuButton = useCallback(() => {
    queueMicrotask(() => {
      menuButtonRef.current?.focus();
    });
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleToggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => {
      return !prev;
    });
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }
    const dialog = dialogRef.current;
    if (!dialog) {
      return undefined;
    }

    const getFocusable = (): HTMLElement[] => {
      const fromDialog = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ).filter((el) => {
        return !el.hasAttribute('aria-hidden');
      });
      const menuBtn = menuButtonRef.current;
      if (menuBtn) {
        return [...fromDialog, menuBtn];
      }
      return fromDialog;
    };

    const first = getFocusable()[0];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileOpen(false);
        focusMenuButton();
        return;
      }
      if (e.key !== 'Tab') {
        return;
      }

      const list = getFocusable();
      if (list.length === 0) {
        return;
      }
      const firstEl = list[0];
      const lastEl = list[list.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen, focusMenuButton]);

  const mobileLinkTransition = reduceMotion
    ? { duration: 0 }
    : { duration: MENU_OVERLAY_DURATION };

  const mobileStagger = reduceMotion ? 0 : STAGGER_MOBILE_LINK;

  return (
    <>
      <nav
        aria-label={NAVIGATION_LANDMARK_LABEL}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a
            aria-label={brandBackToMainAriaLabel(NAME)}
            className="font-primary text-xl font-semibold text-foreground hover:text-primary transition-colors"
            href="#main"
          >
            {NAME.split(' ')[0]}
          </a>

          <NavigationDesktop />

          <NavigationMobileToolbar
            menuButtonRef={menuButtonRef}
            mobileOpen={mobileOpen}
            onToggleMenu={handleToggleMobileMenu}
          />
        </div>
      </nav>

      <NavigationMobileDialog
        dialogRef={dialogRef}
        mobileLinkTransition={mobileLinkTransition}
        mobileOpen={mobileOpen}
        mobileStagger={mobileStagger}
        onClose={handleCloseMobileMenu}
        reduceMotion={reduceMotion}
      />
    </>
  );
}

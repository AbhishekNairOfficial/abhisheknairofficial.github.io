'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NAME, RESUME_URL } from '@/config/constants';
import {
  NAV_SCROLL_THRESHOLD_PX,
  STAGGER_MOBILE_LINK,
} from '@/lib/motion';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const MENU_OVERLAY_DURATION = 0.2;
const MOBILE_LINK_INITIAL_Y = 20;
const MOBILE_MENU_DIALOG_ID = 'mobile-site-menu';

export function Navigation() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > NAV_SCROLL_THRESHOLD_PX);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const focusMenuButton = useCallback(() => {
    queueMicrotask(() => menuButtonRef.current?.focus());
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleToggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const getFocusable = (): HTMLElement[] => {
      const fromDialog = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ).filter((el) => !el.hasAttribute('aria-hidden'));
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
      if (e.key !== 'Tab') return;

      const list = getFocusable();
      if (list.length === 0) return;
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
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, focusMenuButton]);

  const mobileLinkTransition = reduceMotion
    ? { duration: 0 }
    : { duration: MENU_OVERLAY_DURATION };

  const mobileStagger = reduceMotion ? 0 : STAGGER_MOBILE_LINK;

  return (
    <>
      <nav
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a
            aria-label={`${NAME}, back to main content`}
            className="font-primary text-xl font-semibold text-foreground hover:text-primary transition-colors"
            href="#main"
          >
            {NAME.split(' ')[0]}
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              download
              href={RESUME_URL}
            >
              <Download aria-hidden className="h-3 w-3" />
              Resume
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              aria-controls={MOBILE_MENU_DIALOG_ID}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={handleToggleMobileMenu}
              type="button"
            >
              {mobileOpen ? (
                <X aria-hidden className="h-5 w-5" />
              ) : (
                <Menu aria-hidden className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={dialogRef}
            animate={{ opacity: 1 }}
            aria-label="Site menu"
            aria-modal="true"
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            exit={{ opacity: 0 }}
            id={MOBILE_MENU_DIALOG_ID}
            initial={{ opacity: 0 }}
            role="dialog"
            transition={mobileLinkTransition}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                animate={{ opacity: 1, y: 0 }}
                className="font-primary text-3xl font-semibold text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                href={link.href}
                initial={
                  reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: MOBILE_LINK_INITIAL_Y }
                }
                key={link.href}
                onClick={handleCloseMobileMenu}
                transition={{ delay: i * mobileStagger, ...mobileLinkTransition }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest bg-primary text-primary-foreground px-6 py-3 mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              download
              href={RESUME_URL}
              onClick={handleCloseMobileMenu}
            >
              <Download aria-hidden className="h-4 w-4" />
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

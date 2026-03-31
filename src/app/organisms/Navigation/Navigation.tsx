'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
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

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleToggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a
            className="font-primary text-xl font-semibold text-foreground hover:text-primary transition-colors"
            href="#"
          >
            {NAME.split(' ')[0]}
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
            <a
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors"
              download
              href={RESUME_URL}
            >
              <Download className="h-3 w-3" />
              Resume
            </a>
          </div>

          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden text-foreground"
            onClick={handleToggleMobileMenu}
            type="button"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: MENU_OVERLAY_DURATION }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                animate={{ opacity: 1, y: 0 }}
                className="font-primary text-3xl font-semibold text-foreground hover:text-primary transition-colors"
                href={link.href}
                initial={{ opacity: 0, y: MOBILE_LINK_INITIAL_Y }}
                key={link.href}
                onClick={handleCloseMobileMenu}
                transition={{ delay: i * STAGGER_MOBILE_LINK }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest bg-primary text-primary-foreground px-6 py-3 mt-4"
              download
              href={RESUME_URL}
              onClick={handleCloseMobileMenu}
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import type { RefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download } from 'lucide-react';
import {
  MOBILE_SITE_MENU_DIALOG_LABEL,
  NAV_LINKS,
  RESUME_BUTTON_LABEL,
  RESUME_URL,
} from '@/config/constants';
import { MOBILE_MENU_DIALOG_ID } from './NavigationMobileToolbar';

const MOBILE_LINK_INITIAL_Y = 20;

const mobileResumeClassName =
  'inline-flex min-h-11 items-center gap-2 font-mono text-sm uppercase tracking-widest '
  + 'bg-primary text-primary-foreground px-6 mt-4 transition-colors '
  + 'hover:bg-primary/90 '
  + 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring '
  + 'focus-visible:ring-offset-2 focus-visible:ring-offset-background';

interface NavigationMobileDialogProps {
  dialogRef: RefObject<HTMLDivElement | null>;
  mobileOpen: boolean;
  mobileLinkTransition: { duration: number };
  mobileStagger: number;
  reduceMotion: boolean | null;
  onClose: () => void;
}

export function NavigationMobileDialog({
  dialogRef,
  mobileOpen,
  mobileLinkTransition,
  mobileStagger,
  reduceMotion,
  onClose,
}: NavigationMobileDialogProps) {
  return (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label={MOBILE_SITE_MENU_DIALOG_LABEL}
          aria-modal="true"
          className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          exit={{ opacity: 0 }}
          id={MOBILE_MENU_DIALOG_ID}
          initial={{ opacity: 0 }}
          ref={dialogRef}
          role="dialog"
          transition={mobileLinkTransition}
        >
          {NAV_LINKS.map((link, i) => (
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex min-h-11 items-center rounded-sm font-primary text-3xl font-semibold text-foreground transition-colors hover:text-primary"
              href={link.href}
              initial={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: MOBILE_LINK_INITIAL_Y }
              }
              key={link.href}
              onClick={onClose}
              transition={{ delay: i * mobileStagger, ...mobileLinkTransition }}
            >
              {link.label}
            </motion.a>
          ))}
          <a
            className={mobileResumeClassName}
            download
            href={RESUME_URL}
            onClick={onClose}
          >
            <Download
              aria-hidden
              className="h-4 w-4"
            />
            {RESUME_BUTTON_LABEL}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import type { RefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MOBILE_SITE_MENU_DIALOG_LABEL,
  NAV_LINKS,
  RESUME_BUTTON_LABEL,
  RESUME_URL,
} from '@/config/constants';
import { MOBILE_MENU_DIALOG_ID } from './NavigationMobileToolbar';

const MOBILE_LINK_INITIAL_Y = 20;

const mobileResumeClassName =
  'inline-flex min-h-11 items-center mt-2 text-xl font-medium text-muted-foreground '
  + 'transition-colors hover:text-foreground';

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
              className="inline-flex min-h-11 items-center text-3xl font-medium text-foreground transition-colors hover:text-muted-foreground"
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
            href={RESUME_URL}
            onClick={onClose}
          >
            {RESUME_BUTTON_LABEL}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

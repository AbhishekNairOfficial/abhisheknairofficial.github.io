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
  'inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest '
  + 'bg-primary text-primary-foreground px-6 py-3 mt-4 transition-all '
  + 'hover:bg-primary/90 hover:scale-[1.03] hover:shadow-md active:scale-[0.97] '
  + 'motion-reduce:hover:scale-100 motion-reduce:active:scale-100 '
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
              className="font-primary text-3xl font-semibold text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
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

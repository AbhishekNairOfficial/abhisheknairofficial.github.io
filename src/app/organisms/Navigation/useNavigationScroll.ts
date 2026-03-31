import { useEffect, useState } from 'react';
import { NAV_SCROLL_THRESHOLD_PX } from '@/lib/motion';

export function useNavigationScroll(): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > NAV_SCROLL_THRESHOLD_PX);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return scrolled;
}

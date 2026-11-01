import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/config/constants';

const INTERSECT_QUARTER = 0.25;
const INTERSECT_HALF = 0.5;
const SECTION_ROOT_MARGIN = '-20% 0px -65% 0px';
const SECTION_THRESHOLDS = [0, INTERSECT_QUARTER, INTERSECT_HALF, 1];

function hrefFromId(id: string): string {
  return `#${id}`;
}

function pickActiveHref(entries: IntersectionObserverEntry[]): string | null {
  const visible = entries.filter((entry) => entry.isIntersecting);
  if (visible.length === 0) {
    return null;
  }
  const ranked = [...visible].sort((left, right) => {
    return right.intersectionRatio - left.intersectionRatio;
  });
  const id = ranked[0]?.target.id;
  if (!id) {
    return null;
  }
  return hrefFromId(id);
}

export function useActiveSection(): string {
  const [activeHref, setActiveHref] = useState<string>(NAV_LINKS[0].href);

  useEffect(() => {
    const elements = NAV_LINKS
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((node): node is HTMLElement => node !== null);

    if (elements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nextHref = pickActiveHref(entries);
        if (nextHref) {
          setActiveHref(nextHref);
        }
      },
      {
        rootMargin: SECTION_ROOT_MARGIN,
        threshold: SECTION_THRESHOLDS,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return activeHref;
}

import Link from 'next/link';
import {
  CASE_STUDY_BACK_TO_WORK,
  CASE_STUDY_NEXT_LABEL,
  CASE_STUDY_PREV_LABEL,
  type Project,
} from '@/config/constants';
import { workPath } from '@/lib/case-studies';

interface CaseStudyPagerProps {
  prev: Project | null;
  next: Project | null;
}

export function CaseStudyPager({ prev, next }: CaseStudyPagerProps) {
  return (
    <nav
      aria-label="Case study"
      className="py-10 border-t border-border"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
        {prev ? (
          <Link
            className="group max-w-xs"
            href={workPath(prev.slug)}
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-2">
              {CASE_STUDY_PREV_LABEL}
            </span>
            <span className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : null}
        {next ? (
          <Link
            className="group max-w-xs sm:text-right sm:ml-auto"
            href={workPath(next.slug)}
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-2">
              {CASE_STUDY_NEXT_LABEL}
            </span>
            <span className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
      <p className="mt-10">
        <Link
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          href="/#work"
        >
          {CASE_STUDY_BACK_TO_WORK}
        </Link>
      </p>
    </nav>
  );
}

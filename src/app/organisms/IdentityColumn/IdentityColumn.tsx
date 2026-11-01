import {
  AVAILABILITY_LINE,
  JOB_TITLE,
  NAME,
  POSITIONING_HEADLINE,
  POSITIONING_SPECIALTIES,
} from '@/config/constants';
import { ConnectLinks } from './ConnectLinks';
import { SectionNav } from './SectionNav';

export function IdentityColumn() {
  return (
    <aside className="flex flex-col justify-between pb-12 pt-8 lg:sticky lg:top-0 lg:max-h-screen lg:w-[22rem] lg:shrink-0 lg:py-24">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {NAME}
        </h1>
        <p className="mt-3 text-lg text-foreground">
          {JOB_TITLE}
        </p>
        <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
          {POSITIONING_HEADLINE}
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {POSITIONING_SPECIALTIES}
        </p>
        <div className="mt-10">
          <SectionNav />
        </div>
      </div>
      <div className="mt-10 lg:mt-0">
        <ConnectLinks />
        <p className="mt-6 max-w-sm font-mono text-xs leading-relaxed text-muted-foreground">
          {AVAILABILITY_LINE}
        </p>
      </div>
    </aside>
  );
}

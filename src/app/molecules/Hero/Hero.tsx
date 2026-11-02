import { Download, Mail } from 'lucide-react';
import { SystemsDiagram } from '@/app/molecules/SystemsDiagram';
import {
  ABOUT_TEXT,
  ABOUT_TEXT_2,
  AVAILABILITY_LINE,
  CONTACT_EMAIL,
  DOWNLOAD_RESUME_LABEL,
  LOCATION,
  NAME,
  POSITIONING_HEADLINE,
  RESUME_URL,
  SPECIALTIES,
} from '@/config/constants';

const primaryCtaClassName =
  'inline-flex min-h-11 items-center gap-2 bg-primary px-5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90';

const secondaryCtaClassName =
  'inline-flex min-h-11 items-center gap-2 border border-border px-5 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-primary/40 hover:text-primary';

export function Hero() {
  return (
    <section
      className="relative pt-24 md:pt-28"
      id="about"
    >
      <div className="mx-auto max-w-3xl px-5 pb-14 sm:px-6 md:pb-20">
        <SystemsDiagram />

        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-primary">
          {LOCATION}
        </p>

        <h1 className="text-balance font-display text-4xl tracking-tight text-foreground sm:text-5xl md:text-[3.35rem] md:leading-[1.08]">
          {NAME}
        </h1>

        <p className="mt-6 max-w-xl text-balance font-display text-xl leading-snug tracking-tight text-foreground sm:text-2xl md:mt-8 md:text-[1.85rem] md:leading-[1.25]">
          {POSITIONING_HEADLINE}
        </p>

        <ul className="mt-6 flex max-w-xl flex-col gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-0">
          {SPECIALTIES.map((item) => {
            return (
              <li
                className="hyphens-none sm:after:mx-2.5 sm:after:content-['·'] sm:after:text-border sm:last:after:hidden"
                key={item}
              >
                {item}
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-prose text-pretty leading-relaxed text-muted-foreground">
          {ABOUT_TEXT}
        </p>
        <p className="mt-4 max-w-prose text-pretty leading-relaxed text-muted-foreground">
          {ABOUT_TEXT_2}
        </p>

        <p className="mt-7 text-foreground">
          {AVAILABILITY_LINE}
        </p>

        <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row">
          <a
            className={primaryCtaClassName}
            download
            href={RESUME_URL}
          >
            <Download
              aria-hidden
              className="h-3 w-3"
            />
            {DOWNLOAD_RESUME_LABEL}
          </a>
          <a
            className={secondaryCtaClassName}
            href={`mailto:${CONTACT_EMAIL}`}
          >
            <Mail
              aria-hidden
              className="h-3 w-3"
            />
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

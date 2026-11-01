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
  'inline-flex items-center gap-2 bg-primary px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90';

const secondaryCtaClassName =
  'inline-flex items-center gap-2 border border-border px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-primary/40 hover:text-primary';

export function Hero() {
  return (
    <section
      className="relative pt-24 md:pt-32"
      id="about"
    >
      <div className="mx-auto max-w-3xl px-6 pb-16 md:pb-24">
        <SystemsDiagram />

        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-primary">
          {LOCATION}
        </p>

        <h1 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.08]">
          {NAME}
        </h1>

        <p className="mt-8 font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl md:text-[2.35rem] md:leading-[1.2]">
          {POSITIONING_HEADLINE}
        </p>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {SPECIALTIES.map((item) => {
            return (
              <li key={item}>
                {item}
              </li>
            );
          })}
        </ul>

        <p className="mt-10 leading-relaxed text-muted-foreground">
          {ABOUT_TEXT}
        </p>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          {ABOUT_TEXT_2}
        </p>

        <p className="mt-8 text-foreground">
          {AVAILABILITY_LINE}
        </p>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
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

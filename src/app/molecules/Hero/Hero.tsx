import {
  CONTACT_EMAIL,
  GET_IN_TOUCH_LABEL,
  HERO_INTRO,
  LOCATION,
  NAME,
  POSITIONING_HEADLINE,
  RESUME_BUTTON_LABEL,
  RESUME_URL,
} from '@/config/constants';

const primaryCtaClassName =
  'inline-flex min-h-11 items-center px-5 text-sm font-medium text-primary-foreground '
  + 'bg-primary transition-colors hover:bg-primary/90';

const secondaryCtaClassName =
  'inline-flex min-h-11 items-center px-5 text-sm font-medium text-foreground '
  + 'border border-border transition-colors hover:border-foreground/40';

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center pt-16"
      id="about"
    >
      <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-6">
        <p className="text-sm text-muted-foreground">
          {LOCATION}
        </p>

        <h1 className="mt-4 text-balance font-display text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.08]">
          {NAME}
        </h1>

        <p className="mt-5 max-w-xl hyphens-none text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {POSITIONING_HEADLINE}
        </p>

        <p className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          {HERO_INTRO}
        </p>

        <div className="mt-10 flex flex-row flex-wrap items-center gap-3">
          <a
            className={primaryCtaClassName}
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {GET_IN_TOUCH_LABEL}
          </a>
          <a
            className={secondaryCtaClassName}
            href={RESUME_URL}
          >
            {RESUME_BUTTON_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}

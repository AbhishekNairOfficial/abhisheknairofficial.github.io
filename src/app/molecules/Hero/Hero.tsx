import {
  CONTACT_EMAIL,
  CONTACT_TITLE,
  HERO_AVAILABILITY,
  HERO_HEADLINE,
  HERO_SPECIALTIES,
  NAME,
  PRIMARY_LINK_CLASSNAME,
  RESUME_BUTTON_LABEL,
  RESUME_URL,
  SECONDARY_LINK_CLASSNAME,
} from '@/config/constants';

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">
          {NAME}
        </p>
        <h1 className="font-display font-normal text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12] text-foreground mb-8 max-w-4xl">
          {HERO_HEADLINE}
        </h1>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 mb-8">
          {HERO_SPECIALTIES.map((specialty) => (
            <li
              className="font-mono text-sm text-muted-foreground"
              key={specialty}
            >
              {specialty}
            </li>
          ))}
        </ul>
        <p className="text-base md:text-lg text-foreground mb-10 max-w-2xl">
          {HERO_AVAILABILITY}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            className={PRIMARY_LINK_CLASSNAME}
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_TITLE}
          </a>
          <a
            className={SECONDARY_LINK_CLASSNAME}
            download
            href={RESUME_URL}
          >
            {RESUME_BUTTON_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}

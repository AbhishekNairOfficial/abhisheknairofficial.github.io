import { HERO_TAGLINE, NAME } from '@/config/constants';

const Banner = () => (
  <section className="mx-6 sm:mx-12 p-8 sm:p-12 bg-card border border-border flex flex-col md:flex-row md:items-center gap-8 justify-center">
    <h1 className="text-right font-primary text-4xl sm:text-6xl md:text-7xl font-semibold flex-1">
      <span className="inline border-b border-primary pb-1">
        {NAME}
      </span>
    </h1>
    <p className="flex-1 text-lg sm:text-2xl text-muted-foreground leading-relaxed">
      {HERO_TAGLINE}
    </p>
  </section>
);

export default Banner;

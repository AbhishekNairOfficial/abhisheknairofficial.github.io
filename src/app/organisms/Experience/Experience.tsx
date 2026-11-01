import { EXPERIENCE_TITLE, TIMELINE_DATA } from '@/config/constants';

const Experience = () => {
  return (
    <section
      className="scroll-mt-16 py-24 border-t border-border"
      id="experience"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl mb-12 md:mb-16">
          {EXPERIENCE_TITLE}
        </h2>
        <ol className="space-y-10">
          {TIMELINE_DATA.map((exp) => (
            <li
              className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-10"
              key={exp.id}
            >
              <p className="font-mono text-xs text-muted-foreground whitespace-nowrap pt-1">
                {exp.period}
              </p>
              <div>
                <h3 className="font-primary text-lg sm:text-xl font-semibold">
                  {exp.role}
                </h3>
                <p className="font-mono text-xs uppercase tracking-widest text-primary mt-1 mb-3">
                  {exp.company}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;

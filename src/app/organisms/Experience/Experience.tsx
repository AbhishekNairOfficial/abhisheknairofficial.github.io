import { FadeIn } from '@/components/motion';
import { EXPERIENCE_SECTION_NUMBER, EXPERIENCE_TITLE, TIMELINE_DATA } from '@/config/constants';
import { STAGGER_CHILD_DELAY } from '@/lib/motion';

const Experience = () => {
  return (
    <section
      className="py-24 border-t border-border"
      id="experience"
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-primary">
              {EXPERIENCE_SECTION_NUMBER}
            </span>
            <h2 className="font-literata text-3xl sm:text-4xl font-semibold">
              {EXPERIENCE_TITLE}
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-0 md:left-[140px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-16">
            {TIMELINE_DATA.map((exp, index) => (
              <FadeIn
                delay={index * STAGGER_CHILD_DELAY}
                key={exp.id}
              >
                <article className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                  <div className="relative">
                    <div className="absolute left-0 md:left-auto md:right-[-25px] top-2 w-2 h-2 rounded-full bg-primary z-10" />
                    <p className="font-mono text-xs text-muted-foreground whitespace-nowrap pl-6 md:pl-0">
                      {exp.period}
                    </p>
                  </div>

                  <div className="pl-6 md:pl-8">
                    <div className="mb-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-primary">
                        {exp.company}
                      </span>
                      <h3 className="font-primary text-xl sm:text-2xl font-semibold mt-1">
                        {exp.role}
                      </h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    <ul className="space-y-2 mb-5">
                      {exp.highlights.map((highlight, idx) => (
                        <li
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                          key={idx}
                        >
                          <span aria-hidden className="text-primary mt-1.5 text-[8px]">
                            &#9646;
                          </span>
                          <span>
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          className="font-mono text-[11px] px-2.5 py-1 border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                          key={tech}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

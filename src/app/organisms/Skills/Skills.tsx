import { FadeIn } from '@/components/motion';
import {
  SKILL_CATEGORIES,
  SKILL_PROPOSITIONS,
  SKILLS_SECTION_NUMBER,
  SKILLS_TITLE,
} from '@/config/constants';
import { SECTION_STAGGER_BASE, STAGGER_CHILD_DELAY } from '@/lib/motion';

export function Skills() {
  return (
    <section
      className="py-24 border-t border-primary/10"
      id="skills"
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="group flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-primary">
              {SKILLS_SECTION_NUMBER}
            </span>
            <h2 className="font-literata text-3xl sm:text-4xl font-semibold">
              {SKILLS_TITLE}
            </h2>
            <div className="h-px flex-1 bg-border transition-colors duration-500 group-hover:bg-primary/40" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {SKILL_PROPOSITIONS.map((prop, index) => (
            <FadeIn
              delay={index * STAGGER_CHILD_DELAY}
              key={prop.title}
            >
              <div className="border-l-2 border-primary pl-6">
                <h3 className="font-primary text-xl font-semibold mb-3">
                  {prop.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {SKILL_CATEGORIES.map((category, index) => (
            <FadeIn
              delay={SECTION_STAGGER_BASE + index * STAGGER_CHILD_DELAY}
              key={category.title}
            >
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      className="inline-block cursor-default font-mono text-[11px] px-3 py-1.5 border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

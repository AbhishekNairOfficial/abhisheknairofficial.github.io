import { PageSection } from '@/app/molecules/PageSection';
import { SKILL_CATEGORIES, SKILLS_TITLE } from '@/config/constants';

const skillChipClassName =
  'inline-block border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground';

export function Skills() {
  return (
    <PageSection
      id="skills"
      title={SKILLS_TITLE}
    >
      <div className="grid gap-10 sm:grid-cols-2">
        {SKILL_CATEGORIES.map((category) => {
          return (
            <div key={category.title}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {category.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  return (
                    <li
                      className={skillChipClassName}
                      key={skill}
                    >
                      {skill}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
}

export default Skills;

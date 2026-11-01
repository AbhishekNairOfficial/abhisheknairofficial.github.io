import { SectionHeading } from '@/app/atoms/SectionHeading';
import { TechTags } from '@/app/atoms/TechTags';
import {
  EXPERIENCE_TITLE,
  TIMELINE_DATA,
  toOutcomeLine,
} from '@/config/constants';

type ExperienceItem = (typeof TIMELINE_DATA)[number];

interface ExperienceRowProps {
  experience: ExperienceItem;
}

function ExperienceRow({ experience }: ExperienceRowProps) {
  return (
    <article className="grid gap-2 border-t border-border py-8 first:border-t-0 sm:grid-cols-[8.75rem_1fr] sm:gap-8">
      <p className="font-mono text-xs text-muted-foreground">
        {experience.period}
      </p>
      <div>
        <h3 className="text-base font-medium text-foreground">
          {experience.role}
          {' · '}
          {experience.company}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {toOutcomeLine(experience.highlights)}
        </p>
        <TechTags tags={experience.technologies} />
      </div>
    </article>
  );
}

const Experience = () => {
  return (
    <section
      className="scroll-mt-20 pb-20 lg:pb-24"
      id="experience"
    >
      <SectionHeading>
        {EXPERIENCE_TITLE}
      </SectionHeading>
      <div>
        {TIMELINE_DATA.map((experience) => (
          <ExperienceRow
            experience={experience}
            key={experience.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;

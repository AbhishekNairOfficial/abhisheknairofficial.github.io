import { PageSection } from '@/app/molecules/PageSection';
import { EXPERIENCE_TITLE, TIMELINE_DATA } from '@/config/constants';

const Experience = () => {
  return (
    <PageSection
      id="experience"
      title={EXPERIENCE_TITLE}
    >
      <ol className="space-y-12">
        {TIMELINE_DATA.map((item) => {
          return (
            <li key={item.id}>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {item.period}
              </p>
              <h3 className="mt-2 text-balance font-display text-2xl tracking-tight text-foreground md:text-[1.85rem]">
                {item.role}
              </h3>
              <p className="mt-1 text-sm text-primary">
                {item.company}
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {item.highlights.map((highlight) => {
                  return (
                    <li
                      className="text-pretty text-sm leading-relaxed text-muted-foreground"
                      key={highlight}
                    >
                      {highlight}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </PageSection>
  );
};

export default Experience;

import { FadeIn } from '@/components/motion';
import { ProjectCards } from '@/app/molecules/Projects/Projects';
import { PROJECTS, WORK_SECTION_NUMBER, WORK_TITLE } from '@/config/constants';

const Work = () => {
  return (
    <section
      className="py-24 border-t border-border"
      id="work"
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-primary">
              {WORK_SECTION_NUMBER}
            </span>
            <h2 className="font-literata text-3xl sm:text-4xl font-semibold">
              {WORK_TITLE}
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <ProjectCards projects={PROJECTS} />
      </div>
    </section>
  );
};

export default Work;

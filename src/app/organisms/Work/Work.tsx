import { SectionHeading } from '@/app/atoms/SectionHeading';
import { ProjectList } from '@/app/molecules/Projects/Projects';
import { PROJECTS, WORK_TITLE } from '@/config/constants';

const Work = () => {
  return (
    <section
      className="scroll-mt-20 pb-20 lg:pb-24"
      id="work"
    >
      <SectionHeading>
        {WORK_TITLE}
      </SectionHeading>
      <ProjectList projects={PROJECTS} />
    </section>
  );
};

export default Work;

import { PageSection } from '@/app/molecules/PageSection';
import { ProjectRows } from '@/app/molecules/Projects/Projects';
import { PROJECTS, WORK_TITLE } from '@/config/constants';

const Work = () => {
  return (
    <PageSection
      id="work"
      title={WORK_TITLE}
    >
      <ProjectRows projects={PROJECTS} />
    </PageSection>
  );
};

export default Work;

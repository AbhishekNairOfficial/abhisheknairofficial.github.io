import { PageSection } from '@/app/molecules/PageSection';
import { ProjectRows } from '@/app/molecules/Projects/Projects';
import { PROJECTS, WORK_TITLE } from '@/config/constants';
import { getSummaryCatalog, toProjectInput } from '@/features/project-summaries/catalog.server';

const Work = () => {
  const summaries = getSummaryCatalog(PROJECTS.map(toProjectInput));
  return (
    <PageSection
      id="work"
      title={WORK_TITLE}
    >
      <ProjectRows
        projects={PROJECTS}
        summaries={summaries}
      />
    </PageSection>
  );
};

export default Work;

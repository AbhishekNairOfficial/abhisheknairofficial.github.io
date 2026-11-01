import { TechTags } from '@/app/atoms/TechTags';
import {
  projectExternalLinkAriaLabel,
  type Project,
} from '@/config/constants';
import { TEXT_LINK } from '@/lib/styles';

interface ProjectListProps {
  projects: Project[];
}

interface ProjectRowProps {
  project: Project;
}

function ProjectTitle({ project }: ProjectRowProps) {
  if (project.link) {
    return (
      <h3 className="text-base font-medium">
        <a
          aria-label={projectExternalLinkAriaLabel(project.title)}
          className={TEXT_LINK}
          href={project.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {project.title}
        </a>
      </h3>
    );
  }

  return (
    <h3 className="text-base font-medium text-foreground">
      {project.title}
    </h3>
  );
}

function ProjectRow({ project }: ProjectRowProps) {
  const outcome = project.outcomes[0];

  return (
    <li className="border-t border-border py-6 first:border-t-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <ProjectTitle project={project} />
          {project.client ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {project.client}
            </p>
          ) : null}
        </div>
        {outcome ? (
          <p className="text-sm text-muted-foreground sm:max-w-xs sm:text-right">
            {outcome}
          </p>
        ) : null}
      </div>
      <TechTags tags={project.technologies} />
    </li>
  );
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul>
      {projects.map((project) => (
        <ProjectRow
          key={project.title}
          project={project}
        />
      ))}
    </ul>
  );
}

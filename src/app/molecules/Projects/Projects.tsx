import { projectExternalLinkAriaLabel, type Project } from '@/config/constants';
import type { ProjectId, ResolvedSummary } from '@/features/project-summaries/types';
import { ProjectSummary } from './ProjectSummary';

interface ProjectRowsProps {
  projects: Project[];
  summaries: Record<ProjectId, ResolvedSummary>;
}

function ProjectHeading({ project }: { project: Project }) {
  if (!project.link) {
    return (
      <h3 className="font-primary text-xl font-semibold text-foreground">
        {project.title}
      </h3>
    );
  }

  return (
    <h3 className="font-primary text-xl font-semibold">
      <a
        aria-label={projectExternalLinkAriaLabel(project.title)}
        className="text-foreground underline-offset-4 hover:text-primary hover:underline"
        href={project.link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {project.title}
      </a>
    </h3>
  );
}

export function ProjectRows({ projects, summaries }: ProjectRowsProps) {
  return (
    <ul>
      {projects.map((project) => {
        const resolved = summaries[project.id] ?? { kind: 'original' as const, reason: 'no-approved-release' };
        return (
          <li
            className="border-t border-border py-6 first:border-t-0 first:pt-0 md:py-8"
            data-project-id={project.id}
            key={project.id}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <ProjectHeading project={project} />
              {project.client ? (
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {project.client}
                </span>
              ) : null}
            </div>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {project.role}
            </p>
            <ProjectSummary
              original={project.summary}
              projectId={project.id}
              resolved={resolved}
              title={project.title}
            />
            <p className="mt-3 text-pretty text-sm text-foreground">
              {project.outcomes.join(' · ')}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

import { projectExternalLinkAriaLabel, type Project } from '@/config/constants';

interface ProjectRowsProps {
  projects: Project[];
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

export function ProjectRows({ projects }: ProjectRowsProps) {
  return (
    <ul>
      {projects.map((project) => {
        return (
          <li
            className="border-t border-border py-8 first:border-t-0 first:pt-0"
            key={project.title}
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
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
            <p className="mt-3 text-sm text-foreground">
              {project.outcomes.join(' · ')}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

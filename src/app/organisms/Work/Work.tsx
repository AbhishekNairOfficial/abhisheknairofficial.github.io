import Link from 'next/link';
import {
  projectCaseStudyAriaLabel,
  SELECTED_WORK_TITLE,
} from '@/config/constants';
import { formatWorkIndex, getSelectedProjects, workPath } from '@/lib/case-studies';

const Work = () => {
  const projects = getSelectedProjects();

  return (
    <section
      className="scroll-mt-16 py-24 border-t border-border"
      id="work"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl mb-12 md:mb-16">
          {SELECTED_WORK_TITLE}
        </h2>
        <div>
          {projects.map((project, index) => (
            <article
              className="border-t border-border last:border-b"
              key={project.slug}
            >
              <Link
                aria-label={projectCaseStudyAriaLabel(project.title)}
                className="group block py-10 md:py-14"
                href={workPath(project.slug)}
              >
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <span className="font-mono text-xs text-primary">
                    {formatWorkIndex(index)}
                  </span>
                  {project.client ? (
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {project.client}
                    </span>
                  ) : null}
                </div>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground group-hover:text-primary transition-colors mb-4 max-w-4xl">
                  {project.title}
                </h3>
                <p className="text-muted-foreground max-w-2xl leading-relaxed mb-6">
                  {project.summary}
                </p>
                <ul className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech) => (
                    <li
                      className="font-mono text-[11px] px-2.5 py-1 border border-border text-muted-foreground"
                      key={tech}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                {project.outcomes[0] ? (
                  <p className="text-sm text-foreground">
                    {project.outcomes[0]}
                  </p>
                ) : null}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;

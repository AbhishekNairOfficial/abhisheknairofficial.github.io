import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from '@/components/motion';
import type { Project } from '@/config/constants';
import { STAGGER_CHILD_DELAY } from '@/lib/motion';

interface ProjectCardsProps {
  projects: Project[];
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <FadeIn
          delay={index * STAGGER_CHILD_DELAY}
          key={project.title}
        >
          <div className="group border border-border p-6 sm:p-8 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4 gap-2">
              <div className="min-w-0">
                {project.client && (
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2 block">
                    {project.client}
                  </span>
                )}
                <h3 className="font-primary text-xl sm:text-2xl font-semibold">
                  {project.title}
                </h3>
              </div>
              {project.link && (
                <a
                  className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                  href={project.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              )}
            </div>

            <span className="font-mono text-xs text-muted-foreground mb-4 block">
              {project.role}
            </span>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
              {project.summary}
            </p>

            <div className="space-y-4 mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 border border-border text-muted-foreground"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                {project.outcomes.map((outcome, idx) => (
                  <div
                    className="flex items-center gap-2 text-sm"
                    key={idx}
                  >
                    <span className="text-primary text-xs">
                      &#8599;
                    </span>
                    <span className="text-foreground">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

import type { ReactNode } from 'react';
import {
  CASE_STUDY_APPROACH_TITLE,
  CASE_STUDY_CONSTRAINTS_TITLE,
  CASE_STUDY_CONTEXT_TITLE,
  CASE_STUDY_LESSONS_TITLE,
  CASE_STUDY_OUTCOMES_TITLE,
  CASE_STUDY_ROLE_TITLE,
  type CaseStudySectionCopy,
  type Project,
} from '@/config/constants';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { CaseStudyPager } from './CaseStudyPager';
import { DraftNote } from './DraftNote';

interface CaseStudyTemplateProps {
  project: Project;
  sections: CaseStudySectionCopy;
  prev: Project | null;
  next: Project | null;
}

function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="py-10 border-t border-border">
      <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function OptionalBody({ text }: { text: string | null }) {
  if (!text) {
    return <DraftNote />;
  }
  return (
    <p className="text-muted-foreground leading-relaxed max-w-2xl">
      {text}
    </p>
  );
}

export function CaseStudyTemplate({
  project,
  sections,
  prev,
  next,
}: CaseStudyTemplateProps) {
  const roleText = sections.roleDetail
    ? `${project.role}. ${sections.roleDetail}`
    : project.role;

  return (
    <article className="max-w-3xl mx-auto px-6 pt-28 pb-24">
      <header className="mb-12">
        {project.client ? (
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            {project.client}
          </p>
        ) : null}
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-[1.12] mb-6">
          {project.title}
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
          {project.role}
        </p>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              className="font-mono text-[11px] px-2.5 py-1 border border-border text-muted-foreground"
              key={tech}
            >
              {tech}
            </li>
          ))}
        </ul>
      </header>

      <CaseStudySection title={CASE_STUDY_CONTEXT_TITLE}>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {project.summary}
        </p>
      </CaseStudySection>

      <CaseStudySection title={CASE_STUDY_CONSTRAINTS_TITLE}>
        <OptionalBody text={sections.constraints} />
      </CaseStudySection>

      <CaseStudySection title={CASE_STUDY_APPROACH_TITLE}>
        <OptionalBody text={sections.approach} />
        {sections.diagram && sections.diagramCaption ? (
          <ArchitectureDiagram
            caption={sections.diagramCaption}
            kind={sections.diagram}
          />
        ) : null}
      </CaseStudySection>

      <CaseStudySection title={CASE_STUDY_ROLE_TITLE}>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {roleText}
        </p>
      </CaseStudySection>

      <CaseStudySection title={CASE_STUDY_OUTCOMES_TITLE}>
        <ul className="space-y-2">
          {project.outcomes.map((outcome) => (
            <li
              className="flex items-start gap-3 text-foreground"
              key={outcome}
            >
              <span
                aria-hidden
                className="text-primary mt-1.5 text-[8px]"
              >
                &#9646;
              </span>
              <span>
                {outcome}
              </span>
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection title={CASE_STUDY_LESSONS_TITLE}>
        <OptionalBody text={sections.lessons} />
      </CaseStudySection>

      <CaseStudyPager
        next={next}
        prev={prev}
      />
    </article>
  );
}

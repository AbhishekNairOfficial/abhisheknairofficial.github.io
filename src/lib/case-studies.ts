import {
  CASE_STUDY_SECTIONS,
  PROJECTS,
  SELECTED_WORK_SLUGS,
  WORK_INDEX_DIGITS,
  type CaseStudySectionCopy,
  type Project,
  type SelectedWorkSlug,
} from '@/config/constants';

export function isSelectedWorkSlug(slug: string): slug is SelectedWorkSlug {
  return (SELECTED_WORK_SLUGS as readonly string[]).includes(slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => {
    return project.slug === slug;
  });
}

export function getSelectedProjects(): Project[] {
  const selected: Project[] = [];
  SELECTED_WORK_SLUGS.forEach((slug) => {
    const project = getProjectBySlug(slug);
    if (project) {
      selected.push(project);
    }
  });
  return selected;
}

export function getCaseStudySections(slug: string): CaseStudySectionCopy | undefined {
  if (!isSelectedWorkSlug(slug)) {
    return undefined;
  }
  return CASE_STUDY_SECTIONS[slug];
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const selected = getSelectedProjects();
  const index = selected.findIndex((project) => {
    return project.slug === slug;
  });
  if (index < 0) {
    return { prev: null, next: null };
  }
  const lastIndex = selected.length - 1;
  const prevIndex = index === 0 ? lastIndex : index - 1;
  const nextIndex = index === lastIndex ? 0 : index + 1;
  return {
    prev: selected[prevIndex] ?? null,
    next: selected[nextIndex] ?? null,
  };
}

export function formatWorkIndex(index: number): string {
  return String(index + 1).padStart(WORK_INDEX_DIGITS, '0');
}

export function workPath(slug: string): string {
  return `/work/${slug}`;
}

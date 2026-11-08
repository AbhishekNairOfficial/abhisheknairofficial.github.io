import { selectSummary } from '@/features/project-summaries/select.server';
import type { ProjectInput, ResolvedSummary } from '@/features/project-summaries/types';
import {
  fixtureVerifier,
  makeCandidate,
  makeProject,
  makeRegistry,
  secondFixtureProject,
} from '../../../../tests/project-summaries/fixtures';

export interface DemoCard {
  projectId: string;
  title: string;
  original: string;
  resolved: ResolvedSummary;
}

function approvedCard(project: ProjectInput, projectId: string, title: string): DemoCard {
  const candidate = makeCandidate({ ...project, title });
  const registry = makeRegistry();
  registry.current[candidate.bundle.source.project.id] = candidate;
  const resolved = selectSummary({
    project: candidate.bundle.source.project,
    currentSourceHash: candidate.bundle.source.sourceHash,
    registry,
    verifyApproval: fixtureVerifier,
  });
  return {
    projectId,
    title,
    original: candidate.bundle.source.project.summary,
    resolved,
  };
}

export function getDemoCards(): DemoCard[] {
  return [
    approvedCard(makeProject(), 'fixture-one', 'Fixture One'),
    approvedCard(secondFixtureProject(), 'fixture-two', 'Fixture Two'),
    {
      projectId: 'fixture-original-only',
      title: 'Fixture Original Only',
      original: 'This fictional pier notebook has no approved audience summaries.',
      resolved: { kind: 'original', reason: 'no-approved-release' },
    },
  ];
}

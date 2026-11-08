import releaseJson from '@/content/project-summaries/release.json';
import { canonicalize } from './canonical';
import { hashSource } from './hashes.server';
import { parseRegistry } from './schema';
import { selectSummary } from './select.server';
import {
  PROJECT_IDS,
  type ApprovalVerifier,
  type Candidate,
  type Hash,
  type ProjectId,
  type ProjectInput,
  type ReleaseRegistry,
  type ResolvedSummary,
} from './types';

const DENY_ALL: ApprovalVerifier = () => false;

export function getSummaryCatalog(
  projects: ProjectInput[],
): Record<ProjectId, ResolvedSummary> {
  return buildSummaryCatalog(projects, releaseJson, DENY_ALL);
}

export function buildSummaryCatalog(
  projects: ProjectInput[],
  registryInput: unknown,
  verifyApproval: ApprovalVerifier,
): Record<ProjectId, ResolvedSummary> {
  const parsed = parseRegistry(registryInput);
  if (!parsed.ok) {
    return originalCatalog(projects, 'invalid-registry');
  }
  const catalog = originalCatalog(projects, 'no-approved-release');
  projects.forEach((project) => {
    const hash = liveSourceHash(project, parsed.value);
    if (!hash) {
      return;
    }
    catalog[project.id] = selectSummary({
      project,
      currentSourceHash: hash,
      registry: parsed.value,
      verifyApproval,
    });
  });
  return catalog;
}

function originalCatalog(
  projects: ProjectInput[],
  reason: string,
): Record<ProjectId, ResolvedSummary> {
  const catalog = {} as Record<ProjectId, ResolvedSummary>;
  PROJECT_IDS.forEach((id) => {
    catalog[id] = { kind: 'original', reason };
  });
  projects.forEach((project) => {
    catalog[project.id] = { kind: 'original', reason };
  });
  return catalog;
}

function liveSourceHash(project: ProjectInput, registry: ReleaseRegistry): Hash | null {
  const candidate = matchingSnapshot(project, registry.current[project.id])
    ?? matchingSnapshot(project, registry.lastGood[project.id]);
  if (!candidate) {
    return null;
  }
  return hashSource({
    schemaVersion: candidate.bundle.source.schemaVersion,
    policyVersion: candidate.bundle.source.policyVersion,
    project: candidate.bundle.source.project,
    sourceRevision: candidate.bundle.source.sourceRevision,
    claims: candidate.bundle.source.claims,
  });
}

function matchingSnapshot(
  project: ProjectInput,
  candidate: Candidate | undefined,
): Candidate | undefined {
  if (!candidate || !snapshotMatchesProject(candidate, project)) {
    return undefined;
  }
  return candidate;
}

function snapshotMatchesProject(candidate: Candidate, project: ProjectInput): boolean {
  return canonicalize(candidate.bundle.source.project) === canonicalize(project);
}

export function toProjectInput(project: ProjectInput): ProjectInput {
  if (project.client === undefined) {
    return {
      id: project.id,
      title: project.title,
      role: project.role,
      summary: project.summary,
      outcomes: project.outcomes,
    };
  }
  return {
    id: project.id,
    title: project.title,
    client: project.client,
    role: project.role,
    summary: project.summary,
    outcomes: project.outcomes,
  };
}

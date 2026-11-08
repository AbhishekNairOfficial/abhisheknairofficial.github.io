export const PROJECT_IDS = [
  'dew',
  'executive-network-analytics',
  'ai-anomaly-detection',
  'supply-chain-control-tower',
  'industrial-collection-app',
  'enterprise-retail-frontend',
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export const AUDIENCES = ['recruiter', 'client', 'technical'] as const;
export type Audience = (typeof AUDIENCES)[number];

export type SummaryView = 'original' | Audience;

export type Hash = string;

export const SCHEMA_VERSION = 1 as const;
export const POLICY_VERSION = '1' as const;
export const VALIDATION_VERSION = '1' as const;

export interface ProjectInput {
  id: ProjectId;
  title: string;
  client?: string;
  role: string;
  summary: string;
  outcomes: string[];
}

export interface Claim {
  id: string;
  text: string;
  publicLocator: string;
  entities: string[];
  numbers: string[];
  qualifiers: string[];
}

export interface SourceSnapshot {
  schemaVersion: 1;
  policyVersion: '1';
  project: ProjectInput;
  sourceRevision: string;
  claims: Claim[];
  sourceHash: Hash;
}

export interface Sentence {
  text: string;
  claimIds: string[];
}

export type Provenance =
  | {
    kind: 'manual';
    author: string;
    authoredAt: string;
  }
  | {
    kind: 'spark';
    requestedModelId: string;
    returnedModelId: string;
    promptVersion: string;
    promptHash: Hash;
    parameters: { temperature: number; maxOutputTokens: number };
    generatorVersion: string;
    generatedAt: string;
    jobKey: Hash;
    usage?: { inputTokens: number; outputTokens: number };
  };

export interface Draft {
  schemaVersion: 1;
  projectId: ProjectId;
  sourceHash: Hash;
  sourceRevision: string;
  audience: Audience;
  sentences: Sentence[];
  provenance: Provenance;
  outputHash: Hash;
  validationVersion: '1';
  editedFrom?: Hash;
}

export interface Bundle {
  source: SourceSnapshot;
  views: Record<Audience, Draft>;
}

export interface ReviewReceipt {
  schemaVersion: 1;
  trust: 'fixture' | 'owner';
  reviewer: string;
  sourceHash: Hash;
  outputHashes: Record<Audience, Hash>;
  approvedAt: string;
  reviewedRevision: string;
  releaseRevision: string;
}

export interface Candidate {
  bundle: Bundle;
  receipt: ReviewReceipt;
}

export interface ReleaseRegistry {
  schemaVersion: 1;
  current: Partial<Record<ProjectId, Candidate>>;
  lastGood: Partial<Record<ProjectId, Candidate>>;
  revokedSourceHashes: Hash[];
}

export interface Issue {
  code: string;
  path: string;
  claimId?: string;
}

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; issues: Issue[] };

// eslint-disable-next-line no-unused-vars -- callback type parameter
export type ApprovalVerifier = (value: Candidate) => boolean;

export type ResolvedSummary =
  | { kind: 'original'; reason: string }
  | {
    kind: 'approved';
    sourceHash: Hash;
    views: Record<Audience, { text: string; assisted: boolean }>;
    reviewedBy: string;
    approvedAt: string;
  };

export function ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

export function fail(issues: Issue[]): Result<never> {
  return { ok: false, issues };
}

export function issue(code: string, path: string, claimId?: string): Issue {
  if (claimId === undefined) {
    return { code, path };
  }
  return { code, path, claimId };
}

export function isProjectId(value: string): value is ProjectId {
  return (PROJECT_IDS as readonly string[]).includes(value);
}

export function isAudience(value: string): value is Audience {
  return (AUDIENCES as readonly string[]).includes(value);
}

export function isSummaryView(value: string): value is SummaryView {
  return value === 'original' || isAudience(value);
}

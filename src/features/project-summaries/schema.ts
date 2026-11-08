/* eslint-disable max-lines -- bundle and registry parsers share this module */
import { parseDraft, parseViews } from './schema-draft';
import {
  missingKeys,
  readHash,
  readIsoDate,
  readLiteral,
  readRecord,
  readString,
  unexpectedKeys,
} from './schema-read';
import { parseSourceSnapshot, readProjectId } from './schema-source';
import {
  AUDIENCES,
  fail,
  issue,
  ok,
  PROJECT_IDS,
  SCHEMA_VERSION,
  type Audience,
  type Bundle,
  type Candidate,
  type Hash,
  type Issue,
  type ProjectId,
  type ReleaseRegistry,
  type Result,
  type ReviewReceipt,
} from './types';

const BUNDLE_KEYS = ['source', 'views'] as const;
const RECEIPT_KEYS = [
  'schemaVersion',
  'trust',
  'reviewer',
  'sourceHash',
  'outputHashes',
  'approvedAt',
  'reviewedRevision',
  'releaseRevision',
] as const;
const CANDIDATE_KEYS = ['bundle', 'receipt'] as const;
const REGISTRY_KEYS = ['schemaVersion', 'current', 'lastGood', 'revokedSourceHashes'] as const;
const TRUST_VALUES = ['fixture', 'owner'] as const;

export function parseBundle(input: unknown): Result<Bundle> {
  const record = readRecord(input, '$');
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, BUNDLE_KEYS, '$'),
    ...missingKeys(record.value, BUNDLE_KEYS, '$'),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  const source = parseSourceSnapshot(record.value.source, '$.source');
  const views = parseViews(record.value.views, '$.views');
  if (!source.ok || !views.ok) {
    return fail([
      ...(source.ok ? [] : source.issues),
      ...(views.ok ? [] : views.issues),
    ]);
  }
  return alignBundle(source.value, views.value);
}

function alignBundle(
  source: Bundle['source'],
  views: Bundle['views'],
): Result<Bundle> {
  const issues: Issue[] = [];
  AUDIENCES.forEach((audience) => {
    const draft = views[audience];
    if (draft.projectId !== source.project.id) {
      issues.push(issue('project-mismatch', `$.views.${audience}.projectId`));
    }
    if (draft.sourceHash !== source.sourceHash) {
      issues.push(issue('source-hash-mismatch', `$.views.${audience}.sourceHash`));
    }
    if (draft.sourceRevision !== source.sourceRevision) {
      issues.push(issue('source-revision-mismatch', `$.views.${audience}.sourceRevision`));
    }
  });
  if (issues.length > 0) {
    return fail(issues);
  }
  return ok({ source, views });
}

/* eslint-disable-next-line complexity -- registry slots are parsed independently */
export function parseRegistry(input: unknown): Result<ReleaseRegistry> {
  const record = readRecord(input, '$');
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, REGISTRY_KEYS, '$'),
    ...missingKeys(record.value, REGISTRY_KEYS, '$'),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  const schemaVersion = readLiteral(
    record.value.schemaVersion,
    SCHEMA_VERSION,
    '$.schemaVersion',
  );
  const current = parseCandidateMap(record.value.current, '$.current');
  const lastGood = parseCandidateMap(record.value.lastGood, '$.lastGood');
  const revoked = parseHashArray(record.value.revokedSourceHashes, '$.revokedSourceHashes');
  if (!schemaVersion.ok || !current.ok || !lastGood.ok || !revoked.ok) {
    return fail([
      ...(schemaVersion.ok ? [] : schemaVersion.issues),
      ...(current.ok ? [] : current.issues),
      ...(lastGood.ok ? [] : lastGood.issues),
      ...(revoked.ok ? [] : revoked.issues),
    ]);
  }
  return ok({
    schemaVersion: SCHEMA_VERSION,
    current: current.value,
    lastGood: lastGood.value,
    revokedSourceHashes: revoked.value,
  });
}

function parseCandidateMap(
  value: unknown,
  path: string,
): Result<Partial<Record<ProjectId, Candidate>>> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  const extra = unexpectedKeys(record.value, PROJECT_IDS, path);
  if (extra.length > 0) {
    return fail(extra);
  }
  return finishCandidateMap(record.value, path);
}

function finishCandidateMap(
  record: Record<string, unknown>,
  path: string,
): Result<Partial<Record<ProjectId, Candidate>>> {
  const result: Partial<Record<ProjectId, Candidate>> = {};
  const issues: Issue[] = [];
  Object.keys(record).forEach((key) => {
    const id = readProjectId(key, `${path}.${key}`);
    if (!id.ok) {
      issues.push(...id.issues);
      return;
    }
    const parsed = parseCandidate(record[key], `${path}.${key}`);
    if (!parsed.ok) {
      issues.push(...parsed.issues);
      return;
    }
    if (parsed.value.bundle.source.project.id !== id.value) {
      issues.push(issue('project-mismatch', `${path}.${key}`));
      return;
    }
    result[id.value] = parsed.value;
  });
  if (issues.length > 0) {
    return fail(issues);
  }
  return ok(result);
}

function parseCandidate(value: unknown, path: string): Result<Candidate> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, CANDIDATE_KEYS, path),
    ...missingKeys(record.value, CANDIDATE_KEYS, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  const bundle = parseBundle(record.value.bundle);
  const receipt = parseReceipt(record.value.receipt, `${path}.receipt`);
  if (!bundle.ok || !receipt.ok) {
    return fail([
      ...(bundle.ok ? [] : prefixIssues(bundle.issues, path, 'bundle')),
      ...(receipt.ok ? [] : receipt.issues),
    ]);
  }
  return ok({ bundle: bundle.value, receipt: receipt.value });
}

function prefixIssues(issues: Issue[], path: string, leaf: string): Issue[] {
  return issues.map((item) => {
    const rootPrefix = '$.';
    const suffix = item.path.startsWith(rootPrefix)
      ? item.path.slice(rootPrefix.length)
      : item.path;
    return issue(item.code, `${path}.${leaf}.${suffix}`, item.claimId);
  });
}

function parseReceipt(value: unknown, path: string): Result<ReviewReceipt> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, RECEIPT_KEYS, path),
    ...missingKeys(record.value, RECEIPT_KEYS, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  return finishReceipt(record.value, path);
}

function finishReceipt(
  record: Record<string, unknown>,
  path: string,
): Result<ReviewReceipt> {
  const schemaVersion = readLiteral(record.schemaVersion, SCHEMA_VERSION, `${path}.schemaVersion`);
  const trust = parseTrust(record.trust, `${path}.trust`);
  const reviewer = readString(record.reviewer, `${path}.reviewer`);
  const sourceHash = readHash(record.sourceHash, `${path}.sourceHash`);
  const outputHashes = parseOutputHashes(record.outputHashes, `${path}.outputHashes`);
  const approvedAt = readIsoDate(record.approvedAt, `${path}.approvedAt`);
  const reviewedRevision = readString(record.reviewedRevision, `${path}.reviewedRevision`);
  const releaseRevision = readString(record.releaseRevision, `${path}.releaseRevision`);
  const nested = [
    schemaVersion,
    trust,
    reviewer,
    sourceHash,
    outputHashes,
    approvedAt,
    reviewedRevision,
    releaseRevision,
  ];
  const issues: Issue[] = [];
  nested.forEach((result) => {
    if (!result.ok) {
      issues.push(...result.issues);
    }
  });
  if (issues.length > 0) {
    return fail(issues);
  }
  if (!trust.ok || !reviewer.ok || !sourceHash.ok || !outputHashes.ok || !approvedAt.ok || !reviewedRevision.ok || !releaseRevision.ok) {
    return fail([issue('expected-object', path)]);
  }
  return ok({
    schemaVersion: SCHEMA_VERSION,
    trust: trust.value,
    reviewer: reviewer.value,
    sourceHash: sourceHash.value,
    outputHashes: outputHashes.value,
    approvedAt: approvedAt.value,
    reviewedRevision: reviewedRevision.value,
    releaseRevision: releaseRevision.value,
  });
}

function parseTrust(value: unknown, path: string): Result<'fixture' | 'owner'> {
  const text = readString(value, path);
  if (!text.ok) {
    return text;
  }
  if (text.value !== TRUST_VALUES[0] && text.value !== TRUST_VALUES[1]) {
    return fail([issue('invalid-trust', path)]);
  }
  return ok(text.value);
}

function parseOutputHashes(
  value: unknown,
  path: string,
): Result<Record<Audience, Hash>> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, AUDIENCES, path),
    ...missingKeys(record.value, AUDIENCES, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  const recruiter = readHash(record.value.recruiter, `${path}.recruiter`);
  const client = readHash(record.value.client, `${path}.client`);
  const technical = readHash(record.value.technical, `${path}.technical`);
  if (!recruiter.ok || !client.ok || !technical.ok) {
    return fail([
      ...(recruiter.ok ? [] : recruiter.issues),
      ...(client.ok ? [] : client.issues),
      ...(technical.ok ? [] : technical.issues),
    ]);
  }
  return ok({
    recruiter: recruiter.value,
    client: client.value,
    technical: technical.value,
  });
}

function parseHashArray(value: unknown, path: string): Result<Hash[]> {
  if (!Array.isArray(value)) {
    return fail([issue('expected-array', path)]);
  }
  const hashes: Hash[] = [];
  const issues: Issue[] = [];
  value.forEach((entry, index) => {
    const parsed = readHash(entry, `${path}.${index}`);
    if (!parsed.ok) {
      issues.push(...parsed.issues);
      return;
    }
    hashes.push(parsed.value);
  });
  if (issues.length > 0) {
    return fail(issues);
  }
  return ok(hashes);
}

export { parseDraft };

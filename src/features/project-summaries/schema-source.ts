import {
  missingKeys,
  readHash,
  readHttpsUrl,
  readLiteral,
  readRecord,
  readString,
  readStringArray,
  unexpectedKeys,
} from './schema-read';
import {
  fail,
  isProjectId,
  issue,
  ok,
  SCHEMA_VERSION,
  POLICY_VERSION,
  type Claim,
  type Issue,
  type ProjectId,
  type ProjectInput,
  type Result,
  type SourceSnapshot,
} from './types';

const PROJECT_KEYS = ['id', 'title', 'role', 'summary', 'outcomes', 'client'] as const;
const PROJECT_REQUIRED = ['id', 'title', 'role', 'summary', 'outcomes'] as const;
const CLAIM_KEYS = [
  'id',
  'text',
  'publicLocator',
  'entities',
  'numbers',
  'qualifiers',
] as const;
const SOURCE_KEYS = [
  'schemaVersion',
  'policyVersion',
  'project',
  'sourceRevision',
  'claims',
  'sourceHash',
] as const;

export function parseProjectInput(
  value: unknown,
  path: string,
): Result<ProjectInput> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, PROJECT_KEYS, path),
    ...missingKeys(record.value, PROJECT_REQUIRED, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  return finishProject(record.value, path);
}

function finishProject(
  record: Record<string, unknown>,
  path: string,
): Result<ProjectInput> {
  const id = readProjectId(record.id, `${path}.id`);
  const title = readString(record.title, `${path}.title`);
  const role = readString(record.role, `${path}.role`);
  const summary = readString(record.summary, `${path}.summary`);
  const outcomes = readStringArray(record.outcomes, `${path}.outcomes`);
  const issues = collect(
    [id, title, role, summary, outcomes],
    optionalClient(record, path),
  );
  if (issues.length > 0) {
    return fail(issues);
  }
  if (!id.ok || !title.ok || !role.ok || !summary.ok || !outcomes.ok) {
    return fail([issue('expected-object', path)]);
  }
  return ok(projectValue({
    id: id.value,
    title: title.value,
    role: role.value,
    summary: summary.value,
    outcomes: outcomes.value,
    record,
  }));
}

function optionalClient(
  record: Record<string, unknown>,
  path: string,
): Issue[] {
  if (!Object.prototype.hasOwnProperty.call(record, 'client')) {
    return [];
  }
  const parsed = readString(record.client, `${path}.client`);
  return parsed.ok ? [] : parsed.issues;
}

function projectValue(fields: {
  id: ProjectId;
  title: string;
  role: string;
  summary: string;
  outcomes: string[];
  record: Record<string, unknown>;
}): ProjectInput {
  if (typeof fields.record.client === 'string') {
    return {
      id: fields.id,
      title: fields.title,
      client: fields.record.client,
      role: fields.role,
      summary: fields.summary,
      outcomes: fields.outcomes,
    };
  }
  return {
    id: fields.id,
    title: fields.title,
    role: fields.role,
    summary: fields.summary,
    outcomes: fields.outcomes,
  };
}

export function readProjectId(value: unknown, path: string): Result<ProjectId> {
  const text = readString(value, path);
  if (!text.ok) {
    return text;
  }
  if (!isProjectId(text.value)) {
    return fail([issue('unknown-project', path)]);
  }
  return ok(text.value);
}

export function parseClaim(value: unknown, path: string): Result<Claim> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, CLAIM_KEYS, path),
    ...missingKeys(record.value, CLAIM_KEYS, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  return finishClaim(record.value, path);
}

function finishClaim(record: Record<string, unknown>, path: string): Result<Claim> {
  const id = readString(record.id, `${path}.id`);
  const text = readString(record.text, `${path}.text`);
  const publicLocator = readHttpsUrl(record.publicLocator, `${path}.publicLocator`);
  const entities = readStringArray(record.entities, `${path}.entities`);
  const numbers = readStringArray(record.numbers, `${path}.numbers`);
  const qualifiers = readStringArray(record.qualifiers, `${path}.qualifiers`);
  const issues = collect([id, text, publicLocator, entities, numbers, qualifiers]);
  if (issues.length > 0) {
    return fail(issues);
  }
  if (!id.ok || !text.ok || !publicLocator.ok || !entities.ok || !numbers.ok || !qualifiers.ok) {
    return fail([issue('expected-object', path)]);
  }
  return ok({
    id: id.value,
    text: text.value,
    publicLocator: publicLocator.value,
    entities: entities.value,
    numbers: numbers.value,
    qualifiers: qualifiers.value,
  });
}

export function parseClaims(value: unknown, path: string): Result<Claim[]> {
  if (!Array.isArray(value)) {
    return fail([issue('expected-array', path)]);
  }
  const claims: Claim[] = [];
  const issues: Issue[] = [];
  const seen = new Set<string>();
  value.forEach((entry, index) => {
    const parsed = parseClaim(entry, `${path}.${index}`);
    if (!parsed.ok) {
      issues.push(...parsed.issues);
      return;
    }
    if (seen.has(parsed.value.id)) {
      issues.push(issue('duplicate-claim-id', `${path}.${index}.id`));
      return;
    }
    seen.add(parsed.value.id);
    claims.push(parsed.value);
  });
  if (issues.length > 0) {
    return fail(issues);
  }
  return ok(claims);
}

export function parseSourceSnapshot(
  value: unknown,
  path: string,
): Result<SourceSnapshot> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, SOURCE_KEYS, path),
    ...missingKeys(record.value, SOURCE_KEYS, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  return finishSource(record.value, path);
}

function finishSource(
  record: Record<string, unknown>,
  path: string,
): Result<SourceSnapshot> {
  const schemaVersion = readLiteral(record.schemaVersion, SCHEMA_VERSION, `${path}.schemaVersion`);
  const policyVersion = readLiteral(record.policyVersion, POLICY_VERSION, `${path}.policyVersion`);
  const project = parseProjectInput(record.project, `${path}.project`);
  const sourceRevision = readString(record.sourceRevision, `${path}.sourceRevision`);
  const claims = parseClaims(record.claims, `${path}.claims`);
  const sourceHash = readHash(record.sourceHash, `${path}.sourceHash`);
  const issues = collect([
    schemaVersion,
    policyVersion,
    project,
    sourceRevision,
    claims,
    sourceHash,
  ]);
  if (issues.length > 0) {
    return fail(issues);
  }
  if (!project.ok || !sourceRevision.ok || !claims.ok || !sourceHash.ok) {
    return fail([issue('expected-object', path)]);
  }
  return ok({
    schemaVersion: SCHEMA_VERSION,
    policyVersion: POLICY_VERSION,
    project: project.value,
    sourceRevision: sourceRevision.value,
    claims: claims.value,
    sourceHash: sourceHash.value,
  });
}

function collect(results: Result<unknown>[], extra: Issue[] = []): Issue[] {
  const issues = extra.slice();
  results.forEach((result) => {
    if (!result.ok) {
      issues.push(...result.issues);
    }
  });
  return issues;
}

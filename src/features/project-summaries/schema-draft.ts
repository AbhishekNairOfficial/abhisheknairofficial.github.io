/* eslint-disable max-lines -- provenance, draft, and view parsers share this module */
import {
  missingKeys,
  readFiniteNonNegative,
  readHash,
  readIsoDate,
  readLiteral,
  readRecord,
  readString,
  unexpectedKeys,
} from './schema-read';
import { readProjectId } from './schema-source';
import {
  AUDIENCES,
  fail,
  isAudience,
  issue,
  ok,
  SCHEMA_VERSION,
  VALIDATION_VERSION,
  type Audience,
  type Draft,
  type Issue,
  type Provenance,
  type Result,
  type Sentence,
} from './types';

const SENTENCE_KEYS = ['text', 'claimIds'] as const;
const MANUAL_KEYS = ['kind', 'author', 'authoredAt'] as const;
const SPARK_KEYS = [
  'kind',
  'requestedModelId',
  'returnedModelId',
  'promptVersion',
  'promptHash',
  'parameters',
  'generatorVersion',
  'generatedAt',
  'jobKey',
  'usage',
] as const;
const SPARK_REQUIRED = SPARK_KEYS.filter((key) => key !== 'usage');
const PARAM_KEYS = ['temperature', 'maxOutputTokens'] as const;
const USAGE_KEYS = ['inputTokens', 'outputTokens'] as const;
const DRAFT_KEYS = [
  'schemaVersion',
  'projectId',
  'sourceHash',
  'sourceRevision',
  'audience',
  'sentences',
  'provenance',
  'outputHash',
  'validationVersion',
  'editedFrom',
] as const;
const DRAFT_REQUIRED = DRAFT_KEYS.filter((key) => key !== 'editedFrom');

export function parseDraft(value: unknown, path: string): Result<Draft> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, DRAFT_KEYS, path),
    ...missingKeys(record.value, DRAFT_REQUIRED, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  return finishDraft(record.value, path);
}

function finishDraft(record: Record<string, unknown>, path: string): Result<Draft> {
  const schemaVersion = readLiteral(
    record.schemaVersion,
    SCHEMA_VERSION,
    `${path}.schemaVersion`,
  );
  const projectId = readProjectId(record.projectId, `${path}.projectId`);
  const sourceHash = readHash(record.sourceHash, `${path}.sourceHash`);
  const sourceRevision = readString(record.sourceRevision, `${path}.sourceRevision`);
  const audience = readAudience(record.audience, `${path}.audience`);
  const sentences = parseSentences(record.sentences, `${path}.sentences`);
  const provenance = parseProvenance(record.provenance, `${path}.provenance`);
  const outputHash = readHash(record.outputHash, `${path}.outputHash`);
  const validationVersion = readLiteral(
    record.validationVersion,
    VALIDATION_VERSION,
    `${path}.validationVersion`,
  );
  const issues = collectDraftIssues(record, path, [
    schemaVersion,
    projectId,
    sourceHash,
    sourceRevision,
    audience,
    sentences,
    provenance,
    outputHash,
    validationVersion,
  ]);
  if (issues.length > 0) {
    return fail(issues);
  }
  if (!projectId.ok || !sourceHash.ok || !sourceRevision.ok || !audience.ok || !sentences.ok || !provenance.ok || !outputHash.ok) {
    return fail([issue('expected-object', path)]);
  }
  return ok(draftFromParts({
    projectId: projectId.value,
    sourceHash: sourceHash.value,
    sourceRevision: sourceRevision.value,
    audience: audience.value,
    sentences: sentences.value,
    provenance: provenance.value,
    outputHash: outputHash.value,
    editedFrom: optionalEditedFrom(record),
  }));
}

function collectDraftIssues(
  record: Record<string, unknown>,
  path: string,
  results: Result<unknown>[],
): Issue[] {
  const issues: Issue[] = [];
  results.forEach((result) => {
    if (!result.ok) {
      issues.push(...result.issues);
    }
  });
  const edited = optionalEditedHash(record, path);
  if (!edited.ok) {
    issues.push(...edited.issues);
  }
  return issues;
}

function optionalEditedHash(
  record: Record<string, unknown>,
  path: string,
): Result<string | undefined> {
  if (!Object.prototype.hasOwnProperty.call(record, 'editedFrom')) {
    return ok(undefined);
  }
  return readHash(record.editedFrom, `${path}.editedFrom`);
}

function optionalEditedFrom(record: Record<string, unknown>): string | undefined {
  return typeof record.editedFrom === 'string' ? record.editedFrom : undefined;
}

function draftFromParts(parts: Omit<Draft, 'schemaVersion' | 'validationVersion'>): Draft {
  const draft: Draft = {
    schemaVersion: SCHEMA_VERSION,
    projectId: parts.projectId,
    sourceHash: parts.sourceHash,
    sourceRevision: parts.sourceRevision,
    audience: parts.audience,
    sentences: parts.sentences,
    provenance: parts.provenance,
    outputHash: parts.outputHash,
    validationVersion: VALIDATION_VERSION,
  };
  if (parts.editedFrom !== undefined) {
    draft.editedFrom = parts.editedFrom;
  }
  return draft;
}

export function readAudience(value: unknown, path: string): Result<Audience> {
  const text = readString(value, path);
  if (!text.ok) {
    return text;
  }
  if (!isAudience(text.value)) {
    return fail([issue('unknown-audience', path)]);
  }
  return ok(text.value);
}

function parseSentences(value: unknown, path: string): Result<Sentence[]> {
  if (!Array.isArray(value) || value.length === 0) {
    return fail([issue('expected-array', path)]);
  }
  const sentences: Sentence[] = [];
  const issues: Issue[] = [];
  value.forEach((entry, index) => {
    const parsed = parseSentence(entry, `${path}.${index}`);
    if (!parsed.ok) {
      issues.push(...parsed.issues);
      return;
    }
    sentences.push(parsed.value);
  });
  if (issues.length > 0) {
    return fail(issues);
  }
  return ok(sentences);
}

function parseSentence(value: unknown, path: string): Result<Sentence> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, SENTENCE_KEYS, path),
    ...missingKeys(record.value, SENTENCE_KEYS, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  const text = readString(record.value.text, `${path}.text`);
  const claimIds = parseClaimIds(record.value.claimIds, `${path}.claimIds`);
  if (!text.ok || !claimIds.ok) {
    return fail([...(text.ok ? [] : text.issues), ...(claimIds.ok ? [] : claimIds.issues)]);
  }
  return ok({ text: text.value, claimIds: claimIds.value });
}

function parseClaimIds(value: unknown, path: string): Result<string[]> {
  if (!Array.isArray(value) || value.length === 0) {
    return fail([issue('expected-array', path)]);
  }
  const ids: string[] = [];
  const issues: Issue[] = [];
  const seen = new Set<string>();
  value.forEach((entry, index) => {
    const parsed = readString(entry, `${path}.${index}`);
    if (!parsed.ok) {
      issues.push(...parsed.issues);
      return;
    }
    if (seen.has(parsed.value)) {
      issues.push(issue('duplicate-claim-id', `${path}.${index}`));
      return;
    }
    seen.add(parsed.value);
    ids.push(parsed.value);
  });
  if (issues.length > 0) {
    return fail(issues);
  }
  return ok(ids);
}

function parseProvenance(value: unknown, path: string): Result<Provenance> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  if (record.value.kind === 'manual') {
    return parseManual(record.value, path);
  }
  if (record.value.kind === 'spark') {
    return parseSpark(record.value, path);
  }
  return fail([issue('unknown-provenance', `${path}.kind`)]);
}

function parseManual(
  record: Record<string, unknown>,
  path: string,
): Result<Provenance> {
  const keyIssues = [
    ...unexpectedKeys(record, MANUAL_KEYS, path),
    ...missingKeys(record, MANUAL_KEYS, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  const author = readString(record.author, `${path}.author`);
  const authoredAt = readIsoDate(record.authoredAt, `${path}.authoredAt`);
  if (!author.ok || !authoredAt.ok) {
    return fail([...(author.ok ? [] : author.issues), ...(authoredAt.ok ? [] : authoredAt.issues)]);
  }
  return ok({ kind: 'manual', author: author.value, authoredAt: authoredAt.value });
}

function parseSpark(
  record: Record<string, unknown>,
  path: string,
): Result<Provenance> {
  const keyIssues = [
    ...unexpectedKeys(record, SPARK_KEYS, path),
    ...missingKeys(record, SPARK_REQUIRED, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  return finishSpark(record, path);
}

/* eslint-disable complexity -- assembling a fixed provenance record */
function finishSpark(
  record: Record<string, unknown>,
  path: string,
): Result<Provenance> {
  const requestedModelId = readString(record.requestedModelId, `${path}.requestedModelId`);
  const returnedModelId = readString(record.returnedModelId, `${path}.returnedModelId`);
  const promptVersion = readString(record.promptVersion, `${path}.promptVersion`);
  const promptHash = readHash(record.promptHash, `${path}.promptHash`);
  const parameters = parseParameters(record.parameters, `${path}.parameters`);
  const generatorVersion = readString(record.generatorVersion, `${path}.generatorVersion`);
  const generatedAt = readIsoDate(record.generatedAt, `${path}.generatedAt`);
  const jobKey = readHash(record.jobKey, `${path}.jobKey`);
  const usage = parseUsage(record, path);
  const issues = collectSpark([
    requestedModelId,
    returnedModelId,
    promptVersion,
    promptHash,
    parameters,
    generatorVersion,
    generatedAt,
    jobKey,
    usage,
  ]);
  if (issues.length > 0) {
    return fail(issues);
  }
  if (!requestedModelId.ok || !returnedModelId.ok || !promptVersion.ok || !promptHash.ok || !parameters.ok || !generatorVersion.ok || !generatedAt.ok || !jobKey.ok || !usage.ok) {
    return fail([issue('expected-object', path)]);
  }
  return ok(sparkValue({
    kind: 'spark',
    requestedModelId: requestedModelId.value,
    returnedModelId: returnedModelId.value,
    promptVersion: promptVersion.value,
    promptHash: promptHash.value,
    parameters: parameters.value,
    generatorVersion: generatorVersion.value,
    generatedAt: generatedAt.value,
    jobKey: jobKey.value,
    usage: usage.value,
  }));
}
/* eslint-enable complexity */

function collectSpark(results: Result<unknown>[]): Issue[] {
  const issues: Issue[] = [];
  results.forEach((result) => {
    if (!result.ok) {
      issues.push(...result.issues);
    }
  });
  return issues;
}

function parseParameters(
  value: unknown,
  path: string,
): Result<{ temperature: number; maxOutputTokens: number }> {
  const record = readRecord(value, path);
  if (!record.ok) {
    return record;
  }
  const keyIssues = [
    ...unexpectedKeys(record.value, PARAM_KEYS, path),
    ...missingKeys(record.value, PARAM_KEYS, path),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  const temperature = readFiniteNonNegative(record.value.temperature, `${path}.temperature`);
  const maxOutputTokens = readFiniteNonNegative(
    record.value.maxOutputTokens,
    `${path}.maxOutputTokens`,
  );
  if (!temperature.ok || !maxOutputTokens.ok) {
    return fail([
      ...(temperature.ok ? [] : temperature.issues),
      ...(maxOutputTokens.ok ? [] : maxOutputTokens.issues),
    ]);
  }
  return ok({ temperature: temperature.value, maxOutputTokens: maxOutputTokens.value });
}

function parseUsage(
  record: Record<string, unknown>,
  path: string,
): Result<{ inputTokens: number; outputTokens: number } | undefined> {
  if (!Object.prototype.hasOwnProperty.call(record, 'usage')) {
    return ok(undefined);
  }
  const usageRecord = readRecord(record.usage, `${path}.usage`);
  if (!usageRecord.ok) {
    return usageRecord;
  }
  const usagePath = `${path}.usage`;
  const keyIssues = [
    ...unexpectedKeys(usageRecord.value, USAGE_KEYS, usagePath),
    ...missingKeys(usageRecord.value, USAGE_KEYS, usagePath),
  ];
  if (keyIssues.length > 0) {
    return fail(keyIssues);
  }
  const inputTokens = readFiniteNonNegative(usageRecord.value.inputTokens, `${usagePath}.inputTokens`);
  const outputTokens = readFiniteNonNegative(
    usageRecord.value.outputTokens,
    `${usagePath}.outputTokens`,
  );
  if (!inputTokens.ok || !outputTokens.ok) {
    return fail([
      ...(inputTokens.ok ? [] : inputTokens.issues),
      ...(outputTokens.ok ? [] : outputTokens.issues),
    ]);
  }
  return ok({ inputTokens: inputTokens.value, outputTokens: outputTokens.value });
}

function sparkValue(
  parts: Extract<Provenance, { kind: 'spark' }>,
): Provenance {
  if (parts.usage === undefined) {
    return {
      kind: 'spark',
      requestedModelId: parts.requestedModelId,
      returnedModelId: parts.returnedModelId,
      promptVersion: parts.promptVersion,
      promptHash: parts.promptHash,
      parameters: parts.parameters,
      generatorVersion: parts.generatorVersion,
      generatedAt: parts.generatedAt,
      jobKey: parts.jobKey,
    };
  }
  return parts;
}

export function parseViews(
  value: unknown,
  path: string,
): Result<Record<Audience, Draft>> {
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
  return finishViews(record.value, path);
}

function finishViews(
  record: Record<string, unknown>,
  path: string,
): Result<Record<Audience, Draft>> {
  const recruiter = parseDraft(record.recruiter, `${path}.recruiter`);
  const client = parseDraft(record.client, `${path}.client`);
  const technical = parseDraft(record.technical, `${path}.technical`);
  const issues = collectSpark([recruiter, client, technical]);
  if (issues.length > 0) {
    return fail(issues);
  }
  if (!recruiter.ok || !client.ok || !technical.ok) {
    return fail([issue('missing-audience', path)]);
  }
  const views = {
    recruiter: recruiter.value,
    client: client.value,
    technical: technical.value,
  };
  return checkAudienceAlignment(views, path);
}

function checkAudienceAlignment(
  views: Record<Audience, Draft>,
  path: string,
): Result<Record<Audience, Draft>> {
  const issues: Issue[] = [];
  AUDIENCES.forEach((audience) => {
    if (views[audience].audience !== audience) {
      issues.push(issue('audience-mismatch', `${path}.${audience}.audience`));
    }
  });
  if (issues.length > 0) {
    return fail(issues);
  }
  return ok(views);
}

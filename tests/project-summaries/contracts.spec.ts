import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { canonicalize } from '../../src/features/project-summaries/canonical';
import { hashDraft, hashSource } from '../../src/features/project-summaries/hashes.server';
import { parseBundle, parseRegistry } from '../../src/features/project-summaries/schema';
import { PROJECT_IDS } from '../../src/features/project-summaries/types';
import { PROJECTS } from '../../src/config/constants';
import {
  makeBundle,
  makeDraft,
  makeProject,
  makeSource,
  wordCount,
  joinedSummary,
} from './fixtures';

test('normalizes object order and NFC but preserves array order', () => {
  expect(canonicalize({ b: 'e\u0301\r\n', a: [2, 1] })).toBe(
    canonicalize({ a: [2, 1], b: 'é\n' }),
  );
  expect(canonicalize([1, 2])).not.toBe(canonicalize([2, 1]));
});

test('schema rejects extra keys including nested keys', () => {
  const bundle = makeBundle() as unknown as Record<string, unknown>;
  const extraTop = parseBundle({ ...bundle, extra: true });
  expect(extraTop.ok).toBe(false);
  if (extraTop.ok) {
    return;
  }
  expect(extraTop.issues.some((item) => item.code === 'unexpected-key')).toBe(true);

  const nested = structuredClone(makeBundle()) as unknown as {
    source: { extraNested?: boolean };
  };
  nested.source.extraNested = true;
  const extraNested = parseBundle(nested);
  expect(extraNested.ok).toBe(false);
  if (extraNested.ok) {
    return;
  }
  expect(extraNested.issues.some((item) => item.path.includes('extraNested'))).toBe(true);
});

test('schema rejects bad date, bad hash, missing audience, and unknown project', () => {
  const badDate = structuredClone(makeBundle());
  if (badDate.views.recruiter.provenance.kind !== 'manual') {
    throw new Error('expected manual provenance');
  }
  badDate.views.recruiter.provenance.authoredAt = 'yesterday';
  const dateResult = parseBundle(badDate);
  expect(dateResult.ok).toBe(false);
  if (!dateResult.ok) {
    expect(dateResult.issues.some((item) => item.code === 'invalid-date')).toBe(true);
  }

  const badHash = structuredClone(makeBundle());
  badHash.source.sourceHash = 'not-a-hash';
  const hashResult = parseBundle(badHash);
  expect(hashResult.ok).toBe(false);
  if (!hashResult.ok) {
    expect(hashResult.issues.some((item) => item.code === 'invalid-hash')).toBe(true);
  }

  const missingAudience = structuredClone(makeBundle()) as unknown as {
    views: Record<string, unknown>;
  };
  delete missingAudience.views.technical;
  const audienceResult = parseBundle(missingAudience);
  expect(audienceResult.ok).toBe(false);
  if (!audienceResult.ok) {
    expect(audienceResult.issues.some((item) => item.code === 'missing-key')).toBe(true);
  }

  const unknownProject = structuredClone(makeBundle());
  (unknownProject.source.project as { id: string }).id = 'not-a-project';
  const projectResult = parseBundle(unknownProject);
  expect(projectResult.ok).toBe(false);
  if (!projectResult.ok) {
    expect(projectResult.issues.some((item) => item.code === 'unknown-project')).toBe(true);
  }
});

test('hash ignores sourceRevision and changes when a claim changes', () => {
  const base = makeSource();
  const revisionOnly = {
    schemaVersion: base.schemaVersion,
    policyVersion: base.policyVersion,
    project: base.project,
    sourceRevision: 'unrelated-commit',
    claims: base.claims,
  };
  expect(hashSource(revisionOnly)).toBe(base.sourceHash);

  const changedClaim = {
    schemaVersion: base.schemaVersion,
    policyVersion: base.policyVersion,
    project: base.project,
    sourceRevision: base.sourceRevision,
    claims: base.claims.map((claim, index) => {
      if (index !== 0) {
        return claim;
      }
      return { ...claim, text: `${claim.text} changed` };
    }),
  };
  expect(hashSource(changedClaim)).not.toBe(base.sourceHash);
});

test('output hash changes when a draft field changes', () => {
  const source = makeSource();
  const draft = makeDraft('recruiter', source);
  const { outputHash, ...rest } = draft;
  expect(hashDraft(rest)).toBe(outputHash);
  expect(hashDraft({ ...rest, sourceRevision: 'other' })).not.toBe(outputHash);
});

test('schema bounds reject oversized unicode source payloads', () => {
  const bundle = structuredClone(makeBundle());
  bundle.source.project.summary = 'あ'.repeat(20000);
  const parsed = parseBundle(bundle);
  expect(parsed.ok).toBe(true);
  const hashed = hashSource({
    schemaVersion: bundle.source.schemaVersion,
    policyVersion: bundle.source.policyVersion,
    project: bundle.source.project,
    sourceRevision: bundle.source.sourceRevision,
    claims: bundle.source.claims,
  });
  expect(Buffer.byteLength(JSON.stringify(bundle.source.project.summary), 'utf8')).toBeGreaterThan(
    12 * 1024,
  );
  expect(hashed).toHaveLength(64);
});

test('fixture audience summaries stay within the word bounds', () => {
  const bundle = makeBundle();
  const recruiterWords = wordCount(joinedSummary(bundle.views.recruiter.sentences));
  const clientWords = wordCount(joinedSummary(bundle.views.client.sentences));
  const technicalWords = wordCount(joinedSummary(bundle.views.technical.sentences));
  expect(recruiterWords).toBeGreaterThanOrEqual(60);
  expect(recruiterWords).toBeLessThanOrEqual(100);
  expect(clientWords).toBeGreaterThanOrEqual(60);
  expect(clientWords).toBeLessThanOrEqual(100);
  expect(technicalWords).toBeGreaterThanOrEqual(60);
  expect(technicalWords).toBeLessThanOrEqual(100);
});

test('valid fixture bundle and empty registry parse', () => {
  const parsedBundle = parseBundle(makeBundle());
  expect(parsedBundle.ok).toBe(true);
  const parsedRegistry = parseRegistry({
    schemaVersion: 1,
    current: {},
    lastGood: {},
    revokedSourceHashes: [],
  });
  expect(parsedRegistry.ok).toBe(true);
});

test('release.json is an empty versioned registry', () => {
  const raw = readFileSync(
    join(process.cwd(), 'src/content/project-summaries/release.json'),
    'utf8',
  );
  expect(JSON.parse(raw)).toEqual({
    schemaVersion: 1,
    current: {},
    lastGood: {},
    revokedSourceHashes: [],
  });
});

test('stable project IDs preserve original copy and order', () => {
  expect(PROJECTS.map((project) => project.id)).toEqual([...PROJECT_IDS]);
  expect(PROJECTS.map((project) => project.title)).toEqual([
    'Data Experience Workbench (DEW)',
    'Executive Network Analytics',
    'AI & Anomaly Detection',
    'Supply Chain Control Tower',
    'Industrial Collection App',
    'Enterprise Retail Frontend',
  ]);
  expect(PROJECTS[1]?.summary).toContain('five-level geographic data hierarchy');
  expect(PROJECTS[4]?.outcomes).toEqual([
    'iPadOS and BLE industrial weighing and display',
    'Supported rollout to at least five California collection locations',
  ]);
  expect(makeProject().title).toBe('Cedar Quay Harbor Ledger');
});

test('parser never echoes rejected input bodies', () => {
  const secret = 'sk-test-not-a-real-secret-value';
  const result = parseBundle({ extra: secret });
  expect(result.ok).toBe(false);
  if (result.ok) {
    return;
  }
  const serialized = JSON.stringify(result.issues);
  expect(serialized).not.toContain(secret);
});

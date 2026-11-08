import { expect, test } from '@playwright/test';
import { selectSummary } from '../../src/features/project-summaries/select.server';
import { fixtureVerifier, makeCandidate, makeRegistry, rehashDraft } from './fixtures';
import type { Candidate } from '../../src/features/project-summaries/types';

test('untrusted approval never publishes', () => {
  const candidate = makeCandidate();
  const registry = makeRegistry();
  registry.current[candidate.bundle.source.project.id] = candidate;
  const selected = selectSummary({
    project: candidate.bundle.source.project,
    currentSourceHash: candidate.bundle.source.sourceHash,
    registry,
    verifyApproval: () => false,
  });
  expect(selected.kind).toBe('original');
});

test('fixture verifier publishes a matching current candidate atomically', () => {
  const candidate = makeCandidate();
  const registry = makeRegistry();
  registry.current[candidate.bundle.source.project.id] = candidate;
  const selected = selectSummary({
    project: candidate.bundle.source.project,
    currentSourceHash: candidate.bundle.source.sourceHash,
    registry,
    verifyApproval: fixtureVerifier,
  });
  expect(selected.kind).toBe('approved');
  if (selected.kind !== 'approved') {
    return;
  }
  expect(selected.views.recruiter.assisted).toBe(false);
  expect(selected.reviewedBy).toBe('fixture-reviewer');
  expect(selected.views.recruiter.text.length).toBeGreaterThan(0);
  expect(selected.views.client.text.length).toBeGreaterThan(0);
  expect(selected.views.technical.text.length).toBeGreaterThan(0);
});

test('invalid current falls back to lastGood with the same source', () => {
  const good = makeCandidate();
  const bad: Candidate = structuredClone(good);
  bad.bundle.views.recruiter.outputHash = 'b'.repeat(64);
  const registry = makeRegistry();
  registry.current[good.bundle.source.project.id] = bad;
  registry.lastGood[good.bundle.source.project.id] = good;
  const selected = selectSummary({
    project: good.bundle.source.project,
    currentSourceHash: good.bundle.source.sourceHash,
    registry,
    verifyApproval: fixtureVerifier,
  });
  expect(selected.kind).toBe('approved');
  if (selected.kind === 'approved') {
    expect(selected.sourceHash).toBe(good.bundle.source.sourceHash);
  }
});

test('absent current uses lastGood; missing lastGood is original-only', () => {
  const candidate = makeCandidate();
  const withLastGood = makeRegistry();
  withLastGood.lastGood[candidate.bundle.source.project.id] = candidate;
  const fromLastGood = selectSummary({
    project: candidate.bundle.source.project,
    currentSourceHash: candidate.bundle.source.sourceHash,
    registry: withLastGood,
    verifyApproval: fixtureVerifier,
  });
  expect(fromLastGood.kind).toBe('approved');

  const empty = selectSummary({
    project: candidate.bundle.source.project,
    currentSourceHash: candidate.bundle.source.sourceHash,
    registry: makeRegistry(),
    verifyApproval: fixtureVerifier,
  });
  expect(empty.kind).toBe('original');
});

test('changed or revoked source cannot reuse lastGood', () => {
  const candidate = makeCandidate();
  const registry = makeRegistry();
  registry.lastGood[candidate.bundle.source.project.id] = candidate;
  const changed = selectSummary({
    project: candidate.bundle.source.project,
    currentSourceHash: 'c'.repeat(64),
    registry,
    verifyApproval: fixtureVerifier,
  });
  expect(changed.kind).toBe('original');
  if (changed.kind === 'original') {
    expect(changed.reason).toBe('source-mismatch');
  }

  const revoked = makeRegistry();
  revoked.lastGood[candidate.bundle.source.project.id] = candidate;
  revoked.revokedSourceHashes = [candidate.bundle.source.sourceHash];
  const revokedSelected = selectSummary({
    project: candidate.bundle.source.project,
    currentSourceHash: candidate.bundle.source.sourceHash,
    registry: revoked,
    verifyApproval: fixtureVerifier,
  });
  expect(revokedSelected.kind).toBe('original');
  if (revokedSelected.kind === 'original') {
    expect(revokedSelected.reason).toBe('revoked-source');
  }
});

test('edited bytes, corrupt audience, and mismatched receipt hashes stay original', () => {
  const base = makeCandidate();
  const edited = structuredClone(base);
  edited.bundle.views.recruiter = rehashDraft({
    ...edited.bundle.views.recruiter,
    sentences: [
      { text: 'Harbor lanterns remain imaginary throughout.', claimIds: ['imaginary-props'] },
      ...edited.bundle.views.recruiter.sentences.slice(1),
    ],
  });
  const editedRegistry = makeRegistry();
  editedRegistry.current[base.bundle.source.project.id] = edited;
  expect(selectSummary({
    project: base.bundle.source.project,
    currentSourceHash: base.bundle.source.sourceHash,
    registry: editedRegistry,
    verifyApproval: fixtureVerifier,
  }).kind).toBe('original');

  const corrupt = structuredClone(base);
  corrupt.bundle.views.technical.sentences = [];
  const corruptRegistry = makeRegistry();
  corruptRegistry.current[base.bundle.source.project.id] = corrupt;
  expect(selectSummary({
    project: base.bundle.source.project,
    currentSourceHash: base.bundle.source.sourceHash,
    registry: corruptRegistry,
    verifyApproval: fixtureVerifier,
  }).kind).toBe('original');

  const mismatched = structuredClone(base);
  mismatched.receipt.outputHashes.recruiter = 'd'.repeat(64);
  const mismatchRegistry = makeRegistry();
  mismatchRegistry.current[base.bundle.source.project.id] = mismatched;
  expect(selectSummary({
    project: base.bundle.source.project,
    currentSourceHash: base.bundle.source.sourceHash,
    registry: mismatchRegistry,
    verifyApproval: fixtureVerifier,
  }).kind).toBe('original');
});

test('self-declared owner receipt cannot bypass the deny verifier', () => {
  const candidate = makeCandidate();
  candidate.receipt.trust = 'owner';
  candidate.receipt.reviewer = 'Abhishek';
  const registry = makeRegistry();
  registry.current[candidate.bundle.source.project.id] = candidate;
  const selected = selectSummary({
    project: candidate.bundle.source.project,
    currentSourceHash: candidate.bundle.source.sourceHash,
    registry,
    verifyApproval: () => false,
  });
  expect(selected.kind).toBe('original');
});

test('live project inequality blocks a matching hash', () => {
  const candidate = makeCandidate();
  const registry = makeRegistry();
  registry.current[candidate.bundle.source.project.id] = candidate;
  const selected = selectSummary({
    project: { ...candidate.bundle.source.project, summary: 'Changed original text.' },
    currentSourceHash: candidate.bundle.source.sourceHash,
    registry,
    verifyApproval: fixtureVerifier,
  });
  expect(selected.kind).toBe('original');
});

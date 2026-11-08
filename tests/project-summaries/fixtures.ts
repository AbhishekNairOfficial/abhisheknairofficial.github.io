import { hashDraft, hashSource } from '../../src/features/project-summaries/hashes.server';
import {
  AUDIENCES,
  POLICY_VERSION,
  SCHEMA_VERSION,
  VALIDATION_VERSION,
  type Audience,
  type Bundle,
  type Candidate,
  type Claim,
  type Draft,
  type ProjectInput,
  type ReleaseRegistry,
  type ReviewReceipt,
  type Sentence,
  type SourceSnapshot,
} from '../../src/features/project-summaries/types';

export const FIXTURE_TIME = '2026-01-01T00:00:00Z';
export const FIXTURE_REVIEWER = 'fixture-reviewer';
export const FIXTURE_REVISION = 'fixture-rev-1';

const LEDGER_PURPOSE =
  'Cedar Quay Harbor Ledger is a fictional operations notebook used only in automated tests and visual demos.';
const CLERK_RECORDS =
  'Clerks at the invented Port of Cedar Quay recorded berth assignments, tide windows, and crate counts for visiting barges.';
const PLACEHOLDER_RULE =
  'Reviewers must treat every sentence as placeholder text with no connection to any real company, employer, client, product, or person.';
const WORD_PURPOSE =
  'This paragraph exists so validators can count words and check grounding against approved synthetic claims.';
const IMAGINARY_PROPS =
  'Harbor lanterns, rope inventories, and weather flags remain imaginary throughout.';

export function makeProject(): ProjectInput {
  return {
    id: 'dew',
    title: 'Cedar Quay Harbor Ledger',
    client: 'Port of Cedar Quay',
    role: 'Fictional Harbor Clerk',
    summary: LEDGER_PURPOSE,
    outcomes: ['Placeholder berth log', 'Imaginary tide windows'],
  };
}

export function makeClaims(): Claim[] {
  return [
    claim('ledger-purpose', LEDGER_PURPOSE, ['Cedar Quay Harbor Ledger'], [], ['fictional']),
    claim('clerk-records', CLERK_RECORDS, ['Port of Cedar Quay'], [], ['invented']),
    claim('placeholder-rule', PLACEHOLDER_RULE, [], [], []),
    claim('word-count-purpose', WORD_PURPOSE, [], [], []),
    claim('imaginary-props', IMAGINARY_PROPS, [], [], ['imaginary']),
  ];
}

function claim(
  id: string,
  text: string,
  entities: string[],
  numbers: string[],
  qualifiers: string[],
): Claim {
  return {
    id,
    text,
    publicLocator: 'https://example.test/cedar-quay/harbor-ledger',
    entities,
    numbers,
    qualifiers,
  };
}

export function makeSource(project: ProjectInput = makeProject()): SourceSnapshot {
  const source = {
    schemaVersion: SCHEMA_VERSION,
    policyVersion: POLICY_VERSION,
    project,
    sourceRevision: FIXTURE_REVISION,
    claims: makeClaims(),
  };
  return { ...source, sourceHash: hashSource(source) };
}

function sentencesFor(audience: Audience): Sentence[] {
  const roleLine = roleSentence(audience);
  return [
    { text: LEDGER_PURPOSE, claimIds: ['ledger-purpose'] },
    { text: roleLine, claimIds: ['clerk-records'] },
    { text: PLACEHOLDER_RULE, claimIds: ['placeholder-rule'] },
    { text: WORD_PURPOSE, claimIds: ['word-count-purpose'] },
    { text: IMAGINARY_PROPS, claimIds: ['imaginary-props'] },
  ];
}

function roleSentence(audience: Audience): string {
  if (audience === 'recruiter') {
    return 'The assigned role was Fictional Harbor Clerk, with scope limited to clerks at the invented Port of Cedar Quay who recorded berth assignments, tide windows, and crate counts for visiting barges.';
  }
  if (audience === 'client') {
    return 'The stated problem was keeping a harbor notebook current, and the stated outcomes were that clerks at the invented Port of Cedar Quay recorded berth assignments, tide windows, and crate counts for visiting barges.';
  }
  return 'The recorded implementation is a paper harbor notebook in which clerks at the invented Port of Cedar Quay recorded berth assignments, tide windows, and crate counts for visiting barges.';
}

export function joinedSummary(sentences: Sentence[]): string {
  return sentences.map((sentence) => sentence.text).join(' ');
}

export function wordCount(text: string): number {
  return text.split(/\s+/u).filter((part) => part.length > 0).length;
}

export function makeDraft(
  audience: Audience,
  source: SourceSnapshot = makeSource(),
): Draft {
  const draft = {
    schemaVersion: SCHEMA_VERSION,
    projectId: source.project.id,
    sourceHash: source.sourceHash,
    sourceRevision: source.sourceRevision,
    audience,
    sentences: sentencesFor(audience),
    provenance: {
      kind: 'manual' as const,
      author: FIXTURE_REVIEWER,
      authoredAt: FIXTURE_TIME,
    },
    validationVersion: VALIDATION_VERSION,
  };
  return { ...draft, outputHash: hashDraft(draft) };
}

export function makeBundle(project: ProjectInput = makeProject()): Bundle {
  const source = makeSource(project);
  return {
    source,
    views: {
      recruiter: makeDraft('recruiter', source),
      client: makeDraft('client', source),
      technical: makeDraft('technical', source),
    },
  };
}

export function makeReceipt(bundle: Bundle = makeBundle()): ReviewReceipt {
  return {
    schemaVersion: SCHEMA_VERSION,
    trust: 'fixture',
    reviewer: FIXTURE_REVIEWER,
    sourceHash: bundle.source.sourceHash,
    outputHashes: {
      recruiter: bundle.views.recruiter.outputHash,
      client: bundle.views.client.outputHash,
      technical: bundle.views.technical.outputHash,
    },
    approvedAt: FIXTURE_TIME,
    reviewedRevision: FIXTURE_REVISION,
    releaseRevision: FIXTURE_REVISION,
  };
}

export function makeCandidate(project: ProjectInput = makeProject()): Candidate {
  const bundle = makeBundle(project);
  return { bundle, receipt: makeReceipt(bundle) };
}

export function makeRegistry(): ReleaseRegistry {
  return {
    schemaVersion: SCHEMA_VERSION,
    current: {},
    lastGood: {},
    revokedSourceHashes: [],
  };
}

export function fixtureVerifier(candidate: Candidate): boolean {
  if (candidate.receipt.trust !== 'fixture') {
    return false;
  }
  if (candidate.receipt.sourceHash !== candidate.bundle.source.sourceHash) {
    return false;
  }
  return AUDIENCES.every((audience) => {
    return candidate.receipt.outputHashes[audience] === candidate.bundle.views[audience].outputHash;
  });
}

export function stripOutputHash(draft: Draft): Omit<Draft, 'outputHash'> {
  return {
    schemaVersion: draft.schemaVersion,
    projectId: draft.projectId,
    sourceHash: draft.sourceHash,
    sourceRevision: draft.sourceRevision,
    audience: draft.audience,
    sentences: draft.sentences,
    provenance: draft.provenance,
    validationVersion: draft.validationVersion,
    ...(draft.editedFrom ? { editedFrom: draft.editedFrom } : {}),
  };
}

export function rehashDraft(draft: Draft): Draft {
  const rest = stripOutputHash(draft);
  return { ...rest, outputHash: hashDraft(rest) };
}

export function secondFixtureProject(): ProjectInput {
  return {
    id: 'executive-network-analytics',
    title: 'Maple Pier Inventory',
    client: 'Harbor of Maple Pier',
    role: 'Fictional Pier Clerk',
    summary: 'Maple Pier Inventory is a fictional crate tally used only in automated tests and visual demos.',
    outcomes: ['Placeholder crate tally'],
  };
}

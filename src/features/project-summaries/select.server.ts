import { canonicalize } from './canonical';
import { AUDIENCES, type ApprovalVerifier, type Bundle, type Candidate, type Hash, type ProjectInput, type ReleaseRegistry, type ResolvedSummary, type ReviewReceipt } from './types';
import { validateBundle } from './validate.server';

export function selectSummary(args: {
  project: ProjectInput;
  currentSourceHash: Hash;
  registry: ReleaseRegistry;
  verifyApproval: ApprovalVerifier;
}): ResolvedSummary {
  const current = trySlot(args.registry.current[args.project.id], args);
  if (current) {
    return current;
  }
  const lastGood = trySlot(args.registry.lastGood[args.project.id], args);
  if (lastGood) {
    return lastGood;
  }
  return { kind: 'original', reason: fallbackReason(args) };
}

function trySlot(
  candidate: Candidate | undefined,
  args: {
    project: ProjectInput;
    currentSourceHash: Hash;
    registry: ReleaseRegistry;
    verifyApproval: ApprovalVerifier;
  },
): ResolvedSummary | null {
  if (!candidate) {
    return null;
  }
  const validated = validateBundle(candidate.bundle);
  if (!validated.ok) {
    return null;
  }
  if (!receiptMatches(candidate.receipt, validated.value)) {
    return null;
  }
  if (canonicalize(validated.value.source.project) !== canonicalize(args.project)) {
    return null;
  }
  if (validated.value.source.sourceHash !== args.currentSourceHash) {
    return null;
  }
  if (args.registry.revokedSourceHashes.includes(validated.value.source.sourceHash)) {
    return null;
  }
  if (!args.verifyApproval(candidate)) {
    return null;
  }
  return toApproved(validated.value, candidate.receipt);
}

function receiptMatches(receipt: ReviewReceipt, bundle: Bundle): boolean {
  if (receipt.sourceHash !== bundle.source.sourceHash) {
    return false;
  }
  return AUDIENCES.every((audience) => {
    return receipt.outputHashes[audience] === bundle.views[audience].outputHash;
  });
}

function toApproved(bundle: Bundle, receipt: ReviewReceipt): ResolvedSummary {
  return {
    kind: 'approved',
    sourceHash: bundle.source.sourceHash,
    views: {
      recruiter: viewText(bundle, 'recruiter'),
      client: viewText(bundle, 'client'),
      technical: viewText(bundle, 'technical'),
    },
    reviewedBy: receipt.reviewer,
    approvedAt: receipt.approvedAt,
  };
}

function viewText(
  bundle: Bundle,
  audience: keyof Bundle['views'],
): { text: string; assisted: boolean } {
  const draft = bundle.views[audience];
  return {
    text: draft.sentences.map((sentence) => sentence.text).join(' '),
    assisted: draft.provenance.kind === 'spark',
  };
}

function fallbackReason(args: {
  project: ProjectInput;
  currentSourceHash: Hash;
  registry: ReleaseRegistry;
}): string {
  const current = args.registry.current[args.project.id];
  const lastGood = args.registry.lastGood[args.project.id];
  if (current || lastGood) {
    const hash = current?.bundle.source.sourceHash ?? lastGood?.bundle.source.sourceHash;
    if (hash && args.registry.revokedSourceHashes.includes(hash)) {
      return 'revoked-source';
    }
    if (hash && hash !== args.currentSourceHash) {
      return 'source-mismatch';
    }
    return 'untrusted-approval';
  }
  return 'no-approved-release';
}

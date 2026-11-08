import { createHash } from 'node:crypto';
import { canonicalize } from './canonical';
import type { Draft, Hash, SourceSnapshot } from './types';

const SHA_256 = 'sha256';
const HEX = 'hex';

export function sha256(canonical: string): Hash {
  return createHash(SHA_256).update(canonical, 'utf8').digest(HEX);
}

export function hashSource(source: Omit<SourceSnapshot, 'sourceHash'>): Hash {
  return sha256(
    canonicalize({
      schemaVersion: source.schemaVersion,
      policyVersion: source.policyVersion,
      project: source.project,
      claims: source.claims,
    }),
  );
}

export function hashDraft(draft: Omit<Draft, 'outputHash'>): Hash {
  return sha256(canonicalize(draft));
}

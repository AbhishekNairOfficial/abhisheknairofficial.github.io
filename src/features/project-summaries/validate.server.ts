import { canonicalize } from './canonical';
import { hashDraft, hashSource } from './hashes.server';
import { DRAFT_MAX_BYTES, SOURCE_MAX_BYTES } from './limits';
import { checkPolicy } from './policy';
import { parseBundle } from './schema';
import { AUDIENCES, fail, issue, ok, type Bundle, type Issue, type Result } from './types';

export function validateBundle(input: unknown): Result<Bundle> {
  const parsed = parseBundle(input);
  if (!parsed.ok) {
    return parsed;
  }
  const issues = [
    ...hashIssues(parsed.value),
    ...sizeIssues(parsed.value),
    ...checkPolicy(parsed.value),
  ];
  if (issues.length > 0) {
    return fail(issues);
  }
  return ok(parsed.value);
}

function hashIssues(bundle: Bundle): Issue[] {
  const expectedSource = hashSource({
    schemaVersion: bundle.source.schemaVersion,
    policyVersion: bundle.source.policyVersion,
    project: bundle.source.project,
    sourceRevision: bundle.source.sourceRevision,
    claims: bundle.source.claims,
  });
  const issues: Issue[] = [];
  if (expectedSource !== bundle.source.sourceHash) {
    issues.push(issue('source-hash-mismatch', '$.source.sourceHash'));
  }
  AUDIENCES.forEach((audience) => {
    const draft = bundle.views[audience];
    const expected = hashDraft({
      schemaVersion: draft.schemaVersion,
      projectId: draft.projectId,
      sourceHash: draft.sourceHash,
      sourceRevision: draft.sourceRevision,
      audience: draft.audience,
      sentences: draft.sentences,
      provenance: draft.provenance,
      validationVersion: draft.validationVersion,
      ...(draft.editedFrom ? { editedFrom: draft.editedFrom } : {}),
    });
    if (expected !== draft.outputHash) {
      issues.push(issue('output-hash-mismatch', `$.views.${audience}.outputHash`));
    }
  });
  return issues;
}

function sizeIssues(bundle: Bundle): Issue[] {
  const sourceBytes = Buffer.byteLength(
    canonicalize({
      schemaVersion: bundle.source.schemaVersion,
      policyVersion: bundle.source.policyVersion,
      project: bundle.source.project,
      claims: bundle.source.claims,
    }),
    'utf8',
  );
  const issues: Issue[] = [];
  if (sourceBytes > SOURCE_MAX_BYTES) {
    issues.push(issue('source-too-large', '$.source'));
  }
  AUDIENCES.forEach((audience) => {
    const draft = bundle.views[audience];
    const bytes = Buffer.byteLength(
      canonicalize({
        schemaVersion: draft.schemaVersion,
        projectId: draft.projectId,
        sourceHash: draft.sourceHash,
        sourceRevision: draft.sourceRevision,
        audience: draft.audience,
        sentences: draft.sentences,
        provenance: draft.provenance,
        validationVersion: draft.validationVersion,
        ...(draft.editedFrom ? { editedFrom: draft.editedFrom } : {}),
      }),
      'utf8',
    );
    if (bytes > DRAFT_MAX_BYTES) {
      issues.push(issue('draft-too-large', `$.views.${audience}`));
    }
  });
  return issues;
}

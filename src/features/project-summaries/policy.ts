import { MAX_SUMMARY_WORDS, MIN_SUMMARY_WORDS } from './limits';
import {
  checkAvailability,
  checkConfidential,
  checkInjection,
  checkPii,
  checkPlainText,
  checkSecret,
  checkSkillLeakage,
  extractEntityNames,
  extractNumberUnits,
  fold,
  numberUnitKey,
  wordCount,
  type NumberUnit,
} from './policy-text';
import { AUDIENCES, issue, type Bundle, type Claim, type Issue, type Sentence } from './types';

const VERB_DRIFT = [
  { from: /\bsupported\b/iu, to: /\b(?:led|owned|delivered)\b/iu },
  { from: /\bintended\b/iu, to: /\b(?:launched|shipped|released)\b/iu },
];

const QUALIFIER_TERMS = ['at least', 'more than', 'approximately', 'at most'];

export function checkPolicy(bundle: Bundle): Issue[] {
  const sourceIssues = checkSource(bundle);
  const viewIssues = AUDIENCES.flatMap((audience) => {
    return checkView(bundle, audience);
  });
  return [...sourceIssues, ...viewIssues];
}

function checkSource(bundle: Bundle): Issue[] {
  const texts = [
    bundle.source.project.title,
    bundle.source.project.role,
    bundle.source.project.summary,
    ...(bundle.source.project.client ? [bundle.source.project.client] : []),
    ...bundle.source.project.outcomes,
    ...bundle.source.claims.map((claim) => claim.text),
  ];
  return texts.flatMap((text, index) => sourceTextIssues(text, `$.source.text.${index}`));
}

function sourceTextIssues(text: string, path: string): Issue[] {
  return [
    ...checkAvailability(text, path),
    ...checkPii(text, path),
    ...checkSecret(text, path),
    ...checkPlainText(text, path),
    ...checkInjection(text, path),
    ...checkConfidential(text, path),
  ];
}

function checkView(bundle: Bundle, audience: keyof Bundle['views']): Issue[] {
  const draft = bundle.views[audience];
  const path = `$.views.${audience}`;
  const joined = draft.sentences.map((sentence) => sentence.text).join(' ');
  const count = wordCount(joined);
  const issues: Issue[] = [];
  if (count < MIN_SUMMARY_WORDS || count > MAX_SUMMARY_WORDS) {
    issues.push(issue('word-count', `${path}.sentences`));
  }
  draft.sentences.forEach((sentence, index) => {
    issues.push(...sentenceIssues(bundle, sentence, `${path}.sentences.${index}`));
  });
  return issues;
}

function sentenceIssues(bundle: Bundle, sentence: Sentence, path: string): Issue[] {
  const cited = citedClaims(bundle.source.claims, sentence.claimIds, path);
  const unknown = cited.missing;
  const allowed = allowedGrounding(bundle, cited.found);
  return [
    ...unknown,
    ...sourceTextIssues(sentence.text, path),
    ...checkSkillLeakage(sentence.text, path, allowed.blob),
    ...numberIssues(sentence.text, allowed, path),
    ...entityIssues(sentence.text, { all: bundle.source.claims, cited: cited.found }, allowed.blob, path),
    ...qualifierIssues(sentence.text, cited.found, path),
    ...verbIssues(sentence.text, cited.found, path),
  ];
}

function citedClaims(
  claims: Claim[],
  claimIds: string[],
  path: string,
): { found: Claim[]; missing: Issue[] } {
  const byId = new Map(claims.map((claim) => [claim.id, claim]));
  const found: Claim[] = [];
  const missing: Issue[] = [];
  claimIds.forEach((claimId) => {
    const match = byId.get(claimId);
    if (!match) {
      missing.push(issue('unknown-claim', `${path}.claimIds`, claimId));
      return;
    }
    found.push(match);
  });
  return { found, missing };
}

function allowedGrounding(bundle: Bundle, cited: Claim[]): {
  blob: string;
  numbers: Set<string>;
  units: Set<string>;
} {
  const parts = [
    bundle.source.project.title,
    bundle.source.project.role,
    bundle.source.project.summary,
    bundle.source.project.client ?? '',
    ...cited.map((claim) => claim.text),
    ...cited.flatMap((claim) => claim.entities),
  ];
  const numbers = new Set<string>();
  const units = new Set<string>();
  cited.forEach((claim) => {
    claim.numbers.forEach((value) => numbers.add(value));
    extractNumberUnits(claim.text).forEach((pair) => addCitedNumber(pair, numbers, units));
  });
  return { blob: parts.join(' '), numbers, units };
}

function numberIssues(
  text: string,
  allowed: { numbers: Set<string>; units: Set<string> },
  path: string,
): Issue[] {
  const unexpected = extractNumberUnits(text).some((pair) => !pairAllowed(pair, allowed));
  return unexpected ? [issue('unsupported-number', path)] : [];
}

function addCitedNumber(
  pair: NumberUnit,
  numbers: Set<string>,
  units: Set<string>,
): void {
  if (pair.unknownSuffix) {
    return;
  }
  if (pair.unit.length > 0) {
    units.add(numberUnitKey(pair));
    return;
  }
  numbers.add(pair.number);
}

function pairAllowed(
  pair: NumberUnit,
  allowed: { numbers: Set<string>; units: Set<string> },
): boolean {
  if (pair.unknownSuffix) {
    return false;
  }
  if (pair.unit.length > 0) {
    return allowed.units.has(numberUnitKey(pair));
  }
  return allowed.numbers.has(pair.number);
}

function entityIssues(
  text: string,
  claims: { all: Claim[]; cited: Claim[] },
  blob: string,
  path: string,
): Issue[] {
  const citedEntities = new Set(claims.cited.flatMap((claim) => claim.entities.map(fold)));
  const uncited = claims.all
    .filter((claim) => !claims.cited.includes(claim))
    .flatMap((claim) => claim.entities);
  const leaked = uncited.some((entity) => {
    const folded = fold(entity);
    return folded.length > 0 && fold(text).includes(folded) && !citedEntities.has(folded);
  });
  const allowed = fold(blob);
  const novel = extractEntityNames(text).some((name) => !allowed.includes(fold(name)));
  return leaked || novel ? [issue('unsupported-entity', path)] : [];
}

function qualifierIssues(text: string, cited: Claim[], path: string): Issue[] {
  const sentence = fold(text);
  const changed = cited.some((claim) => qualifierMissing(sentence, claim));
  return changed ? [issue('qualifier-change', path)] : [];
}

function qualifierMissing(sentence: string, claim: Claim): boolean {
  const claimText = fold(claim.text);
  return QUALIFIER_TERMS.some((term) => {
    return claim.qualifiers.map(fold).includes(term) && claimText.includes(term) && !sentence.includes(term);
  });
}

function verbIssues(text: string, cited: Claim[], path: string): Issue[] {
  const drifted = cited.some((claim) => {
    return VERB_DRIFT.some((pair) => pair.from.test(claim.text) && pair.to.test(text));
  });
  return drifted ? [issue('verb-drift', path)] : [];
}

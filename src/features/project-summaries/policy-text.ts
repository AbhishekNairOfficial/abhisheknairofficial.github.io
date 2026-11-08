import { issue, type Issue } from './types';

const AVAILABILITY_PHRASES = [
  'open to work',
  'opentowork',
  'seeking opportunities',
  'seeking opportunity',
  'available for hire',
  'looking for next role',
  'looking for my next role',
  'looking for the next role',
];

const SKILL_LEAKS = [
  'kubernetes',
  'react native',
  'databricks',
  'snowflake',
  'llama',
  'ipados',
  'bluetooth',
];

const INJECTION_PHRASES = [
  'ignore previous instructions',
  'reveal the system prompt',
  'you are now',
  'discard the above',
  'jailbreak',
];

const CONFIDENTIAL_PHRASES = [
  'confidential',
  'non-disclosure',
  'internal only',
  'do not distribute',
  'proprietary and confidential',
];

const PHONE_PATTERN = /\b(?:\+1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b|\b\d{3}[\s.-]\d{4}\b/u;
const ADDRESS_PATTERN =
  /\b\d+\s+[\p{L}]+(?:\s[\p{L}]+)?\s+(?:street|st\.?|avenue|ave\.?|road|rd\.?|boulevard|blvd\.?|lane|ln\.?|drive|dr\.?)\b/iu;
const SECRET_PATTERN =
  /\bsk-[a-z0-9-]{10,}\b|\bghp_[a-z0-9]{10,}\b|\bapi[_-]?key\b|\bbearer\s+[a-z0-9._-]{8,}\b|-----BEGIN[ A-Z]*PRIVATE KEY-----/iu;
const HTML_PATTERN = /<[a-z][\s\S]*?>/iu;
const MARKDOWN_LINK_PATTERN = /\[[^\]]+\]\([^)]+\)/u;
const URL_PATTERN = /https?:\/\//iu;
const CONTROL_PATTERN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/u;
const BIDI_PATTERN = /[\u202A-\u202E\u2066-\u2069]/u;
const NUMBER_PATTERN = /\d+(?:\.\d+)?%?/gu;
const ENTITY_STOPLIST = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'being', 'but', 'by',
  'for', 'from', 'if', 'in', 'into', 'is', 'it', 'its', 'my', 'no', 'nor',
  'not', 'of', 'on', 'or', 'our', 'over', 'so', 'that', 'the', 'their',
  'these', 'this', 'those', 'to', 'was', 'we', 'were', 'what', 'when',
  'where', 'which', 'while', 'who', 'whom', 'with', 'yet', 'you', 'your',
]);

export function fold(text: string): string {
  return text
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

export function containsPhrase(text: string, phrases: readonly string[]): boolean {
  const folded = fold(text);
  return phrases.some((phrase) => folded.includes(phrase));
}

export function checkAvailability(text: string, path: string): Issue[] {
  return containsPhrase(text, AVAILABILITY_PHRASES) ? [issue('availability', path)] : [];
}

export function checkPii(text: string, path: string): Issue[] {
  const issues: Issue[] = [];
  if (PHONE_PATTERN.test(text)) {
    issues.push(issue('pii-phone', path));
  }
  if (ADDRESS_PATTERN.test(text)) {
    issues.push(issue('pii-address', path));
  }
  return issues;
}

export function checkSecret(text: string, path: string): Issue[] {
  return SECRET_PATTERN.test(text) ? [issue('secret', path)] : [];
}

export function checkPlainText(text: string, path: string): Issue[] {
  if (HTML_PATTERN.test(text) || MARKDOWN_LINK_PATTERN.test(text) || URL_PATTERN.test(text)) {
    return [issue('plain-text', path)];
  }
  if (CONTROL_PATTERN.test(text) || BIDI_PATTERN.test(text)) {
    return [issue('plain-text', path)];
  }
  return [];
}

export function checkInjection(text: string, path: string): Issue[] {
  return containsPhrase(text, INJECTION_PHRASES) ? [issue('injection', path)] : [];
}

export function checkConfidential(text: string, path: string): Issue[] {
  return containsPhrase(text, CONFIDENTIAL_PHRASES) ? [issue('confidential', path)] : [];
}

export function checkSkillLeakage(text: string, path: string, allowed: string): Issue[] {
  const folded = fold(text);
  const allowedFolded = fold(allowed);
  const leaked = SKILL_LEAKS.some((skill) => {
    return folded.includes(skill) && !allowedFolded.includes(skill);
  });
  return leaked ? [issue('skill-leakage', path)] : [];
}

export function extractNumbers(text: string): string[] {
  const matches = text.match(NUMBER_PATTERN);
  return matches === null ? [] : matches;
}

export { extractNumberUnits, numberUnitKey, type NumberUnit } from './policy-units';

export function extractEntityNames(text: string): string[] {
  const tokens = text.split(/[^\p{L}\p{N}.]+/u).map(stripTerminalPunctuation).filter((part) => {
    return part.length > 0 && part !== '.';
  });
  return tokens.filter((token, index) => isCandidateEntity(token, index === 0));
}

function stripTerminalPunctuation(token: string): string {
  return token.replace(/[.,;:!?)"'”’»\]}]+$/u, '');
}

function isCandidateEntity(token: string, initial: boolean): boolean {
  if (!hasEntityShape(token) || ENTITY_STOPLIST.has(fold(token))) {
    return false;
  }
  if (initial && isOrdinaryWord(token)) {
    return false;
  }
  return true;
}

function hasEntityShape(token: string): boolean {
  if (/^\d/u.test(token)) {
    return false;
  }
  return isTitleCase(token) || isCamelCase(token) || isAllCaps(token) || /[\d.]/u.test(token);
}

function isOrdinaryWord(token: string): boolean {
  return isTitleCase(token) || /^[a-z]+$/u.test(token);
}

function isTitleCase(token: string): boolean {
  return /^[A-Z][a-z]+$/u.test(token);
}

function isCamelCase(token: string): boolean {
  return /[a-z][A-Z]/u.test(token) || /[A-Z][a-z]+[A-Z]/u.test(token);
}

function isAllCaps(token: string): boolean {
  return /^[A-Z]{2,}$/u.test(token);
}

export function wordCount(text: string): number {
  return text.split(/\s+/u).filter((part) => part.length > 0).length;
}

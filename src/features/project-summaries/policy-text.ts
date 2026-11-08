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

export interface NumberUnit {
  number: string;
  unit: string;
}

export function extractNumberUnits(text: string): NumberUnit[] {
  const matches = text.match(/\d+(?:\.\d+)?%?(?:\s+[A-Za-z]+)?/gu);
  if (matches === null) {
    return [];
  }
  return matches.map(toNumberUnit);
}

function toNumberUnit(token: string): NumberUnit {
  const parts = token.trim().split(/\s+/u);
  return {
    number: parts[0] ?? '',
    unit: fold(parts[1] ?? ''),
  };
}

export function numberUnitKey(pair: NumberUnit): string {
  return `${pair.number}:${pair.unit}`;
}

export function wordCount(text: string): number {
  return text.split(/\s+/u).filter((part) => part.length > 0).length;
}

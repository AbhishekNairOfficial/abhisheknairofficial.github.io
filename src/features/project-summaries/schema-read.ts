import { HASH_HEX_LENGTH, HTTPS_PROTOCOL } from './limits';
import { fail, issue, ok, type Issue, type Result } from './types';

const HASH_PATTERN = /^[a-f0-9]+$/u;
const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u;
const PROTOTYPE_KEYS = new Set(['__proto__', 'prototype', 'constructor']);

export function readRecord(
  value: unknown,
  path: string,
): Result<Record<string, unknown>> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return fail([issue('expected-object', path)]);
  }
  const keys = Object.keys(value);
  if (keys.some((key) => PROTOTYPE_KEYS.has(key))) {
    return fail([issue('prototype-key', path)]);
  }
  return ok(value as Record<string, unknown>);
}

export function unexpectedKeys(
  record: Record<string, unknown>,
  allowed: readonly string[],
  path: string,
): Issue[] {
  const allowedSet = new Set(allowed);
  return Object.keys(record)
    .filter((key) => !allowedSet.has(key))
    .map((key) => issue('unexpected-key', `${path}.${key}`));
}

export function missingKeys(
  record: Record<string, unknown>,
  required: readonly string[],
  path: string,
): Issue[] {
  return required
    .filter((key) => !Object.prototype.hasOwnProperty.call(record, key))
    .map((key) => issue('missing-key', `${path}.${key}`));
}

export function readString(value: unknown, path: string): Result<string> {
  if (typeof value !== 'string' || value.length === 0) {
    return fail([issue('expected-nonempty-string', path)]);
  }
  return ok(value);
}

export function readLiteral<T extends string | number>(
  value: unknown,
  expected: T,
  path: string,
): Result<T> {
  if (value !== expected) {
    return fail([issue('unexpected-literal', path)]);
  }
  return ok(expected);
}

export function readHash(value: unknown, path: string): Result<string> {
  const text = readString(value, path);
  if (!text.ok) {
    return text;
  }
  if (text.value.length !== HASH_HEX_LENGTH || !HASH_PATTERN.test(text.value)) {
    return fail([issue('invalid-hash', path)]);
  }
  return text;
}

export function readIsoDate(value: unknown, path: string): Result<string> {
  const text = readString(value, path);
  if (!text.ok) {
    return text;
  }
  if (!ISO_PATTERN.test(text.value)) {
    return fail([issue('invalid-date', path)]);
  }
  const millis = Date.parse(text.value);
  if (!Number.isFinite(millis)) {
    return fail([issue('invalid-date', path)]);
  }
  return text;
}

export function readFiniteNonNegative(
  value: unknown,
  path: string,
): Result<number> {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    return fail([issue('expected-nonnegative-number', path)]);
  }
  return ok(value);
}

export function readStringArray(value: unknown, path: string): Result<string[]> {
  if (!Array.isArray(value)) {
    return fail([issue('expected-array', path)]);
  }
  const items: string[] = [];
  const issues: Issue[] = [];
  value.forEach((entry, index) => {
    const parsed = readString(entry, `${path}.${index}`);
    if (parsed.ok) {
      items.push(parsed.value);
      return;
    }
    issues.push(...parsed.issues);
  });
  if (issues.length > 0) {
    return fail(issues);
  }
  return ok(items);
}

export function readHttpsUrl(value: unknown, path: string): Result<string> {
  const text = readString(value, path);
  if (!text.ok) {
    return text;
  }
  try {
    const parsed = new URL(text.value);
    if (parsed.protocol !== HTTPS_PROTOCOL) {
      return fail([issue('invalid-public-locator', path)]);
    }
    return text;
  } catch {
    return fail([issue('invalid-public-locator', path)]);
  }
}

export function combineIssues(groups: Issue[][]): Issue[] {
  return groups.flat();
}

export function firstFailure<T>(results: Result<T>[]): Result<T> | null {
  const failed = results.find((result) => !result.ok);
  if (failed && !failed.ok) {
    return failed;
  }
  return null;
}

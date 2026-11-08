const UNSUPPORTED_VALUE = 'unsupported-value';
const NONFINITE_NUMBER = 'nonfinite-number';

export function canonicalize(value: unknown): string {
  return JSON.stringify(normalize(value));
}

function normalize(value: unknown): unknown {
  if (typeof value === 'string') {
    return normalizeString(value);
  }
  if (typeof value === 'number') {
    return normalizeNumber(value);
  }
  if (typeof value === 'boolean' || value === null) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(normalize);
  }
  if (isPlainObject(value)) {
    return normalizeObject(value);
  }
  throw new Error(UNSUPPORTED_VALUE);
}

function normalizeString(value: string): string {
  return value.normalize('NFC').replace(/\r\n/gu, '\n').replace(/\r/gu, '\n');
}

function normalizeNumber(value: number): number {
  if (!Number.isFinite(value)) {
    throw new Error(NONFINITE_NUMBER);
  }
  return value;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(value) as unknown;
  return proto === Object.prototype || proto === null;
}

function normalizeObject(value: Record<string, unknown>): Record<string, unknown> {
  const sorted: Record<string, unknown> = {};
  const keys = Object.keys(value).sort((left, right) => {
    return left.localeCompare(right);
  });
  keys.forEach((key) => {
    sorted[key] = normalize(value[key]);
  });
  return sorted;
}

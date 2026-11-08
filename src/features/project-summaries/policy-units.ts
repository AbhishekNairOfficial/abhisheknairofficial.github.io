export interface NumberUnit {
  number: string;
  unit: string;
  unknownSuffix: boolean;
}

const UNIT_CANONICAL = indexUnits([
  ['ms', 'msec', 'millisecond', 'milliseconds'],
  ['s', 'sec', 'secs', 'second', 'seconds'],
  ['min', 'mins', 'minute', 'minutes'],
  ['hour', 'h', 'hr', 'hrs', 'hours'],
  ['day', 'days'],
  ['week', 'weeks'],
  ['month', 'months'],
  ['year', 'years', 'yr', 'yrs'],
  ['%', 'percent', 'percentage'],
  ['x', 'times'],
  ['kb', 'kilobyte', 'kilobytes'],
  ['mb', 'megabyte', 'megabytes'],
  ['gb', 'gigabyte', 'gigabytes'],
  ['tb', 'terabyte', 'terabytes'],
  ['usd', 'dollar', 'dollars'],
  ['eur', 'euro', 'euros'],
  ['gbp', 'pound', 'pounds'],
]);

export function extractNumberUnits(text: string): NumberUnit[] {
  const pairs: NumberUnit[] = [];
  const pattern = /\d+(?:\.\d+)?/gu;
  let match = pattern.exec(text);
  while (match !== null) {
    const number = match[0] ?? '';
    const parsed = parseUnitAfter(text.slice(match.index + number.length));
    pairs.push({
      number,
      unit: parsed.unit,
      unknownSuffix: parsed.unknownSuffix,
    });
    match = pattern.exec(text);
  }
  return pairs;
}

export function numberUnitKey(pair: NumberUnit): string {
  return `${pair.number}:${pair.unit}`;
}

function indexUnits(groups: readonly (readonly string[])[]): Record<string, string> {
  const map: Record<string, string> = {};
  groups.forEach((group) => {
    const canonical = group[0] ?? '';
    group.forEach((alias) => {
      map[alias] = canonical;
    });
  });
  return map;
}

function parseUnitAfter(rest: string): { unit: string; unknownSuffix: boolean } {
  return readPercent(rest)
    ?? readAttachedUnit(rest)
    ?? readHyphenatedUnit(rest)
    ?? readSpacedUnit(rest)
    ?? { unit: '', unknownSuffix: false };
}

function readPercent(rest: string): { unit: string; unknownSuffix: boolean } | null {
  if (!rest.startsWith('%')) {
    return null;
  }
  return { unit: '%', unknownSuffix: false };
}

function readAttachedUnit(rest: string): { unit: string; unknownSuffix: boolean } | null {
  const word = leadingLetters(rest);
  if (word.length === 0) {
    return null;
  }
  const canonical = UNIT_CANONICAL[word.toLowerCase()];
  if (canonical === undefined) {
    return { unit: '', unknownSuffix: true };
  }
  return { unit: canonical, unknownSuffix: false };
}

function readHyphenatedUnit(rest: string): { unit: string; unknownSuffix: boolean } | null {
  if (!rest.startsWith('-')) {
    return null;
  }
  return lookupUnit(leadingLetters(rest.slice(1)));
}

function readSpacedUnit(rest: string): { unit: string; unknownSuffix: boolean } | null {
  const spaces = /^\s+/u.exec(rest);
  if (spaces === null) {
    return null;
  }
  return lookupUnit(leadingLetters(rest.slice(spaces[0].length)));
}

function lookupUnit(word: string): { unit: string; unknownSuffix: boolean } | null {
  if (word.length === 0) {
    return null;
  }
  const canonical = UNIT_CANONICAL[word.toLowerCase()];
  if (canonical === undefined) {
    return null;
  }
  return { unit: canonical, unknownSuffix: false };
}

function leadingLetters(text: string): string {
  const match = /^[A-Za-z]+/u.exec(text);
  return match === null ? '' : match[0];
}

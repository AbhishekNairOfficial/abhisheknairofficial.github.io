import { expect, test } from '@playwright/test';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECTS } from '../../src/config/constants';
import {
  buildSummaryCatalog,
  getSummaryCatalog,
  toProjectInput,
} from '../../src/features/project-summaries/catalog.server';
import { PROJECT_IDS } from '../../src/features/project-summaries/types';
import { fixtureVerifier, makeCandidate, makeRegistry } from './fixtures';

test('production catalog is original-only for every real project', () => {
  const catalog = getSummaryCatalog(PROJECTS.map(toProjectInput));
  PROJECT_IDS.forEach((id) => {
    expect(catalog[id]?.kind).toBe('original');
  });
});

test('invalid registry yields original-only rows and does not throw', () => {
  const catalog = buildSummaryCatalog(PROJECTS.map(toProjectInput), { nope: true }, fixtureVerifier);
  PROJECT_IDS.forEach((id) => {
    expect(catalog[id]).toEqual({ kind: 'original', reason: 'invalid-registry' });
  });
});

test('unrelated project failures do not break a valid row', () => {
  const good = makeCandidate();
  const other = makeCandidate({
    ...good.bundle.source.project,
    id: 'ai-anomaly-detection',
    title: 'Maple Pier Inventory',
  });
  other.receipt.outputHashes.recruiter = 'e'.repeat(64);
  const registry = makeRegistry();
  registry.current[good.bundle.source.project.id] = good;
  registry.current['ai-anomaly-detection'] = other;
  const catalog = buildSummaryCatalog(
    [good.bundle.source.project, other.bundle.source.project],
    registry,
    fixtureVerifier,
  );
  expect(catalog[good.bundle.source.project.id]?.kind).toBe('approved');
  expect(catalog['ai-anomaly-detection']?.kind).toBe('original');
});

test('real pages never load fixtures', () => {
  const productionFiles = [
    'src/app/organisms/Work/Work.tsx',
    'src/app/molecules/Projects/Projects.tsx',
    'src/app/molecules/Projects/ProjectSummary.tsx',
    'src/features/project-summaries/catalog.server.ts',
    'src/app/page.tsx',
    'src/app/layout.tsx',
  ];
  productionFiles.forEach((relative) => {
    const text = readFileSync(join(process.cwd(), relative), 'utf8');
    expect(text).not.toMatch(/project-summaries\/fixtures/);
    expect(text).not.toMatch(/demo-fixtures/);
    expect(text).not.toMatch(/summary-site/);
    expect(text).not.toMatch(/Fixture One/);
    expect(text).not.toMatch(/Synthetic demo/);
  });
});

test('production source graph never imports test fixtures', () => {
  const forbidden = collectTsFiles(join(process.cwd(), 'src'))
    .filter((file) => !file.includes('/labs/'))
    .map((file) => readFileSync(file, 'utf8'))
    .join('\n');
  expect(forbidden).not.toContain('tests/project-summaries/fixtures');
  expect(forbidden).not.toContain('demo-fixtures');
});

test('workflow contract is secret-free pull_request validation', () => {
  // File is created in Phase 1 CI task; assertion still required.
  const workflow = readFileSync(
    join(process.cwd(), '.github/workflows/project-summaries.yml'),
    'utf8',
  );
  expect(workflow).toMatch(/pull_request:/);
  expect(workflow).toMatch(/contents:\s*read/);
  expect(workflow).not.toMatch(/pull_request_target/);
  expect(workflow).not.toMatch(/secrets\./);
  expect(workflow).not.toMatch(/vercel deploy/i);
  expect(workflow).not.toMatch(/ts\.net/);
  expect(workflow).not.toContain(['spark', '749c'].join('-'));
});

function collectTsFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  entries.forEach((entry) => {
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      files.push(...collectTsFiles(full));
      return;
    }
    if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      files.push(full);
    }
  });
  return files;
}

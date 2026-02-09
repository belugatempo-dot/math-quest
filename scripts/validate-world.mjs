#!/usr/bin/env node
/**
 * validate-world.mjs — Validates a world JSON file against the Zod WorldSchema.
 *
 * Usage: node scripts/validate-world.mjs data/world-4.json
 */

import { readFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Import the built shared package
const { WorldSchema } = await import(join(ROOT, 'packages/shared/dist/index.js'));

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/validate-world.mjs <path-to-world.json>');
  process.exit(1);
}

const fullPath = resolve(filePath);
console.log(`Validating: ${fullPath}\n`);

const rawData = JSON.parse(readFileSync(fullPath, 'utf-8'));

// Top-level counts
const totalChapters = rawData.chapters?.length ?? 0;
const totalLevels = rawData.chapters?.reduce((s, ch) => s + (ch.levels?.length ?? 0), 0) ?? 0;
const totalProblems = rawData.chapters?.reduce(
  (s, ch) => s + ch.levels?.reduce((s2, l) => s2 + (l.problems?.length ?? 0), 0), 0
) ?? 0;
const totalHints = rawData.chapters?.reduce(
  (s, ch) => s + ch.levels?.reduce(
    (s2, l) => s2 + l.problems?.reduce((s3, p) => s3 + (p.hints?.length ?? 0), 0), 0
  ), 0
) ?? 0;

console.log(`Chapters: ${totalChapters}`);
console.log(`Levels: ${totalLevels}`);
console.log(`Problems: ${totalProblems}`);
console.log(`Hints: ${totalHints}`);
console.log(`totalLevels field: ${rawData.totalLevels}\n`);

// Validate
const result = WorldSchema.safeParse(rawData);

if (result.success) {
  console.log('✅ Validation PASSED — all schemas satisfied.\n');

  // Additional quality checks
  let emptyHints = 0;
  let emptyTeaching = 0;
  let shortStatements = 0;
  const categories = {};
  const types = {};
  const difficulties = {};

  for (const ch of rawData.chapters) {
    for (const l of ch.levels) {
      types[l.type] = (types[l.type] || 0) + 1;
      for (const p of l.problems) {
        categories[p.category] = (categories[p.category] || 0) + 1;
        difficulties[p.difficulty] = (difficulties[p.difficulty] || 0) + 1;
        if (p.teachingPoint.length < 15) emptyTeaching++;
        if (p.statement.length < 20) shortStatements++;
        for (const h of p.hints) {
          if (h.text.length < 15) emptyHints++;
        }
      }
    }
  }

  console.log('Quality Report:');
  console.log(`  Short hints (<15 chars): ${emptyHints}`);
  console.log(`  Short teaching points (<15 chars): ${emptyTeaching}`);
  console.log(`  Short statements (<20 chars): ${shortStatements}`);
  console.log(`  Categories: ${JSON.stringify(categories, null, 2)}`);
  console.log(`  Level types: ${JSON.stringify(types, null, 2)}`);
  console.log(`  Difficulties: ${JSON.stringify(difficulties, null, 2)}`);
} else {
  console.log('❌ Validation FAILED\n');

  // Group errors by path prefix for readability
  const errors = result.error.issues;
  console.log(`${errors.length} validation errors:\n`);

  for (const err of errors.slice(0, 50)) {
    const path = err.path.join('.');
    console.log(`  [${path}] ${err.message} (code: ${err.code})`);
    if (err.received !== undefined) {
      console.log(`    received: ${JSON.stringify(err.received).slice(0, 100)}`);
    }
  }

  if (errors.length > 50) {
    console.log(`\n  ... and ${errors.length - 50} more errors`);
  }

  process.exit(1);
}

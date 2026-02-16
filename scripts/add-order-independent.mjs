#!/usr/bin/env node

/**
 * Add orderIndependent: true to set-type problems where answer order shouldn't matter.
 *
 * Targets problems with comma-separated list answers (factors, primes, remainders)
 * where a student listing items in any order should be accepted.
 *
 * Does NOT touch ordering/sequence problems where order is essential.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

// Problem IDs that should have orderIndependent: true on their correctAnswer
const SET_TYPE_PROBLEMS = new Set([
  // World 4 — factors and primes
  'problem-4-7-1-1',  // "List all factors of 24" → "1, 2, 3, 4, 6, 8, 12, 24"
  'problem-4-7-1-3',  // "List all factor pairs of 36" → "(1,36), (2,18), ..."
  'problem-4-7-2-1',  // "Find all factor pairs of 36" → "(1,36), (2,18), ..."
  'problem-4-7-3-1',  // "List all prime numbers less than 20" → "2, 3, 5, ..."

  // World 3 — remainders
  'problem-3-8-7-3',  // "What remainders are possible when dividing by 3?" → "0, 1, 2"
]);

function processWorld(filename) {
  const filepath = join(dataDir, filename);
  const world = JSON.parse(readFileSync(filepath, 'utf-8'));
  let updated = 0;

  for (const chapter of world.chapters) {
    for (const level of chapter.levels) {
      for (const problem of level.problems) {
        if (SET_TYPE_PROBLEMS.has(problem.id)) {
          if (!problem.correctAnswer.orderIndependent) {
            problem.correctAnswer.orderIndependent = true;
            updated++;
            console.log(`  ✓ ${problem.id}: "${problem.correctAnswer.value}"`);
          } else {
            console.log(`  - ${problem.id}: already has orderIndependent`);
          }
        }
      }
    }
  }

  if (updated > 0) {
    writeFileSync(filepath, JSON.stringify(world, null, 2) + '\n', 'utf-8');
    console.log(`  → Wrote ${filepath} (${updated} problems updated)\n`);
  } else {
    console.log(`  → No changes needed for ${filename}\n`);
  }

  return updated;
}

console.log('Adding orderIndependent: true to set-type problems\n');

console.log('World 3:');
const w3 = processWorld('world-3.json');

console.log('World 4:');
const w4 = processWorld('world-4.json');

console.log(`Done. ${w3 + w4} problems updated total.`);

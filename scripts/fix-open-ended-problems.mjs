#!/usr/bin/env node

/**
 * Fix open-ended question answer checking in World 3 and World 4.
 *
 * Problems fixed:
 *   problem-4-1-1-3   → autoAccept (open-ended: name real-world right angles)
 *   problem-4-1-5-2   → autoAccept (open-ended: perpendicular examples)
 *   problem-4-12-6-1  → clean value (remove "(4 outcomes)" suffix)
 *   problem-4-8-12-2  → clean value (remove "(or …)" suffix)
 *   problem-4-11-10-2 → clean value (remove "(or …)" suffix)
 *   problem-4-6-9-2   → clean value + add more acceptableAnswers
 *   problem-3-4-8-2   → add orderIndependent: true to array answer
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const world4Path = resolve(__dirname, '../data/world-4.json');
const world3Path = resolve(__dirname, '../data/world-3.json');

function findProblem(world, problemId) {
  for (const chapter of world.chapters) {
    for (const level of chapter.levels) {
      for (const problem of level.problems) {
        if (problem.id === problemId) return problem;
      }
    }
  }
  throw new Error(`Problem ${problemId} not found`);
}

// --- World 4 fixes ---
const world4 = JSON.parse(readFileSync(world4Path, 'utf-8'));

// 1. problem-4-1-1-3: autoAccept (truly open-ended)
{
  const p = findProblem(world4, 'problem-4-1-1-3');
  p.correctAnswer.value = 'Book corners, door frames, window edges, table corners';
  p.correctAnswer.autoAccept = true;
  p.correctAnswer.explanation =
    'Great! Right angles are everywhere — book corners, door frames, windows, tables, and more.';
  console.log('✓ problem-4-1-1-3: autoAccept + cleaned value');
}

// 2. problem-4-1-5-2: autoAccept (truly open-ended)
{
  const p = findProblem(world4, 'problem-4-1-5-2');
  p.correctAnswer.value = '90 degrees. Examples: wall and floor corner, cross/plus sign, letter T';
  p.correctAnswer.autoAccept = true;
  p.correctAnswer.explanation =
    'Perpendicular lines make a 90° angle. Examples include wall–floor corners, the letter T, and plus signs.';
  console.log('✓ problem-4-1-5-2: autoAccept + cleaned value');
}

// 3. problem-4-12-6-1: clean value (remove "(4 outcomes)")
{
  const p = findProblem(world4, 'problem-4-12-6-1');
  p.correctAnswer.value = 'HH, HT, TH, TT';
  p.correctAnswer.orderIndependent = true;
  // Keep displayValue with the count for reference
  console.log('✓ problem-4-12-6-1: cleaned value, added orderIndependent');
}

// 4. problem-4-8-12-2: clean value (remove "(or …)" suffix)
{
  const p = findProblem(world4, 'problem-4-8-12-2');
  p.correctAnswer.value = '2/5';
  // acceptableAnswers already has: 5/12, 2/5, 3/8, 7/18
  console.log('✓ problem-4-8-12-2: cleaned value to "2/5"');
}

// 5. problem-4-11-10-2: clean value (remove "(or …)" suffix)
{
  const p = findProblem(world4, 'problem-4-11-10-2');
  p.correctAnswer.value = '0.450';
  // acceptableAnswers already has: 0.450, 0.401, 0.425, 0.475, 0.499
  console.log('✓ problem-4-11-10-2: cleaned value to "0.450"');
}

// 6. problem-4-6-9-2: clean value + add more acceptableAnswers
{
  const p = findProblem(world4, 'problem-4-6-9-2');
  p.correctAnswer.value = '1, 3, 5, 2, 4, 6';
  // Existing acceptableAnswers: "1, 3, 5, 2, 4, 6" and "2, 4, 6, 1, 3, 5"
  // Add more valid arrangements
  p.acceptableAnswers = [
    ...(p.acceptableAnswers || []),
    { value: '3, 1, 4, 2, 6, 5' },
    { value: '4, 2, 6, 1, 3, 5' },
    { value: '5, 3, 1, 4, 2, 6' },
    { value: '6, 4, 2, 5, 3, 1' },
  ];
  console.log(`✓ problem-4-6-9-2: cleaned value, ${p.acceptableAnswers.length} acceptableAnswers`);
}

writeFileSync(world4Path, JSON.stringify(world4, null, 2) + '\n', 'utf-8');
console.log(`\nWrote ${world4Path}`);

// --- World 3 fix ---
const world3 = JSON.parse(readFileSync(world3Path, 'utf-8'));

// 7. problem-3-4-8-2: add orderIndependent to array answer
{
  const p = findProblem(world3, 'problem-3-4-8-2');
  p.correctAnswer.orderIndependent = true;
  console.log('✓ problem-3-4-8-2: added orderIndependent');
}

writeFileSync(world3Path, JSON.stringify(world3, null, 2) + '\n', 'utf-8');
console.log(`Wrote ${world3Path}`);

console.log('\nDone! Run validation:');
console.log('  node scripts/validate-world.mjs data/world-3.json');
console.log('  node scripts/validate-world.mjs data/world-4.json');

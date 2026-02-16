#!/usr/bin/env node
/**
 * Calibrate World 4 minor fixes:
 * - Ch3: Add order-of-operations problems with exponents
 * - Ch7: Add factor tree language to Prime Factorization hints
 *
 * Run: node scripts/calibrate-world4-minor-fixes.mjs
 * Validate: node scripts/validate-world.mjs data/world-4.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const worldPath = resolve(__dirname, '../data/world-4.json');

const world = JSON.parse(readFileSync(worldPath, 'utf-8'));

// ==================== Ch3: Order of Operations ====================
const ch3 = world.chapters[2];
if (ch3.id !== 'chapter-4-3') {
  console.error('Expected chapter-4-3, got:', ch3.id);
  process.exit(1);
}

// Find boss level to insert before it
const ch3BossIdx = ch3.levels.findIndex(l => l.isBoss);
console.log(`Ch3 boss at index ${ch3BossIdx}`);

const orderOfOpsLevel = {
  id: 'placeholder',
  chapterId: 'chapter-4-3',
  worldId: 'world-4',
  number: 0,
  name: 'Order of Operations with Exponents',
  type: 'standard',
  storyContext: 'Grogg is confused: "Is 2 + 3² equal to 11 or 25? Does the squaring happen first?" Prof. Owlbert explains the order.',
  difficulty: 3,
  estimatedMinutes: 4,
  isChallenge: false,
  isBoss: false,
  problems: [
    {
      id: 'placeholder', levelId: 'placeholder', sequence: 1,
      type: 'numeric_input', category: 'thinking',
      statement: 'What is 2 + 3²? (Compute the exponent BEFORE adding.)',
      inputType: 'number_pad',
      correctAnswer: { value: 11, displayValue: '11' },
      hints: [
        { tier: 1, cost: 0, text: 'Exponents are computed before addition. What is 3² first?', type: 'conceptual' },
        { tier: 2, cost: 1, text: '3² = 9. Now add: 2 + 9 = ?', type: 'directional' },
        { tier: 3, cost: 2, text: '2 + 3² = 2 + 9 = 11. Not (2+3)² = 25!', type: 'scaffolded' },
      ],
      solutionExplanation: '3² = 9, then 2 + 9 = 11.',
      teachingPoint: 'Exponents are evaluated before addition or subtraction. 2 + 3² means 2 + (3²), not (2+3)². The exponent only applies to the number it is attached to.',
      tags: ['exponents', 'order-of-operations'],
      difficulty: 2,
    },
    {
      id: 'placeholder', levelId: 'placeholder', sequence: 2,
      type: 'numeric_input', category: 'thinking',
      statement: 'Calculate 10 - 2³. (Evaluate the exponent first!)',
      inputType: 'number_pad',
      correctAnswer: { value: 2, displayValue: '2' },
      hints: [
        { tier: 1, cost: 0, text: 'What is 2³ (2 cubed)?', type: 'conceptual' },
        { tier: 2, cost: 1, text: '2³ = 2 × 2 × 2 = 8. Now subtract: 10 - 8 = ?', type: 'directional' },
        { tier: 3, cost: 2, text: '10 - 2³ = 10 - 8 = 2.', type: 'scaffolded' },
      ],
      solutionExplanation: '2³ = 8, then 10 - 8 = 2.',
      teachingPoint: 'Always compute exponents first, then multiplication/division, then addition/subtraction. This is not a rule to memorize — it is a convention that prevents ambiguity.',
      tags: ['exponents', 'order-of-operations'],
      difficulty: 2,
    },
    {
      id: 'placeholder', levelId: 'placeholder', sequence: 3,
      type: 'numeric_input', category: 'thinking',
      statement: 'Is 2 × 3² equal to 18 or 36? Calculate the correct answer.',
      inputType: 'number_pad',
      correctAnswer: { value: 18, displayValue: '18' },
      hints: [
        { tier: 1, cost: 0, text: 'Does the exponent apply to just 3, or to the whole product 2 × 3?', type: 'conceptual' },
        { tier: 2, cost: 1, text: 'The ² only applies to 3. So 3² = 9 first, then 2 × 9 = ?', type: 'directional' },
        { tier: 3, cost: 2, text: '2 × 3² = 2 × 9 = 18. If we wanted (2×3)², we would need parentheses.', type: 'scaffolded' },
      ],
      solutionExplanation: '2 × 3² = 2 × 9 = 18 (not (2×3)² = 36).',
      teachingPoint: 'Without parentheses, the exponent only applies to the number directly before it. 2 × 3² = 2 × (3²) = 18. Parentheses change the order: (2×3)² = 6² = 36.',
      tags: ['exponents', 'order-of-operations'],
      difficulty: 3,
    },
  ],
};

ch3.levels.splice(ch3BossIdx, 0, orderOfOpsLevel);
console.log('Added Order of Operations level to Ch3.');

// Update Ch3 learning objectives
ch3.learningObjectives = [
  'Understand exponent notation',
  'Identify perfect squares and their properties',
  'Convert between binary and base-10',
  'Apply exponent multiplication rule',
  'Evaluate expressions with exponents using order of operations',
];

// Renumber Ch3 levels and problems
ch3.levels.forEach((level, idx) => {
  const num = idx + 1;
  level.id = `level-4-3-${num}`;
  level.number = num;
  level.chapterId = 'chapter-4-3';
  level.worldId = 'world-4';

  level.problems.forEach((p, pi) => {
    p.id = `problem-4-3-${num}-${pi + 1}`;
    p.levelId = `level-4-3-${num}`;
    p.sequence = pi + 1;
  });
});

// ==================== Ch7: Factor Tree Language ====================
const ch7 = world.chapters[6];
if (ch7.id !== 'chapter-4-7') {
  console.error('Expected chapter-4-7, got:', ch7.id);
  process.exit(1);
}

// Find Prime Factorization level and rewrite hints with factor tree language
const pfLevel = ch7.levels.find(l => l.name === 'Prime Factorization');
if (pfLevel) {
  console.log('Rewriting Ch7 Prime Factorization hints with factor tree language...');

  // Problem 1: Prime factorization of 60
  pfLevel.problems[0].hints = [
    { tier: 1, cost: 0, text: 'Draw a factor tree: write 60 at the top, then split it into any factor pair (like 6 × 10).', type: 'conceptual' },
    { tier: 2, cost: 1, text: 'Keep splitting: 6 = 2 × 3, 10 = 2 × 5. Stop when all leaves are prime numbers.', type: 'directional' },
    { tier: 3, cost: 2, text: 'Factor tree: 60 → 6 × 10 → (2 × 3) × (2 × 5). So 60 = 2² × 3 × 5.', type: 'scaffolded' },
  ];
  pfLevel.problems[0].teachingPoint = 'A factor tree starts with the number and splits into factor pairs until all leaves are prime. No matter which pair you start with, you always get the same prime factorization!';

  // Problem 2: Also 60 (different approach)
  pfLevel.problems[1].hints = [
    { tier: 1, cost: 0, text: 'Try a different factor tree: start with 60 = 4 × 15 instead of 6 × 10.', type: 'conceptual' },
    { tier: 2, cost: 1, text: 'Split further: 4 = 2 × 2, 15 = 3 × 5. All leaves are now prime.', type: 'directional' },
    { tier: 3, cost: 2, text: 'Different tree, same answer: 60 = 2 × 2 × 3 × 5 = 2² × 3 × 5.', type: 'scaffolded' },
  ];
  pfLevel.problems[1].teachingPoint = 'Multiple factor trees lead to the same prime factorization. This is called the Fundamental Theorem of Arithmetic: every number has exactly one prime factorization.';

  // Problem 3: 180
  pfLevel.problems[2].hints = [
    { tier: 1, cost: 0, text: 'Draw a factor tree for 180. Start with any factor pair: 180 = 12 × 15 or 180 = 18 × 10.', type: 'conceptual' },
    { tier: 2, cost: 1, text: 'Using 18 × 10: 18 = 2 × 9 = 2 × 3 × 3, and 10 = 2 × 5. Combine all prime leaves.', type: 'directional' },
    { tier: 3, cost: 2, text: 'Factor tree gives: 180 = 2 × 2 × 3 × 3 × 5 = 2² × 3² × 5.', type: 'scaffolded' },
  ];
  pfLevel.problems[2].teachingPoint = 'For larger numbers, factor trees are essential. Split into any convenient pair, keep splitting until every leaf is prime, then collect the prime factors.';
}

// Update world totalLevels (+1 for Ch3 order of ops)
world.totalLevels += 1;

writeFileSync(worldPath, JSON.stringify(world, null, 2) + '\n');
console.log(`\nDone!`);
console.log(`Ch3 now has ${ch3.levels.length} levels (was 10).`);
console.log(`Ch7 Prime Factorization hints updated with factor tree language.`);
console.log(`World totalLevels: ${world.totalLevels}`);
console.log('Run: node scripts/validate-world.mjs data/world-4.json');

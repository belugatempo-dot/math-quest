#!/usr/bin/env node
/**
 * Calibrate World 4, Chapter 8: Add number line models and rewrite hints.
 * Adds 2 teaching levels after level-4-8-2 (Equivalent Fractions).
 * Rewrites hints on levels 4-8-3, 4-8-4, 4-8-5 to use number line reasoning.
 * Enriches level-4-8-10 (The Fraction Number Line) teaching points.
 *
 * Run: node scripts/calibrate-world4-ch8-numberline.mjs
 * Validate: node scripts/validate-world.mjs data/world-4.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const worldPath = resolve(__dirname, '../data/world-4.json');

const world = JSON.parse(readFileSync(worldPath, 'utf-8'));
const ch8 = world.chapters[7];

if (ch8.id !== 'chapter-4-8') {
  console.error('Expected chapter-4-8 at index 7, got:', ch8.id);
  process.exit(1);
}

console.log(`Ch8 currently has ${ch8.levels.length} levels.`);

// 1. Create 2 new teaching levels
const newLevels = [
  {
    id: 'placeholder',
    chapterId: 'chapter-4-8',
    worldId: 'world-4',
    number: 0,
    name: 'Fractions on the Number Line',
    type: 'teaching',
    storyContext: 'Prof. Owlbert draws a line in the sand from 0 to 1. "Every fraction lives somewhere on this number line. Let\'s learn to find where!"',
    difficulty: 2,
    estimatedMinutes: 4,
    isChallenge: false,
    isBoss: false,
    teaching: {
      format: 'multi-step-lesson',
      steps: [
        {
          id: 'step-1',
          characterId: 'prof-owlbert',
          expression: 'happy',
          dialogue: 'A fraction is a NUMBER — it has an exact position on the number line. To place 1/4 on the line from 0 to 1, divide the line into 4 equal parts. The first mark is 1/4!',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-2',
          characterId: 'prof-owlbert',
          expression: 'thinking',
          dialogue: 'To compare fractions, imagine placing them both on the number line. The one farther to the RIGHT is larger. 3/4 is farther right than 1/4, so 3/4 > 1/4. No rules to memorize — just position!',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-3',
          characterId: 'prof-owlbert',
          expression: 'encouraging',
          dialogue: '1/2 is the midpoint between 0 and 1. Any fraction to the LEFT of 1/2 is less than half. Any fraction to the RIGHT is more than half. This simple landmark helps compare almost any fractions!',
          interactionType: 'click-to-continue',
        },
      ],
      estimatedSeconds: 90,
      skippable: true,
    },
    problems: [
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 1,
        type: 'multiple_choice', category: 'thinking',
        statement: 'On a number line from 0 to 1, where does 3/4 fall? A) Closer to 0 B) Exactly at the midpoint C) Closer to 1',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'C) Closer to 1', displayValue: 'C — 3/4 is only 1/4 away from 1' },
        hints: [
          { tier: 1, cost: 0, text: 'Divide the line into 4 equal parts. Count 3 of them from 0. Where does that land?', type: 'conceptual' },
          { tier: 2, cost: 1, text: '3/4 is three-quarters of the way from 0 to 1. The midpoint is 1/2 = 2/4.', type: 'directional' },
          { tier: 3, cost: 2, text: '3/4 is past the midpoint (2/4) and only 1/4 away from 1. It is closer to 1.', type: 'scaffolded' },
        ],
        solutionExplanation: '3/4 is closer to 1 — it is 3/4 of the way along the number line.',
        teachingPoint: 'The number line makes fractions visual. 3/4 is clearly past the halfway mark, near 1.',
        tags: ['fractions', 'number-line'],
        difficulty: 1,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 2,
        type: 'multiple_choice', category: 'thinking',
        statement: 'On a number line from 0 to 1, which fraction is farther to the right: 2/5 or 3/8?',
        inputType: 'multiple_choice',
        correctAnswer: { value: '2/5', displayValue: '2/5 is farther right (2/5 > 3/8)' },
        hints: [
          { tier: 1, cost: 0, text: 'Compare each to the benchmark 1/2. Is 2/5 more or less than 1/2? Is 3/8?', type: 'conceptual' },
          { tier: 2, cost: 1, text: '1/2 of 5 is 2.5, so 2/5 < 1/2. 1/2 of 8 is 4, so 3/8 < 1/2. Both are left of center.', type: 'directional' },
          { tier: 3, cost: 2, text: '2/5 = 16/40, 3/8 = 15/40. Since 16/40 > 15/40, 2/5 is farther right.', type: 'scaffolded' },
        ],
        solutionExplanation: '2/5 > 3/8 — on the number line, 2/5 is slightly farther to the right.',
        teachingPoint: 'On the number line, "farther right" = "larger." When benchmarks do not resolve the comparison, common denominators help.',
        tags: ['fractions', 'number-line', 'comparing-fractions'],
        difficulty: 2,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 3,
        type: 'multiple_choice', category: 'thinking',
        statement: 'Is 5/6 to the left or right of 3/4 on the number line? A) Left (5/6 < 3/4) B) Right (5/6 > 3/4) C) Same spot (5/6 = 3/4)',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'B) Right (5/6 > 3/4)', displayValue: 'B — 5/6 is farther right than 3/4' },
        hints: [
          { tier: 1, cost: 0, text: 'Both are close to 1. Which is closer? Think about the gap between each and 1.', type: 'conceptual' },
          { tier: 2, cost: 1, text: '5/6 is 1/6 away from 1. 3/4 is 1/4 away from 1. Which gap is smaller?', type: 'directional' },
          { tier: 3, cost: 2, text: '1/6 < 1/4, so 5/6 is closer to 1, meaning it is farther right. 5/6 > 3/4.', type: 'scaffolded' },
        ],
        solutionExplanation: '5/6 > 3/4 because 5/6 is only 1/6 from 1, while 3/4 is 1/4 from 1.',
        teachingPoint: 'Comparing "distance from 1" is a powerful number line strategy: the closer to 1, the larger the fraction.',
        tags: ['fractions', 'number-line', 'comparing-fractions'],
        difficulty: 3,
      },
    ],
  },
  {
    id: 'placeholder',
    chapterId: 'chapter-4-8',
    worldId: 'world-4',
    number: 0,
    name: 'Equivalent Fractions on the Number Line',
    type: 'teaching',
    storyContext: 'Grogg is confused. "2/3 and 4/6 look different, but Prof. Owlbert says they\'re the same point on the number line. How?!"',
    difficulty: 2,
    estimatedMinutes: 4,
    isChallenge: false,
    isBoss: false,
    teaching: {
      format: 'multi-step-lesson',
      steps: [
        {
          id: 'step-1',
          characterId: 'prof-owlbert',
          expression: 'happy',
          dialogue: 'Place 2/3 on a number line: divide 0 to 1 into 3 parts, mark the 2nd. Now place 4/6: divide into 6 parts, mark the 4th. They land on the SAME spot! That is why 2/3 = 4/6.',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-2',
          characterId: 'prof-owlbert',
          expression: 'thinking',
          dialogue: 'Equivalent fractions are different names for the same number — the same point on the number line. Multiplying numerator and denominator by the same number just makes finer divisions, but lands on the same spot.',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-3',
          characterId: 'prof-owlbert',
          expression: 'encouraging',
          dialogue: 'This is why we can ADD fractions by finding common denominators — we are just re-labeling the number line with finer marks, without changing where the fractions actually are!',
          interactionType: 'click-to-continue',
        },
      ],
      estimatedSeconds: 90,
      skippable: true,
    },
    problems: [
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 1,
        type: 'text_input', category: 'thinking',
        statement: 'On a number line divided into sixths (0/6, 1/6, 2/6, ..., 6/6), which sixth lands on the same point as 1/2?',
        inputType: 'text_field',
        correctAnswer: { value: '3/6', displayValue: '3/6' },
        hints: [
          { tier: 1, cost: 0, text: '1/2 is the midpoint of the number line. Which sixth is also the midpoint?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'The midpoint of 6 equal parts is the 3rd mark.', type: 'directional' },
          { tier: 3, cost: 2, text: '3/6 = 1/2. They share the same position on the number line.', type: 'scaffolded' },
        ],
        solutionExplanation: '3/6 = 1/2 — both land on the midpoint of the number line.',
        teachingPoint: 'On the number line, 1/2 and 3/6 are the same point. Equivalent fractions are different names for the same location.',
        tags: ['fractions', 'number-line', 'equivalent-fractions'],
        difficulty: 1,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 2,
        type: 'text_input', category: 'thinking',
        statement: 'On a number line divided into twelfths, which twelfth lands on the same point as 2/3?',
        inputType: 'text_field',
        correctAnswer: { value: '8/12', displayValue: '8/12' },
        hints: [
          { tier: 1, cost: 0, text: 'Multiply both parts of 2/3 by the same number to get twelfths.', type: 'conceptual' },
          { tier: 2, cost: 1, text: '3 × 4 = 12, so multiply numerator by 4 too: 2 × 4 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '2/3 = 8/12. Both fractions occupy the same point on the number line.', type: 'scaffolded' },
        ],
        solutionExplanation: '2/3 = 8/12 — multiply numerator and denominator by 4.',
        teachingPoint: 'Multiplying top and bottom by the same number creates finer divisions but keeps the fraction at the same point.',
        tags: ['fractions', 'number-line', 'equivalent-fractions'],
        difficulty: 2,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 3,
        type: 'multiple_choice', category: 'thinking',
        statement: 'Grogg says 3/5 and 6/10 are different because they have different numerators and denominators. Is he right? A) Yes — different numbers mean different fractions B) No — they represent the same point on the number line',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'B) No — they represent the same point on the number line', displayValue: 'B — 3/5 = 6/10 (same point on the number line)' },
        hints: [
          { tier: 1, cost: 0, text: 'Try placing both on a number line. Do they land at the same spot?', type: 'conceptual' },
          { tier: 2, cost: 1, text: '3/5 × 2/2 = 6/10. Multiplying by 2/2 does not change the value.', type: 'directional' },
          { tier: 3, cost: 2, text: '3/5 = 6/10. They are different names for the same number.', type: 'scaffolded' },
        ],
        solutionExplanation: 'No — 3/5 = 6/10. Equivalent fractions look different but represent the same value.',
        teachingPoint: 'The number line proves equivalent fractions: if two fractions land on the same spot, they are equal regardless of how they look.',
        tags: ['fractions', 'number-line', 'equivalent-fractions'],
        difficulty: 2,
      },
    ],
  },
];

// 2. Insert after level-4-8-2 (Equivalent Fractions)
const insertIdx = ch8.levels.findIndex(l => l.name.includes('Equivalent Fractions'));
ch8.levels.splice(insertIdx + 1, 0, ...newLevels);
console.log(`Inserted 2 new levels after index ${insertIdx}`);

// 3. Rewrite hints on comparison levels (now shifted by 2)
// We'll find them by name since IDs will be renumbered
for (const level of ch8.levels) {
  if (level.name === 'Comparing Fractions (Same Denominator)') {
    console.log('Rewriting hints for:', level.name);
    // Problem 1: 5/9 vs 7/9
    const p1 = level.problems[0];
    p1.hints = [
      { tier: 1, cost: 0, text: 'Place both on a number line divided into ninths. Which is farther to the right?', type: 'conceptual' },
      { tier: 2, cost: 1, text: '5/9 is at the 5th mark, 7/9 is at the 7th mark. The one farther right is bigger.', type: 'directional' },
      { tier: 3, cost: 2, text: '7/9 is farther right on the number line, so 7/9 > 5/9.', type: 'scaffolded' },
    ];
    p1.teachingPoint = 'On the number line, fractions with the same denominator are spaced equally. The one farther right (larger numerator) is greater.';
    // Problem 2: order 3/11, 7/11, 1/11, 5/11
    const p2 = level.problems[1];
    p2.hints = [
      { tier: 1, cost: 0, text: 'Imagine a number line divided into 11 equal parts. Place each fraction at its mark.', type: 'conceptual' },
      { tier: 2, cost: 1, text: 'From left to right: 1st mark, 3rd mark, 5th mark, 7th mark.', type: 'directional' },
      { tier: 3, cost: 2, text: 'Left to right on the number line: 1/11, 3/11, 5/11, 7/11.', type: 'scaffolded' },
    ];
    p2.teachingPoint = 'On the number line, same-denominator fractions line up in numerator order — just read from left to right.';
  }

  if (level.name === 'Comparing Fractions (Same Numerator)') {
    console.log('Rewriting hints for:', level.name);
    // Problem 1: 3/5 vs 3/8
    const p1 = level.problems[0];
    p1.hints = [
      { tier: 1, cost: 0, text: 'Place both on a number line from 0 to 1. Which lands farther to the right?', type: 'conceptual' },
      { tier: 2, cost: 1, text: '3/5 is 60% of the way to 1. 3/8 is 37.5%. Which is farther right?', type: 'directional' },
      { tier: 3, cost: 2, text: '3/5 is farther right on the number line. Bigger pieces (fifths > eighths) means a bigger fraction.', type: 'scaffolded' },
    ];
    p1.teachingPoint = 'On the number line, 3/5 lands farther right than 3/8. Same number of pieces, but fifths are bigger than eighths.';
    // Problem 2: 2/7 vs 2/5
    const p2 = level.problems[1];
    p2.hints = [
      { tier: 1, cost: 0, text: 'Imagine the number line from 0 to 1. Place 2/7 and 2/5 on it.', type: 'conceptual' },
      { tier: 2, cost: 1, text: '2/5 = 0.4 is past the 1/3 mark. 2/7 ≈ 0.29 is before it. Which is farther right?', type: 'directional' },
      { tier: 3, cost: 2, text: '2/5 is farther right on the number line. Fewer parts means each part is bigger.', type: 'scaffolded' },
    ];
    p2.teachingPoint = 'On the number line, 2/5 is farther right than 2/7 because fifths are larger portions than sevenths.';
  }

  if (level.name === 'Benchmark Comparisons') {
    console.log('Rewriting hints for:', level.name);
    // Problem 1: 5/9 vs 1/2 or 1
    const p1 = level.problems[0];
    p1.hints = [
      { tier: 1, cost: 0, text: 'Picture the number line from 0 to 1. Place 1/2 as a landmark. Where does 5/9 fall relative to it?', type: 'conceptual' },
      { tier: 2, cost: 1, text: '5/9 is just past 1/2 (= 4.5/9) on the number line. How far is it from 1 (= 9/9)?', type: 'directional' },
      { tier: 3, cost: 2, text: 'On the number line, 5/9 is very close to 1/2 — only 0.5/9 past it, but 4/9 from 1.', type: 'scaffolded' },
    ];
    p1.teachingPoint = 'Use landmarks on the number line (0, 1/2, 1) to estimate where fractions fall without computing.';
    // Problem 2: 3/7 vs 5/8 using 1/2
    const p2 = level.problems[1];
    p2.hints = [
      { tier: 1, cost: 0, text: 'Place 1/2 on the number line as a landmark. Is 3/7 left or right of it? What about 5/8?', type: 'conceptual' },
      { tier: 2, cost: 1, text: '3/7 is left of 1/2 (3 < 3.5). 5/8 is right of 1/2 (5 > 4). On the number line, right beats left.', type: 'directional' },
      { tier: 3, cost: 2, text: '5/8 > 1/2 > 3/7. Anything right of the midpoint beats anything left of it.', type: 'scaffolded' },
    ];
    p2.teachingPoint = 'The number line midpoint (1/2) is a powerful comparison tool: fractions on opposite sides are easy to order.';
  }

  if (level.name === 'The Fraction Number Line') {
    console.log('Enriching:', level.name);
    // Update teaching points to emphasize number line reasoning
    level.problems[0].teachingPoint = 'The number line lets you see fraction size directly. Place fractions on the line and read their order — no formulas needed.';
    level.problems[1].teachingPoint = 'Between any two points on the number line, there are always more fractions. Common denominators help you find the marks between them.';
    level.problems[2].teachingPoint = 'The number line extends beyond 1. Mixed numbers and improper fractions are just points beyond the 1 mark.';
  }
}

// 4. Update learning objectives to mention number line
ch8.learningObjectives = [
  'Understand fractions as points on the number line',
  'Use the number line to compare and order fractions',
  'Find equivalent fractions on the number line',
  'Add and subtract fractions with same and different denominators',
  'Convert between mixed numbers and improper fractions',
  'Use benchmark fractions for estimation',
];

// 5. Renumber all levels and problems
ch8.levels.forEach((level, idx) => {
  const num = idx + 1;
  level.id = `level-4-8-${num}`;
  level.number = num;
  level.chapterId = 'chapter-4-8';
  level.worldId = 'world-4';

  level.problems.forEach((p, pi) => {
    p.id = `problem-4-8-${num}-${pi + 1}`;
    p.levelId = `level-4-8-${num}`;
    p.sequence = pi + 1;
  });
});

// Update totalLevels (+2)
world.totalLevels += 2;

writeFileSync(worldPath, JSON.stringify(world, null, 2) + '\n');
console.log(`\nDone! Ch8 now has ${ch8.levels.length} levels (was 18).`);
console.log(`World totalLevels: ${world.totalLevels}`);
console.log('Run: node scripts/validate-world.mjs data/world-4.json');

#!/usr/bin/env node
/**
 * Calibrate World 4, Chapter 5: Add partial quotients, special quotients,
 * divisibility by 25/100, and rewrite long division hints.
 *
 * - Inserts 1 teaching level "Partial Quotients" before Long Division Method
 * - Adds 2 special quotient problems to Division as Sharing (level 1)
 * - Adds 2 divisibility by 25/100 problems to Divisibility by 4 (level 6)
 * - Rewrites Long Division hints with reasoning language
 *
 * Run: node scripts/calibrate-world4-ch5-division.mjs
 * Validate: node scripts/validate-world.mjs data/world-4.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const worldPath = resolve(__dirname, '../data/world-4.json');

const world = JSON.parse(readFileSync(worldPath, 'utf-8'));
const ch5 = world.chapters[4];

if (ch5.id !== 'chapter-4-5') {
  console.error('Expected chapter-4-5 at index 4, got:', ch5.id);
  process.exit(1);
}

console.log(`Ch5 currently has ${ch5.levels.length} levels.`);

// 1. Insert Partial Quotients level before Long Division Method
const longDivIdx = ch5.levels.findIndex(l => l.name === 'Long Division Method');
console.log(`Long Division at index ${longDivIdx}`);

const partialQuotientsLevel = {
  id: 'placeholder',
  chapterId: 'chapter-4-5',
  worldId: 'world-4',
  number: 0,
  name: 'Partial Quotients',
  type: 'teaching',
  storyContext: 'Prof. Owlbert shows a pile of 847 coins. "Instead of dividing all at once, let\'s take out groups we KNOW. It\'s like making the pile smaller in comfortable steps!"',
  difficulty: 2,
  estimatedMinutes: 5,
  isChallenge: false,
  isBoss: false,
  teaching: {
    format: 'multi-step-lesson',
    steps: [
      {
        id: 'step-1',
        characterId: 'prof-owlbert',
        expression: 'happy',
        dialogue: 'Partial quotients is a flexible way to divide. Instead of finding the exact largest multiple, take out any convenient chunk. Let\'s try 847 ÷ 7.',
        interactionType: 'click-to-continue',
      },
      {
        id: 'step-2',
        characterId: 'prof-owlbert',
        expression: 'thinking',
        dialogue: 'I know 7 × 100 = 700. Take out 100 sevens: 847 - 700 = 147 left. Now 7 × 20 = 140. Take out 20 sevens: 147 - 140 = 7 left. And 7 × 1 = 7. Take out 1 seven: 7 - 7 = 0. Total: 100 + 20 + 1 = 121!',
        visualType: 'worked-example',
        visualProps: {
          steps: [
            '847 ÷ 7',
            'Take out 100 sevens: 847 - 700 = 147',
            'Take out 20 sevens: 147 - 140 = 7',
            'Take out 1 seven: 7 - 7 = 0',
            'Total: 100 + 20 + 1 = 121',
          ],
        },
        interactionType: 'click-to-reveal',
      },
      {
        id: 'step-3',
        characterId: 'prof-owlbert',
        expression: 'encouraging',
        dialogue: 'The beauty is: you don\'t need to find the BIGGEST chunk each time. Any chunk works! You could take 50 sevens (350) first, then 50 more, then 21. Different paths, same answer. Break the division into chunks YOU know!',
        interactionType: 'click-to-continue',
      },
    ],
    estimatedSeconds: 120,
    skippable: true,
  },
  problems: [
    {
      id: 'placeholder', levelId: 'placeholder', sequence: 1,
      type: 'numeric_input', category: 'thinking',
      statement: 'Use partial quotients to calculate 156 ÷ 12. Hint: start by taking out 10 twelves (120), then see what\'s left.',
      inputType: 'number_pad',
      correctAnswer: { value: 13, displayValue: '13' },
      hints: [
        { tier: 1, cost: 0, text: 'Take a comfortable chunk first. 12 × 10 = 120. Subtract: 156 - 120 = ?', type: 'conceptual' },
        { tier: 2, cost: 1, text: '156 - 120 = 36 left. Now how many 12s fit in 36? 12 × 3 = 36.', type: 'directional' },
        { tier: 3, cost: 2, text: '10 + 3 = 13. So 156 ÷ 12 = 13.', type: 'scaffolded' },
      ],
      solutionExplanation: 'Take out 10 twelves (120), leaving 36. Take out 3 twelves (36). Total: 13.',
      teachingPoint: 'Partial quotients: subtract comfortable chunks and add up how many groups you took. No need to find the biggest chunk first!',
      tags: ['division', 'partial-quotients'],
      difficulty: 2,
    },
    {
      id: 'placeholder', levelId: 'placeholder', sequence: 2,
      type: 'numeric_input', category: 'thinking',
      statement: 'Use partial quotients to calculate 432 ÷ 8.',
      inputType: 'number_pad',
      correctAnswer: { value: 54, displayValue: '54' },
      hints: [
        { tier: 1, cost: 0, text: 'Start with a big chunk you know: 8 × 50 = 400. Subtract: 432 - 400 = ?', type: 'conceptual' },
        { tier: 2, cost: 1, text: '432 - 400 = 32 left. 8 × 4 = 32. Take out 4 more groups.', type: 'directional' },
        { tier: 3, cost: 2, text: '50 + 4 = 54. So 432 ÷ 8 = 54.', type: 'scaffolded' },
      ],
      solutionExplanation: 'Take out 50 eights (400), leaving 32. Take out 4 eights (32). Total: 54.',
      teachingPoint: 'Using multiples of 10 (8 × 50 = 400) as your first chunk makes partial quotients efficient.',
      tags: ['division', 'partial-quotients'],
      difficulty: 2,
    },
    {
      id: 'placeholder', levelId: 'placeholder', sequence: 3,
      type: 'numeric_input', category: 'thinking',
      statement: 'Use partial quotients to calculate 672 ÷ 6.',
      inputType: 'number_pad',
      correctAnswer: { value: 112, displayValue: '112' },
      hints: [
        { tier: 1, cost: 0, text: 'Start big: 6 × 100 = 600. Subtract: 672 - 600 = ?', type: 'conceptual' },
        { tier: 2, cost: 1, text: '672 - 600 = 72 left. 6 × 10 = 60. Take out 10 more: 72 - 60 = 12.', type: 'directional' },
        { tier: 3, cost: 2, text: '6 × 2 = 12. Take out 2 more. Total: 100 + 10 + 2 = 112.', type: 'scaffolded' },
      ],
      solutionExplanation: 'Take out 100 sixes (600), then 10 sixes (60), then 2 sixes (12). Total: 112.',
      teachingPoint: 'Partial quotients builds naturally on place value: hundreds, then tens, then ones.',
      tags: ['division', 'partial-quotients'],
      difficulty: 3,
    },
  ],
};

ch5.levels.splice(longDivIdx, 0, partialQuotientsLevel);
console.log('Inserted Partial Quotients level.');

// 2. Add special quotient problems to "Division as Sharing" (first level)
const divSharingLevel = ch5.levels[0];
const specialProblems = [
  {
    id: 'placeholder', levelId: 'placeholder', sequence: 4,
    type: 'numeric_input', category: 'thinking',
    statement: 'What is 45 ÷ 1? (Any number divided by 1 equals...?)',
    inputType: 'number_pad',
    correctAnswer: { value: 45, displayValue: '45' },
    hints: [
      { tier: 1, cost: 0, text: 'If you share 45 coins among 1 person, how many does that person get?', type: 'conceptual' },
      { tier: 2, cost: 1, text: 'Dividing by 1 means no sharing needed — the whole amount goes to one group.', type: 'directional' },
      { tier: 3, cost: 2, text: 'Any number ÷ 1 = that same number. 45 ÷ 1 = 45.', type: 'scaffolded' },
    ],
    solutionExplanation: '45 ÷ 1 = 45. Dividing by 1 gives the number itself.',
    teachingPoint: 'Special quotients: n ÷ 1 = n (dividing by 1 changes nothing), n ÷ n = 1 (any number divided by itself is 1), 0 ÷ n = 0 (zero divided by anything is zero).',
    tags: ['division', 'special-quotients'],
    difficulty: 1,
  },
  {
    id: 'placeholder', levelId: 'placeholder', sequence: 5,
    type: 'multiple_choice', category: 'thinking',
    statement: 'What happens when you try to calculate 8 ÷ 0? A) 0 B) 8 C) 1 D) It is undefined — division by zero is impossible',
    inputType: 'multiple_choice',
    correctAnswer: { value: 'D) It is undefined — division by zero is impossible', displayValue: 'D — you cannot divide by zero' },
    hints: [
      { tier: 1, cost: 0, text: 'If you share 8 cookies among 0 people, does that make sense?', type: 'conceptual' },
      { tier: 2, cost: 1, text: 'There is no number × 0 that equals 8. So the division has no answer.', type: 'directional' },
      { tier: 3, cost: 2, text: 'Division by zero is undefined — it is a mathematical impossibility.', type: 'scaffolded' },
    ],
    solutionExplanation: 'Division by zero is undefined. No number times 0 can equal 8.',
    teachingPoint: 'Division by zero is undefined. You can never divide by zero — it does not produce any number.',
    tags: ['division', 'special-quotients'],
    difficulty: 2,
  },
];
divSharingLevel.problems.push(...specialProblems);

// 3. Add divisibility by 25 and 100 to "Divisibility by 4" level
const divBy4Level = ch5.levels.find(l => l.name === 'Divisibility by 4');
const divBy25Problems = [
  {
    id: 'placeholder', levelId: 'placeholder', sequence: 4,
    type: 'multiple_choice', category: 'thinking',
    statement: 'Is 3,750 divisible by 25? A) Yes B) No',
    inputType: 'multiple_choice',
    correctAnswer: { value: 'A) Yes', displayValue: 'A — 3,750 ÷ 25 = 150' },
    hints: [
      { tier: 1, cost: 0, text: 'Divisibility by 25: check if the last two digits form a number divisible by 25.', type: 'conceptual' },
      { tier: 2, cost: 1, text: 'The last two digits are 50. Is 50 divisible by 25?', type: 'directional' },
      { tier: 3, cost: 2, text: '50 ÷ 25 = 2. Yes! So 3,750 is divisible by 25.', type: 'scaffolded' },
    ],
    solutionExplanation: 'Yes — the last two digits (50) are divisible by 25.',
    teachingPoint: 'Divisibility by 25: a number is divisible by 25 if its last two digits are 00, 25, 50, or 75.',
    tags: ['division', 'divisibility-rules'],
    difficulty: 3,
  },
  {
    id: 'placeholder', levelId: 'placeholder', sequence: 5,
    type: 'multiple_choice', category: 'thinking',
    statement: 'Is 4,300 divisible by 100? A) Yes B) No',
    inputType: 'multiple_choice',
    correctAnswer: { value: 'A) Yes', displayValue: 'A — 4,300 ÷ 100 = 43' },
    hints: [
      { tier: 1, cost: 0, text: 'Divisibility by 100: check if the last two digits are both zero.', type: 'conceptual' },
      { tier: 2, cost: 1, text: 'The last two digits of 4,300 are "00." That is 0, which is divisible by 100.', type: 'directional' },
      { tier: 3, cost: 2, text: '4,300 ends in 00, so it is divisible by 100. 4,300 ÷ 100 = 43.', type: 'scaffolded' },
    ],
    solutionExplanation: 'Yes — 4,300 ends in 00, so it is divisible by 100.',
    teachingPoint: 'Divisibility by 100: a number is divisible by 100 if and only if its last two digits are 00.',
    tags: ['division', 'divisibility-rules'],
    difficulty: 2,
  },
];
divBy4Level.problems.push(...divBy25Problems);

// 4. Rewrite Long Division hints with reasoning language
const longDivLevel = ch5.levels.find(l => l.name === 'Long Division Method');
if (longDivLevel) {
  console.log('Rewriting Long Division hints...');
  // Problem 1: 847 ÷ 7
  longDivLevel.problems[0].hints = [
    { tier: 1, cost: 0, text: 'How many groups of 7 can you take from 847? Start with the hundreds place.', type: 'conceptual' },
    { tier: 2, cost: 1, text: 'From 800: one hundred 7s is 700. That leaves 147. From 147: twenty 7s is 140. That leaves 7.', type: 'directional' },
    { tier: 3, cost: 2, text: '100 + 20 + 1 = 121 groups of 7. Check: 121 × 7 = 847. ✓', type: 'scaffolded' },
  ];
  longDivLevel.problems[0].teachingPoint = 'Long division works through place values: how many groups of the divisor fit in the hundreds, then tens, then ones.';

  // Problem 2: 936 ÷ 4
  longDivLevel.problems[1].hints = [
    { tier: 1, cost: 0, text: 'Start big: how many groups of 4 can you pull from 900? From the leftover?', type: 'conceptual' },
    { tier: 2, cost: 1, text: '200 fours = 800, leaving 136. 30 fours = 120, leaving 16. How many fours in 16?', type: 'directional' },
    { tier: 3, cost: 2, text: '200 + 30 + 4 = 234. Check: 234 × 4 = 936. ✓', type: 'scaffolded' },
  ];
  longDivLevel.problems[1].teachingPoint = 'Think of long division as repeated subtraction: keep taking groups until nothing is left.';

  // Problem 3: 1,344 ÷ 24
  longDivLevel.problems[2].hints = [
    { tier: 1, cost: 0, text: 'Estimate first: 24 × 50 = 1200, 24 × 60 = 1440. The answer is between 50 and 60.', type: 'conceptual' },
    { tier: 2, cost: 1, text: '50 twenty-fours = 1200. 1344 - 1200 = 144 left. How many 24s in 144?', type: 'directional' },
    { tier: 3, cost: 2, text: '24 × 6 = 144 exactly. Total: 50 + 6 = 56.', type: 'scaffolded' },
  ];
  longDivLevel.problems[2].teachingPoint = 'Estimating first narrows down the answer, making the division easier and giving you a way to check your work.';
}

// 5. Update learning objectives
ch5.learningObjectives = [
  'Understand division as sharing and grouping',
  'Use partial quotients for flexible division',
  'Perform long division',
  'Apply divisibility rules for 2, 3, 4, 5, 9, 25, and 100',
  'Understand remainders and special quotients (n÷1, n÷n, 0÷n, n÷0)',
];

// 6. Renumber all levels and problems
ch5.levels.forEach((level, idx) => {
  const num = idx + 1;
  level.id = `level-4-5-${num}`;
  level.number = num;
  level.chapterId = 'chapter-4-5';
  level.worldId = 'world-4';

  level.problems.forEach((p, pi) => {
    p.id = `problem-4-5-${num}-${pi + 1}`;
    p.levelId = `level-4-5-${num}`;
    p.sequence = pi + 1;
  });
});

// Update totalLevels (+1)
world.totalLevels += 1;

writeFileSync(worldPath, JSON.stringify(world, null, 2) + '\n');
console.log(`\nDone! Ch5 now has ${ch5.levels.length} levels (was 10).`);
console.log(`World totalLevels: ${world.totalLevels}`);
console.log('Run: node scripts/validate-world.mjs data/world-4.json');

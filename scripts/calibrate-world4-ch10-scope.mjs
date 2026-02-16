#!/usr/bin/env node
/**
 * Calibrate World 4, Chapter 10: Remove fraction×fraction content (Grade 5 / BA5 Ch6),
 * replace with BA4-scope content: whole×fraction, unit fraction division, "fraction of" problems.
 *
 * Removes 6 levels: 4-10-3, 4-10-4, 4-10-5, 4-10-10, 4-10-11, 4-10-12
 * Replaces with 6 new BA4-scope levels.
 * Replaces individual fraction×fraction problems in other levels.
 *
 * Run: node scripts/calibrate-world4-ch10-scope.mjs
 * Validate: node scripts/validate-world.mjs data/world-4.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const worldPath = resolve(__dirname, '../data/world-4.json');

const world = JSON.parse(readFileSync(worldPath, 'utf-8'));
const ch10 = world.chapters[9];

if (ch10.id !== 'chapter-4-10') {
  console.error('Expected chapter-4-10 at index 9, got:', ch10.id);
  process.exit(1);
}

// 1. Remove 6 levels focused on fraction×fraction
const levelsToRemove = new Set([
  'level-4-10-3', 'level-4-10-4', 'level-4-10-5',
  'level-4-10-10', 'level-4-10-11', 'level-4-10-12',
]);

const oldCount = ch10.levels.length;
ch10.levels = ch10.levels.filter(l => !levelsToRemove.has(l.id));
console.log(`Removed ${oldCount - ch10.levels.length} fraction×fraction levels.`);

// 2. Create 6 replacement levels
const newLevels = [
  {
    id: 'placeholder', // Will be renumbered
    chapterId: 'chapter-4-10',
    worldId: 'world-4',
    number: 0,
    name: 'Finding a Fraction of a Number',
    type: 'teaching',
    storyContext: 'Prof. Owlbert shows a treasure chest. "If we want to share 24 gold coins equally among groups, fractions tell us exactly how many each group gets!"',
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
          dialogue: '"Fraction of a number" means dividing into equal parts and taking some. To find 1/3 of 24, divide 24 into 3 equal parts: 24 ÷ 3 = 8. So 1/3 of 24 is 8!',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-2',
          characterId: 'prof-owlbert',
          expression: 'thinking',
          dialogue: 'For 2/3 of 24: first find 1/3 (that\'s 8), then multiply by 2: 8 × 2 = 16. The denominator tells you how many parts, the numerator tells you how many parts to take.',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-3',
          characterId: 'prof-owlbert',
          expression: 'encouraging',
          dialogue: 'This is the same as multiplying! 2/3 of 24 = 2/3 × 24 = (2 × 24) / 3 = 48/3 = 16. Both methods give the same answer.',
          interactionType: 'click-to-continue',
        },
      ],
      estimatedSeconds: 90,
      skippable: true,
    },
    problems: [
      {
        id: 'placeholder',
        levelId: 'placeholder',
        sequence: 1,
        type: 'numeric_input',
        category: 'thinking',
        statement: 'What is 1/3 of 24? Think: divide 24 into 3 equal groups.',
        inputType: 'number_pad',
        correctAnswer: { value: 8, displayValue: '8' },
        hints: [
          { tier: 1, cost: 0, text: '"1/3 of" means divide into 3 equal parts and take 1 part.', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'Divide 24 into 3 equal groups: 24 ÷ 3 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '24 ÷ 3 = 8. So 1/3 of 24 = 8.', type: 'scaffolded' },
        ],
        solutionExplanation: '1/3 of 24 = 24 ÷ 3 = 8.',
        teachingPoint: '"1/3 of a number" means divide by 3. The denominator tells you how many equal parts.',
        tags: ['fraction-operations', 'fraction-of'],
        difficulty: 1,
      },
      {
        id: 'placeholder',
        levelId: 'placeholder',
        sequence: 2,
        type: 'numeric_input',
        category: 'thinking',
        statement: 'What is 2/5 of 30?',
        inputType: 'number_pad',
        correctAnswer: { value: 12, displayValue: '12' },
        hints: [
          { tier: 1, cost: 0, text: 'First find 1/5 of 30, then multiply by 2.', type: 'conceptual' },
          { tier: 2, cost: 1, text: '1/5 of 30 = 30 ÷ 5 = 6. Now take 2 of those fifths.', type: 'directional' },
          { tier: 3, cost: 2, text: '2/5 of 30 = 6 × 2 = 12.', type: 'scaffolded' },
        ],
        solutionExplanation: '1/5 of 30 = 6, so 2/5 of 30 = 12.',
        teachingPoint: 'To find a fraction of a number: divide by the denominator, then multiply by the numerator.',
        tags: ['fraction-operations', 'fraction-of'],
        difficulty: 2,
      },
      {
        id: 'placeholder',
        levelId: 'placeholder',
        sequence: 3,
        type: 'numeric_input',
        category: 'thinking',
        statement: 'What is 3/4 of 60?',
        inputType: 'number_pad',
        correctAnswer: { value: 45, displayValue: '45' },
        hints: [
          { tier: 1, cost: 0, text: 'Find 1/4 of 60 first, then multiply by 3.', type: 'conceptual' },
          { tier: 2, cost: 1, text: '1/4 of 60 = 60 ÷ 4 = 15. Now take 3 of those quarters.', type: 'directional' },
          { tier: 3, cost: 2, text: '3/4 of 60 = 15 × 3 = 45.', type: 'scaffolded' },
        ],
        solutionExplanation: '1/4 of 60 = 15, so 3/4 of 60 = 45.',
        teachingPoint: '3/4 of 60 = 3 × (60 ÷ 4) = 3 × 15 = 45. This is the same as (3 × 60) / 4.',
        tags: ['fraction-operations', 'fraction-of'],
        difficulty: 2,
      },
    ],
  },
  {
    id: 'placeholder',
    chapterId: 'chapter-4-10',
    worldId: 'world-4',
    number: 0,
    name: 'Fraction of a Whole — Word Problems',
    type: 'practice',
    storyContext: 'Lizzie is planning a feast. "If we have 48 cookies and give 1/4 to the crew, how many do they get? Fractions help us figure it out!"',
    difficulty: 2,
    estimatedMinutes: 4,
    isChallenge: false,
    isBoss: false,
    problems: [
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 1,
        type: 'numeric_input', category: 'thinking',
        statement: 'A class has 36 students. 2/3 of them chose pizza for lunch. How many students chose pizza?',
        inputType: 'number_pad',
        correctAnswer: { value: 24, displayValue: '24' },
        hints: [
          { tier: 1, cost: 0, text: '"2/3 of 36" — find 1/3 of 36 first, then double it.', type: 'conceptual' },
          { tier: 2, cost: 1, text: '1/3 of 36 = 36 ÷ 3 = 12. Now 2/3 = 12 × 2 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '2/3 of 36 = 12 × 2 = 24 students chose pizza.', type: 'scaffolded' },
        ],
        solutionExplanation: '2/3 of 36 = 24 students.',
        teachingPoint: 'In word problems, "fraction of" always means multiply the fraction by the total.',
        tags: ['fraction-operations', 'fraction-of', 'word-problems'],
        difficulty: 2,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 2,
        type: 'numeric_input', category: 'thinking',
        statement: 'A baker made 48 cookies. She sold 5/8 of them. How many cookies did she sell?',
        inputType: 'number_pad',
        correctAnswer: { value: 30, displayValue: '30' },
        hints: [
          { tier: 1, cost: 0, text: 'Find 1/8 of 48 first, then multiply by 5.', type: 'conceptual' },
          { tier: 2, cost: 1, text: '1/8 of 48 = 48 ÷ 8 = 6. Now 5 × 6 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '5/8 of 48 = 5 × 6 = 30 cookies sold.', type: 'scaffolded' },
        ],
        solutionExplanation: '5/8 of 48 = 30 cookies.',
        teachingPoint: 'Real-world fraction problems: divide the total by the denominator, multiply by the numerator.',
        tags: ['fraction-operations', 'fraction-of', 'word-problems'],
        difficulty: 2,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 3,
        type: 'numeric_input', category: 'thinking',
        statement: 'A garden has 40 flowers. 3/10 are roses. How many roses are there?',
        inputType: 'number_pad',
        correctAnswer: { value: 12, displayValue: '12' },
        hints: [
          { tier: 1, cost: 0, text: 'What is 1/10 of 40? Then multiply by 3.', type: 'conceptual' },
          { tier: 2, cost: 1, text: '1/10 of 40 = 4. So 3/10 of 40 = 4 × 3 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '3/10 of 40 = 4 × 3 = 12 roses.', type: 'scaffolded' },
        ],
        solutionExplanation: '3/10 of 40 = 12 roses.',
        teachingPoint: 'When the denominator divides the total evenly, finding "fraction of" is straightforward division and multiplication.',
        tags: ['fraction-operations', 'fraction-of', 'word-problems'],
        difficulty: 2,
      },
    ],
  },
  {
    id: 'placeholder',
    chapterId: 'chapter-4-10',
    worldId: 'world-4',
    number: 0,
    name: 'Unit Fraction Division',
    type: 'teaching',
    storyContext: 'Captain Claw is cutting rope. "I need 1/4-meter pieces. How many can I cut from a 5-meter rope? This is division by a unit fraction!"',
    difficulty: 3,
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
          dialogue: 'Dividing by a unit fraction asks: "How many pieces of that size fit?" If you cut a 5-meter rope into 1/4-meter pieces, you\'re asking: how many 1/4s are in 5?',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-2',
          characterId: 'prof-owlbert',
          expression: 'thinking',
          dialogue: 'Each whole meter has 4 quarter-meter pieces. So 5 meters have 5 × 4 = 20 pieces. That\'s why 5 ÷ 1/4 = 20! Dividing by 1/4 is the same as multiplying by 4.',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-3',
          characterId: 'prof-owlbert',
          expression: 'encouraging',
          dialogue: 'The pattern: dividing by 1/n is the same as multiplying by n. 5 ÷ 1/4 = 5 × 4 = 20. Makes sense — smaller pieces means MORE pieces fit!',
          interactionType: 'click-to-continue',
        },
      ],
      estimatedSeconds: 90,
      skippable: true,
    },
    problems: [
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 1,
        type: 'numeric_input', category: 'thinking',
        statement: 'How many 1/4-pound patties can you make from 5 pounds of ground beef? (Calculate 5 ÷ 1/4)',
        inputType: 'number_pad',
        correctAnswer: { value: 20, displayValue: '20' },
        hints: [
          { tier: 1, cost: 0, text: 'Think: how many quarter-pounds fit into 5 pounds?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'Each pound gives you 4 quarter-pound patties. So 5 pounds give you 5 × 4 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '5 ÷ 1/4 = 5 × 4 = 20 patties.', type: 'scaffolded' },
        ],
        solutionExplanation: '5 ÷ 1/4 = 20 patties.',
        teachingPoint: 'Dividing by 1/4 means "how many quarters fit?" That is the same as multiplying by 4.',
        tags: ['fraction-operations', 'unit-fraction-division'],
        difficulty: 2,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 2,
        type: 'numeric_input', category: 'thinking',
        statement: 'A board is 3 meters long. How many 1/2-meter shelves can you cut from it? (Calculate 3 ÷ 1/2)',
        inputType: 'number_pad',
        correctAnswer: { value: 6, displayValue: '6' },
        hints: [
          { tier: 1, cost: 0, text: 'How many half-meters fit in 3 meters?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'Each meter has 2 half-meters. 3 meters have 3 × 2 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '3 ÷ 1/2 = 3 × 2 = 6 shelves.', type: 'scaffolded' },
        ],
        solutionExplanation: '3 ÷ 1/2 = 6 shelves.',
        teachingPoint: 'Dividing by 1/2 is the same as multiplying by 2. You always get MORE pieces than you started with.',
        tags: ['fraction-operations', 'unit-fraction-division'],
        difficulty: 2,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 3,
        type: 'numeric_input', category: 'thinking',
        statement: 'A ribbon is 4 meters long. How many 1/3-meter bows can you make? (Calculate 4 ÷ 1/3)',
        inputType: 'number_pad',
        correctAnswer: { value: 12, displayValue: '12' },
        hints: [
          { tier: 1, cost: 0, text: 'How many thirds fit in each whole meter? Then multiply by 4.', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'Each meter has 3 thirds. So 4 meters have 4 × 3 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '4 ÷ 1/3 = 4 × 3 = 12 bows.', type: 'scaffolded' },
        ],
        solutionExplanation: '4 ÷ 1/3 = 12 bows.',
        teachingPoint: 'Dividing by 1/n = multiplying by n. The smaller the fraction, the more pieces fit!',
        tags: ['fraction-operations', 'unit-fraction-division'],
        difficulty: 2,
      },
    ],
  },
  {
    id: 'placeholder',
    chapterId: 'chapter-4-10',
    worldId: 'world-4',
    number: 0,
    name: 'Division by Unit Fractions — Real World',
    type: 'practice',
    storyContext: 'Grogg is measuring out ingredients. "If each portion is 1/3 of a cup and I have 8 cups total, how many portions can I make?"',
    difficulty: 3,
    estimatedMinutes: 4,
    isChallenge: false,
    isBoss: false,
    problems: [
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 1,
        type: 'numeric_input', category: 'thinking',
        statement: 'A race track is 6 miles long. Each lap is 1/5 of a mile. How many laps are in one full race?',
        inputType: 'number_pad',
        correctAnswer: { value: 30, displayValue: '30' },
        hints: [
          { tier: 1, cost: 0, text: 'How many 1/5-mile segments fit in 6 miles?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'Each mile has 5 fifths. So 6 miles have 6 × 5 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '6 ÷ 1/5 = 6 × 5 = 30 laps.', type: 'scaffolded' },
        ],
        solutionExplanation: '6 ÷ 1/5 = 30 laps.',
        teachingPoint: 'Real-world division by unit fractions: how many small pieces fit in a larger amount.',
        tags: ['fraction-operations', 'unit-fraction-division', 'word-problems'],
        difficulty: 3,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 2,
        type: 'numeric_input', category: 'thinking',
        statement: 'A water tank holds 10 gallons. Each bucket holds 1/4 gallon. How many buckets can be filled?',
        inputType: 'number_pad',
        correctAnswer: { value: 40, displayValue: '40' },
        hints: [
          { tier: 1, cost: 0, text: 'How many quarter-gallons are in 10 gallons?', type: 'conceptual' },
          { tier: 2, cost: 1, text: '10 gallons × 4 quarter-gallons per gallon = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '10 ÷ 1/4 = 10 × 4 = 40 buckets.', type: 'scaffolded' },
        ],
        solutionExplanation: '10 ÷ 1/4 = 40 buckets.',
        teachingPoint: 'Dividing by 1/4 = multiplying by 4. The answer is always bigger because you are counting smaller pieces.',
        tags: ['fraction-operations', 'unit-fraction-division', 'word-problems'],
        difficulty: 3,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 3,
        type: 'numeric_input', category: 'thinking',
        statement: 'A teacher has 7 liters of paint. Each student needs 1/3 liter. How many full portions can the teacher give out?',
        inputType: 'number_pad',
        correctAnswer: { value: 21, displayValue: '21' },
        hints: [
          { tier: 1, cost: 0, text: 'How many 1/3-liter portions fit in 7 liters?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'Each liter has 3 thirds. So 7 liters have 7 × 3 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '7 ÷ 1/3 = 7 × 3 = 21 portions.', type: 'scaffolded' },
        ],
        solutionExplanation: '7 ÷ 1/3 = 21 full portions.',
        teachingPoint: 'With 7 liters and 1/3-liter portions, every liter yields 3 portions, so 7 × 3 = 21.',
        tags: ['fraction-operations', 'unit-fraction-division', 'word-problems'],
        difficulty: 3,
      },
    ],
  },
  {
    id: 'placeholder',
    chapterId: 'chapter-4-10',
    worldId: 'world-4',
    number: 0,
    name: 'Multiplying Whole Numbers by Fractions',
    type: 'standard',
    storyContext: 'Lizzie calculates supplies. "We need 6 bags of flour, but each recipe only uses 2/3 of a bag. So we multiply 6 × 2/3."',
    difficulty: 3,
    estimatedMinutes: 4,
    isChallenge: false,
    isBoss: false,
    problems: [
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 1,
        type: 'numeric_input', category: 'thinking',
        statement: 'Calculate 6 × 2/3. Think: take 2/3 of 6.',
        inputType: 'number_pad',
        correctAnswer: { value: 4, displayValue: '4' },
        hints: [
          { tier: 1, cost: 0, text: '6 × 2/3 means "2/3 of 6." Find 1/3 of 6 first.', type: 'conceptual' },
          { tier: 2, cost: 1, text: '1/3 of 6 = 2. So 2/3 of 6 = 2 × 2 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '6 × 2/3 = (6 × 2) / 3 = 12/3 = 4.', type: 'scaffolded' },
        ],
        solutionExplanation: '6 × 2/3 = 4.',
        teachingPoint: 'Multiplying a whole number by a fraction: multiply the whole number by the numerator, then divide by the denominator.',
        tags: ['fraction-operations', 'whole-times-fraction'],
        difficulty: 2,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 2,
        type: 'numeric_input', category: 'thinking',
        statement: 'Calculate 8 × 3/4.',
        inputType: 'number_pad',
        correctAnswer: { value: 6, displayValue: '6' },
        hints: [
          { tier: 1, cost: 0, text: '8 × 3/4 = "3/4 of 8." Find 1/4 of 8 first.', type: 'conceptual' },
          { tier: 2, cost: 1, text: '1/4 of 8 = 2. So 3/4 of 8 = 2 × 3 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '8 × 3/4 = (8 × 3) / 4 = 24/4 = 6.', type: 'scaffolded' },
        ],
        solutionExplanation: '8 × 3/4 = 6.',
        teachingPoint: 'You can also think of this as: 8 × 3 = 24, then 24 ÷ 4 = 6.',
        tags: ['fraction-operations', 'whole-times-fraction'],
        difficulty: 2,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 3,
        type: 'numeric_input', category: 'thinking',
        statement: 'Calculate 15 × 2/5.',
        inputType: 'number_pad',
        correctAnswer: { value: 6, displayValue: '6' },
        hints: [
          { tier: 1, cost: 0, text: 'Find 1/5 of 15 first, then multiply by 2.', type: 'conceptual' },
          { tier: 2, cost: 1, text: '1/5 of 15 = 3. So 2/5 of 15 = 3 × 2 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '15 × 2/5 = (15 × 2) / 5 = 30/5 = 6.', type: 'scaffolded' },
        ],
        solutionExplanation: '15 × 2/5 = 6.',
        teachingPoint: 'When the whole number is divisible by the denominator, dividing first makes the calculation easier.',
        tags: ['fraction-operations', 'whole-times-fraction'],
        difficulty: 3,
      },
    ],
  },
  {
    id: 'placeholder',
    chapterId: 'chapter-4-10',
    worldId: 'world-4',
    number: 0,
    name: 'Fraction Reasoning Challenge',
    type: 'challenge',
    storyContext: 'Sir Calculate poses a final challenge. "Can you combine what you know about fractions of numbers and division by fractions to solve these puzzles?"',
    difficulty: 4,
    estimatedMinutes: 5,
    isChallenge: true,
    isBoss: false,
    problems: [
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 1,
        type: 'numeric_input', category: 'thinking',
        statement: 'If 3/5 of a number is 24, what is the number? (Hint: find 1/5 first, then the whole.)',
        inputType: 'number_pad',
        correctAnswer: { value: 40, displayValue: '40' },
        hints: [
          { tier: 1, cost: 0, text: 'If 3/5 of the number is 24, what is 1/5 of the number?', type: 'conceptual' },
          { tier: 2, cost: 1, text: '3 fifths = 24, so 1 fifth = 24 ÷ 3 = 8.', type: 'directional' },
          { tier: 3, cost: 2, text: '1/5 = 8, so the whole number = 8 × 5 = 40.', type: 'scaffolded' },
        ],
        solutionExplanation: '3/5 of ? = 24. So 1/5 = 8, and the whole = 40.',
        teachingPoint: 'Working backwards: if fraction × whole = part, then whole = part ÷ fraction.',
        tags: ['fraction-operations', 'working-backwards'],
        difficulty: 4,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 2,
        type: 'numeric_input', category: 'thinking',
        statement: 'A tank is 2/3 full with 18 liters. How many liters does the full tank hold?',
        inputType: 'number_pad',
        correctAnswer: { value: 27, displayValue: '27' },
        hints: [
          { tier: 1, cost: 0, text: 'If 2/3 of the tank is 18 liters, what is 1/3?', type: 'conceptual' },
          { tier: 2, cost: 1, text: '2 thirds = 18 liters, so 1 third = 18 ÷ 2 = 9 liters.', type: 'directional' },
          { tier: 3, cost: 2, text: '1/3 = 9 liters, so the full tank = 9 × 3 = 27 liters.', type: 'scaffolded' },
        ],
        solutionExplanation: '2/3 of tank = 18. So 1/3 = 9, full tank = 27 liters.',
        teachingPoint: 'Finding the whole from a part: divide by the numerator, multiply by the denominator.',
        tags: ['fraction-operations', 'working-backwards', 'word-problems'],
        difficulty: 4,
      },
    ],
  },
];

// 3. Insert new levels. Place them after level-4-10-2 (Multiple Methods)
// Current order after removal: 4-10-1, 4-10-2, 4-10-6, 4-10-7, 4-10-8, 4-10-9, 4-10-13, 4-10-14
// Insert new levels between 4-10-2 and 4-10-6
const insertIdx = ch10.levels.findIndex(l => l.id === 'level-4-10-6');
if (insertIdx === -1) {
  // If 4-10-6 not found (already renumbered), insert after index 1
  ch10.levels.splice(2, 0, ...newLevels);
} else {
  ch10.levels.splice(insertIdx, 0, ...newLevels);
}

// 4. Replace individual fraction×fraction problems in remaining levels
const replacements = {
  'problem-4-10-2-2': {
    statement: 'Calculate 4 × 3/8. Simplify your answer.',
    correctAnswer: { value: '3/2', displayValue: '3/2 (or 1 1/2)' },
    type: 'text_input',
    inputType: 'text_field',
    hints: [
      { tier: 1, cost: 0, text: '4 × 3/8 means "take 3/8 four times." Multiply numerator by 4.', type: 'conceptual' },
      { tier: 2, cost: 1, text: '(4 × 3) / 8 = 12/8. Now simplify: divide top and bottom by 4.', type: 'directional' },
      { tier: 3, cost: 2, text: '12/8 = 3/2 = 1 1/2.', type: 'scaffolded' },
    ],
    solutionExplanation: '4 × 3/8 = 12/8 = 3/2.',
    teachingPoint: 'When a whole number × fraction gives an improper fraction, simplify by dividing numerator and denominator by their GCD.',
    tags: ['fraction-operations', 'whole-times-fraction'],
    difficulty: 3,
  },
  'problem-4-10-2-3': {
    statement: 'What is 5/6 of 42? Show your calculation.',
    correctAnswer: { value: 35, displayValue: '35' },
    type: 'numeric_input',
    inputType: 'number_pad',
    hints: [
      { tier: 1, cost: 0, text: 'Find 1/6 of 42, then multiply by 5.', type: 'conceptual' },
      { tier: 2, cost: 1, text: '42 ÷ 6 = 7. Now 7 × 5 = ?', type: 'directional' },
      { tier: 3, cost: 2, text: '5/6 of 42 = 7 × 5 = 35.', type: 'scaffolded' },
    ],
    solutionExplanation: '5/6 of 42 = 35.',
    teachingPoint: 'Dividing first (42 ÷ 6 = 7) keeps the numbers small, making the calculation easier.',
    tags: ['fraction-operations', 'fraction-of'],
    difficulty: 3,
  },
  'problem-4-10-7-2': {
    statement: 'Is 1/2 ÷ 3 the same as 1/2 × 3? Explain which is larger.',
    correctAnswer: { value: 'No', displayValue: 'No — 1/2 ÷ 3 = 1/6 but 1/2 × 3 = 3/2' },
    type: 'text_input',
    inputType: 'text_field',
    hints: [
      { tier: 1, cost: 0, text: 'Dividing by 3 makes a fraction smaller. Multiplying by 3 makes it larger.', type: 'conceptual' },
      { tier: 2, cost: 1, text: '1/2 ÷ 3 = 1/6 (splitting the half into 3 parts). 1/2 × 3 = 3/2 (three halves).', type: 'directional' },
      { tier: 3, cost: 2, text: '1/6 is much smaller than 3/2. Dividing and multiplying by the same number give opposite results.', type: 'scaffolded' },
    ],
    solutionExplanation: 'No! 1/2 ÷ 3 = 1/6 but 1/2 × 3 = 3/2 = 1 1/2.',
    teachingPoint: 'Dividing by a whole number makes a fraction smaller; multiplying makes it larger. They are very different operations.',
    tags: ['fraction-operations', 'fraction-division'],
    difficulty: 3,
  },
  'problem-4-10-7-3': {
    statement: 'Calculate 12 × 5/6. Then check by finding 5/6 of 12.',
    correctAnswer: { value: 10, displayValue: '10' },
    type: 'numeric_input',
    inputType: 'number_pad',
    hints: [
      { tier: 1, cost: 0, text: '12 × 5/6 means "take 5/6 of 12."', type: 'conceptual' },
      { tier: 2, cost: 1, text: '1/6 of 12 = 2. So 5/6 of 12 = 2 × 5 = ?', type: 'directional' },
      { tier: 3, cost: 2, text: '12 × 5/6 = (12 ÷ 6) × 5 = 2 × 5 = 10.', type: 'scaffolded' },
    ],
    solutionExplanation: '12 × 5/6 = 10.',
    teachingPoint: '"Whole × fraction" and "fraction of whole" are the same operation: 12 × 5/6 = 5/6 of 12 = 10.',
    tags: ['fraction-operations', 'whole-times-fraction'],
    difficulty: 3,
  },
  'problem-4-10-8-3': {
    statement: 'Without calculating, is 3/4 of 20 more or less than 3/4 of 16?',
    correctAnswer: { value: 'More', displayValue: 'More — 3/4 of a bigger number gives a bigger result' },
    type: 'text_input',
    inputType: 'text_field',
    hints: [
      { tier: 1, cost: 0, text: 'If you take the same fraction of two different numbers, which gives more?', type: 'conceptual' },
      { tier: 2, cost: 1, text: '3/4 of a BIGGER number always gives a BIGGER result, because you are taking the same proportion.', type: 'directional' },
      { tier: 3, cost: 2, text: 'Since 20 > 16, 3/4 of 20 > 3/4 of 16. (Check: 15 > 12.)', type: 'scaffolded' },
    ],
    solutionExplanation: 'More — 3/4 of 20 = 15 > 3/4 of 16 = 12.',
    teachingPoint: 'Taking the same fraction of a larger number always gives a larger result. This makes sense because the "parts" are bigger.',
    tags: ['fraction-operations', 'estimation', 'fraction-of'],
    difficulty: 3,
  },
  'problem-4-10-14-2': {
    statement: 'A farmer has 48 acres. He plants corn on 5/8 of the land and wheat on 1/4. How many acres are left unplanted?',
    correctAnswer: { value: 6, displayValue: '6' },
    type: 'numeric_input',
    inputType: 'number_pad',
    hints: [
      { tier: 1, cost: 0, text: 'Find 5/8 of 48 and 1/4 of 48 separately, then subtract both from 48.', type: 'conceptual' },
      { tier: 2, cost: 1, text: '5/8 of 48 = 30. 1/4 of 48 = 12. Total planted = 30 + 12 = 42.', type: 'directional' },
      { tier: 3, cost: 2, text: '48 - 42 = 6 acres unplanted.', type: 'scaffolded' },
    ],
    solutionExplanation: 'Corn: 30 acres, wheat: 12 acres, total planted: 42, unplanted: 6.',
    teachingPoint: 'Multi-step fraction problems: find each fraction of the total, combine, then subtract from the whole.',
    tags: ['fraction-operations', 'fraction-of', 'word-problems'],
    difficulty: 4,
  },
};

// Apply individual replacements
for (const level of ch10.levels) {
  for (let i = 0; i < level.problems.length; i++) {
    const p = level.problems[i];
    if (replacements[p.id]) {
      const repl = replacements[p.id];
      // Keep id, levelId, sequence, category
      p.statement = repl.statement;
      p.correctAnswer = repl.correctAnswer;
      p.type = repl.type;
      p.inputType = repl.inputType;
      p.hints = repl.hints;
      p.solutionExplanation = repl.solutionExplanation;
      p.teachingPoint = repl.teachingPoint;
      p.tags = repl.tags;
      p.difficulty = repl.difficulty;
      console.log(`  Replaced: ${p.id}`);
    }
  }
}

// 5. Renumber all levels and problems sequentially
ch10.levels.forEach((level, idx) => {
  const num = idx + 1;
  level.id = `level-4-10-${num}`;
  level.number = num;
  level.chapterId = 'chapter-4-10';
  level.worldId = 'world-4';

  level.problems.forEach((p, pi) => {
    p.id = `problem-4-10-${num}-${pi + 1}`;
    p.levelId = `level-4-10-${num}`;
    p.sequence = pi + 1;
  });
});

// 6. Update learning objectives
ch10.learningObjectives = [
  'Find a fraction of a whole number',
  'Multiply whole numbers by fractions',
  'Divide by unit fractions',
  'Solve multi-step fraction word problems',
  'Use reciprocals to divide fractions',
];

ch10.signatureContent = [
  'fraction of a number',
  'whole number times fraction',
  'unit fraction division',
  'reciprocals',
  'multi-step fraction word problems',
];

// 7. Note: totalLevels doesn't change (removed 6, added 6)

writeFileSync(worldPath, JSON.stringify(world, null, 2) + '\n');
console.log(`\nDone! Ch10 now has ${ch10.levels.length} levels.`);
console.log('Run: node scripts/validate-world.mjs data/world-4.json');

#!/usr/bin/env node
/**
 * Calibrate World 4, Chapter 12: Add dependent events content.
 * Adds 2 new levels before the boss levels:
 *   - "Drawing Without Replacement" (teaching)
 *   - "Independent vs Dependent" (practice)
 *
 * Run: node scripts/calibrate-world4-ch12-dependent.mjs
 * Validate: node scripts/validate-world.mjs data/world-4.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const worldPath = resolve(__dirname, '../data/world-4.json');

const world = JSON.parse(readFileSync(worldPath, 'utf-8'));
const ch12 = world.chapters[11];

if (ch12.id !== 'chapter-4-12') {
  console.error('Expected chapter-4-12 at index 11, got:', ch12.id);
  process.exit(1);
}

console.log(`Ch12 currently has ${ch12.levels.length} levels.`);

// Find first boss level index
const firstBossIdx = ch12.levels.findIndex(l => l.isBoss);
console.log(`First boss at index ${firstBossIdx}: ${ch12.levels[firstBossIdx].id}`);

const newLevels = [
  {
    id: 'placeholder',
    chapterId: 'chapter-4-12',
    worldId: 'world-4',
    number: 0,
    name: 'Drawing Without Replacement',
    type: 'teaching',
    storyContext: 'Prof. Owlbert holds a bag of colored marbles. "What happens to the probability when we draw a marble and DON\'T put it back? The bag changes!"',
    difficulty: 3,
    estimatedMinutes: 5,
    isChallenge: false,
    isBoss: false,
    teaching: {
      format: 'multi-step-lesson',
      steps: [
        {
          id: 'step-1',
          characterId: 'prof-owlbert',
          expression: 'thinking',
          dialogue: 'When you draw a marble and put it back, the probabilities stay the same each time. That\'s called "with replacement." But what if you DON\'T put it back?',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-2',
          characterId: 'prof-owlbert',
          expression: 'encouraging',
          dialogue: 'Imagine a bag with 3 red and 2 blue marbles (5 total). P(red first) = 3/5. If you draw red and keep it out, now there are 2 red and 2 blue (4 total). P(red second) = 2/4 = 1/2. The probability changed!',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-3',
          characterId: 'prof-owlbert',
          expression: 'happy',
          dialogue: 'This is called a "dependent event" — the second draw DEPENDS on what happened in the first draw. The total goes down by 1, and if you drew that color, its count goes down too.',
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
        statement: 'A standard deck has 52 cards, including 4 Aces. You draw one card and it\'s an Ace. Without replacing it, what is the probability the next card is also an Ace? (Write as a fraction.)',
        inputType: 'text_field',
        correctAnswer: { value: '3/51', displayValue: '3/51 (or 1/17)' },
        hints: [
          { tier: 1, cost: 0, text: 'After drawing one Ace, how many Aces remain? How many cards total remain?', type: 'conceptual' },
          { tier: 2, cost: 1, text: '3 Aces remain out of 51 total cards. P(2nd Ace) = 3/51.', type: 'directional' },
          { tier: 3, cost: 2, text: 'P(2nd Ace | 1st was Ace) = 3/51 = 1/17.', type: 'scaffolded' },
        ],
        solutionExplanation: '3 Aces left out of 51 cards = 3/51 = 1/17.',
        teachingPoint: 'Without replacement: both the favorable count AND the total count change after each draw.',
        tags: ['probability', 'dependent-events'],
        difficulty: 3,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 2,
        type: 'text_input', category: 'thinking',
        statement: 'A bag has 4 red and 6 blue marbles (10 total). You draw a blue marble and don\'t replace it. What is the probability the next marble is red? (Write as a fraction.)',
        inputType: 'text_field',
        correctAnswer: { value: '4/9', displayValue: '4/9' },
        hints: [
          { tier: 1, cost: 0, text: 'After removing 1 blue marble, how many total marbles are left? How many are red?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'Still 4 red, but now 5 blue. Total = 9 marbles. P(red) = 4/9.', type: 'directional' },
          { tier: 3, cost: 2, text: 'The blue draw removed a blue, not a red. So 4 red out of 9 total = 4/9.', type: 'scaffolded' },
        ],
        solutionExplanation: 'After removing 1 blue: 4 red + 5 blue = 9 total. P(red) = 4/9.',
        teachingPoint: 'Even though we drew blue, the total count decreased. The probability of red actually went UP (from 4/10 to 4/9).',
        tags: ['probability', 'dependent-events'],
        difficulty: 3,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 3,
        type: 'text_input', category: 'thinking',
        statement: 'A jar has 5 green and 3 yellow marbles. You draw two marbles without replacement. What is the probability both are green? (Multiply the two probabilities and write as a fraction.)',
        inputType: 'text_field',
        correctAnswer: { value: '5/14', displayValue: '5/14' },
        hints: [
          { tier: 1, cost: 0, text: 'P(1st green) = 5/8. After drawing green, what is P(2nd green)?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'P(2nd green) = 4/7 (4 green left, 7 total). Multiply: 5/8 × 4/7 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '(5 × 4) / (8 × 7) = 20/56 = 5/14.', type: 'scaffolded' },
        ],
        solutionExplanation: 'P(both green) = 5/8 × 4/7 = 20/56 = 5/14.',
        teachingPoint: 'For "both" events without replacement, multiply the probabilities — but the second probability uses the updated counts.',
        tags: ['probability', 'dependent-events'],
        difficulty: 4,
      },
    ],
  },
  {
    id: 'placeholder',
    chapterId: 'chapter-4-12',
    worldId: 'world-4',
    number: 0,
    name: 'Independent vs Dependent',
    type: 'practice',
    storyContext: 'Lizzie and Grogg are playing a game. "Are coin flips dependent on each other? What about drawing cards? Let\'s figure out the difference!"',
    difficulty: 3,
    estimatedMinutes: 4,
    isChallenge: false,
    isBoss: false,
    problems: [
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 1,
        type: 'multiple_choice', category: 'thinking',
        statement: 'You flip a coin and get heads. Does this change the probability of getting heads on the next flip? A) Yes — you\'re "due" for tails B) No — each flip is independent; P(heads) is always 1/2',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'B) No — each flip is independent; P(heads) is always 1/2', displayValue: 'B — coin flips are independent events' },
        hints: [
          { tier: 1, cost: 0, text: 'Does the coin "remember" what happened on the last flip?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'A coin has no memory. Each flip is a fresh start with the same 50/50 odds.', type: 'directional' },
          { tier: 3, cost: 2, text: 'Coin flips are independent — past results never affect future probabilities.', type: 'scaffolded' },
        ],
        solutionExplanation: 'No — coin flips are independent. Each flip always has P(heads) = 1/2.',
        teachingPoint: 'Independent events: the outcome of one does NOT affect the probabilities of the next. Coin flips and dice rolls are independent.',
        tags: ['probability', 'independent-events'],
        difficulty: 2,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 2,
        type: 'multiple_choice', category: 'thinking',
        statement: 'Which of these is a DEPENDENT event? A) Rolling a die twice B) Flipping two different coins C) Drawing two cards from a deck without replacement D) Spinning a spinner twice',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'C) Drawing two cards from a deck without replacement', displayValue: 'C — drawing without replacement changes the deck' },
        hints: [
          { tier: 1, cost: 0, text: 'Which action changes the setup before the second event happens?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'Dice, coins, and spinners reset each time. But a deck with a card removed is different.', type: 'directional' },
          { tier: 3, cost: 2, text: 'Drawing without replacement removes a card, changing the probabilities for the next draw.', type: 'scaffolded' },
        ],
        solutionExplanation: 'Drawing cards without replacement — removing a card changes the deck for the next draw.',
        teachingPoint: 'Dependent events change the conditions for future events. "Without replacement" is the classic signal for dependent events.',
        tags: ['probability', 'dependent-events', 'independent-events'],
        difficulty: 3,
      },
      {
        id: 'placeholder', levelId: 'placeholder', sequence: 3,
        type: 'text_input', category: 'thinking',
        statement: 'You roll a fair die twice. What is the probability of rolling a 6 BOTH times? (Write as a fraction.)',
        inputType: 'text_field',
        correctAnswer: { value: '1/36', displayValue: '1/36' },
        hints: [
          { tier: 1, cost: 0, text: 'Since dice rolls are independent, multiply the individual probabilities.', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'P(6 on first) = 1/6. P(6 on second) = 1/6. P(both) = 1/6 × 1/6 = ?', type: 'directional' },
          { tier: 3, cost: 2, text: '1/6 × 1/6 = 1/36.', type: 'scaffolded' },
        ],
        solutionExplanation: 'P(both 6s) = 1/6 × 1/6 = 1/36.',
        teachingPoint: 'For independent events, P(both) = P(first) × P(second). The probabilities don\'t change between events.',
        tags: ['probability', 'independent-events'],
        difficulty: 3,
      },
    ],
  },
];

// Insert new levels before first boss
ch12.levels.splice(firstBossIdx, 0, ...newLevels);

// Update learning objectives
ch12.learningObjectives = [
  'Calculate basic probabilities',
  'Understand complementary events',
  'List outcomes for multiple events',
  'Distinguish independent and dependent events',
  'Preview expected value',
];

ch12.signatureContent = [
  ...ch12.signatureContent,
  'dependent events',
  'independent vs dependent',
];

// Renumber all levels and problems
ch12.levels.forEach((level, idx) => {
  const num = idx + 1;
  level.id = `level-4-12-${num}`;
  level.number = num;
  level.chapterId = 'chapter-4-12';
  level.worldId = 'world-4';

  level.problems.forEach((p, pi) => {
    p.id = `problem-4-12-${num}-${pi + 1}`;
    p.levelId = `level-4-12-${num}`;
    p.sequence = pi + 1;
  });
});

// Update totalLevels (+2)
world.totalLevels += 2;

writeFileSync(worldPath, JSON.stringify(world, null, 2) + '\n');
console.log(`\nDone! Ch12 now has ${ch12.levels.length} levels (was 11).`);
console.log(`World totalLevels: ${world.totalLevels}`);
console.log('Run: node scripts/validate-world.mjs data/world-4.json');

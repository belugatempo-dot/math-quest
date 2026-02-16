#!/usr/bin/env node
/**
 * Calibrate World 4, Chapter 1: Broaden from "Angle Island" to "Shape Island".
 * Adds 3 new levels: Geometric Definitions, Classifying Quadrilaterals, Lines of Symmetry.
 * Renumbers boss level from 10 → 13.
 *
 * Run: node scripts/calibrate-world4-ch1-shapes.mjs
 * Validate: node scripts/validate-world.mjs data/world-4.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const worldPath = resolve(__dirname, '../data/world-4.json');

const world = JSON.parse(readFileSync(worldPath, 'utf-8'));
const ch1 = world.chapters[0];

if (ch1.id !== 'chapter-4-1') {
  console.error('Expected chapter-4-1 at index 0, got:', ch1.id);
  process.exit(1);
}

// 1. Rename chapter
console.log('Renaming chapter: "Angle Island" → "Shape Island"');
ch1.name = 'Shape Island';
ch1.topic = 'shapes';

// 2. Update learning objectives
ch1.learningObjectives = [
  'Understand angles as measures of rotation',
  'Identify complementary and supplementary angles',
  'Apply triangle angle sum property',
  'Recognize parallel and perpendicular lines',
  'Identify points, lines, segments, and rays',
  'Classify quadrilaterals using inclusive definitions',
  'Identify lines of symmetry and rotational symmetry',
];

ch1.signatureContent = [
  'complementary angles',
  'supplementary angles',
  'triangle angle sum',
  'parallel and perpendicular lines',
  'geometric definitions',
  'quadrilateral classification',
  'symmetry',
];

// 3. Create 3 new levels to insert before the boss (currently level-4-1-10)
const newLevels = [
  {
    id: 'level-4-1-10',
    chapterId: 'chapter-4-1',
    worldId: 'world-4',
    number: 10,
    name: 'Geometric Definitions',
    type: 'teaching',
    storyContext: 'Prof. Owlbert unrolls an ancient scroll. "Before we leave this island, let\'s master the language of geometry. Every shape starts with these building blocks!"',
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
          dialogue: 'Geometry has precise vocabulary. A POINT is a location with no size — just a dot. A LINE goes on forever in both directions. A LINE SEGMENT has two endpoints. A RAY starts at one point and goes on forever in one direction.',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-2',
          characterId: 'prof-owlbert',
          expression: 'thinking',
          dialogue: 'Think of a ray like a flashlight beam — it starts at the bulb and shines out forever. A segment is like a stick — it has a definite start and end. A line is like train tracks extending infinitely both ways.',
          interactionType: 'click-to-continue',
        },
        {
          id: 'step-3',
          characterId: 'prof-owlbert',
          expression: 'encouraging',
          dialogue: 'When two rays share the same starting point, they form an angle. That shared point is the VERTEX. We name angles by three points — the vertex goes in the middle. Angle ABC has vertex B.',
          interactionType: 'click-to-continue',
        },
      ],
      estimatedSeconds: 90,
      skippable: true,
    },
    problems: [
      {
        id: 'problem-4-1-10-1',
        levelId: 'level-4-1-10',
        sequence: 1,
        type: 'multiple_choice',
        category: 'thinking',
        statement: 'Which of these goes on forever in BOTH directions? A) A point B) A line segment C) A ray D) A line',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'D) A line', displayValue: 'D — a line extends infinitely in both directions' },
        hints: [
          { tier: 1, cost: 0, text: 'Think about what "both directions" means — which geometric object has no endpoints?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'A segment has 2 endpoints, a ray has 1 endpoint. How many endpoints does a line have?', type: 'directional' },
          { tier: 3, cost: 2, text: 'A line has zero endpoints — it extends infinitely in both directions. The answer is D.', type: 'scaffolded' },
        ],
        solutionExplanation: 'A line extends infinitely in both directions, with no endpoints.',
        teachingPoint: 'A line has no endpoints and extends forever in both directions. A ray has one endpoint; a segment has two.',
        tags: ['shapes', 'geometric-definitions'],
        difficulty: 1,
      },
      {
        id: 'problem-4-1-10-2',
        levelId: 'level-4-1-10',
        sequence: 2,
        type: 'multiple_choice',
        category: 'thinking',
        statement: 'In angle PQR, which letter names the vertex? A) P B) Q C) R',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'B) Q', displayValue: 'B — the middle letter Q is the vertex' },
        hints: [
          { tier: 1, cost: 0, text: 'When we name an angle with three letters, where does the vertex letter go?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'The vertex is always the MIDDLE letter in an angle name.', type: 'directional' },
          { tier: 3, cost: 2, text: 'In angle PQR, the middle letter is Q, so Q is the vertex.', type: 'scaffolded' },
        ],
        solutionExplanation: 'The vertex is Q — always the middle letter when naming an angle.',
        teachingPoint: 'When naming an angle with three letters, the vertex is always the middle letter.',
        tags: ['shapes', 'geometric-definitions'],
        difficulty: 1,
      },
      {
        id: 'problem-4-1-10-3',
        levelId: 'level-4-1-10',
        sequence: 3,
        type: 'multiple_choice',
        category: 'thinking',
        statement: 'A flashlight beam starts at the bulb and shines outward forever. Which geometric figure is this most like? A) A line B) A line segment C) A ray D) A point',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'C) A ray', displayValue: 'C — a ray has one endpoint and extends in one direction' },
        hints: [
          { tier: 1, cost: 0, text: 'The beam has a starting point (the bulb) but no ending point. Which figure matches?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'One endpoint and extends forever in one direction — that sounds like a ray.', type: 'directional' },
          { tier: 3, cost: 2, text: 'A ray starts at one point and goes on forever in one direction, just like a flashlight beam.', type: 'scaffolded' },
        ],
        solutionExplanation: 'A ray — it has one endpoint and extends infinitely in one direction.',
        teachingPoint: 'A ray has exactly one endpoint and extends infinitely in one direction, like a flashlight beam.',
        tags: ['shapes', 'geometric-definitions'],
        difficulty: 2,
      },
    ],
  },
  {
    id: 'level-4-1-11',
    chapterId: 'chapter-4-1',
    worldId: 'world-4',
    number: 11,
    name: 'Classifying Quadrilaterals',
    type: 'practice',
    storyContext: 'Lizzie finds a mosaic of shapes on the temple floor. "These are all four-sided shapes, but they\'re not all the same. Let\'s figure out what makes each one special!"',
    difficulty: 3,
    estimatedMinutes: 4,
    isChallenge: false,
    isBoss: false,
    problems: [
      {
        id: 'problem-4-1-11-1',
        levelId: 'level-4-1-11',
        sequence: 1,
        type: 'multiple_choice',
        category: 'thinking',
        statement: 'A trapezoid is a quadrilateral with AT LEAST one pair of parallel sides. Is a rectangle a trapezoid? A) Yes — a rectangle has two pairs of parallel sides, which includes at least one pair B) No — a rectangle is a completely different shape',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'A) Yes — a rectangle has two pairs of parallel sides, which includes at least one pair', displayValue: 'A — a rectangle IS a trapezoid (inclusive definition)' },
        hints: [
          { tier: 1, cost: 0, text: 'Does a rectangle have at least one pair of parallel sides?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'A rectangle actually has TWO pairs of parallel sides. Is two "at least one"?', type: 'directional' },
          { tier: 3, cost: 2, text: 'Yes! Having two pairs means it definitely has at least one pair. A rectangle is a special trapezoid.', type: 'scaffolded' },
        ],
        solutionExplanation: 'Yes — using the inclusive definition, any shape with at least one pair of parallel sides is a trapezoid.',
        teachingPoint: 'The inclusive definition of trapezoid means "at least one pair of parallel sides." Rectangles, parallelograms, and squares are all special trapezoids.',
        tags: ['shapes', 'quadrilateral-classification'],
        difficulty: 3,
      },
      {
        id: 'problem-4-1-11-2',
        levelId: 'level-4-1-11',
        sequence: 2,
        type: 'multiple_choice',
        category: 'thinking',
        statement: 'Which statement is true about squares and rectangles? A) A square is a special type of rectangle B) A rectangle is a special type of square C) Squares and rectangles are completely unrelated',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'A) A square is a special type of rectangle', displayValue: 'A — every square is a rectangle (with all sides equal)' },
        hints: [
          { tier: 1, cost: 0, text: 'A rectangle has 4 right angles and opposite sides equal. Does a square have all of that?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'A square has 4 right angles AND all sides equal. It meets the rectangle requirements plus more.', type: 'directional' },
          { tier: 3, cost: 2, text: 'A square is a rectangle with the extra property that all four sides are equal length.', type: 'scaffolded' },
        ],
        solutionExplanation: 'A square is a special rectangle — it has 4 right angles (rectangle requirement) plus all sides equal.',
        teachingPoint: 'In the quadrilateral hierarchy: squares are special rectangles, rectangles are special parallelograms, parallelograms are special trapezoids.',
        tags: ['shapes', 'quadrilateral-classification'],
        difficulty: 3,
      },
      {
        id: 'problem-4-1-11-3',
        levelId: 'level-4-1-11',
        sequence: 3,
        type: 'multiple_choice',
        category: 'thinking',
        statement: 'A parallelogram has two pairs of parallel sides. Which of these is NOT necessarily a parallelogram? A) A rectangle B) A square C) A trapezoid with only one pair of parallel sides D) A rhombus',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'C) A trapezoid with only one pair of parallel sides', displayValue: 'C — a trapezoid with only one pair of parallel sides is not a parallelogram' },
        hints: [
          { tier: 1, cost: 0, text: 'A parallelogram needs TWO pairs of parallel sides. Which shape might have only one pair?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'Rectangles, squares, and rhombuses all have two pairs of parallel sides. What about a trapezoid with only one pair?', type: 'directional' },
          { tier: 3, cost: 2, text: 'A trapezoid with only one pair of parallel sides does not meet the parallelogram requirement of two pairs.', type: 'scaffolded' },
        ],
        solutionExplanation: 'A trapezoid with only one pair of parallel sides lacks the second pair needed to be a parallelogram.',
        teachingPoint: 'A parallelogram has exactly two pairs of parallel sides. Rectangles, squares, and rhombuses are all parallelograms, but a trapezoid with one pair is not.',
        tags: ['shapes', 'quadrilateral-classification'],
        difficulty: 3,
      },
    ],
  },
  {
    id: 'level-4-1-12',
    chapterId: 'chapter-4-1',
    worldId: 'world-4',
    number: 12,
    name: 'Lines of Symmetry',
    type: 'standard',
    storyContext: 'Grogg holds up a leaf. "Hey, if I fold this leaf right down the middle, both halves match perfectly! That\'s symmetry!"',
    difficulty: 2,
    estimatedMinutes: 4,
    isChallenge: false,
    isBoss: false,
    problems: [
      {
        id: 'problem-4-1-12-1',
        levelId: 'level-4-1-12',
        sequence: 1,
        type: 'numeric_input',
        category: 'thinking',
        statement: 'A line of symmetry divides a shape into two halves that are mirror images. How many lines of symmetry does a square have?',
        inputType: 'number_pad',
        correctAnswer: { value: 4, displayValue: '4' },
        hints: [
          { tier: 1, cost: 0, text: 'Try folding a square in different ways. Each fold that makes both halves match is a line of symmetry.', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'You can fold horizontally, vertically, and along both diagonals. How many is that?', type: 'directional' },
          { tier: 3, cost: 2, text: 'Horizontal fold, vertical fold, diagonal from top-left, diagonal from top-right — that is 4 lines of symmetry.', type: 'scaffolded' },
        ],
        solutionExplanation: 'A square has 4 lines of symmetry: horizontal, vertical, and two diagonals.',
        teachingPoint: 'A square has 4 lines of symmetry. The more regular a shape, the more lines of symmetry it tends to have.',
        tags: ['shapes', 'symmetry'],
        difficulty: 2,
      },
      {
        id: 'problem-4-1-12-2',
        levelId: 'level-4-1-12',
        sequence: 2,
        type: 'numeric_input',
        category: 'thinking',
        statement: 'A rectangle that is NOT a square has how many lines of symmetry?',
        inputType: 'number_pad',
        correctAnswer: { value: 2, displayValue: '2' },
        hints: [
          { tier: 1, cost: 0, text: 'Imagine folding a non-square rectangle. Which folds make both halves match perfectly?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'Horizontal and vertical folds work, but diagonal folds do NOT match because the sides are different lengths.', type: 'directional' },
          { tier: 3, cost: 2, text: 'A non-square rectangle has exactly 2 lines of symmetry: one horizontal, one vertical.', type: 'scaffolded' },
        ],
        solutionExplanation: 'A non-square rectangle has 2 lines of symmetry (horizontal and vertical). Diagonals do not work because the sides have different lengths.',
        teachingPoint: 'A non-square rectangle has 2 lines of symmetry. Unlike a square, its diagonal is NOT a line of symmetry because the sides differ in length.',
        tags: ['shapes', 'symmetry'],
        difficulty: 2,
      },
      {
        id: 'problem-4-1-12-3',
        levelId: 'level-4-1-12',
        sequence: 3,
        type: 'multiple_choice',
        category: 'thinking',
        statement: 'Which shape has exactly 1 line of symmetry? A) A square B) An equilateral triangle C) An isosceles triangle (not equilateral) D) A circle',
        inputType: 'multiple_choice',
        correctAnswer: { value: 'C) An isosceles triangle (not equilateral)', displayValue: 'C — an isosceles (non-equilateral) triangle has exactly 1 line of symmetry' },
        hints: [
          { tier: 1, cost: 0, text: 'Think about how many ways you can fold each shape so both halves match.', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'A square has 4, an equilateral triangle has 3, a circle has infinitely many. What about isosceles?', type: 'directional' },
          { tier: 3, cost: 2, text: 'An isosceles triangle can only be folded along the line from the top vertex to the base midpoint — just 1 line.', type: 'scaffolded' },
        ],
        solutionExplanation: 'An isosceles (non-equilateral) triangle has exactly 1 line of symmetry — from the apex to the base midpoint.',
        teachingPoint: 'Different shapes have different numbers of symmetry lines. Knowing the count helps you identify and classify shapes.',
        tags: ['shapes', 'symmetry'],
        difficulty: 3,
      },
    ],
  },
];

// 4. Find the boss level (currently last) and renumber it
const bossIdx = ch1.levels.findIndex(l => l.isBoss);
if (bossIdx === -1) {
  console.error('No boss level found in Ch1');
  process.exit(1);
}

const boss = ch1.levels[bossIdx];
console.log(`Boss found at index ${bossIdx}: ${boss.id} (${boss.name})`);

// Remove boss, insert new levels, then re-add boss with new number
ch1.levels.splice(bossIdx, 1);
ch1.levels.push(...newLevels);

// Renumber boss
boss.id = 'level-4-1-13';
boss.number = 13;
// Update boss problem IDs
boss.problems.forEach((p, i) => {
  p.id = `problem-4-1-13-${i + 1}`;
  p.levelId = 'level-4-1-13';
});
ch1.levels.push(boss);

// Update world totalLevels (+3)
world.totalLevels += 3;

// 5. Update tags on existing levels to include 'shapes'
for (const level of ch1.levels) {
  for (const p of level.problems) {
    if (p.tags && p.tags.includes('angles') && !p.tags.includes('shapes')) {
      p.tags.push('shapes');
    }
  }
}

writeFileSync(worldPath, JSON.stringify(world, null, 2) + '\n');
console.log(`\nDone! Ch1 now has ${ch1.levels.length} levels (was 10).`);
console.log(`World totalLevels: ${world.totalLevels}`);
console.log('Run: node scripts/validate-world.mjs data/world-4.json');

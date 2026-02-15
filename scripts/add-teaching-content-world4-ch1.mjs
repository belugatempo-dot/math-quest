#!/usr/bin/env node

/**
 * Adds multi-step teaching content to World 4, Chapter 1 (Angle Island).
 * Run: node scripts/add-teaching-content-world4-ch1.mjs
 * Validate: node scripts/validate-world.mjs data/world-4.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const worldPath = resolve(__dirname, '../data/world-4.json');

const world = JSON.parse(readFileSync(worldPath, 'utf-8'));
const ch1 = world.chapters[0];

if (ch1.name !== 'Angle Island') {
  console.error('Expected Chapter 1 to be Angle Island, got:', ch1.name);
  process.exit(1);
}

// Teaching content map by level ID
const teachingContentMap = {
  'level-4-1-1': {
    format: 'multi-step-lesson',
    steps: [
      {
        id: 'step-1',
        characterId: 'prof-owlbert',
        expression: 'happy',
        dialogue: 'Welcome to Angle Island! Today we\'re going to explore one of the most important shapes in geometry — the angle.',
        interactionType: 'click-to-continue',
      },
      {
        id: 'step-2',
        characterId: 'prof-owlbert',
        expression: 'thinking',
        dialogue: 'An angle is formed where two lines or rays meet at a point. That meeting point is called the vertex. Think of it like opening a book — the spine is the vertex, and the covers are the two rays.',
        visualType: 'angle-diagram',
        visualProps: { angleValue: 45, angleType: 'acute', showLabel: true },
        interactionType: 'click-to-continue',
      },
      {
        id: 'step-3',
        characterId: 'prof-owlbert',
        expression: 'encouraging',
        dialogue: 'A right angle measures exactly 90 degrees. You see right angles everywhere — corners of books, walls meeting floors, and window frames. We mark right angles with a small square symbol.',
        visualType: 'angle-diagram',
        visualProps: { angleValue: 90, angleType: 'right', showLabel: true },
        interactionType: 'click-to-reveal',
      },
      {
        id: 'step-4',
        characterId: 'prof-owlbert',
        expression: 'happy',
        dialogue: 'When you turn all the way around in a circle, that\'s 360 degrees. A right angle is exactly one quarter of a full turn. So four right angles make a full circle! Now let\'s practice identifying angles.',
        interactionType: 'click-to-continue',
      },
    ],
    estimatedSeconds: 120,
    skippable: true,
  },

  'level-4-1-2': {
    format: 'single-message',
    text: 'Remember: acute angles are less than 90°, right angles are exactly 90°, and obtuse angles are greater than 90° but less than 180°. Look at each angle carefully before classifying it!',
    characterId: 'prof-owlbert',
  },

  'level-4-1-3': {
    format: 'single-message',
    text: 'Complementary angles are two angles that add up to 90°. If you know one angle, you can always find the other by subtracting from 90°.',
    characterId: 'prof-owlbert',
  },

  'level-4-1-4': {
    format: 'multi-step-lesson',
    steps: [
      {
        id: 'step-1',
        characterId: 'prof-owlbert',
        expression: 'thinking',
        dialogue: 'Now let\'s discover supplementary angles! When two angles sit side by side on a straight line, they always add up to 180 degrees.',
        visualType: 'concept-diagram',
        visualProps: { diagramId: 'supplementary-angles' },
        interactionType: 'click-to-continue',
      },
      {
        id: 'step-2',
        characterId: 'prof-owlbert',
        expression: 'encouraging',
        dialogue: 'A straight angle — a perfectly flat line — measures 180°. So if one angle on the line is 60°, the other must be 120°, because 60 + 120 = 180.',
        visualType: 'worked-example',
        visualProps: {
          steps: [
            'Given: one angle on a line = 60°',
            'Supplementary angles sum to 180°',
            'Missing angle = 180° - 60° = 120°',
          ],
        },
        interactionType: 'click-to-reveal',
      },
      {
        id: 'step-3',
        characterId: 'prof-owlbert',
        expression: 'happy',
        dialogue: 'Here\'s a trick: if you see a straight line with another line crossing it, the angles on each side are supplementary. This is super useful for finding missing angles!',
        interactionType: 'click-to-continue',
      },
    ],
    estimatedSeconds: 90,
    skippable: true,
  },

  // level-4-1-5 is challenge — no teaching

  'level-4-1-6': {
    format: 'multi-step-lesson',
    steps: [
      {
        id: 'step-1',
        characterId: 'prof-owlbert',
        expression: 'happy',
        dialogue: 'Here\'s one of the most powerful facts in geometry: the three angles inside any triangle ALWAYS add up to exactly 180 degrees. No matter what the triangle looks like!',
        visualType: 'concept-diagram',
        visualProps: { diagramId: 'triangle-angle-sum' },
        interactionType: 'click-to-continue',
      },
      {
        id: 'step-2',
        characterId: 'prof-owlbert',
        expression: 'thinking',
        dialogue: 'This means if you know two angles of a triangle, you can always find the third. Just add the two you know, then subtract from 180°.',
        visualType: 'worked-example',
        visualProps: {
          steps: [
            'Given: angle A = 50°, angle B = 70°',
            'Triangle angles sum to 180°',
            'angle C = 180° - 50° - 70° = 60°',
          ],
        },
        interactionType: 'click-to-reveal',
      },
      {
        id: 'step-3',
        characterId: 'prof-owlbert',
        expression: 'encouraging',
        dialogue: 'Fun fact: if a triangle has a right angle (90°), the other two angles must add to 90°. That makes them complementary! Geometry is full of beautiful connections like this.',
        interactionType: 'click-to-continue',
      },
    ],
    estimatedSeconds: 90,
    skippable: true,
  },

  'level-4-1-7': {
    format: 'single-message',
    text: 'To find a missing angle in a triangle, add the angles you know and subtract from 180°. In a right triangle, the two non-right angles must add up to 90°.',
    characterId: 'prof-owlbert',
  },

  'level-4-1-8': {
    format: 'multi-step-lesson',
    steps: [
      {
        id: 'step-1',
        characterId: 'prof-owlbert',
        expression: 'thinking',
        dialogue: 'Parallel lines are lines that never meet, no matter how far you extend them. Think of railroad tracks — they always stay the same distance apart.',
        interactionType: 'click-to-continue',
      },
      {
        id: 'step-2',
        characterId: 'prof-owlbert',
        expression: 'encouraging',
        dialogue: 'Perpendicular lines meet at exactly 90° — a right angle. The corner of a piece of paper shows you perpendicular lines. The symbol ⊥ means "perpendicular to".',
        visualType: 'angle-diagram',
        visualProps: { angleValue: 90, angleType: 'right', showLabel: true },
        interactionType: 'click-to-continue',
      },
      {
        id: 'step-3',
        characterId: 'prof-owlbert',
        expression: 'happy',
        dialogue: 'When a line crosses two parallel lines, it creates special angle pairs. Corresponding angles are equal, and alternate interior angles are equal too. These patterns help you find missing angles without measuring!',
        interactionType: 'click-to-continue',
      },
    ],
    estimatedSeconds: 90,
    skippable: true,
  },

  // level-4-1-9 is challenge — no teaching
  // level-4-1-10 is boss — no teaching
};

// Apply teaching content
let updated = 0;
for (const level of ch1.levels) {
  const content = teachingContentMap[level.id];
  if (content) {
    level.teaching = content;
    updated++;
    console.log(`  ✅ ${level.id} (${level.name}) — ${content.format}`);
  } else {
    console.log(`  ⏭  ${level.id} (${level.name}) — no teaching (${level.type})`);
  }
}

writeFileSync(worldPath, JSON.stringify(world, null, 2) + '\n');
console.log(`\nDone! Updated ${updated} levels with teaching content.`);
console.log('Run: node scripts/validate-world.mjs data/world-4.json');

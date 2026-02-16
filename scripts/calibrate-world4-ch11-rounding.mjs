#!/usr/bin/env node
/**
 * Calibrate World 4, Chapter 11: Fix rounding philosophy with number line approach.
 * - Adds 1 new level "Rounding on the Number Line" after Place Value in Decimals
 * - Rewrites rounding hints to use number line reasoning instead of procedural rules
 * - Rewrites comparison hints to use place value reasoning instead of "line up decimal points"
 *
 * Run: node scripts/calibrate-world4-ch11-rounding.mjs
 * Validate: node scripts/validate-world.mjs data/world-4.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const worldPath = resolve(__dirname, '../data/world-4.json');

const world = JSON.parse(readFileSync(worldPath, 'utf-8'));
const ch11 = world.chapters[10];

if (ch11.id !== 'chapter-4-11') {
  console.error('Expected chapter-4-11 at index 10, got:', ch11.id);
  process.exit(1);
}

console.log(`Ch11 currently has ${ch11.levels.length} levels.`);

// 1. Insert "Rounding on the Number Line" after Place Value in Decimals
const placeValueIdx = ch11.levels.findIndex(l => l.name === 'Place Value in Decimals');
console.log(`Place Value at index ${placeValueIdx}`);

const roundingLevel = {
  id: 'placeholder',
  chapterId: 'chapter-4-11',
  worldId: 'world-4',
  number: 0,
  name: 'Rounding on the Number Line',
  type: 'teaching',
  storyContext: 'Prof. Owlbert draws a number line in the sand. "Rounding is not about following rules — it\'s about asking which value a number is CLOSEST to!"',
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
        dialogue: 'Rounding means finding the nearest "friendly" number. To round 3.456 to the nearest tenth, ask: is 3.456 closer to 3.4 or to 3.5 on the number line?',
        interactionType: 'click-to-continue',
      },
      {
        id: 'step-2',
        characterId: 'prof-owlbert',
        expression: 'thinking',
        dialogue: '3.456 is between 3.4 and 3.5. The halfway point is 3.45. Since 3.456 > 3.45, it is past the midpoint — closer to 3.5. So 3.456 rounds to 3.5!',
        visualType: 'worked-example',
        visualProps: {
          steps: [
            '3.456 is between 3.4 and 3.5',
            'Midpoint: 3.45',
            '3.456 > 3.45 → closer to 3.5',
            'Round to 3.5',
          ],
        },
        interactionType: 'click-to-reveal',
      },
      {
        id: 'step-3',
        characterId: 'prof-owlbert',
        expression: 'encouraging',
        dialogue: 'The "rule" about looking at the next digit works because it tells you which side of the midpoint you are on. But understanding WHY makes rounding intuitive — you are just finding the nearest value!',
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
      statement: 'On the number line, is 2.73 closer to 2.7 or to 2.8? Round 2.73 to the nearest tenth.',
      inputType: 'text_field',
      correctAnswer: { value: '2.7', displayValue: '2.7' },
      hints: [
        { tier: 1, cost: 0, text: 'Place 2.73 on a number line between 2.7 and 2.8. The midpoint is 2.75.', type: 'conceptual' },
        { tier: 2, cost: 1, text: '2.73 < 2.75, so it is on the LEFT side of the midpoint — closer to 2.7.', type: 'directional' },
        { tier: 3, cost: 2, text: '2.73 rounds down to 2.7 because it is closer to 2.7 than to 2.8.', type: 'scaffolded' },
      ],
      solutionExplanation: '2.73 < midpoint 2.75, so it rounds to 2.7.',
      teachingPoint: 'Rounding = finding the closest value. 2.73 is left of the midpoint (2.75), so it rounds down.',
      tags: ['decimals', 'rounding', 'number-line'],
      difficulty: 2,
    },
    {
      id: 'placeholder', levelId: 'placeholder', sequence: 2,
      type: 'text_input', category: 'thinking',
      statement: 'Is 6.85 closer to 6.8 or to 6.9 on the number line? Round to the nearest tenth.',
      inputType: 'text_field',
      correctAnswer: { value: '6.9', displayValue: '6.9' },
      hints: [
        { tier: 1, cost: 0, text: '6.85 is between 6.8 and 6.9. Where is the midpoint?', type: 'conceptual' },
        { tier: 2, cost: 1, text: 'The midpoint is 6.85 — that is exactly where the number IS! Convention: at the midpoint, round up.', type: 'directional' },
        { tier: 3, cost: 2, text: '6.85 is at the midpoint, so by convention it rounds up to 6.9.', type: 'scaffolded' },
      ],
      solutionExplanation: '6.85 is at the midpoint. Convention: round up. Answer: 6.9.',
      teachingPoint: 'When a number is exactly at the midpoint (like 6.85 between 6.8 and 6.9), mathematicians agree to round up.',
      tags: ['decimals', 'rounding', 'number-line'],
      difficulty: 2,
    },
    {
      id: 'placeholder', levelId: 'placeholder', sequence: 3,
      type: 'numeric_input', category: 'thinking',
      statement: 'Round 4.362 to the nearest whole number. Think: is 4.362 closer to 4 or to 5 on the number line?',
      inputType: 'number_pad',
      correctAnswer: { value: 4, displayValue: '4' },
      hints: [
        { tier: 1, cost: 0, text: 'Place 4.362 on a number line between 4 and 5. The midpoint is 4.5.', type: 'conceptual' },
        { tier: 2, cost: 1, text: '4.362 < 4.5, so it is on the left side — closer to 4.', type: 'directional' },
        { tier: 3, cost: 2, text: '4.362 rounds to 4 because it is closer to 4 than to 5.', type: 'scaffolded' },
      ],
      solutionExplanation: '4.362 < midpoint 4.5, so it rounds to 4.',
      teachingPoint: 'For whole-number rounding, the midpoint is always at .5. Below .5 → round down. At or above .5 → round up.',
      tags: ['decimals', 'rounding', 'number-line'],
      difficulty: 2,
    },
  ],
};

ch11.levels.splice(placeValueIdx + 1, 0, roundingLevel);
console.log('Inserted Rounding on the Number Line level.');

// 2. Rewrite rounding hints throughout the chapter
for (const level of ch11.levels) {
  for (const p of level.problems) {
    // Rewrite rounding hints to use number line reasoning
    if (/round.*tenth/i.test(p.statement) && p.hints.some(h => /digit.*5|5.*round up|look at/i.test(h.text))) {
      console.log(`Rewriting rounding hints: ${p.id}`);
      if (/3\.456/i.test(p.statement)) {
        p.hints = [
          { tier: 1, cost: 0, text: 'On the number line, 3.456 sits between 3.4 and 3.5. Which is it closer to?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'The midpoint between 3.4 and 3.5 is 3.45. Since 3.456 > 3.45, it is past the midpoint.', type: 'directional' },
          { tier: 3, cost: 2, text: '3.456 is closer to 3.5 on the number line, so it rounds to 3.5.', type: 'scaffolded' },
        ];
        p.teachingPoint = 'Rounding to nearest tenth: find where the number sits between two tenths on the number line, and pick the closer one.';
      }
    }
    if (/round.*hundredth/i.test(p.statement) && p.hints.some(h => /digit.*round up|thousandths.*tells|5.*round/i.test(h.text))) {
      console.log(`Rewriting rounding hints: ${p.id}`);
      if (/7\.849/i.test(p.statement)) {
        p.hints = [
          { tier: 1, cost: 0, text: '7.849 is between 7.84 and 7.85. Which is it closer to on the number line?', type: 'conceptual' },
          { tier: 2, cost: 1, text: 'The midpoint is 7.845. Since 7.849 > 7.845, it is past the midpoint — closer to 7.85.', type: 'directional' },
          { tier: 3, cost: 2, text: '7.849 rounds to 7.85 because it is closer to 7.85 than to 7.84 on the number line.', type: 'scaffolded' },
        ];
        p.teachingPoint = 'Rounding to nearest hundredth: ask "is this number closer to the hundredth below or the hundredth above?"';
      }
    }
    // Rewrite 2.9999 rounding hints
    if (/2\.9999/i.test(p.statement)) {
      console.log(`Rewriting cascading rounding hints: ${p.id}`);
      p.hints = [
        { tier: 1, cost: 0, text: 'On the number line, 2.9999 is extremely close to 3. For nearest tenth: is it closer to 2.9 or 3.0?', type: 'conceptual' },
        { tier: 2, cost: 1, text: 'Midpoint between 2.9 and 3.0 is 2.95. Since 2.9999 > 2.95, it rounds to 3.0.', type: 'directional' },
        { tier: 3, cost: 2, text: 'Nearest tenth: 3.0. Nearest hundredth: 3.00. Nearest whole: 3. All round to 3!', type: 'scaffolded' },
      ];
      p.teachingPoint = '2.9999 is so close to 3 that it rounds to 3 at every level of precision. The number line makes this obvious!';
    }
  }
}

// 3. Rewrite comparison hints to use place value reasoning
for (const level of ch11.levels) {
  for (const p of level.problems) {
    // Fix "line up decimal points" hints
    for (let i = 0; i < p.hints.length; i++) {
      if (/line up.*decimal/i.test(p.hints[i].text)) {
        console.log(`Rewriting comparison hint: ${p.id} hint ${i + 1}`);
      }
    }
    // Specific fix for 0.45 vs 0.405
    if (/0\.45.*0\.405/i.test(p.statement)) {
      console.log(`Rewriting comparison for: ${p.id}`);
      p.hints = [
        { tier: 1, cost: 0, text: 'Compare the tenths place first: both have 4 tenths. Move to hundredths.', type: 'conceptual' },
        { tier: 2, cost: 1, text: '0.45 has 5 hundredths. 0.405 has 0 hundredths. Which has more hundredths?', type: 'directional' },
        { tier: 3, cost: 2, text: '5 hundredths > 0 hundredths. So 0.45 > 0.405.', type: 'scaffolded' },
      ];
      p.teachingPoint = 'Compare decimals place by place, starting from the left. The first place where they differ tells you which is larger.';
    }
    // Fix ordering hints
    if (/0\.305.*0\.35.*0\.3.*0\.053/i.test(p.statement)) {
      console.log(`Rewriting ordering for: ${p.id}`);
      p.hints = [
        { tier: 1, cost: 0, text: 'Compare the tenths place first: 0.053 has 0 tenths, the others have 3 tenths. So 0.053 is smallest.', type: 'conceptual' },
        { tier: 2, cost: 1, text: 'Among the 3-tenths group: 0.3 has 0 hundredths, 0.305 has 0, 0.35 has 5. But 0.3 and 0.305 both have 0 hundredths.', type: 'directional' },
        { tier: 3, cost: 2, text: '0.3 = 0.300, 0.305 > 0.300 (5 thousandths), 0.35 = 0.350 > 0.305. Order: 0.053, 0.3, 0.305, 0.35.', type: 'scaffolded' },
      ];
      p.teachingPoint = 'Compare decimals by place value: tenths first, then hundredths, then thousandths. Think of it as reading the number line from left to right.';
    }
  }
}

// 4. Update learning objectives
ch11.learningObjectives = [
  'Convert between fractions and decimals',
  'Understand decimal place value',
  'Round decimals using number line reasoning',
  'Compare and order decimals using place value',
  'Add and subtract decimals',
];

// 5. Renumber all levels and problems
ch11.levels.forEach((level, idx) => {
  const num = idx + 1;
  level.id = `level-4-11-${num}`;
  level.number = num;
  level.chapterId = 'chapter-4-11';
  level.worldId = 'world-4';

  level.problems.forEach((p, pi) => {
    p.id = `problem-4-11-${num}-${pi + 1}`;
    p.levelId = `level-4-11-${num}`;
    p.sequence = pi + 1;
  });
});

// Update totalLevels (+1)
world.totalLevels += 1;

writeFileSync(worldPath, JSON.stringify(world, null, 2) + '\n');
console.log(`\nDone! Ch11 now has ${ch11.levels.length} levels (was 10).`);
console.log(`World totalLevels: ${world.totalLevels}`);
console.log('Run: node scripts/validate-world.mjs data/world-4.json');

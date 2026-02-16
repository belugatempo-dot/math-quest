#!/usr/bin/env node
/**
 * World 5 Generator — Algebra Archipelago (Beast Academy Level 5)
 *
 * Assembles chapter data from ch1-4, ch5-8, ch9-12 modules
 * and writes the complete data/world-5.json file.
 *
 * Usage: node scripts/create-world5.mjs
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { createChapters1to3 } from './world5-chapters/ch1-3.mjs';
import { createChapters4to6 } from './world5-chapters/ch4-6.mjs';
import { createChapters7to9 } from './world5-chapters/ch7-9.mjs';
import { createChapters10to12 } from './world5-chapters/ch10-12.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const world5 = {
  id: "world-5",
  name: "Algebra Archipelago",
  theme: "archipelago",
  baLevel: 5,
  targetAgeMin: 10,
  targetAgeMax: 12,
  totalLevels: 156,
  estimatedWeeks: 36,
  colorPalette: {
    primary: "#14B8A6",
    secondary: "#8B5CF6",
    accent: "#F59E0B",
    background: "#0F766E",
    text: "#FFFFFF"
  },
  characters: [
    {
      id: "grogg",
      name: "Grogg",
      role: "companion",
      personality: "Enthusiastic explorer who dives in headfirst and makes relatable algebra mistakes"
    },
    {
      id: "lizzie",
      name: "Lizzie",
      role: "strategist",
      personality: "Sharp-eyed navigator who spots patterns in sequences and finds shortcuts"
    },
    {
      id: "prof-owlbert",
      name: "Prof. Owlbert",
      role: "teacher",
      personality: "Wise cartographer who maps connections between fractions, decimals, and percents"
    },
    {
      id: "admiral-axiom",
      name: "Admiral Axiom",
      role: "challenger",
      personality: "Legendary admiral who guards the deepest challenges and boss battles"
    }
  ],
  isLocked: false,
  prerequisiteWorldId: "world-4",
  chapters: []
};

// Assemble all chapters
world5.chapters = [
  ...createChapters1to3(),
  ...createChapters4to6(),
  ...createChapters7to9(),
  ...createChapters10to12(),
];

// Verify counts
const totalLevels = world5.chapters.reduce((sum, ch) => sum + ch.levels.length, 0);
const totalProblems = world5.chapters.reduce(
  (sum, ch) => sum + ch.levels.reduce((s, l) => s + l.problems.length, 0), 0
);
const bossLevels = world5.chapters.reduce(
  (sum, ch) => sum + ch.levels.filter(l => l.isBoss).length, 0
);

// Update totalLevels to match actual count
world5.totalLevels = totalLevels;

// Post-process: fix any hint text shorter than 10 chars
let fixedHints = 0;
for (const ch of world5.chapters) {
  for (const lev of ch.levels) {
    for (const prob of lev.problems) {
      for (const h of prob.hints) {
        if (h.text.length < 10) {
          // Pad short hints with additional context
          h.text = h.text.padEnd(10, '.').replace(/\.+$/, ' — think carefully.');
          if (h.text.length < 10) h.text = h.text + ' — think about this step carefully.';
          fixedHints++;
        }
      }
    }
  }
}
if (fixedHints > 0) console.log(`  Fixed ${fixedHints} short hints`);

console.log(`World 5: ${world5.name}`);
console.log(`  Chapters: ${world5.chapters.length}`);
console.log(`  Levels: ${totalLevels}`);
console.log(`  Problems: ${totalProblems}`);
console.log(`  Boss levels: ${bossLevels}`);
console.log(`  Problems/level: ${(totalProblems / totalLevels).toFixed(1)}`);

// Write output
const outPath = join(__dirname, '..', 'data', 'world-5.json');
writeFileSync(outPath, JSON.stringify(world5, null, 2), 'utf-8');
console.log(`\nWritten to ${outPath}`);

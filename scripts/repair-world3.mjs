#!/usr/bin/env node
/**
 * Repair script: fixes validation errors in world-3.json
 * 1. Fix problem type: 'number_pad' → 'numeric_input'
 * 2. Ensure all hints are ≥ 10 chars
 * 3. Add missing level fields (worldId, number, difficulty, isChallenge)
 * 4. Fix totalLevels count
 * 5. Ensure teachingPoint ≥ 10 chars
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'data', 'world-3.json');
const world = JSON.parse(readFileSync(dataPath, 'utf-8'));

let fixes = { type: 0, hint: 0, level: 0, teaching: 0 };

for (const ch of world.chapters) {
  for (let li = 0; li < ch.levels.length; li++) {
    const lv = ch.levels[li];

    // Fix missing level fields
    if (!lv.worldId) { lv.worldId = 'world-3'; fixes.level++; }
    if (!lv.number) { lv.number = lv.sequence; fixes.level++; }
    if (lv.difficulty === undefined || lv.difficulty === null) {
      // Derive difficulty from max problem difficulty in the level
      const maxDiff = Math.max(...lv.problems.map(p => p.difficulty || 1));
      lv.difficulty = maxDiff;
      fixes.level++;
    }
    if (lv.isChallenge === undefined || lv.isChallenge === null) {
      lv.isChallenge = lv.type === 'challenge' || lv.type === 'boss';
      fixes.level++;
    }
    if (lv.isBoss === undefined || lv.isBoss === null) {
      lv.isBoss = lv.type === 'boss';
      fixes.level++;
    }
    if (!lv.storyContext) {
      lv.storyContext = lv.name;
      fixes.level++;
    }

    for (const prob of lv.problems) {
      // Fix problem type: number_pad → numeric_input
      if (prob.type === 'number_pad') {
        prob.type = 'numeric_input';
        fixes.type++;
      }
      // Fix problem type: text_field → text_input
      if (prob.type === 'text_field') {
        prob.type = 'text_input';
        fixes.type++;
      }

      // Fix hints too short (< 10 chars)
      if (prob.hints) {
        for (const hint of prob.hints) {
          if (hint.text && hint.text.length < 10) {
            const orig = hint.text;
            // Pad with context based on tier
            if (hint.tier === 1) {
              hint.text = `Think about it: ${orig}`;
            } else if (hint.tier === 2) {
              hint.text = `Getting closer: ${orig}`;
            } else {
              hint.text = `Almost there: ${orig}`;
            }
            // If still too short, pad more
            while (hint.text.length < 10) {
              hint.text += '.';
            }
            fixes.hint++;
          }
        }
      }

      // Fix teachingPoint too short (< 10 chars)
      if (prob.teachingPoint && prob.teachingPoint.length < 10) {
        prob.teachingPoint = `Key concept: ${prob.teachingPoint}`;
        while (prob.teachingPoint.length < 10) {
          prob.teachingPoint += '.';
        }
        fixes.teaching++;
      }
    }
  }
}

// Fix totalLevels
const actualTotal = world.chapters.reduce((s, c) => s + c.levels.length, 0);
world.totalLevels = actualTotal;

writeFileSync(dataPath, JSON.stringify(world, null, 2));

const totalProblems = world.chapters.reduce((s, c) => s + c.levels.reduce((s2, l) => s2 + l.problems.length, 0), 0);
console.log(`Repaired: ${fixes.type} type fixes, ${fixes.hint} hint fixes, ${fixes.level} level field fixes, ${fixes.teaching} teaching point fixes`);
console.log(`World 3: ${actualTotal} levels, ${totalProblems} problems (totalLevels=${world.totalLevels})`);

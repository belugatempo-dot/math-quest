#!/usr/bin/env node
/**
 * parse-world4.mjs — Parses world4-fraction-islands-BA-level4-v2-enhanced.md
 * into a valid data/world-4.json matching the WorldSchema.
 *
 * Usage: node scripts/parse-world4.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const mdPath = join(ROOT, 'world4-fraction-islands-BA-level4-v2-enhanced.md');
const outPath = join(ROOT, 'data', 'world-4.json');

const md = readFileSync(mdPath, 'utf-8');
const lines = md.split('\n');

// ─── Chapter metadata ───────────────────────────────────────────────
const CHAPTER_META = [
  { number: 1, name: 'Angle Island', topic: 'angles', weekStart: 1, weekEnd: 3, unit: 'A' },
  { number: 2, name: 'Multiplication Summit', topic: 'multiplication', weekStart: 4, weekEnd: 6, unit: 'A' },
  { number: 3, name: 'Exponent & Binary Peak', topic: 'exponents', weekStart: 7, weekEnd: 9, unit: 'A' },
  { number: 4, name: 'Counting Islands', topic: 'counting', weekStart: 10, weekEnd: 12, unit: 'B' },
  { number: 5, name: 'Division Lagoon', topic: 'division', weekStart: 13, weekEnd: 15, unit: 'B' },
  { number: 6, name: 'Logic Lighthouse', topic: 'logic', weekStart: 16, weekEnd: 18, unit: 'B' },
  { number: 7, name: 'Prime Island', topic: 'primes', weekStart: 19, weekEnd: 21, unit: 'C' },
  { number: 8, name: 'Fraction Reef', topic: 'fractions', weekStart: 22, weekEnd: 24, unit: 'C' },
  { number: 9, name: 'Integer Inlet', topic: 'integers', weekStart: 25, weekEnd: 27, unit: 'C' },
  { number: 10, name: 'Fraction Operations Atoll', topic: 'fraction-operations', weekStart: 28, weekEnd: 30, unit: 'D' },
  { number: 11, name: 'Decimal Island', topic: 'decimals', weekStart: 31, weekEnd: 33, unit: 'D' },
  { number: 12, name: 'Probability Passage', topic: 'probability', weekStart: 34, weekEnd: 36, unit: 'D' },
];

const CHAPTER_LEARNING_OBJECTIVES = {
  1: ['Understand angles as measures of rotation', 'Identify complementary and supplementary angles', 'Apply triangle angle sum property', 'Recognize parallel and perpendicular lines'],
  2: ['Apply distributive property to multiplication', 'Find units digits of products and powers', 'Use standard multiplication algorithm', 'Estimate products by rounding'],
  3: ['Understand exponent notation', 'Identify perfect squares and their properties', 'Convert between binary and base-10', 'Apply exponent multiplication rule'],
  4: ['Apply multiplication counting principle', 'Use Venn diagrams for counting', 'Understand and compute factorials', 'Count pairs and arrangements'],
  5: ['Perform long division', 'Apply divisibility rules for 2, 3, 4, 5, 9', 'Understand remainders', 'Find GCD of two numbers'],
  6: ['Evaluate logical statements', 'Identify converse errors', 'Apply AND/OR logic', 'Use process of elimination'],
  7: ['Identify prime and composite numbers', 'Apply Sieve of Eratosthenes', 'Find prime factorizations', 'Compute GCD and LCM using primes'],
  8: ['Understand fraction meaning and equivalence', 'Compare fractions using benchmarks', 'Add and subtract fractions', 'Convert between mixed numbers and improper fractions'],
  9: ['Represent negative numbers on number line', 'Compare and order integers', 'Add and subtract integers', 'Solve integer word problems'],
  10: ['Multiply fractions and mixed numbers', 'Divide fractions using reciprocals', 'Simplify before multiplying', 'Use area models for fraction multiplication'],
  11: ['Convert between fractions and decimals', 'Understand decimal place value', 'Add and subtract decimals', 'Compare and order decimals'],
  12: ['Calculate basic probabilities', 'Understand complementary events', 'List outcomes for multiple events', 'Preview expected value'],
};

const CHAPTER_SIGNATURE_CONTENT = {
  1: ['complementary angles', 'supplementary angles', 'triangle angle sum', 'parallel and perpendicular lines'],
  2: ['distributive property', 'units digit patterns', 'multiplication algorithm', 'estimation'],
  3: ['exponent notation', 'perfect squares', 'binary numbers', 'exponent rules'],
  4: ['multiplication principle', 'Venn diagrams', 'factorials', 'counting pairs'],
  5: ['long division', 'divisibility rules', 'remainder patterns', 'GCD'],
  6: ['logical statements', 'converse trap', 'knights and knaves', 'process of elimination'],
  7: ['prime numbers', 'Sieve of Eratosthenes', 'prime factorization', 'LCM and GCD'],
  8: ['fraction equivalence', 'benchmark comparisons', 'fraction addition', 'area models', 'fraction number line'],
  9: ['negative numbers', 'integer addition', 'integer subtraction', 'number line ordering'],
  10: ['fraction multiplication', 'fraction division', 'area model multiplication', 'reciprocals'],
  11: ['decimal-fraction conversion', 'decimal place value', 'decimal arithmetic', 'decimal comparison'],
  12: ['basic probability', 'complementary events', 'sample spaces', 'expected value'],
};

// ─── Type/category mappings ─────────────────────────────────────────
function mapLevelType(typeStr) {
  const t = typeStr.trim().toLowerCase();
  if (t === 'teaching') return 'teaching';
  if (t === 'practice') return 'practice';
  if (t === 'challenge') return 'challenge';
  if (t === 'thinking') return 'standard';
  if (t === 'quiz') return 'quiz';
  if (t === 'boss' || t === 'boss battle') return 'boss';
  return 'standard';
}

function mapCategory(catStr) {
  const c = catStr.trim().toLowerCase();
  if (c === 'thinking') return 'thinking';
  if (c === 'compare without calculating') return 'compare_without_calc';
  if (c === 'find the error') return 'find_the_error';
  if (c === 'impossibility') return 'impossibility';
  if (c === 'multiple solution paths') return 'multiple_paths';
  if (c === 'strategic practice') return 'strategic_practice';
  if (c === 'fluency' || c === 'fluency building') return 'fluency';
  if (c === 'pattern discovery') return 'pattern_discovery';
  if (c === 'working backwards') return 'working_backwards';
  if (c === 'constraint satisfaction') return 'thinking'; // map to thinking
  return 'thinking';
}

function countStars(diffStr) {
  return (diffStr.match(/⭐/g) || []).length || 1;
}

function estimatedMinutes(difficulty) {
  const map = { 1: 3, 2: 4, 3: 5, 4: 7, 5: 10 };
  return map[difficulty] || 5;
}

// ─── Parse answer to determine type and value ───────────────────────
function parseAnswer(answerStr) {
  // Clean the answer string
  const cleaned = answerStr.trim();

  // Pure integers
  const intMatch = cleaned.match(/^(-?\d+)$/);
  if (intMatch) {
    return {
      value: parseInt(intMatch[1], 10),
      displayValue: intMatch[1],
      problemType: 'numeric_input',
      inputType: 'number_pad',
    };
  }

  // Numbers at start like "55°" or "50°"
  const degreeMatch = cleaned.match(/^(-?\d+)°/);
  if (degreeMatch && !cleaned.includes(' ')) {
    return {
      value: parseInt(degreeMatch[1], 10),
      displayValue: cleaned,
      problemType: 'numeric_input',
      inputType: 'number_pad',
    };
  }

  // Short numeric answers like "1500" followed by explanation in parens
  const numParenMatch = cleaned.match(/^(-?\d+)\s*\(/);
  if (numParenMatch) {
    return {
      value: parseInt(numParenMatch[1], 10),
      displayValue: cleaned,
      problemType: 'numeric_input',
      inputType: 'number_pad',
    };
  }

  // Answers like "6 (3 fruits × 2 drinks)"
  const numExplainMatch = cleaned.match(/^(-?\d+)\s/);
  if (numExplainMatch && !cleaned.includes(',') && cleaned.length < 60) {
    const n = parseInt(numExplainMatch[1], 10);
    if (!isNaN(n)) {
      return {
        value: n,
        displayValue: cleaned,
        problemType: 'numeric_input',
        inputType: 'number_pad',
      };
    }
  }

  // Fraction answers like "3/8", "5/7", "7/12", "8/15"
  const fracMatch = cleaned.match(/^(\d+\/\d+)$/);
  if (fracMatch) {
    return {
      value: fracMatch[1],
      displayValue: fracMatch[1],
      problemType: 'text_input',
      inputType: 'text_field',
    };
  }

  // Fraction at start like "3/8 (explanation)"
  const fracStartMatch = cleaned.match(/^(\d+\/\d+)\s/);
  if (fracStartMatch) {
    return {
      value: fracStartMatch[1],
      displayValue: cleaned,
      problemType: 'text_input',
      inputType: 'text_field',
    };
  }

  // Mixed number like "2 3/4" or "3 1/3"
  const mixedMatch = cleaned.match(/^(\d+\s+\d+\/\d+)$/);
  if (mixedMatch) {
    return {
      value: mixedMatch[1],
      displayValue: mixedMatch[1],
      problemType: 'text_input',
      inputType: 'text_field',
    };
  }

  // Decimal answers like "0.75", "6.15"
  const decMatch = cleaned.match(/^(-?\d+\.\d+)$/);
  if (decMatch) {
    return {
      value: cleaned,
      displayValue: cleaned,
      problemType: 'text_input',
      inputType: 'text_field',
    };
  }

  // Decimal with explanation
  const decExplMatch = cleaned.match(/^(-?\d+\.\d+)\s/);
  if (decExplMatch) {
    return {
      value: decExplMatch[1],
      displayValue: cleaned,
      problemType: 'text_input',
      inputType: 'text_field',
    };
  }

  // Answers like "Angle B (...)"
  const choiceMatch = cleaned.match(/^(Angle [A-Z]|Triangle [A-Z]|Bag [A-Z]|TRUE|FALSE|Yes|No)/i);
  if (choiceMatch) {
    return {
      value: cleaned,
      displayValue: cleaned,
      problemType: 'text_input',
      inputType: 'text_field',
    };
  }

  // Default: text input
  return {
    value: cleaned,
    displayValue: cleaned,
    problemType: 'text_input',
    inputType: 'text_field',
  };
}

// ─── Parse the markdown ─────────────────────────────────────────────

// First pass: extract all regular levels (#### Level X-Y-Z: ...)
const levelRegex = /^####\s+Level\s+4-(\d+)-(\d+):\s*(.+?)(?:\s*⭐)?$/;
const bossRegex = /^\*\*Boss Problem (\d+)\*\*:\s*\((.+?)\)/;
const finalBossRegex = /^\*\*Problem (\d+)\*\*\s*\((.+?)\)/;

/** Parse all levels from the markdown */
function parseLevels() {
  const levels = [];
  let i = 0;

  while (i < lines.length) {
    const levelMatch = lines[i].match(levelRegex);
    if (levelMatch) {
      const chapterNum = parseInt(levelMatch[1], 10);
      const levelNum = parseInt(levelMatch[2], 10);
      const levelName = levelMatch[3].replace(/\s*⭐+\s*$/, '').trim();

      // Parse the level block
      const level = parseLevelBlock(i, chapterNum, levelNum, levelName);
      if (level) {
        levels.push(level);
      }
    }
    i++;
  }

  return levels;
}

function parseLevelBlock(startLine, chapterNum, levelNum, levelName) {
  let i = startLine + 1;
  let type = 'standard';
  let category = 'thinking';
  let difficulty = 1;
  let storyContext = '';
  let problemText = '';
  let answerText = '';
  let hints = [];
  let teachingPoint = '';

  // Parse metadata lines
  while (i < lines.length && !lines[i].startsWith('####') && !lines[i].startsWith('### ')) {
    const line = lines[i].trim();

    // Type
    const typeMatch = line.match(/^\*\*Type\*\*:\s*(.+)/);
    if (typeMatch) {
      type = mapLevelType(typeMatch[1].trim());
    }

    // Category
    const catMatch = line.match(/^\*\*Category\*\*:\s*(.+)/);
    if (catMatch) {
      category = mapCategory(catMatch[1].trim());
    }

    // Difficulty
    const diffMatch = line.match(/^\*\*Difficulty\*\*:\s*(.+)/);
    if (diffMatch) {
      difficulty = countStars(diffMatch[1]);
    }

    // Story Context (blockquote after **Story Context**:)
    if (line.startsWith('**Story Context**:')) {
      i++;
      const ctxLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        ctxLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      storyContext = ctxLines.join(' ').trim();
      continue;
    }

    // Problem text (blockquote after **Problem**:)
    if (line.startsWith('**Problem**:')) {
      i++;
      const probLines = [];
      while (i < lines.length) {
        const pLine = lines[i].trim();
        if (pLine.startsWith('>')) {
          probLines.push(pLine.replace(/^>\s*/, ''));
          i++;
        } else if (pLine === '' && probLines.length > 0) {
          // Check if next line continues the blockquote
          if (i + 1 < lines.length && lines[i + 1].trim().startsWith('>')) {
            probLines.push('');
            i++;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      problemText = probLines.join('\n').trim();
      continue;
    }

    // Answer
    const ansMatch = line.match(/^\*\*Answer\*\*:\s*(.+)/);
    if (ansMatch) {
      answerText = ansMatch[1].trim();
      // Continue reading multi-line answers
      i++;
      while (i < lines.length) {
        const nextLine = lines[i].trim();
        if (nextLine === '' || nextLine.startsWith('**') || nextLine.startsWith('-') || nextLine.startsWith('#')) {
          break;
        }
        answerText += ' ' + nextLine;
        i++;
      }
      continue;
    }

    // Hints
    const hintMatch = line.match(/^- Hint (\d+)\s*\(([^)]+)\):\s*"?(.+?)"?$/);
    if (hintMatch) {
      const hintNum = parseInt(hintMatch[1], 10);
      const costStr = hintMatch[2].trim().toLowerCase();
      let cost = 0;
      if (costStr.includes('1') || costStr === '1⭐') cost = 1;
      if (costStr.includes('2') || costStr === '2⭐') cost = 2;
      let hintText = hintMatch[3].trim();
      // Remove trailing quote if present
      if (hintText.endsWith('"')) hintText = hintText.slice(0, -1);
      // Remove leading quote if present
      if (hintText.startsWith('"')) hintText = hintText.slice(1);

      const hintType = hintNum === 1 ? 'conceptual' : hintNum === 2 ? 'directional' : 'scaffolded';
      hints.push({
        tier: hintNum,
        cost: cost,
        text: hintText,
        type: hintType,
      });
    }

    // Teaching Point
    const tpMatch = line.match(/^\*\*Teaching Point\*\*:\s*(.+)/);
    if (tpMatch) {
      teachingPoint = tpMatch[1].trim();
    }

    i++;
  }

  // Fallback story context if none found — generate from problem or level name
  if (!storyContext) {
    const chMeta = CHAPTER_META.find(c => c.number === chapterNum);
    const topicName = chMeta ? chMeta.name : 'the island';
    const storyTemplates = [
      `The explorers continue their journey through ${topicName}. A new puzzle awaits on the path ahead.`,
      `Deep within ${topicName}, the adventurers discover another mathematical challenge carved in ancient stone.`,
      `On the shores of ${topicName}, a mysterious inscription poses a mathematical riddle.`,
      `The path through ${topicName} leads to a clearing where the next challenge reveals itself.`,
      `Captain Claw points to a carved tablet on ${topicName}. "Another puzzle to solve before we can proceed!"`,
    ];
    // Deterministic selection based on level number
    storyContext = storyTemplates[(chapterNum * 10 + levelNum) % storyTemplates.length];
  }

  // Ensure problem text is long enough (min 10 chars per schema)
  if (problemText.length < 10) {
    problemText = `Solve the following problem: ${levelName}`;
  }

  // Parse answer
  const parsed = parseAnswer(answerText);

  // Ensure we have exactly 3 hints
  while (hints.length < 3) {
    const n = hints.length + 1;
    const hintType = n === 1 ? 'conceptual' : n === 2 ? 'directional' : 'scaffolded';
    hints.push({
      tier: n,
      cost: n - 1,
      text: `Think about what the problem is really asking you to find.`,
      type: hintType,
    });
  }
  hints = hints.slice(0, 3);

  // Ensure hint text is >= 10 chars
  for (const h of hints) {
    if (h.text.length < 10) {
      h.text = h.text + ' — think carefully about this.';
    }
  }

  // Ensure teaching point is >= 10 chars
  if (teachingPoint.length < 10) {
    teachingPoint = `This problem teaches an important mathematical concept about ${CHAPTER_META.find(c => c.number === chapterNum)?.topic || 'math'}.`;
  }

  // Solution explanation from answer text
  let solutionExplanation = answerText;
  if (solutionExplanation.length < 5) {
    solutionExplanation = `The answer is ${parsed.displayValue}.`;
  }

  return {
    chapterNum,
    levelNum,
    levelName,
    type,
    category,
    difficulty,
    storyContext,
    problemText,
    answerText,
    parsed,
    hints,
    teachingPoint,
    solutionExplanation,
  };
}

// ─── Parse Boss Battles ─────────────────────────────────────────────

function parseBossBattles() {
  const bosses = [];
  const bossHeaders = [
    { pattern: 'Unit A Boss Battle', unit: 'A', chapterNum: 3 },
    { pattern: 'Unit B Boss Battle', unit: 'B', chapterNum: 6 },
    { pattern: 'Unit C Boss Battle', unit: 'C', chapterNum: 9 },
    { pattern: 'Unit D Boss Battle', unit: 'D', chapterNum: 12 },
    { pattern: 'Final Boss', unit: 'Final', chapterNum: 12 },
  ];

  for (const bh of bossHeaders) {
    const headerIdx = lines.findIndex(l => l.includes(bh.pattern));
    if (headerIdx === -1) continue;

    const problems = [];
    let i = headerIdx + 1;

    while (i < lines.length && !lines[i].startsWith('## ') && !lines[i].startsWith('### Chapter')) {
      const line = lines[i].trim();

      // Match boss problem patterns
      const bpMatch = line.match(/^\*\*Boss Problem (\d+)\*\*:?\s*\((.+?)\)/);
      const fpMatch = line.match(/^\*\*Problem (\d+)\*\*\s*\((.+?)\)/);
      const match = bpMatch || fpMatch;

      if (match) {
        const problemNum = parseInt(match[1], 10);
        const topic = match[2].trim();

        // Read the blockquoted problem
        i++;
        let probText = '';
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          probText += lines[i].trim().replace(/^>\s*/, '') + ' ';
          i++;
        }
        probText = probText.trim();

        // Read answer
        let answer = '';
        while (i < lines.length) {
          const ansLine = lines[i].trim();
          const ansMatch = ansLine.match(/^\*\*Answer\*\*:\s*(.+)/);
          if (ansMatch) {
            answer = ansMatch[1].trim();
            i++;
            break;
          }
          i++;
          if (lines[i - 1].trim().startsWith('**Boss Problem') || lines[i - 1].trim().startsWith('**Problem') || lines[i - 1].trim().startsWith('**Reward')) break;
        }

        if (probText.length < 10) probText = `Boss challenge about ${topic}.`;

        const parsed = parseAnswer(answer || 'See solution');

        problems.push({
          num: problemNum,
          topic,
          statement: probText,
          answer: answer || 'See solution',
          parsed,
        });
      }
      i++;
    }

    if (problems.length > 0) {
      bosses.push({
        unit: bh.unit,
        chapterNum: bh.chapterNum,
        problems,
      });
    }
  }

  return bosses;
}

// ─── Build the world JSON ───────────────────────────────────────────

function buildWorld() {
  const parsedLevels = parseLevels();
  const bossBattles = parseBossBattles();

  console.log(`Parsed ${parsedLevels.length} regular levels`);
  console.log(`Parsed ${bossBattles.length} boss battles with ${bossBattles.reduce((s, b) => s + b.problems.length, 0)} problems`);

  // Group levels by chapter
  const levelsByChapter = {};
  for (const level of parsedLevels) {
    if (!levelsByChapter[level.chapterNum]) {
      levelsByChapter[level.chapterNum] = [];
    }
    levelsByChapter[level.chapterNum].push(level);
  }

  // Show per-chapter counts
  for (const [ch, lvls] of Object.entries(levelsByChapter)) {
    console.log(`  Chapter ${ch}: ${lvls.length} levels`);
  }

  // Build chapters
  const chapters = CHAPTER_META.map(meta => {
    const chapterLevels = levelsByChapter[meta.number] || [];

    // Add boss battles for this chapter's unit if applicable
    const unitBosses = bossBattles.filter(b => b.chapterNum === meta.number);

    // Build level objects
    const levelObjs = chapterLevels.map((l, idx) => {
      const levelId = `level-4-${meta.number}-${l.levelNum}`;
      const problemId = `problem-4-${meta.number}-${l.levelNum}-1`;

      return {
        id: levelId,
        chapterId: `chapter-4-${meta.number}`,
        worldId: 'world-4',
        number: l.levelNum,
        name: l.levelName,
        type: l.type,
        storyContext: l.storyContext,
        problems: [{
          id: problemId,
          levelId: levelId,
          sequence: 1,
          type: l.parsed.problemType,
          category: l.category,
          statement: l.problemText,
          inputType: l.parsed.inputType,
          correctAnswer: {
            value: l.parsed.value,
            displayValue: l.parsed.displayValue,
          },
          hints: l.hints,
          solutionExplanation: l.solutionExplanation,
          teachingPoint: l.teachingPoint,
          tags: [meta.topic],
          difficulty: l.difficulty,
        }],
        difficulty: l.difficulty,
        estimatedMinutes: estimatedMinutes(l.difficulty),
        isChallenge: l.type === 'challenge',
        isBoss: false,
      };
    });

    // Add boss levels
    for (const boss of unitBosses) {
      const bossLevelNum = chapterLevels.length + (boss.unit === 'Final' ? 2 : 1);
      const bossLevelId = `level-4-${meta.number}-${bossLevelNum}`;
      const bossName = boss.unit === 'Final'
        ? 'The Golden Compass Challenge'
        : `Guardian of ${meta.unit === 'A' ? 'Geometry Shores' : meta.unit === 'B' ? 'Counting Cove' : meta.unit === 'C' ? 'Fraction Harbor' : 'Decimal Depths'}`;

      const bossProblems = boss.problems.map((bp, idx) => ({
        id: `problem-4-${meta.number}-${bossLevelNum}-${idx + 1}`,
        levelId: bossLevelId,
        sequence: idx + 1,
        type: bp.parsed.problemType,
        category: 'thinking',
        statement: bp.statement,
        inputType: bp.parsed.inputType,
        correctAnswer: {
          value: bp.parsed.value,
          displayValue: bp.parsed.displayValue,
        },
        hints: [
          { tier: 1, cost: 0, text: `Think about the core concept of ${bp.topic.toLowerCase()}.`, type: 'conceptual' },
          { tier: 2, cost: 1, text: `Break the problem into smaller steps and solve each part.`, type: 'directional' },
          { tier: 3, cost: 2, text: `Apply the method you learned in this unit to find the answer.`, type: 'scaffolded' },
        ],
        solutionExplanation: bp.answer,
        teachingPoint: `Boss challenge testing mastery of ${bp.topic.toLowerCase()}.`,
        tags: [meta.topic, 'boss'],
        difficulty: 5,
      }));

      levelObjs.push({
        id: bossLevelId,
        chapterId: `chapter-4-${meta.number}`,
        worldId: 'world-4',
        number: bossLevelNum,
        name: bossName,
        type: 'boss',
        storyContext: boss.unit === 'Final'
          ? 'The four compass fragments glow as they are brought together. One final challenge stands between you and the Golden Compass of Understanding!'
          : `The guardian of the ${meta.unit === 'A' ? 'Geometry Shores' : meta.unit === 'B' ? 'Counting Cove' : meta.unit === 'C' ? 'Fraction Harbor' : 'Decimal Depths'} appears to test your mastery!`,
        problems: bossProblems,
        difficulty: 5,
        estimatedMinutes: 10,
        isChallenge: true,
        isBoss: true,
      });
    }

    return {
      id: `chapter-4-${meta.number}`,
      worldId: 'world-4',
      number: meta.number,
      name: meta.name,
      topic: meta.topic,
      weekStart: meta.weekStart,
      weekEnd: meta.weekEnd,
      levels: levelObjs,
      learningObjectives: CHAPTER_LEARNING_OBJECTIVES[meta.number] || [],
      signatureContent: CHAPTER_SIGNATURE_CONTENT[meta.number] || [],
      isBoss: false,
    };
  });

  // Count total levels
  const totalLevels = chapters.reduce((sum, ch) => sum + ch.levels.length, 0);
  console.log(`\nTotal levels: ${totalLevels}`);

  const world = {
    id: 'world-4',
    name: 'Fraction Islands',
    theme: 'tropical',
    baLevel: 4,
    targetAgeMin: 9,
    targetAgeMax: 11,
    totalLevels,
    estimatedWeeks: 36,
    colorPalette: {
      primary: '#0EA5E9',
      secondary: '#F59E0B',
      accent: '#F472B6',
      background: '#F8FAFC',
      text: '#1E293B',
    },
    characters: [
      { id: 'grogg', name: 'Grogg', role: 'companion', personality: 'An eager explorer who makes relatable fraction mistakes — perfect for Find-the-Error problems' },
      { id: 'lizzie', name: 'Lizzie', role: 'strategist', personality: 'A clever navigator who finds shortcuts and benchmarks for comparing fractions' },
      { id: 'prof-owlbert', name: 'Professor Owlbert', role: 'teacher', personality: 'A wise island sage who explains concepts with patience and depth' },
      { id: 'captain-claw', name: 'Captain Claw', role: 'challenger', personality: 'A ship captain who guides island-to-island travel and presents navigation challenges' },
    ],
    isLocked: false,
    prerequisiteWorldId: 'world-3',
    chapters,
  };

  return world;
}

// ─── Main ───────────────────────────────────────────────────────────
const world = buildWorld();
writeFileSync(outPath, JSON.stringify(world, null, 2), 'utf-8');
console.log(`\nWritten to ${outPath}`);
console.log(`File size: ${(readFileSync(outPath).length / 1024).toFixed(1)} KB`);

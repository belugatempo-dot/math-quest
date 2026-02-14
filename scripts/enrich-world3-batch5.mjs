#!/usr/bin/env node
/**
 * Batch 5: Ch5 (Perfect Squares) + Ch7 (Variables & Equations)
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'data', 'world-3.json');
const world = JSON.parse(readFileSync(dataPath, 'utf-8'));

function prob(id, levelId, seq, type, category, statement, inputType, correctAnswer, hints, solExp, tp, tags, diff) {
  return { id, levelId, sequence: seq, type, category, statement, inputType, correctAnswer, hints, solutionExplanation: solExp, teachingPoint: tp, tags, difficulty: diff };
}
function h(t1, t2, t3) {
  return [
    { tier: 1, cost: 0, text: t1, type: 'conceptual' },
    { tier: 2, cost: 1, text: t2, type: 'directional' },
    { tier: 3, cost: 2, text: t3, type: 'scaffolded' },
  ];
}

const ch5New = {
  'level-3-5-1': [
    prob('problem-3-5-1-2', 'level-3-5-1', 2, 'numeric_input', 'fluency',
      '"What is 6 × 6?"', 'number_pad', { value: 36, displayValue: '36' },
      h('A square number is a number times itself.', '6 × 6 = ?', '36.'),
      '36 — 6² = 36.', 'Square numbers: n × n = n².',
      ['perfect-squares'], 1),
    prob('problem-3-5-1-3', 'level-3-5-1', 3, 'multiple_choice', 'thinking',
      '"Which is a perfect square? A) 15 B) 16 C) 18 D) 20"', 'multiple_choice',
      { value: 'B) 16', displayValue: 'B) 16 = 4²' },
      h('A perfect square equals some whole number times itself.',
        'Check: 3²=9, 4²=16, 5²=25.',
        '16 = 4² ✓.'),
      '16 = 4². The others are not perfect squares.', 'Perfect squares: 1,4,9,16,25,36,...',
      ['perfect-squares'], 1),
  ],
  'level-3-5-2': [
    prob('problem-3-5-2-2', 'level-3-5-2', 2, 'numeric_input', 'thinking',
      '"A square array has equal rows and columns. If it has 49 objects total, how many rows?"',
      'number_pad', { value: 7, displayValue: '7' },
      h('49 is a perfect square. Find its square root.',
        'What × what = 49?', '7 × 7 = 49. So 7 rows.'),
      '7 — because 7 × 7 = 49.', 'Square root: finding what number squared gives the target.',
      ['perfect-squares', 'arrays'], 2),
  ],
  'level-3-5-3': [
    prob('problem-3-5-3-2', 'level-3-5-3', 2, 'numeric_input', 'fluency',
      '"What is 8²?"', 'number_pad', { value: 64, displayValue: '64' },
      h('8² means 8 × 8.', '8 × 8 = ?', '64.'),
      '64 — 8² = 8 × 8 = 64.', 'Memorize: 8² = 64.',
      ['perfect-squares'], 2),
    prob('problem-3-5-3-3', 'level-3-5-3', 3, 'ordering', 'fluency',
      '"Order from smallest: 5², 3², 7², 4²"', 'drag_drop',
      { value: ['3²', '4²', '5²', '7²'], displayValue: '9, 16, 25, 49' },
      h('Calculate each square.', '3²=9, 4²=16, 5²=25, 7²=49.',
        'Order: 9, 16, 25, 49.'),
      '3²=9, 4²=16, 5²=25, 7²=49.',
      'Squares grow fast: larger numbers squared produce much larger results.',
      ['perfect-squares'], 2),
  ],
  'level-3-5-4': [
    prob('problem-3-5-4-2', 'level-3-5-4', 2, 'multi_select', 'thinking',
      '"Select ALL perfect squares from this list: 25, 30, 36, 40, 49, 50"', 'checkbox_group',
      { value: ['25', '36', '49'], displayValue: '25=5², 36=6², 49=7²' },
      h('Check each: is it n² for some whole number?',
        '5²=25✓, 6²=36✓, 7²=49✓. Others are not.',
        '25, 36, 49 are perfect squares.'),
      '25=5², 36=6², 49=7². The others (30,40,50) are not perfect squares.',
      'Perfect square test: take the square root. If it is a whole number, it is a perfect square.',
      ['perfect-squares'], 2),
  ],
  'level-3-5-5': [
    prob('problem-3-5-5-2', 'level-3-5-5', 2, 'text_input', 'pattern_discovery',
      '"1²=1, 2²=4, 3²=9, 4²=16. What is the difference between consecutive squares? What pattern do you see?"',
      'text_field', { value: 'Differences are 3, 5, 7 — consecutive odd numbers!', displayValue: '3, 5, 7 — consecutive odd numbers' },
      h('Calculate: 4-1=3, 9-4=5, 16-9=7.',
        'The gaps are 3, 5, 7. What kind of numbers are these?',
        'They are consecutive odd numbers! Next gap: 9, then 25-16=9 ✓.'),
      'Differences are consecutive odd numbers: 3, 5, 7, 9, 11... because (n+1)² - n² = 2n+1.',
      'The difference between consecutive squares is always an odd number. This connects squares to odd numbers.',
      ['perfect-squares', 'patterns'], 2),
  ],
  'level-3-5-6': [
    prob('problem-3-5-6-2', 'level-3-5-6', 2, 'numeric_input', 'pattern_discovery',
      '"1+3 = 4 = 2². 1+3+5 = 9 = 3². What is 1+3+5+7?"',
      'number_pad', { value: 16, displayValue: '16 = 4²' },
      h('Sum the first 4 odd numbers.', '1+3+5+7 = ?', '16 = 4².'),
      '16 — the sum of the first n odd numbers equals n². Here: 1+3+5+7 = 4² = 16.',
      'Beautiful pattern: the sum of the first n odd numbers always equals n².',
      ['perfect-squares', 'patterns'], 2),
    prob('problem-3-5-6-3', 'level-3-5-6', 3, 'numeric_input', 'thinking',
      '"What is 1+3+5+7+9+11+13? (Sum of first 7 odd numbers)"',
      'number_pad', { value: 49, displayValue: '49 = 7²' },
      h('The sum of the first n odd numbers = n².', 'Here n = 7.', '7² = 49.'),
      '49 — sum of first 7 odd numbers = 7² = 49. Pattern confirmed!',
      'The odd-number-to-square pattern provides a shortcut: no need to add one by one.',
      ['perfect-squares', 'patterns'], 3),
  ],
  'level-3-5-7': [
    prob('problem-3-5-7-2', 'level-3-5-7', 2, 'numeric_input', 'strategic_practice',
      '"A square garden has area 81 square meters. What is the side length?"',
      'number_pad', { value: 9, displayValue: '9 m' },
      h('Area of square = side².', 'side² = 81. What number squared is 81?', '9² = 81.'),
      '9 m — because 9² = 81.', 'Square root and area: side = √area.',
      ['perfect-squares', 'area'], 2),
  ],
  'level-3-5-8': [
    prob('problem-3-5-8-2', 'level-3-5-8', 2, 'text_input', 'strategic_practice',
      '"Can 50 be written as the sum of two perfect squares? Show how."', 'text_field',
      { value: '50 = 25 + 25 = 5² + 5². Or 50 = 49 + 1 = 7² + 1².', displayValue: '5² + 5² or 7² + 1²' },
      h('Try combinations of squares that sum to 50.',
        '1+49=50? 1²+7²=1+49=50 ✓. Or 5²+5²=25+25=50 ✓.',
        'Both work!'),
      '50 = 5²+5² = 25+25 or 50 = 7²+1² = 49+1.',
      'Many numbers can be written as sums of squares in multiple ways.',
      ['perfect-squares', 'sums'], 4),
  ],
  'level-3-5-9': [
    prob('problem-3-5-9-2', 'level-3-5-9', 2, 'numeric_input', 'working_backwards',
      '"I am a perfect square between 30 and 40. What am I?"',
      'number_pad', { value: 36, displayValue: '36 = 6²' },
      h('List perfect squares: 1,4,9,16,25,36,49...',
        'Which falls between 30 and 40?',
        '36 = 6² is between 30 and 40.'),
      '36 — 5²=25 (too small), 6²=36 ✓, 7²=49 (too big).',
      'Working backwards: narrow the range, then check squares.',
      ['perfect-squares', 'working-backwards'], 4),
  ],
  'level-3-5-10': [
    prob('problem-3-5-10-2', 'level-3-5-10', 2, 'text_input', 'thinking',
      '"The first 4 odd numbers are 1,3,5,7. Their sum is 16 = 4². Use this pattern to predict the sum of the first 10 odd numbers."',
      'text_field', { value: '100 = 10²', displayValue: '100 (= 10²)' },
      h('The pattern: sum of first n odds = n².',
        'For n = 10: 10² = ?',
        '10² = 100.'),
      '100 — sum of first 10 odd numbers = 10² = 100. The pattern holds for all n.',
      'Mathematical patterns let us predict without computing: sum of n odds = n² is a powerful shortcut.',
      ['perfect-squares', 'patterns', 'proofs'], 5),
  ],
};

const ch5QuizLevel = {
  id: 'level-3-5-11', chapterId: 'chapter-3-5', worldId: 'world-3', number: 11,
  name: 'Perfect Squares Quiz', type: 'quiz',
  storyContext: 'Demonstrate your square number mastery!',
  problems: [
    prob('problem-3-5-11-1', 'level-3-5-11', 1, 'numeric_input', 'fluency',
      '"What is 9²?"', 'number_pad', { value: 81, displayValue: '81' },
      h('9² = 9 × 9.', '9 × 9 = ?', '81.'),
      '81 — 9² = 81.', '9² = 81.',
      ['perfect-squares'], 2),
    prob('problem-3-5-11-2', 'level-3-5-11', 2, 'numeric_input', 'working_backwards',
      '"A square has area 144. Side length?"', 'number_pad', { value: 12, displayValue: '12' },
      h('side² = 144. What is √144?', '12 × 12 = 144.', '12.'),
      '12 — 12² = 144.', '√144 = 12.',
      ['perfect-squares', 'area'], 3),
    prob('problem-3-5-11-3', 'level-3-5-11', 3, 'multiple_choice', 'thinking',
      '"Which is NOT a perfect square? A) 64 B) 72 C) 81 D) 100"', 'multiple_choice',
      { value: 'B) 72', displayValue: 'B) 72' },
      h('Check each: is it n² for whole n?', '8²=64, ?²=72 (no), 9²=81, 10²=100.',
        '72 is not a perfect square. 8²=64 < 72 < 81=9².'),
      '72 — 8²=64 and 9²=81. 72 falls between them and is not a square.',
      'Test by checking adjacent squares: if n² < x < (n+1)², then x is not a perfect square.',
      ['perfect-squares'], 3),
    prob('problem-3-5-11-4', 'level-3-5-11', 4, 'numeric_input', 'pattern_discovery',
      '"Sum of first 6 odd numbers = ?"', 'number_pad', { value: 36, displayValue: '36 = 6²' },
      h('Pattern: sum of first n odds = n².', 'n = 6.', '6² = 36.'),
      '36 = 6². The pattern always holds.', 'Sum of first n odd numbers = n².',
      ['perfect-squares', 'patterns'], 4),
    prob('problem-3-5-11-5', 'level-3-5-11', 5, 'text_input', 'thinking',
      '"Is the square of an odd number always odd? Explain."', 'text_field',
      { value: 'Yes. Odd × odd = odd. Example: 3²=9, 5²=25, 7²=49 — all odd.', displayValue: 'Yes — odd × odd is always odd' },
      h('Try examples: 3²=9, 5²=25, 7²=49.',
        'All results are odd. Can you explain why?',
        'Odd × odd = odd because (2k+1)(2k+1) = 4k²+4k+1 = even+1 = odd.'),
      'Yes — odd × odd = odd. The square of an odd number is always odd.',
      'Parity preservation: odd×odd=odd, even×even=even. Squaring preserves parity.',
      ['perfect-squares', 'parity'], 5),
  ],
  difficulty: 3, estimatedMinutes: 10, isChallenge: false, isBoss: false,
};

// ============================================================
// CHAPTER 7: VARIABLES & EQUATIONS
// ============================================================

const ch7New = {
  'level-3-7-1': [
    prob('problem-3-7-1-2', 'level-3-7-1', 2, 'multiple_choice', 'thinking',
      '"If n = 5, what is n + 3? A) 5 B) 8 C) 3 D) 15"', 'multiple_choice',
      { value: 'B) 8', displayValue: 'B) 8' },
      h('Replace n with its value.', 'n + 3 = 5 + 3 = ?', '5 + 3 = 8.'),
      '8 — substitute n=5: 5+3=8.', 'Evaluating: replace the variable with its value, then compute.',
      ['variables'], 1),
    prob('problem-3-7-1-3', 'level-3-7-1', 3, 'numeric_input', 'fluency',
      '"If x = 7, what is 3 × x?"', 'number_pad', { value: 21, displayValue: '21' },
      h('Replace x with 7.', '3 × 7 = ?', '21.'),
      '21 — 3 × 7 = 21.', '3x means 3 × x.',
      ['variables', 'multiplication'], 1),
  ],
  'level-3-7-2': [
    prob('problem-3-7-2-2', 'level-3-7-2', 2, 'numeric_input', 'strategic_practice',
      '"If a = 4, what is 2a + 5?"', 'number_pad', { value: 13, displayValue: '13' },
      h('2a means 2 × a.', '2 × 4 + 5 = 8 + 5 = ?', '13.'),
      '13 — 2(4)+5 = 8+5 = 13.', 'Evaluate step by step: multiply first, then add.',
      ['variables', 'expressions'], 2),
    prob('problem-3-7-2-3', 'level-3-7-2', 3, 'text_input', 'thinking',
      '"Write an expression for: 5 more than twice a number n."', 'text_field',
      { value: '2n + 5', displayValue: '2n + 5' },
      h('"Twice a number" = 2 × n. "5 more than" = + 5.',
        'Combine: 2 × n + 5.',
        '2n + 5.'),
      '2n + 5 — "twice n" = 2n, "5 more" = +5.',
      'Translating words to algebra: "twice" = 2×, "more than" = +.',
      ['variables', 'expressions'], 3),
  ],
  'level-3-7-3': [
    prob('problem-3-7-3-2', 'level-3-7-3', 2, 'numeric_input', 'fluency',
      '"If y = 6, what is y² - 10?"', 'number_pad', { value: 26, displayValue: '26' },
      h('y² means y × y.', '6² = 36. Then 36 - 10 = ?', '26.'),
      '26 — 6²-10 = 36-10 = 26.', 'Exponents first, then subtract.',
      ['variables', 'expressions'], 2),
    prob('problem-3-7-3-3', 'level-3-7-3', 3, 'numeric_input', 'strategic_practice',
      '"If m = 3, what is 4m - 2m?"', 'number_pad', { value: 6, displayValue: '6' },
      h('Substitute m = 3 into both terms.', '4(3) - 2(3) = 12 - 6 = ?',
        '6. Or simplify first: 4m-2m = 2m = 2(3) = 6.'),
      '6 — 4(3)-2(3)=12-6=6. Or: 4m-2m=2m, 2(3)=6.',
      'Combining like terms: 4m - 2m = 2m. Simplify before substituting when possible.',
      ['variables', 'expressions', 'simplification'], 3),
  ],
  'level-3-7-4': [
    prob('problem-3-7-4-2', 'level-3-7-4', 2, 'text_input', 'thinking',
      '"Write an equation for: a number plus 7 equals 15."', 'text_field',
      { value: 'x + 7 = 15', displayValue: 'x + 7 = 15' },
      h('Let the unknown number be x.', '"A number plus 7" = x + 7. "Equals 15" = = 15.',
        'x + 7 = 15.'),
      'x + 7 = 15.', 'Writing equations: identify the unknown, translate words to symbols.',
      ['variables', 'equations'], 1),
    prob('problem-3-7-4-3', 'level-3-7-4', 3, 'numeric_input', 'fluency',
      '"Solve: x + 7 = 15"', 'number_pad', { value: 8, displayValue: '8' },
      h('What number plus 7 gives 15?', 'x = 15 - 7.', '15 - 7 = 8.'),
      '8 — x = 15 - 7 = 8.', 'Solve addition equations by subtracting.',
      ['variables', 'equations'], 2),
  ],
  'level-3-7-5': [
    prob('problem-3-7-5-2', 'level-3-7-5', 2, 'numeric_input', 'thinking',
      '"Solve: x - 9 = 14"', 'number_pad', { value: 23, displayValue: '23' },
      h('Undo subtraction by adding.', 'x = 14 + 9.', '14 + 9 = 23.'),
      '23 — x = 14 + 9 = 23. Check: 23-9=14 ✓.',
      'Solve subtraction equations by adding to both sides.',
      ['variables', 'equations'], 3),
    prob('problem-3-7-5-3', 'level-3-7-5', 3, 'text_input', 'working_backwards',
      '"Solve: 3x = 21"', 'text_field', { value: 'x = 7', displayValue: 'x = 7' },
      h('3x means 3 × x. Undo by dividing.',
        'x = 21 ÷ 3.', '21 ÷ 3 = 7.'),
      'x = 7 — divide both sides by 3: 21 ÷ 3 = 7.',
      'Solve multiplication equations by dividing: if ax = b, then x = b/a.',
      ['variables', 'equations'], 3),
  ],
  'level-3-7-6': [
    prob('problem-3-7-6-2', 'level-3-7-6', 2, 'multiple_choice', 'thinking',
      '"Addition and ___ are inverse operations. A) Multiplication B) Subtraction C) Division D) Squaring"',
      'multiple_choice', { value: 'B) Subtraction', displayValue: 'B) Subtraction' },
      h('Inverse operations undo each other.', 'If you add 5, what undoes it? Subtract 5.',
        'Addition and subtraction are inverses.'),
      'Subtraction — it undoes addition. Adding then subtracting (or vice versa) returns to the start.',
      'Inverse pairs: addition↔subtraction, multiplication↔division.',
      ['variables', 'inverse-operations'], 1),
  ],
  'level-3-7-7': [
    prob('problem-3-7-7-2', 'level-3-7-7', 2, 'numeric_input', 'fluency',
      '"Solve: 5x = 45"', 'number_pad', { value: 9, displayValue: '9' },
      h('Divide both sides by 5.', 'x = 45 ÷ 5.', '45 ÷ 5 = 9.'),
      '9 — 45 ÷ 5 = 9.', 'Multiplication equation: divide to solve.',
      ['variables', 'equations'], 2),
    prob('problem-3-7-7-3', 'level-3-7-7', 3, 'numeric_input', 'working_backwards',
      '"Solve: x ÷ 4 = 8"', 'number_pad', { value: 32, displayValue: '32' },
      h('Undo division by multiplying.', 'x = 8 × 4.', '8 × 4 = 32.'),
      '32 — 8 × 4 = 32. Check: 32 ÷ 4 = 8 ✓.',
      'Division equation: multiply to solve. If x/a = b, then x = a×b.',
      ['variables', 'equations'], 3),
  ],
  'level-3-7-8': [
    prob('problem-3-7-8-2', 'level-3-7-8', 2, 'numeric_input', 'thinking',
      '"Solve: 2x + 3 = 17"', 'number_pad', { value: 7, displayValue: '7' },
      h('Two-step: undo addition first, then multiplication.',
        '2x = 17 - 3 = 14. Then x = 14 ÷ 2.',
        'x = 7. Check: 2(7)+3 = 14+3 = 17 ✓.'),
      '7 — step 1: 2x=14, step 2: x=7.',
      'Two-step equations: undo outer operation first, then inner. Reverse of PEMDAS.',
      ['variables', 'equations', 'two-step'], 4),
  ],
  'level-3-7-9': [
    prob('problem-3-7-9-2', 'level-3-7-9', 2, 'numeric_input', 'thinking',
      '"Mia has some stickers. She gives away 8 and has 15 left. How many did she start with?"',
      'number_pad', { value: 23, displayValue: '23' },
      h('Let x = starting stickers. x - 8 = 15.',
        'x = 15 + 8.', '23 stickers.'),
      '23 — x - 8 = 15, so x = 23.',
      'Word problems → equations: identify the unknown, write the equation, solve.',
      ['variables', 'equations', 'word-problems'], 5),
  ],
};

const ch7QuizLevel = {
  id: 'level-3-7-10', chapterId: 'chapter-3-7', worldId: 'world-3', number: 10,
  name: 'Variables & Equations Quiz', type: 'quiz',
  storyContext: 'Show your equation-solving skills!',
  problems: [
    prob('problem-3-7-10-1', 'level-3-7-10', 1, 'numeric_input', 'fluency',
      '"If n = 8, what is 5n - 12?"', 'number_pad', { value: 28, displayValue: '28' },
      h('5n = 5 × 8 = 40.', '40 - 12 = ?', '28.'),
      '28 — 5(8)-12 = 40-12 = 28.', 'Substitute and compute.',
      ['variables'], 2),
    prob('problem-3-7-10-2', 'level-3-7-10', 2, 'numeric_input', 'fluency',
      '"Solve: x + 12 = 30"', 'number_pad', { value: 18, displayValue: '18' },
      h('Subtract 12 from both sides.', '30 - 12 = ?', '18.'),
      '18 — 30-12=18.', 'Addition equation: subtract to solve.',
      ['equations'], 2),
    prob('problem-3-7-10-3', 'level-3-7-10', 3, 'numeric_input', 'working_backwards',
      '"Solve: 4x = 32"', 'number_pad', { value: 8, displayValue: '8' },
      h('Divide by 4.', '32 ÷ 4 = ?', '8.'),
      '8 — 32÷4=8.', 'Multiplication equation: divide.',
      ['equations'], 3),
    prob('problem-3-7-10-4', 'level-3-7-10', 4, 'numeric_input', 'thinking',
      '"Solve: 3x - 5 = 16"', 'number_pad', { value: 7, displayValue: '7' },
      h('Two steps: add 5, then divide by 3.',
        '3x = 21. x = 21 ÷ 3.', '7.'),
      '7 — 3x=21, x=7.', 'Two-step: undo subtraction, then division.',
      ['equations', 'two-step'], 4),
    prob('problem-3-7-10-5', 'level-3-7-10', 5, 'text_input', 'thinking',
      '"A number doubled minus 6 equals 20. Write and solve the equation."', 'text_field',
      { value: '2x - 6 = 20, so x = 13', displayValue: '2x - 6 = 20 → x = 13' },
      h('"Doubled" = 2x. "Minus 6" = -6. "Equals 20" = =20.',
        '2x - 6 = 20. Add 6: 2x = 26. Divide by 2.',
        'x = 13.'),
      '2x - 6 = 20 → 2x = 26 → x = 13.',
      'Full process: translate words → write equation → solve step by step.',
      ['equations', 'word-problems'], 5),
  ],
  difficulty: 3, estimatedMinutes: 10, isChallenge: false, isBoss: false,
};

// Apply
function calcMinutes(pc, ad) { return Math.max(3, Math.round(pc * (ad <= 2 ? 1.5 : ad <= 3 ? 2 : 2.5))); }
function enrichChapter(ci, npm, extras) {
  const ch = world.chapters[ci]; let a = 0;
  for (const l of ch.levels) { const np = npm[l.id]; if (np?.length) { l.problems.push(...np); const t = l.problems.length; l.estimatedMinutes = calcMinutes(t, l.problems.reduce((s,p)=>s+p.difficulty,0)/t); a += np.length; } }
  for (const ex of extras) { ch.levels.push(ex); a += ex.problems.length; }
  console.log(`  ${ch.name}: +${a}, ${ch.levels.length} levels, ${ch.levels.reduce((s,l)=>s+l.problems.length,0)} total`);
}
const ch5Idx = world.chapters.findIndex(c => c.id === 'chapter-3-5');
const ch7Idx = world.chapters.findIndex(c => c.id === 'chapter-3-7');
console.log('Enriching World 3 — Batch 5');
enrichChapter(ch5Idx, ch5New, [ch5QuizLevel]);
enrichChapter(ch7Idx, ch7New, [ch7QuizLevel]);
world.totalLevels = world.chapters.reduce((s, c) => s + c.levels.length, 0);
console.log(`Total: ${world.totalLevels} levels, ${world.chapters.reduce((s,c)=>s+c.levels.reduce((ls,l)=>ls+l.problems.length,0),0)} problems`);
writeFileSync(dataPath, JSON.stringify(world, null, 2) + '\n', 'utf-8');
console.log('Written.');

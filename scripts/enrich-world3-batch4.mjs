#!/usr/bin/env node
/**
 * Batch 4: Ch6 (Distributive Property) + Ch9 (Units & Measurement)
 * Focus: Fix 100% text_field input type issue — diversify inputs.
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

const ch6New = {
  'level-3-6-1': [
    prob('problem-3-6-1-2', 'level-3-6-1', 2, 'numeric_input', 'fluency',
      '"Calculate: 3 + 4 × 2. Remember order of operations!"', 'number_pad',
      { value: 11, displayValue: '11' },
      h('Which operation do you do first: addition or multiplication?',
        'Multiplication before addition: 4 × 2 = 8, then 3 + 8.',
        '3 + 8 = 11.'),
      '11 — multiply first: 4×2=8, then 3+8=11.',
      'Order of operations: multiplication and division before addition and subtraction.',
      ['order-of-operations'], 1),
    prob('problem-3-6-1-3', 'level-3-6-1', 3, 'multiple_choice', 'thinking',
      '"What is 8 - 2 × 3? A) 18 B) 2 C) 6 D) 14"', 'multiple_choice',
      { value: 'B) 2', displayValue: 'B) 2' },
      h('Apply order of operations: multiply first.',
        '2 × 3 = 6, then 8 - 6 = ?',
        '8 - 6 = 2.'),
      '2 — multiply first: 2×3=6, then 8-6=2.',
      'A common mistake is computing left-to-right (8-2=6, 6×3=18). Multiplication comes first!',
      ['order-of-operations'], 2),
  ],
  'level-3-6-2': [
    prob('problem-3-6-2-2', 'level-3-6-2', 2, 'numeric_input', 'fluency',
      '"Calculate: (5 + 3) × 4"', 'number_pad',
      { value: 32, displayValue: '32' },
      h('Parentheses first!', '(5 + 3) = 8, then 8 × 4 = ?', '8 × 4 = 32.'),
      '32 — parentheses first: (5+3)=8, then 8×4=32.',
      'Parentheses override normal order: always compute inside parentheses first.',
      ['order-of-operations', 'parentheses'], 1),
    prob('problem-3-6-2-3', 'level-3-6-2', 3, 'multiple_choice', 'find_the_error',
      '"Grogg says (2 + 5) × 3 = 2 + 15 = 17. Find his error. A) He forgot parentheses B) He multiplied wrong C) Both"',
      'multiple_choice', { value: 'A) He forgot parentheses', displayValue: 'A) Parentheses first: (2+5)×3 = 7×3 = 21' },
      h('Grogg computed 5×3 first instead of adding 2+5 first.',
        'Correct: (2+5) = 7, then 7 × 3 = 21.',
        'Grogg got 17 by ignoring parentheses: 2 + 5×3 = 2+15 = 17.'),
      'Grogg ignored the parentheses. Correct: (2+5)×3 = 7×3 = 21, not 17.',
      'Parentheses are NOT optional — they change the order of computation.',
      ['order-of-operations', 'find-the-error'], 2),
  ],
  'level-3-6-3': [
    prob('problem-3-6-3-2', 'level-3-6-3', 2, 'numeric_input', 'strategic_practice',
      '"Calculate: 12 - 3 × 2 + 4"', 'number_pad',
      { value: 10, displayValue: '10' },
      h('Follow order: multiply first, then left to right.',
        '3 × 2 = 6. Then 12 - 6 + 4.',
        '12 - 6 = 6, then 6 + 4 = 10.'),
      '10 — multiply first: 3×2=6. Then left to right: 12-6+4 = 10.',
      'After handling multiplication/division, process addition/subtraction left to right.',
      ['order-of-operations'], 3),
    prob('problem-3-6-3-3', 'level-3-6-3', 3, 'numeric_input', 'strategic_practice',
      '"Calculate: 2 × (10 - 3) + 5"', 'number_pad',
      { value: 19, displayValue: '19' },
      h('Parentheses first, then multiply, then add.',
        '(10-3)=7, then 2×7=14, then 14+5=?',
        '14 + 5 = 19.'),
      '19 — (10-3)=7, 2×7=14, 14+5=19.',
      'Complex expressions: parentheses first, then multiplication, then addition.',
      ['order-of-operations'], 3),
  ],
  'level-3-6-4': [
    prob('problem-3-6-4-2', 'level-3-6-4', 2, 'numeric_input', 'thinking',
      '"Use the area model: 7 × 13 = 7 × 10 + 7 × 3. Calculate."', 'number_pad',
      { value: 91, displayValue: '91' },
      h('Break 13 into 10 + 3, then distribute the 7.',
        '7 × 10 = 70. 7 × 3 = 21.', '70 + 21 = 91.'),
      '91 — 7×10=70, 7×3=21, 70+21=91.',
      'The area model splits one factor: a×(b+c) = a×b + a×c. This IS the distributive property.',
      ['distributive-property', 'area-model'], 2),
    prob('problem-3-6-4-3', 'level-3-6-4', 3, 'multiple_choice', 'thinking',
      '"Which area model correctly shows 5 × 14? A) 5×10 + 5×4 B) 5×10 + 4 C) 5+10 × 5+4 D) 14×5+5"',
      'multiple_choice', { value: 'A) 5×10 + 5×4', displayValue: 'A) 5×10 + 5×4 = 50 + 20 = 70' },
      h('Break 14 into 10 + 4 and distribute 5.',
        '5 × (10 + 4) = 5×10 + 5×4.',
        'A) = 50 + 20 = 70 ✓.'),
      'A — 5×(10+4) = 5×10 + 5×4 = 50 + 20 = 70.',
      'The distributive property: a×(b+c) = a×b + a×c. Both parts get multiplied by a.',
      ['distributive-property', 'area-model'], 2),
  ],
  'level-3-6-5': [
    prob('problem-3-6-5-2', 'level-3-6-5', 2, 'numeric_input', 'fluency',
      '"Use distribution: 8 × 99 = 8 × 100 - 8 × 1. Calculate."', 'number_pad',
      { value: 792, displayValue: '792' },
      h('Break 99 into 100 - 1.',
        '8 × 100 = 800. 8 × 1 = 8.',
        '800 - 8 = 792.'),
      '792 — 8×100=800, 800-8=792. Distribution works with subtraction too!',
      'Distribution works with subtraction: a×(b-c) = a×b - a×c. Great for near-100 multiplication.',
      ['distributive-property'], 2),
  ],
  'level-3-6-6': [
    prob('problem-3-6-6-2', 'level-3-6-6', 2, 'numeric_input', 'strategic_practice',
      '"Calculate 6 × 15 by breaking apart 15."', 'number_pad',
      { value: 90, displayValue: '90' },
      h('Break 15 into 10 + 5.', '6×10=60, 6×5=30.', '60+30=90.'),
      '90 — 6×(10+5) = 60+30 = 90.',
      'Breaking apart: choose the split that gives the friendliest products.',
      ['distributive-property'], 2),
    prob('problem-3-6-6-3', 'level-3-6-6', 3, 'numeric_input', 'strategic_practice',
      '"Calculate 9 × 12 using 9 × 10 + 9 × 2."', 'number_pad',
      { value: 108, displayValue: '108' },
      h('Split 12 into 10 + 2.', '9×10=90, 9×2=18.', '90+18=108.'),
      '108 — 9×(10+2) = 90+18 = 108.',
      'Distribution with 10: the most common and useful split.',
      ['distributive-property'], 3),
  ],
  'level-3-6-7': [
    prob('problem-3-6-7-2', 'level-3-6-7', 2, 'numeric_input', 'thinking',
      '"The area model shows: □ × 8 = □ × 5 + □ × 3. If the total area is 56, what is □?"',
      'number_pad', { value: 7, displayValue: '7' },
      h('□ × 8 = 56. What × 8 = 56?', '56 ÷ 8 = ?', '56 ÷ 8 = 7. Check: 7×5+7×3 = 35+21 = 56 ✓.'),
      '7 — because 7 × 8 = 56. Verified: 7×5 + 7×3 = 35+21 = 56.',
      'Area model puzzles: work backwards from the total to find missing factors.',
      ['distributive-property', 'area-model'], 3),
    prob('problem-3-6-7-3', 'level-3-6-7', 3, 'multiple_choice', 'thinking',
      '"Which expression equals 4 × 7 + 4 × 3? A) 4 × 10 B) 7 × 7 C) 4 × 21 D) 7 × 10"',
      'multiple_choice', { value: 'A) 4 × 10', displayValue: 'A) 4 × 10 = 40' },
      h('Factor out the common factor: 4×7 + 4×3 = 4×(7+3).',
        '7 + 3 = 10. So 4 × (7+3) = 4 × 10.',
        '4 × 10 = 40. Check: 4×7+4×3 = 28+12 = 40 ✓.'),
      'A — 4×7 + 4×3 = 4×(7+3) = 4×10 = 40.',
      'Factoring out: a×b + a×c = a×(b+c). This is the reverse of distribution.',
      ['distributive-property'], 3),
  ],
  'level-3-6-8': [
    prob('problem-3-6-8-2', 'level-3-6-8', 2, 'numeric_input', 'strategic_practice',
      '"Simplify: 3 × (20 + 4) - 3 × 4"', 'number_pad',
      { value: 60, displayValue: '60' },
      h('Distribute first, then simplify.',
        '3×20 + 3×4 - 3×4 = 60 + 12 - 12.',
        '60 + 12 - 12 = 60. The 3×4 terms cancel!'),
      '60 — 3×24 - 3×4 = 3×(24-4) = 3×20 = 60.',
      'When terms cancel in distribution, the expression simplifies dramatically.',
      ['distributive-property', 'simplification'], 4),
  ],
  'level-3-6-9': [
    prob('problem-3-6-9-2', 'level-3-6-9', 2, 'numeric_input', 'working_backwards',
      '"□ × 7 + □ × 3 = 50. What is □?"', 'number_pad',
      { value: 5, displayValue: '5' },
      h('Factor out □: □ × (7+3) = □ × 10 = 50.',
        '□ × 10 = 50. So □ = 50 ÷ 10.',
        '50 ÷ 10 = 5.'),
      '5 — factor out: □×(7+3) = □×10 = 50, so □ = 5.',
      'Factoring + working backwards: combine distribution with inverse operations.',
      ['distributive-property', 'working-backwards'], 4),
  ],
  'level-3-6-10': [
    prob('problem-3-6-10-2', 'level-3-6-10', 2, 'multiple_choice', 'thinking',
      '"Does distribution work with subtraction? Is 5×(8-3) = 5×8 - 5×3? A) Yes B) No"',
      'multiple_choice', { value: 'A) Yes', displayValue: 'A) Yes — both equal 25' },
      h('Calculate both sides.',
        '5×(8-3) = 5×5 = 25. And 5×8-5×3 = 40-15 = 25.',
        'Both equal 25. Distribution works with subtraction.'),
      'Yes — 5×(8-3)=25 and 5×8-5×3=25. Distribution applies to both + and -.',
      'The distributive property works over subtraction too: a×(b-c) = a×b - a×c.',
      ['distributive-property'], 4),
  ],
};

const ch6QuizLevel = {
  id: 'level-3-6-11', chapterId: 'chapter-3-6', worldId: 'world-3', number: 11,
  name: 'Order of Operations & Distribution Quiz', type: 'quiz',
  storyContext: 'Master the rules before the boss battle!',
  problems: [
    prob('problem-3-6-11-1', 'level-3-6-11', 1, 'numeric_input', 'fluency',
      '"Calculate: 5 + 3 × 6"', 'number_pad', { value: 23, displayValue: '23' },
      h('Multiply first.', '3×6=18, then 5+18=?', '23.'),
      '23 — multiply first: 3×6=18, 5+18=23.', 'Multiplication before addition.',
      ['order-of-operations'], 2),
    prob('problem-3-6-11-2', 'level-3-6-11', 2, 'numeric_input', 'fluency',
      '"Calculate: (7 - 2) × (3 + 1)"', 'number_pad', { value: 20, displayValue: '20' },
      h('Parentheses first — both sets.', '(7-2)=5, (3+1)=4. Then 5×4=?', '5×4=20.'),
      '20 — (7-2)×(3+1) = 5×4 = 20.', 'Evaluate all parentheses first.',
      ['order-of-operations'], 3),
    prob('problem-3-6-11-3', 'level-3-6-11', 3, 'numeric_input', 'strategic_practice',
      '"Use distribution: 7 × 98"', 'number_pad', { value: 686, displayValue: '686' },
      h('Break 98 into 100 - 2.', '7×100=700, 7×2=14.', '700-14=686.'),
      '686 — 7×(100-2) = 700-14 = 686.', 'Near-100 trick: a×98 = a×100 - a×2.',
      ['distributive-property'], 4),
    prob('problem-3-6-11-4', 'level-3-6-11', 4, 'text_input', 'find_the_error',
      '"Grogg says 4×(5+3) = 4×5+3 = 23. Find his error."',
      'text_field', { value: 'Grogg only multiplied 5, not 3. Correct: 4×5+4×3 = 20+12 = 32.', displayValue: '4 must multiply BOTH terms: 4×5+4×3=32' },
      h('Did Grogg distribute to both terms?',
        '4×(5+3) = 4×5 + 4×3, not 4×5 + 3.',
        '20 + 12 = 32, not 23.'),
      'Grogg forgot to multiply 3 by 4. Correct: 4×(5+3) = 4×5+4×3 = 32.',
      'Distribution multiplies EVERY term inside the parentheses, not just the first one.',
      ['find-the-error', 'distributive-property'], 4),
    prob('problem-3-6-11-5', 'level-3-6-11', 5, 'numeric_input', 'working_backwards',
      '"□ × 6 + □ × 4 = 70. What is □?"', 'number_pad', { value: 7, displayValue: '7' },
      h('Factor out □.', '□×(6+4) = □×10 = 70.', '□ = 70÷10 = 7.'),
      '7 — □×(6+4) = □×10 = 70, so □=7.', 'Factor out the common term, then solve.',
      ['distributive-property', 'working-backwards'], 5),
  ],
  difficulty: 3, estimatedMinutes: 10, isChallenge: false, isBoss: false,
};

// Boss level for Ch6
const ch6BossLevel = {
  id: 'level-3-6-12', chapterId: 'chapter-3-6', worldId: 'world-3', number: 12,
  name: 'Distribution Master Battle', type: 'boss',
  storyContext: 'The ultimate test of order of operations and distribution!',
  problems: [
    prob('problem-3-6-12-1', 'level-3-6-12', 1, 'numeric_input', 'fluency',
      '"(8 + 2) × (6 - 1)"', 'number_pad', { value: 50, displayValue: '50' },
      h('Parentheses first.', '10 × 5 = ?', '50.'),
      '50 — (8+2)×(6-1) = 10×5 = 50.', 'Both parentheses first, then multiply.',
      ['order-of-operations'], 3),
    prob('problem-3-6-12-2', 'level-3-6-12', 2, 'numeric_input', 'strategic_practice',
      '"Use distribution to calculate 15 × 12."', 'number_pad', { value: 180, displayValue: '180' },
      h('Break 12 into 10+2.', '15×10=150, 15×2=30.', '150+30=180.'),
      '180 — 15×(10+2) = 150+30 = 180.', 'Distribution makes multi-digit multiplication mental.',
      ['distributive-property'], 4),
    prob('problem-3-6-12-3', 'level-3-6-12', 3, 'text_input', 'multiple_paths',
      '"Show two ways to calculate 6 × 14."', 'text_field',
      { value: ['6×10+6×4=60+24=84', '6×15-6×1=90-6=84'], displayValue: '6×10+6×4=84 or 6×15-6×1=84' },
      h('You can split 14 different ways.',
        'Way 1: 14=10+4. Way 2: 14=15-1.',
        '6×10+6×4=84. Or 6×15-6×1=90-6=84.'),
      'Two paths: 6×(10+4)=84 and 6×(15-1)=84. Multiple decompositions work.',
      'Flexible decomposition: choose the split that makes mental math easiest for you.',
      ['distributive-property', 'multiple-paths'], 5),
    prob('problem-3-6-12-4', 'level-3-6-12', 4, 'numeric_input', 'working_backwards',
      '"? × 8 + ? × 2 = 100. What is ?"', 'number_pad', { value: 10, displayValue: '10' },
      h('Factor: ?×(8+2) = ?×10 = 100.',
        '? = 100 ÷ 10.', '100 ÷ 10 = 10.'),
      '10 — ?×(8+2)=?×10=100, so ?=10.', 'Factor and solve.',
      ['distributive-property', 'working-backwards'], 4),
    prob('problem-3-6-12-5', 'level-3-6-12', 5, 'text_input', 'thinking',
      '"Prove that a×(b+c) = a×b + a×c using the area model. Explain in words."', 'text_field',
      { value: 'A rectangle with width a and length (b+c) can be split into two rectangles: a×b and a×c. The total area is a×b + a×c = a×(b+c).', displayValue: 'Area model: one big rectangle = two smaller ones' },
      h('Imagine a rectangle with one side a and the other b+c.',
        'Split it vertically into two rectangles: one is a×b, the other is a×c.',
        'Total area = a×b + a×c. This equals a×(b+c) since it is the same rectangle.'),
      'The area model proves distribution: a rectangle a×(b+c) splits into a×b + a×c.',
      'Visual proofs through area models make algebraic properties intuitive.',
      ['distributive-property', 'area-model', 'proofs'], 5),
  ],
  difficulty: 5, estimatedMinutes: 12, isChallenge: true, isBoss: true,
};

// ============================================================
// CHAPTER 9: UNITS & MEASUREMENT
// ============================================================

const ch9New = {
  'level-3-9-1': [
    prob('problem-3-9-1-2', 'level-3-9-1', 2, 'numeric_input', 'fluency',
      '"How many inches in 1 foot?"', 'number_pad', { value: 12, displayValue: '12' },
      h('Feet and inches are common US units.',
        'Think of a ruler: it has 12 inch marks.',
        '1 foot = 12 inches.'),
      '12 — 1 foot = 12 inches.', 'Key conversion: 1 foot = 12 inches.',
      ['measurement', 'length'], 1),
    prob('problem-3-9-1-3', 'level-3-9-1', 3, 'multiple_choice', 'thinking',
      '"Which unit would you use to measure the length of a pencil? A) Miles B) Inches C) Yards D) Feet"',
      'multiple_choice', { value: 'B) Inches', displayValue: 'B) Inches' },
      h('A pencil is small. Choose the smallest reasonable unit.',
        'Miles and yards are too big. Feet might work but inches are more precise.',
        'Inches — a pencil is about 7 inches long.'),
      'Inches — a pencil is about 7 inches. Choosing the right unit matters.',
      'Match the unit to the object: inches for small things, feet for rooms, miles for roads.',
      ['measurement', 'length'], 1),
  ],
  'level-3-9-2': [
    prob('problem-3-9-2-2', 'level-3-9-2', 2, 'numeric_input', 'fluency',
      '"Convert 3 feet to inches."', 'number_pad', { value: 36, displayValue: '36' },
      h('1 foot = 12 inches.', '3 × 12 = ?', '3 × 12 = 36 inches.'),
      '36 — 3 feet × 12 inches/foot = 36 inches.',
      'Converting to smaller units: multiply. Bigger unit × conversion factor.',
      ['measurement', 'conversion'], 2),
    prob('problem-3-9-2-3', 'level-3-9-2', 3, 'numeric_input', 'working_backwards',
      '"48 inches = ___ feet"', 'number_pad', { value: 4, displayValue: '4' },
      h('To convert to larger units, divide.', '48 ÷ 12 = ?', '48 ÷ 12 = 4 feet.'),
      '4 — 48 inches ÷ 12 inches/foot = 4 feet.',
      'Converting to larger units: divide by the conversion factor.',
      ['measurement', 'conversion'], 3),
  ],
  'level-3-9-3': [
    prob('problem-3-9-3-2', 'level-3-9-3', 2, 'numeric_input', 'fluency',
      '"How many centimeters in 1 meter?"', 'number_pad', { value: 100, displayValue: '100' },
      h('Centi- means 1/100.', 'So 1 meter = 100 centimeters.', '1 meter = 100 cm.'),
      '100 — 1 meter = 100 centimeters.',
      'Metric prefixes: centi = 1/100, milli = 1/1000, kilo = 1000.',
      ['measurement', 'metric'], 1),
    prob('problem-3-9-3-3', 'level-3-9-3', 3, 'multiple_choice', 'thinking',
      '"1 kilometer = ___ meters. A) 10 B) 100 C) 1000 D) 10000"',
      'multiple_choice', { value: 'C) 1000', displayValue: 'C) 1000 meters' },
      h('Kilo- means 1000.', 'Kilometer = 1000 meters.', '1 km = 1000 m.'),
      '1000 — kilo means 1000. 1 km = 1000 m.',
      'Kilo = 1000. Memorize: 1 km = 1000 m, 1 kg = 1000 g.',
      ['measurement', 'metric'], 1),
  ],
  'level-3-9-4': [
    prob('problem-3-9-4-2', 'level-3-9-4', 2, 'numeric_input', 'fluency',
      '"Convert 5 meters to centimeters."', 'number_pad', { value: 500, displayValue: '500' },
      h('1 m = 100 cm.', '5 × 100 = ?', '500 cm.'),
      '500 — 5 m × 100 cm/m = 500 cm.',
      'Metric conversions use powers of 10 — just move the decimal.',
      ['measurement', 'conversion', 'metric'], 2),
    prob('problem-3-9-4-3', 'level-3-9-4', 3, 'numeric_input', 'working_backwards',
      '"3000 meters = ___ kilometers"', 'number_pad', { value: 3, displayValue: '3' },
      h('1 km = 1000 m. Divide.', '3000 ÷ 1000 = ?', '3000 ÷ 1000 = 3 km.'),
      '3 — 3000 m ÷ 1000 = 3 km.',
      'Dividing by 1000: remove three zeros (or move decimal 3 places left).',
      ['measurement', 'conversion', 'metric'], 3),
  ],
  'level-3-9-5': [
    prob('problem-3-9-5-2', 'level-3-9-5', 2, 'numeric_input', 'fluency',
      '"How many grams in 1 kilogram?"', 'number_pad', { value: 1000, displayValue: '1000' },
      h('Kilo- means 1000.', '1 kilogram = 1000 grams.', '1000 grams.'),
      '1000 — kilo always means 1000.',
      'Consistent prefix: kilo = 1000 whether for grams, meters, or liters.',
      ['measurement', 'mass'], 1),
    prob('problem-3-9-5-3', 'level-3-9-5', 3, 'multiple_choice', 'thinking',
      '"Which weighs about 1 kilogram? A) A paperclip B) An apple C) A bag of sugar D) A car"',
      'multiple_choice', { value: 'C) A bag of sugar', displayValue: 'C) A bag of sugar (about 1 kg)' },
      h('1 kg is about 2.2 pounds.',
        'A paperclip is ~1g, an apple ~200g, sugar bag ~1kg, car ~1000kg.',
        'A bag of sugar is closest to 1 kg.'),
      'A bag of sugar — about 1 kg. A paperclip ≈ 1g, an apple ≈ 200g, a car ≈ 1000kg.',
      'Benchmarks: paperclip=1g, apple=200g, sugar=1kg, car=1 metric ton.',
      ['measurement', 'mass', 'estimation'], 2),
  ],
  'level-3-9-6': [
    prob('problem-3-9-6-2', 'level-3-9-6', 2, 'numeric_input', 'fluency',
      '"How many minutes in 2 hours?"', 'number_pad', { value: 120, displayValue: '120' },
      h('1 hour = 60 minutes.', '2 × 60 = ?', '120 minutes.'),
      '120 — 2 hours × 60 min/hr = 120 minutes.',
      'Time: 1 hour = 60 minutes. 1 minute = 60 seconds.',
      ['measurement', 'time'], 2),
    prob('problem-3-9-6-3', 'level-3-9-6', 3, 'numeric_input', 'working_backwards',
      '"180 seconds = ___ minutes"', 'number_pad', { value: 3, displayValue: '3' },
      h('1 minute = 60 seconds. Divide.', '180 ÷ 60 = ?', '180 ÷ 60 = 3 minutes.'),
      '3 — 180 ÷ 60 = 3 minutes.',
      'Converting time: multiply to go smaller, divide to go bigger.',
      ['measurement', 'time'], 3),
  ],
  'level-3-9-7': [
    prob('problem-3-9-7-2', 'level-3-9-7', 2, 'numeric_input', 'thinking',
      '"You have 3 quarters, 2 dimes, and 1 nickel. How many cents total?"',
      'number_pad', { value: 100, displayValue: '100 cents' },
      h('Quarter=25¢, dime=10¢, nickel=5¢.',
        '3×25=75, 2×10=20, 1×5=5.',
        '75+20+5=100 cents = 1 dollar!'),
      '100 cents — 3×25+2×10+5 = 75+20+5 = 100 cents = $1.',
      'Coin values: quarter=25¢, dime=10¢, nickel=5¢, penny=1¢.',
      ['measurement', 'money'], 3),
  ],
  'level-3-9-8': [
    prob('problem-3-9-8-2', 'level-3-9-8', 2, 'ordering', 'strategic_practice',
      '"Order from shortest to longest: 1 meter, 100 centimeters, 1000 millimeters"',
      'drag_drop', { value: ['All three are equal!'], displayValue: 'All equal — 1m = 100cm = 1000mm' },
      h('Convert all to the same unit.',
        '1 m = 100 cm. 1000 mm = 100 cm.',
        'They are all the same length!'),
      'Trick question — all three equal 1 meter. 1m = 100cm = 1000mm.',
      'Different units can represent the same measurement. Always convert to compare.',
      ['measurement', 'conversion'], 4),
  ],
  'level-3-9-9': [
    prob('problem-3-9-9-2', 'level-3-9-9', 2, 'numeric_input', 'thinking',
      '"A recipe needs 2.5 kg of flour. You have a 500g bag. How many bags do you need?"',
      'number_pad', { value: 5, displayValue: '5' },
      h('Convert to same units: 2.5 kg = 2500 g.',
        '2500 ÷ 500 = ?', '2500 ÷ 500 = 5 bags.'),
      '5 bags — 2.5 kg = 2500 g, and 2500 ÷ 500 = 5.',
      'Real-world conversion: convert units first, then do the arithmetic.',
      ['measurement', 'conversion', 'word-problems'], 4),
  ],
};

const ch9QuizLevel = {
  id: 'level-3-9-10', chapterId: 'chapter-3-9', worldId: 'world-3', number: 10,
  name: 'Measurement Quiz', type: 'quiz',
  storyContext: 'Prove your measurement mastery!',
  problems: [
    prob('problem-3-9-10-1', 'level-3-9-10', 1, 'numeric_input', 'fluency',
      '"Convert 7 feet to inches."', 'number_pad', { value: 84, displayValue: '84' },
      h('1 foot = 12 inches.', '7 × 12 = ?', '84 inches.'),
      '84 — 7×12 = 84 inches.', '1 foot = 12 inches.',
      ['measurement', 'conversion'], 2),
    prob('problem-3-9-10-2', 'level-3-9-10', 2, 'numeric_input', 'fluency',
      '"Convert 4.5 km to meters."', 'number_pad', { value: 4500, displayValue: '4500' },
      h('1 km = 1000 m.', '4.5 × 1000 = ?', '4500 m.'),
      '4500 — 4.5 km × 1000 = 4500 m.', 'Kilo = 1000. Move decimal 3 right.',
      ['measurement', 'metric'], 3),
    prob('problem-3-9-10-3', 'level-3-9-10', 3, 'numeric_input', 'working_backwards',
      '"240 minutes = ___ hours"', 'number_pad', { value: 4, displayValue: '4' },
      h('1 hour = 60 min. Divide.', '240 ÷ 60 = ?', '4 hours.'),
      '4 — 240 ÷ 60 = 4 hours.', 'Divide by 60 for minutes→hours.',
      ['measurement', 'time'], 2),
    prob('problem-3-9-10-4', 'level-3-9-10', 4, 'multiple_choice', 'thinking',
      '"Which is longer: 2 km or 2500 m? A) 2 km B) 2500 m C) Same"',
      'multiple_choice', { value: 'B) 2500 m', displayValue: 'B) 2500 m (vs 2000 m)' },
      h('Convert to same units.', '2 km = 2000 m. Compare: 2000 vs 2500.',
        '2500 > 2000, so 2500 m is longer.'),
      '2500 m is longer — 2 km = 2000 m, and 2500 > 2000.',
      'Always convert to the same unit before comparing measurements.',
      ['measurement', 'comparison'], 3),
    prob('problem-3-9-10-5', 'level-3-9-10', 5, 'text_input', 'thinking',
      '"A pool is 25 m long. How many laps (one way) to swim 1 km?"',
      'text_field', { value: '40 laps', displayValue: '40 (1000 ÷ 25 = 40)' },
      h('Convert 1 km to meters.', '1 km = 1000 m. 1000 ÷ 25 = ?', '1000 ÷ 25 = 40 laps.'),
      '40 laps — 1 km = 1000 m, 1000 ÷ 25 = 40.',
      'Real-world conversion + division: convert, then divide.',
      ['measurement', 'word-problems'], 4),
  ],
  difficulty: 3, estimatedMinutes: 10, isChallenge: false, isBoss: false,
};

// Boss for Ch9
const ch9BossLevel = {
  id: 'level-3-9-11', chapterId: 'chapter-3-9', worldId: 'world-3', number: 11,
  name: 'Measurement Master Battle', type: 'boss',
  storyContext: 'The ultimate measurement challenge!',
  problems: [
    prob('problem-3-9-11-1', 'level-3-9-11', 1, 'numeric_input', 'fluency',
      '"Convert 5 yards to feet (1 yard = 3 feet)."', 'number_pad',
      { value: 15, displayValue: '15' },
      h('1 yard = 3 feet. Multiply.', '5 × 3 = ?', '15 feet.'),
      '15 — 5 yards × 3 = 15 feet.', '1 yard = 3 feet.',
      ['measurement', 'conversion'], 2),
    prob('problem-3-9-11-2', 'level-3-9-11', 2, 'numeric_input', 'strategic_practice',
      '"A recipe needs 750 mL of milk. You have a 1-liter bottle. How many mL are left after pouring?"',
      'number_pad', { value: 250, displayValue: '250' },
      h('1 liter = 1000 mL.', '1000 - 750 = ?', '250 mL left.'),
      '250 mL — 1000 - 750 = 250.',
      '1 liter = 1000 mL. Use subtraction for "how much left" problems.',
      ['measurement', 'volume'], 3),
    prob('problem-3-9-11-3', 'level-3-9-11', 3, 'text_input', 'thinking',
      '"Which is heavier: 3 kg or 3500 g?"', 'text_field',
      { value: '3500 g (= 3.5 kg) is heavier', displayValue: '3500 g is heavier (3.5 kg > 3 kg)' },
      h('Convert to same units.', '3 kg = 3000 g. Compare: 3000 vs 3500.',
        '3500 > 3000, so 3500 g is heavier.'),
      '3500 g = 3.5 kg > 3 kg. Convert first, then compare.',
      'Converting and comparing: always get to the same unit.',
      ['measurement', 'comparison'], 3),
    prob('problem-3-9-11-4', 'level-3-9-11', 4, 'numeric_input', 'working_backwards',
      '"A movie is 1 hour 45 minutes. How many total minutes?"', 'number_pad',
      { value: 105, displayValue: '105' },
      h('Convert hours to minutes, then add.', '1 hour = 60 min. 60 + 45 = ?', '105 minutes.'),
      '105 — 60 + 45 = 105 minutes.',
      'Mixed time: convert hours to minutes, then add the extra minutes.',
      ['measurement', 'time'], 3),
    prob('problem-3-9-11-5', 'level-3-9-11', 5, 'text_input', 'multiple_paths',
      '"You run 800 m, rest, then run 1.5 km. Total distance in km?"', 'text_field',
      { value: '2.3 km', displayValue: '2.3 km (0.8 + 1.5)' },
      h('Convert to same units.', '800 m = 0.8 km. Then 0.8 + 1.5 = ?', '0.8 + 1.5 = 2.3 km.'),
      '2.3 km — convert 800 m to 0.8 km, then add: 0.8 + 1.5 = 2.3 km.',
      'Mixed-unit problems: convert to one unit first, then compute.',
      ['measurement', 'conversion'], 5),
  ],
  difficulty: 4, estimatedMinutes: 12, isChallenge: true, isBoss: true,
};

// Apply
function calcMinutes(pc, ad) {
  const b = ad <= 2 ? 1.5 : ad <= 3 ? 2 : 2.5;
  return Math.max(3, Math.round(pc * b));
}
function enrichChapter(ci, npm, extras) {
  const ch = world.chapters[ci];
  let a = 0;
  for (const l of ch.levels) {
    const np = npm[l.id];
    if (np?.length) {
      l.problems.push(...np);
      const t = l.problems.length;
      const d = l.problems.reduce((s, p) => s + p.difficulty, 0) / t;
      l.estimatedMinutes = calcMinutes(t, d);
      a += np.length;
    }
  }
  for (const ex of extras) {
    ch.levels.push(ex);
    a += ex.problems.length;
  }
  console.log(`  ${ch.name}: +${a} problems, ${ch.levels.length} levels, ${ch.levels.reduce((s, l) => s + l.problems.length, 0)} total`);
}

const ch6Idx = world.chapters.findIndex(c => c.id === 'chapter-3-6');
const ch9Idx = world.chapters.findIndex(c => c.id === 'chapter-3-9');
console.log('Enriching World 3 — Batch 4');
enrichChapter(ch6Idx, ch6New, [ch6QuizLevel, ch6BossLevel]);
enrichChapter(ch9Idx, ch9New, [ch9QuizLevel, ch9BossLevel]);
world.totalLevels = world.chapters.reduce((s, c) => s + c.levels.length, 0);
const tp = world.chapters.reduce((s, c) => s + c.levels.reduce((ls, l) => ls + l.problems.length, 0), 0);
console.log(`Total: ${world.totalLevels} levels, ${tp} problems`);
writeFileSync(dataPath, JSON.stringify(world, null, 2) + '\n', 'utf-8');
console.log('Written.');

/**
 * Curriculum markdown parser
 * Converts markdown curriculum files to structured JSON
 */

import type { World, Chapter, Level, Problem, Hint, LevelType, ProblemType, InputType, HintType } from '@mathquest/shared';

export interface ParseResult {
  world: Partial<World>;
  errors: ParseError[];
  warnings: ContentWarning[];
}

export interface ParseError {
  line?: number;
  message: string;
  context?: string;
}

export interface ContentWarning {
  type: 'missing_hint' | 'missing_teaching_point' | 'short_content' | 'working_notes' | 'multiple_answers';
  levelId?: string;
  problemId?: string;
  message: string;
  line?: number;
}

interface ParsedUnit {
  name: string;
  bookRef: string;
  weekStart: number;
  weekEnd: number;
  chapters: Partial<Chapter>[];
}

interface RawLevelData {
  id: string;
  number: string;
  name: string;
  type?: string;
  concept?: string;
  story?: string;
  problem?: string;
  answer?: string;
  hints: string[];
  teachingPoint?: string;
  solution?: string;
  note?: string;
  bonus?: string;
  isChallenge: boolean;
  lineNumber: number;
}

/**
 * Parse a curriculum markdown file into structured data
 */
export async function parseWorldMarkdown(
  content: string,
  worldId: string
): Promise<ParseResult> {
  const errors: ParseError[] = [];
  const warnings: ContentWarning[] = [];

  // Extract world metadata
  const worldMeta = extractWorldMetadata(content, worldId);

  // Extract units and chapters
  const units = extractUnits(content, errors, warnings);

  // Build chapters from units
  const chapters: Partial<Chapter>[] = [];
  for (const unit of units) {
    chapters.push(...unit.chapters);
  }

  // Update chapter IDs and extract levels
  let chapterNumber = 0;
  for (const chapter of chapters) {
    chapterNumber++;
    chapter.worldId = worldId;
    if (!chapter.id) {
      chapter.id = `chapter-${worldId.split('-')[1]}-${chapterNumber}`;
    }
  }

  const world: Partial<World> = {
    ...worldMeta,
    chapters: chapters as Chapter[],
  };

  return { world, errors, warnings };
}

/**
 * Extract world metadata from the markdown header
 */
function extractWorldMetadata(content: string, worldId: string): Partial<World> {
  // Find world name from H1
  const h1Match = content.match(/^# .*?World \d+: (.+)$/m);
  const name = h1Match ? h1Match[1].trim() : 'Unknown World';

  // Extract metadata from document header
  const targetAgeMatch = content.match(/\*\*Target Age\*\*:\s*(\d+)-(\d+)/);
  const totalLevelsMatch = content.match(/\*\*Total Levels\*\*:\s*(\d+)/);
  const durationMatch = content.match(/\*\*Duration\*\*:\s*(\d+)\s*weeks/);
  const baLevelMatch = content.match(/Beast Academy Level (\d+)/);

  // Extract theme from visual design section
  const themeMatch = content.match(/\*\*Primary Colors\*\*:\s*([^,\n]+)/);
  const themeName = themeMatch ? themeMatch[1].toLowerCase().includes('mountain') ? 'mountain' : 'adventure' : 'mountain';

  return {
    id: worldId,
    name,
    theme: themeName,
    baLevel: baLevelMatch ? parseInt(baLevelMatch[1]) : 3,
    targetAgeMin: targetAgeMatch ? parseInt(targetAgeMatch[1]) : 8,
    targetAgeMax: targetAgeMatch ? parseInt(targetAgeMatch[2]) : 10,
    totalLevels: totalLevelsMatch ? parseInt(totalLevelsMatch[1]) : 108,
    estimatedWeeks: durationMatch ? parseInt(durationMatch[1]) : 36,
    colorPalette: {
      primary: '#3B82F6',
      secondary: '#F97316',
      accent: '#22C55E',
      background: '#F8FAFC',
      text: '#1E293B',
    },
    characters: [],
    isLocked: false,
    prerequisiteWorldId: worldId === 'world-3' ? 'world-2' : null,
  };
}

/**
 * Extract units from the markdown content
 */
function extractUnits(
  content: string,
  errors: ParseError[],
  warnings: ContentWarning[]
): ParsedUnit[] {
  const units: ParsedUnit[] = [];

  // Match Unit headers like "## Unit A: Shape Summit (Weeks 1-9)"
  const unitRegex = /^## Unit ([A-D]):\s*(.+?)\s*\(Weeks (\d+)-(\d+)\)/gm;
  let match;
  const unitPositions: { letter: string; name: string; weekStart: number; weekEnd: number; start: number }[] = [];

  while ((match = unitRegex.exec(content)) !== null) {
    unitPositions.push({
      letter: match[1],
      name: match[2],
      weekStart: parseInt(match[3]),
      weekEnd: parseInt(match[4]),
      start: match.index,
    });
  }

  // Extract content for each unit
  for (let i = 0; i < unitPositions.length; i++) {
    const unitStart = unitPositions[i].start;
    const unitEnd = i < unitPositions.length - 1 ? unitPositions[i + 1].start : content.length;
    const unitContent = content.substring(unitStart, unitEnd);

    // Extract book reference
    const bookMatch = unitContent.match(/Book 3([A-D]) Topics:/);

    // Extract chapters from unit content
    const chapters = extractChapters(unitContent, errors, warnings);

    units.push({
      name: unitPositions[i].name,
      bookRef: bookMatch ? `3${bookMatch[1]}` : `3${unitPositions[i].letter}`,
      weekStart: unitPositions[i].weekStart,
      weekEnd: unitPositions[i].weekEnd,
      chapters,
    });
  }

  return units;
}

/**
 * Extract chapters from unit content
 */
export function extractChapters(
  content: string,
  errors?: ParseError[],
  warnings?: ContentWarning[]
): Partial<Chapter>[] {
  const chapters: Partial<Chapter>[] = [];

  // Match chapter headers like "### Chapter 1: Triangle Trails (Weeks 1-2)"
  const chapterRegex = /^### Chapter (\d+):\s*(.+?)\s*\(Weeks? (\d+)(?:-(\d+))?\)/gm;
  let match;
  const chapterPositions: { number: number; name: string; weekStart: number; weekEnd: number; start: number }[] = [];

  while ((match = chapterRegex.exec(content)) !== null) {
    chapterPositions.push({
      number: parseInt(match[1]),
      name: match[2],
      weekStart: parseInt(match[3]),
      weekEnd: match[4] ? parseInt(match[4]) : parseInt(match[3]),
      start: match.index,
    });
  }

  // Also check for Boss Battle sections
  const bossRegex = /^### Unit [A-D] Boss Battle:/gm;
  let bossMatch;
  while ((bossMatch = bossRegex.exec(content)) !== null) {
    chapterPositions.push({
      number: -1, // Boss battle marker
      name: 'Boss Battle',
      weekStart: 0,
      weekEnd: 0,
      start: bossMatch.index,
    });
  }

  // Sort by position
  chapterPositions.sort((a, b) => a.start - b.start);

  // Extract content for each chapter
  for (let i = 0; i < chapterPositions.length; i++) {
    const pos = chapterPositions[i];

    // Skip boss battles as separate chapters (they're handled within units)
    if (pos.number === -1) continue;

    const chapterStart = pos.start;
    const chapterEnd = i < chapterPositions.length - 1 ? chapterPositions[i + 1].start : content.length;
    const chapterContent = content.substring(chapterStart, chapterEnd);

    // Extract topics
    const topicsMatch = chapterContent.match(/\*\*Topics\*\*:\s*([^\n]+)/);
    const topics = topicsMatch ? topicsMatch[1].split(',').map(t => t.trim()) : [];

    // Extract levels from chapter content
    const levels = extractLevels(chapterContent, pos.number, errors, warnings);

    chapters.push({
      id: `chapter-3-${pos.number}`,
      number: pos.number,
      name: pos.name,
      topic: topics[0]?.toLowerCase() || pos.name.toLowerCase(),
      weekStart: pos.weekStart,
      weekEnd: pos.weekEnd,
      levels: levels as Level[],
      learningObjectives: topics,
      signatureContent: [],
      isBoss: false,
    });
  }

  return chapters;
}

/**
 * Extract levels from a chapter section
 */
export function extractLevels(
  chapterContent: string,
  chapterNumber: number,
  errors?: ParseError[],
  warnings?: ContentWarning[]
): Partial<Level>[] {
  const levels: Partial<Level>[] = [];

  // Match level headers like "#### Level 1-1: The Three-Sided Path" or "#### Level 1-1: Name ⭐"
  const levelRegex = /^#### Level (\d+)-(\d+):\s*(.+?)(\s*⭐)?$/gm;
  let match;
  const levelPositions: { chapter: number; levelNum: number; name: string; isChallenge: boolean; start: number }[] = [];

  while ((match = levelRegex.exec(chapterContent)) !== null) {
    levelPositions.push({
      chapter: parseInt(match[1]),
      levelNum: parseInt(match[2]),
      name: match[3].trim(),
      isChallenge: !!match[4],
      start: match.index,
    });
  }

  // Extract content for each level
  for (let i = 0; i < levelPositions.length; i++) {
    const pos = levelPositions[i];
    const levelStart = pos.start;
    const levelEnd = i < levelPositions.length - 1 ? levelPositions[i + 1].start : chapterContent.length;
    const levelContent = chapterContent.substring(levelStart, levelEnd);

    const rawLevel = parseLevelContent(levelContent, `${pos.chapter}-${pos.levelNum}`, pos.name, pos.isChallenge);

    // Check for working notes
    if (warnings && hasWorkingNotes(levelContent)) {
      warnings.push({
        type: 'working_notes',
        levelId: rawLevel.id,
        message: `Level ${rawLevel.id} contains working notes that need cleanup`,
        line: rawLevel.lineNumber,
      });
    }

    // Convert to Level structure
    const level = convertToLevel(rawLevel, chapterNumber, errors, warnings);
    levels.push(level);
  }

  return levels;
}

/**
 * Parse the content of a single level
 */
function parseLevelContent(content: string, levelId: string, name: string, isChallenge: boolean): RawLevelData {
  const lines = content.split('\n');

  const raw: RawLevelData = {
    id: levelId,
    number: levelId,
    name,
    hints: [],
    isChallenge,
    lineNumber: 0,
  };

  let currentField: string | null = null;
  let currentValue: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Field markers
    if (trimmed.startsWith('**Type**:')) {
      raw.type = trimmed.replace('**Type**:', '').trim();
    } else if (trimmed.startsWith('**Concept**:')) {
      raw.concept = trimmed.replace('**Concept**:', '').trim();
    } else if (trimmed.startsWith('**Story**:')) {
      raw.story = trimmed.replace('**Story**:', '').trim();
    } else if (trimmed.match(/^\*\*Problem\*\*.*:/)) {
      currentField = 'problem';
      currentValue = [];
    } else if (trimmed.startsWith('**Answer**:')) {
      if (currentField === 'problem') {
        raw.problem = currentValue.join('\n').trim();
      }
      raw.answer = trimmed.replace('**Answer**:', '').trim();
      currentField = null;
    } else if (trimmed.startsWith('**Teaching Point**:')) {
      raw.teachingPoint = trimmed.replace('**Teaching Point**:', '').trim();
    } else if (trimmed.startsWith('**Solution**:')) {
      raw.solution = trimmed.replace('**Solution**:', '').trim();
    } else if (trimmed.startsWith('**Note**:')) {
      raw.note = trimmed.replace('**Note**:', '').trim();
    } else if (trimmed.startsWith('**Bonus**:')) {
      raw.bonus = trimmed.replace('**Bonus**:', '').trim();
    } else if (trimmed.startsWith('**Correct Answer**:')) {
      raw.answer = trimmed.replace('**Correct Answer**:', '').trim();
    } else if (trimmed.match(/^\*\*Hint( \d+)?\*\*:/)) {
      const hintText = trimmed.replace(/^\*\*Hint( \d+)?\*\*:/, '').trim();
      if (hintText) {
        raw.hints.push(hintText);
      }
    } else if (trimmed.match(/^\*\*No hints available\.?\*\*$/i)) {
      // Challenge level with no hints
      raw.isChallenge = true;
    } else if (currentField === 'problem') {
      // Collect multi-line problem text
      if (trimmed.startsWith('>')) {
        currentValue.push(trimmed.substring(1).trim());
      } else if (trimmed && !trimmed.startsWith('**')) {
        currentValue.push(trimmed);
      }
    }
  }

  // Handle case where problem wasn't closed
  if (currentField === 'problem') {
    raw.problem = currentValue.join('\n').trim();
  }

  return raw;
}

/**
 * Check if content contains working notes
 */
function hasWorkingNotes(content: string): boolean {
  const workingNotePatterns = [
    /let me think/i,
    /let me check/i,
    /let me recalculate/i,
    /let me retry/i,
    /wait—/i,
    /actually:/i,
    /actually,/i,
    /hmm/i,
  ];

  return workingNotePatterns.some(pattern => pattern.test(content));
}

/**
 * Convert raw level data to Level structure
 */
function convertToLevel(
  raw: RawLevelData,
  chapterNumber: number,
  errors?: ParseError[],
  warnings?: ContentWarning[]
): Partial<Level> {
  const [chap, num] = raw.number.split('-').map(n => parseInt(n));
  const levelId = `level-3-${chap}-${num}`;

  // Determine level type
  const levelType = determineLevelType(raw.type, raw.isChallenge);

  // Build problems
  const problems = extractProblems(raw, levelId, errors, warnings);

  // Check for missing hints on non-challenge levels
  if (warnings && !raw.isChallenge && raw.hints.length === 0 && levelType !== 'teaching') {
    warnings.push({
      type: 'missing_hint',
      levelId,
      message: `Level ${levelId} is missing hints`,
    });
  }

  return {
    id: levelId,
    chapterId: `chapter-3-${chapterNumber}`,
    worldId: 'world-3',
    number: num,
    name: raw.name,
    type: levelType,
    storyContext: raw.story || '',
    problems: problems as Problem[],
    difficulty: determineDifficulty(raw),
    estimatedMinutes: estimateMinutes(raw),
    isChallenge: raw.isChallenge,
    isBoss: levelType === 'boss',
  };
}

/**
 * Determine level type from raw type string
 */
function determineLevelType(typeStr?: string, isChallenge?: boolean): LevelType {
  if (!typeStr) return 'standard';

  const lower = typeStr.toLowerCase();
  if (lower.includes('teaching')) return 'teaching';
  if (lower.includes('practice')) return 'practice';
  if (lower.includes('boss')) return 'boss';
  if (lower.includes('quiz')) return 'quiz';
  if (lower.includes('challenge') || isChallenge) return 'challenge';

  return 'standard';
}

/**
 * Determine difficulty from raw data
 */
function determineDifficulty(raw: RawLevelData): 1 | 2 | 3 | 4 | 5 {
  if (raw.isChallenge) return 4;
  if (raw.type?.toLowerCase().includes('boss')) return 5;
  if (raw.type?.toLowerCase().includes('teaching')) return 1;
  if (raw.type?.toLowerCase().includes('practice')) return 2;
  return 3;
}

/**
 * Estimate completion time in minutes
 */
function estimateMinutes(raw: RawLevelData): number {
  if (raw.type?.toLowerCase().includes('boss')) return 10;
  if (raw.isChallenge) return 5;
  if (raw.type?.toLowerCase().includes('teaching')) return 3;
  return 3;
}

/**
 * Extract problems from raw level data
 */
export function extractProblems(
  raw: RawLevelData,
  levelId: string,
  errors?: ParseError[],
  warnings?: ContentWarning[]
): Partial<Problem>[] {
  const problems: Partial<Problem>[] = [];

  if (!raw.problem) {
    if (errors) {
      errors.push({
        message: `Level ${levelId} has no problem statement`,
      });
    }
    return problems;
  }

  const problemId = `problem-${levelId}-1`;

  // Parse the answer
  const answer = parseAnswer(raw.answer || '');

  // Build hints
  const hints = buildHints(raw.hints, raw.isChallenge);

  // Determine problem type and input type
  const { problemType, inputType } = determineProblemTypes(raw.problem, answer);

  // Check for multiple valid answers
  if (warnings && raw.answer && (raw.answer.includes(' or ') || raw.answer.includes('Both'))) {
    warnings.push({
      type: 'multiple_answers',
      problemId,
      levelId,
      message: `Problem ${problemId} has multiple acceptable answers: "${raw.answer}"`,
    });
  }

  const problem: Partial<Problem> = {
    id: problemId,
    levelId,
    sequence: 1,
    type: problemType,
    category: determineProblemCategory(raw.concept),
    statement: cleanProblemStatement(raw.problem),
    inputType,
    correctAnswer: answer,
    hints,
    solutionExplanation: raw.solution || raw.answer || '',
    teachingPoint: raw.teachingPoint || '',
    tags: extractTags(raw.concept),
    difficulty: determineDifficulty(raw),
  };

  problems.push(problem);

  return problems;
}

/**
 * Parse answer string into Answer object
 */
function parseAnswer(answerStr: string): { value: string | number | number[] | string[]; displayValue?: string } {
  if (!answerStr) {
    return { value: '' };
  }

  // Clean up the answer string
  const cleaned = answerStr.replace(/\s*\(.*?\)\s*$/g, '').trim();

  // Check for numeric answer
  const numMatch = cleaned.match(/^-?\d+$/);
  if (numMatch) {
    return { value: parseInt(cleaned), displayValue: cleaned };
  }

  // Check for "X R Y" format (division with remainder)
  const remainderMatch = cleaned.match(/^(\d+)\s*R\s*(\d+)$/i);
  if (remainderMatch) {
    return {
      value: `${remainderMatch[1]} R${remainderMatch[2]}`,
      displayValue: `${remainderMatch[1]} R${remainderMatch[2]}`
    };
  }

  // Check for fraction
  const fractionMatch = cleaned.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    return { value: cleaned, displayValue: cleaned };
  }

  // Check for multiple values (comma or "and" separated)
  if (cleaned.includes(',') || cleaned.includes(' and ')) {
    const values = cleaned.split(/,|\s+and\s+/).map(v => v.trim());
    return { value: values, displayValue: cleaned };
  }

  // Default to string
  return { value: cleaned, displayValue: answerStr };
}

/**
 * Build hint objects from raw hint strings
 */
function buildHints(hintStrings: string[], isChallenge: boolean): Hint[] {
  if (isChallenge || hintStrings.length === 0) {
    return [];
  }

  const hints: Hint[] = [];

  // Ensure we have exactly 3 hints (pad if necessary)
  for (let i = 0; i < 3; i++) {
    const text = hintStrings[i] || generateDefaultHint(i + 1);
    hints.push({
      tier: (i + 1) as 1 | 2 | 3,
      cost: i, // 0, 1, 2 stars
      text: cleanHintText(text),
      type: determineHintType(i + 1, text),
    });
  }

  return hints;
}

/**
 * Clean hint text (remove quotes)
 */
function cleanHintText(text: string): string {
  return text.replace(/^["']|["']$/g, '').trim();
}

/**
 * Generate default hint for missing slots
 */
function generateDefaultHint(tier: number): string {
  switch (tier) {
    case 1:
      return 'Think about what the problem is really asking.';
    case 2:
      return 'Try breaking the problem into smaller steps.';
    case 3:
      return 'Look at the numbers involved and think about how they relate.';
    default:
      return 'Take your time and think carefully.';
  }
}

/**
 * Determine hint type based on tier and content
 */
function determineHintType(tier: number, text: string): HintType {
  const lower = text.toLowerCase();

  if (lower.includes('draw') || lower.includes('visual') || lower.includes('picture')) {
    return 'visual';
  }
  if (lower.includes('example') || lower.includes('for instance')) {
    return 'worked_example';
  }

  switch (tier) {
    case 1:
      return 'conceptual';
    case 2:
      return 'directional';
    case 3:
      return 'scaffolded';
    default:
      return 'conceptual';
  }
}

/**
 * Determine problem and input types
 */
function determineProblemTypes(statement: string, answer: { value: string | number | number[] | string[] }): {
  problemType: ProblemType;
  inputType: InputType;
} {
  const lower = statement.toLowerCase();

  // Check for multiple choice indicators
  if (lower.includes('which one') || lower.includes('which is') || /[a-d]\.\s/i.test(statement)) {
    return { problemType: 'multiple_choice', inputType: 'multiple_choice' };
  }

  // Check for matching
  if (lower.includes('match each') || lower.includes('match the')) {
    return { problemType: 'matching', inputType: 'drag_drop' };
  }

  // Check for ordering
  if (lower.includes('put in order') || lower.includes('arrange') || lower.includes('from smallest to largest')) {
    return { problemType: 'ordering', inputType: 'drag_drop' };
  }

  // Check for multi-select
  if (lower.includes('find all') || lower.includes('circle all') || lower.includes('which of these')) {
    return { problemType: 'multi_select', inputType: 'checkbox_group' };
  }

  // Check for fill in blank
  if (statement.includes('___') || lower.includes('fill in')) {
    return { problemType: 'fill_in_blank', inputType: 'number_pad' };
  }

  // Default to numeric input for numeric answers
  if (typeof answer.value === 'number') {
    return { problemType: 'numeric_input', inputType: 'number_pad' };
  }

  // Text input for everything else
  return { problemType: 'text_input', inputType: 'text_field' };
}

/**
 * Determine problem category from concept
 */
function determineProblemCategory(concept?: string): 'thinking' | 'strategic_practice' | 'fluency' | 'compare_without_calc' | 'find_the_error' | 'impossibility' | 'working_backwards' | 'pattern_discovery' | 'multiple_paths' {
  if (!concept) return 'thinking';

  const lower = concept.toLowerCase();

  if (lower.includes('pattern')) return 'pattern_discovery';
  if (lower.includes('error') || lower.includes('mistake')) return 'find_the_error';
  if (lower.includes('impossible') || lower.includes("can't be made")) return 'impossibility';
  if (lower.includes('compare') || lower.includes('without calc')) return 'compare_without_calc';
  if (lower.includes('backwards') || lower.includes('reverse')) return 'working_backwards';
  if (lower.includes('multiple') || lower.includes('different ways')) return 'multiple_paths';
  if (lower.includes('practice') || lower.includes('fluency')) return 'fluency';
  if (lower.includes('strategic') || lower.includes('strategy')) return 'strategic_practice';

  return 'thinking';
}

/**
 * Clean problem statement text
 */
function cleanProblemStatement(statement: string): string {
  // Remove markdown quote markers
  let cleaned = statement.replace(/^>\s*/gm, '');

  // Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

/**
 * Extract tags from concept string
 */
function extractTags(concept?: string): string[] {
  if (!concept) return [];

  const tags: string[] = [];
  const lower = concept.toLowerCase();

  // Add topic-based tags
  if (lower.includes('triangle')) tags.push('triangles');
  if (lower.includes('quadrilateral')) tags.push('quadrilaterals');
  if (lower.includes('polygon')) tags.push('polygons');
  if (lower.includes('perimeter')) tags.push('perimeter');
  if (lower.includes('area')) tags.push('area');
  if (lower.includes('multiplication')) tags.push('multiplication');
  if (lower.includes('division')) tags.push('division');
  if (lower.includes('fraction')) tags.push('fractions');
  if (lower.includes('variable')) tags.push('variables');
  if (lower.includes('equation')) tags.push('equations');
  if (lower.includes('skip-count') || lower.includes('skip count')) tags.push('skip-counting');
  if (lower.includes('square')) tags.push('squares');
  if (lower.includes('distributive')) tags.push('distributive-property');
  if (lower.includes('order of operations') || lower.includes('pemdas')) tags.push('order-of-operations');
  if (lower.includes('remainder')) tags.push('remainders');
  if (lower.includes('estimation') || lower.includes('rounding')) tags.push('estimation');

  return tags;
}

/**
 * Extract hints from a problem section
 * @deprecated Use buildHints instead
 */
export function extractHints(_problemContent: string): Hint[] {
  return [];
}

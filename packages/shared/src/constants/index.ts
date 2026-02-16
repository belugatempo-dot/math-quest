/**
 * MathQuest constants
 */

// Hint system
export const HINT_TIER_1_COST = 0;
export const HINT_TIER_2_COST = 1;
export const HINT_TIER_3_COST = 2;

// Stars
export const MAX_STARS_PER_LEVEL = 3;

// Performance thresholds
export const PERFECT_TIME_MULTIPLIER = 1.5;
export const GOOD_HINTS_THRESHOLD = 1;
export const GOOD_ATTEMPTS_THRESHOLD = 2;

// Content validation
export const MIN_HINT_TEXT_LENGTH = 10;
export const MIN_TEACHING_POINT_LENGTH = 10;
export const MIN_PROBLEM_STATEMENT_LENGTH = 10;
export const REQUIRED_HINTS_COUNT = 3;

// Forbidden phrases for content validation
export const FORBIDDEN_PHRASES = [
  'let me think',
  'let me check',
  'let me recalculate',
  'let me retry',
  'let me adjust',
  'hmm',
  'wait',
  'wait—',
  "doesn't give a whole number",
  'actually:',
  'actually,',
  'actually ',
] as const;

// Weak hint patterns (reveal too much)
export const WEAK_HINT_PATTERNS = [
  /the answer is \d+/i,
  /you should get \d+/i,
  /it's between \d+ and \d+/i,
  /just (add|subtract|multiply|divide)/i,
] as const;

// Problem categories
export const THINKING_CATEGORIES = [
  'thinking',
  'compare_without_calc',
  'find_the_error',
  'impossibility',
  'working_backwards',
  'pattern_discovery',
  'multiple_paths',
] as const;

// World themes
export const WORLD_THEMES = {
  'world-1': {
    name: 'Number Forest',
    theme: 'forest',
    primaryColor: '#22C55E',
    secondaryColor: '#F59E0B',
  },
  'world-2': {
    name: 'Operation Kingdom',
    theme: 'castle',
    primaryColor: '#8B5CF6',
    secondaryColor: '#F59E0B',
  },
  'world-3': {
    name: 'Multiplication Mountains',
    theme: 'mountain',
    primaryColor: '#3B82F6',
    secondaryColor: '#F97316',
  },
  'world-4': {
    name: 'Fraction Islands',
    theme: 'tropical',
    primaryColor: '#818CF8',
    secondaryColor: '#C084FC',
  },
  'world-5': {
    name: 'Algebra Archipelago',
    theme: 'archipelago',
    primaryColor: '#14B8A6',
    secondaryColor: '#8B5CF6',
  },
} as const;

// Characters
export const CHARACTERS = {
  grogg: {
    id: 'grogg',
    name: 'Grogg',
    role: 'companion' as const,
    personality: 'Enthusiastic, makes mistakes students can learn from',
  },
  lizzie: {
    id: 'lizzie',
    name: 'Lizzie',
    role: 'strategist' as const,
    personality: 'Clever, shows efficient methods',
  },
  owlbert: {
    id: 'owlbert',
    name: 'Professor Owlbert',
    role: 'teacher' as const,
    personality: 'Wise, explains concepts',
  },
  calculate: {
    id: 'calculate',
    name: 'Sir Calculate',
    role: 'challenger' as const,
    personality: 'Presents boss battles',
  },
} as const;

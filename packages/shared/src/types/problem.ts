import type { Hint } from './hint';

/**
 * Represents a single problem within a level
 * Problems are the core learning unit of MathQuest
 */
export interface Problem {
  id: string;                    // "problem-1-1-1-1"
  levelId: string;
  sequence: number;              // Order in level
  type: ProblemType;
  category: ProblemCategory;
  statement: string;             // The question text
  statementAudio?: string;       // URL to audio file
  visualAssets?: VisualAsset[];
  inputType: InputType;
  correctAnswer: Answer;
  acceptableAnswers?: Answer[];  // Multiple valid answers
  hints: Hint[];                 // Exactly 3 hints required
  solutionExplanation: string;
  teachingPoint: string;         // Key insight
  commonMistakes?: CommonMistake[];
  followUp?: FollowUpQuestion;
  tags: string[];                // ["parity", "impossibility"]
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export type ProblemType =
  | 'multiple_choice'
  | 'numeric_input'
  | 'text_input'
  | 'multi_select'
  | 'ordering'
  | 'matching'
  | 'fill_in_blank'
  | 'tap_to_count'
  | 'drag_and_drop'
  | 'drawing'
  | 'expression_builder';

export type ProblemCategory =
  | 'thinking'              // Requires insight
  | 'strategic_practice'    // Strategy selection
  | 'fluency'              // Basic fact practice
  | 'compare_without_calc' // BA signature
  | 'find_the_error'       // BA signature
  | 'impossibility'        // BA signature
  | 'working_backwards'    // BA signature
  | 'pattern_discovery'    // BA signature
  | 'multiple_paths';      // BA signature

export type InputType =
  | 'number_pad'
  | 'multiple_choice'
  | 'checkbox_group'
  | 'text_field'
  | 'drag_drop'
  | 'tap_select'
  | 'slider'
  | 'expression_input'
  | 'drawing_canvas';

export interface Answer {
  value: string | number | number[] | string[];
  displayValue?: string;         // How to show it
  explanation?: string;          // Why it's correct
}

export interface VisualAsset {
  id: string;
  type: 'image' | 'animation' | 'interactive';
  url: string;
  alt: string;
  position?: 'top' | 'middle' | 'bottom' | 'inline';
}

export interface CommonMistake {
  answer: string | number;
  feedback: string;
}

export interface FollowUpQuestion {
  text: string;
  insight: string;
}

// Types - will be implemented in Task 2
export type { World, ColorPalette, Character } from './world';
export type { Chapter } from './chapter';
export type {
  Level,
  LevelType,
  TeachingContent,
  TeachingStep,
  TeachingFormat,
  VisualType,
  InteractionType,
  GamePhase,
  ReflectionPrompt,
} from './level';
export type {
  Problem,
  ProblemType,
  ProblemCategory,
  InputType,
  Answer,
  VisualAsset,
  CommonMistake,
  FollowUpQuestion
} from './problem';
export type { Hint, HintType } from './hint';
export type {
  UserProgress,
  WorldProgress,
  LevelAttempt,
  ProblemResult,
  Badge,
  Title,
  UserPreferences
} from './user';
export type {
  SupabaseProfile,
  ChildProfile,
  CloudProgress,
  CloudLevelProgress,
  AuthState,
  CreateChildInput,
  UpdateChildInput,
} from './auth';

# MathQuest: Product Requirements Document (PRD)
## Technical Specification for Implementation
**Version**: 1.0  
**Last Updated**: February 4, 2026  
**Target**: Claude Code Implementation

---

# 1. Overview

## 1.1 Purpose
This PRD provides complete technical specifications for implementing MathQuest, a Beast Academy-style mathematics learning app. This document is designed to be consumed by Claude Code for autonomous implementation.

## 1.2 Scope
- Mobile app (React Native) for iOS and Android
- Web app (React) for desktop/laptop
- Backend services (Node.js/Express or serverless)
- Content management system for curriculum
- Parent dashboard

## 1.3 Technology Stack (Recommended)

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Mobile** | React Native + Expo | Cross-platform, fast iteration |
| **Web** | React + Vite | Shared components with mobile |
| **State** | Zustand or Redux Toolkit | Simple, performant |
| **Backend** | Supabase or Firebase | Auth, DB, storage, real-time |
| **Database** | PostgreSQL (Supabase) | Relational data, JSON support |
| **Storage** | Supabase Storage / S3 | Assets, audio files |
| **Analytics** | Mixpanel or Amplitude | Learning analytics |

---

# 2. Data Models

## 2.1 Core Entities

### World
```typescript
interface World {
  id: string;                    // "world-1", "world-2", etc.
  name: string;                  // "Number Forest"
  theme: string;                 // "forest", "castle", "mountain"
  baLevel: number;               // 1, 2, 3, etc.
  targetAgeMin: number;          // 6
  targetAgeMax: number;          // 8
  totalLevels: number;           // 97
  chapters: Chapter[];
  colorPalette: ColorPalette;
  characters: Character[];
  isLocked: boolean;
  prerequisiteWorldId: string | null;
  estimatedWeeks: number;        // 36
}

interface ColorPalette {
  primary: string;     // "#22C55E"
  secondary: string;   // "#F59E0B"
  accent: string;      // "#3B82F6"
  background: string;
  text: string;
}
```

### Chapter
```typescript
interface Chapter {
  id: string;                    // "chapter-1-1"
  worldId: string;
  number: number;                // 1
  name: string;                  // "Counting"
  topic: string;                 // "counting"
  weekStart: number;             // 1
  weekEnd: number;               // 2
  levels: Level[];
  learningObjectives: string[];
  signatureContent: string[];    // ["creative counting", "skip counting"]
  isBoss: boolean;
}
```

### Level
```typescript
interface Level {
  id: string;                    // "level-1-1-1"
  chapterId: string;
  worldId: string;
  number: number;                // 1
  name: string;                  // "How Many Acorns?"
  type: LevelType;
  storyContext: string;          // Narrative intro
  problems: Problem[];
  teaching?: TeachingContent;    // Pre-problem instruction
  reflection?: ReflectionPrompt; // Post-problem discussion
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedMinutes: number;
  isChallenge: boolean;          // No hints available
  isBoss: boolean;
}

type LevelType = 
  | 'standard'      // Normal level
  | 'teaching'      // Introduces concept
  | 'practice'      // Reinforcement
  | 'challenge'     // No hints, harder
  | 'quiz'          // Chapter assessment
  | 'boss';         // Multi-part final
```

### Problem
```typescript
interface Problem {
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
  hints: Hint[];
  solutionExplanation: string;
  teachingPoint: string;         // Key insight
  commonMistakes?: CommonMistake[];
  followUp?: FollowUpQuestion;
  tags: string[];                // ["parity", "impossibility"]
  difficulty: 1 | 2 | 3 | 4 | 5;
}

type ProblemType =
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

type ProblemCategory =
  | 'thinking'              // Requires insight
  | 'strategic_practice'    // Strategy selection
  | 'fluency'              // Basic fact practice
  | 'compare_without_calc' // BA signature
  | 'find_the_error'       // BA signature
  | 'impossibility'        // BA signature
  | 'working_backwards'    // BA signature
  | 'pattern_discovery'    // BA signature
  | 'multiple_paths';      // BA signature

type InputType =
  | 'number_pad'
  | 'multiple_choice'
  | 'checkbox_group'
  | 'text_field'
  | 'drag_drop'
  | 'tap_select'
  | 'slider'
  | 'expression_input'
  | 'drawing_canvas';
```

### Answer
```typescript
interface Answer {
  value: string | number | number[] | string[];
  displayValue?: string;         // How to show it
  explanation?: string;          // Why it's correct
}

// Examples:
// Numeric: { value: 47 }
// Multiple choice: { value: "C" }
// Multi-select: { value: ["C", "D"] }
// Ordering: { value: [3, 1, 4, 2] }
// Expression: { value: "20 - (10 - 5)" }
```

### Hint
```typescript
interface Hint {
  tier: 1 | 2 | 3;
  cost: number;                  // Stars: 0, 1, 2
  text: string;
  audio?: string;
  visual?: VisualAsset;
  type: HintType;
}

type HintType =
  | 'conceptual'    // "What strategy might help?"
  | 'directional'   // "Try breaking it into parts"
  | 'scaffolded'    // "Start with 99 = 100 - 1..."
  | 'visual'        // Shows diagram
  | 'worked_example'; // Similar solved problem
```

### User Progress
```typescript
interface UserProgress {
  id: string;
  
  odId: string;
  
  // World progress
  worldProgress: {
    [worldId: string]: {
      isUnlocked: boolean;
      isCompleted: boolean;
      starsEarned: number;
      starsTotal: number;
      currentChapterId: string;
      currentLevelId: string;
      completedLevels: string[];
      startedAt: Date;
      completedAt?: Date;
    };
  };
  
  // Level attempts
  levelAttempts: LevelAttempt[];
  
  // Overall stats
  totalStars: number;
  totalLevelsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  totalTimeMinutes: number;
  
  // Achievements
  badges: Badge[];
  titles: Title[];
  
  // Settings
  preferences: UserPreferences;
}

interface LevelAttempt {
  id: string;
  levelId: string;
  startedAt: Date;
  completedAt?: Date;
  starsEarned: 0 | 1 | 2 | 3;
  hintsUsed: number;
  attemptsCount: number;
  timeSeconds: number;
  problemResults: ProblemResult[];
}

interface ProblemResult {
  problemId: string;
  isCorrect: boolean;
  attempts: number;
  hintsUsed: number[];           // Which hint tiers
  answerGiven: Answer;
  timeSeconds: number;
}
```

## 2.2 Database Schema (PostgreSQL)

```sql
-- Worlds
CREATE TABLE worlds (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  theme TEXT NOT NULL,
  ba_level INTEGER NOT NULL,
  target_age_min INTEGER,
  target_age_max INTEGER,
  total_levels INTEGER,
  color_palette JSONB,
  is_locked BOOLEAN DEFAULT true,
  prerequisite_world_id TEXT REFERENCES worlds(id),
  estimated_weeks INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chapters
CREATE TABLE chapters (
  id TEXT PRIMARY KEY,
  world_id TEXT REFERENCES worlds(id),
  number INTEGER NOT NULL,
  name TEXT NOT NULL,
  topic TEXT,
  week_start INTEGER,
  week_end INTEGER,
  learning_objectives JSONB,
  signature_content JSONB,
  is_boss BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Levels
CREATE TABLE levels (
  id TEXT PRIMARY KEY,
  chapter_id TEXT REFERENCES chapters(id),
  world_id TEXT REFERENCES worlds(id),
  number INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  story_context TEXT,
  teaching JSONB,
  reflection JSONB,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
  estimated_minutes INTEGER,
  is_challenge BOOLEAN DEFAULT false,
  is_boss BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Problems
CREATE TABLE problems (
  id TEXT PRIMARY KEY,
  level_id TEXT REFERENCES levels(id),
  sequence INTEGER NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  statement TEXT NOT NULL,
  statement_audio TEXT,
  visual_assets JSONB,
  input_type TEXT NOT NULL,
  correct_answer JSONB NOT NULL,
  acceptable_answers JSONB,
  hints JSONB NOT NULL,
  solution_explanation TEXT,
  teaching_point TEXT,
  common_mistakes JSONB,
  follow_up JSONB,
  tags JSONB,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  is_child BOOLEAN DEFAULT true,
  parent_id UUID REFERENCES users(id),
  age INTEGER,
  grade INTEGER,
  preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  world_progress JSONB,
  total_stars INTEGER DEFAULT 0,
  total_levels_completed INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_time_minutes INTEGER DEFAULT 0,
  badges JSONB,
  titles JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Level Attempts
CREATE TABLE level_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  level_id TEXT REFERENCES levels(id),
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  stars_earned INTEGER CHECK (stars_earned BETWEEN 0 AND 3),
  hints_used INTEGER DEFAULT 0,
  attempts_count INTEGER DEFAULT 1,
  time_seconds INTEGER,
  problem_results JSONB
);

-- Indexes
CREATE INDEX idx_chapters_world ON chapters(world_id);
CREATE INDEX idx_levels_chapter ON levels(chapter_id);
CREATE INDEX idx_problems_level ON problems(level_id);
CREATE INDEX idx_attempts_user ON level_attempts(user_id);
CREATE INDEX idx_attempts_level ON level_attempts(level_id);
```

---

# 3. API Specification

## 3.1 REST Endpoints

### Content APIs

```
GET /api/worlds
  → Returns list of all worlds with basic info

GET /api/worlds/:worldId
  → Returns world detail with chapters

GET /api/worlds/:worldId/chapters
  → Returns chapters for a world

GET /api/chapters/:chapterId
  → Returns chapter detail with levels

GET /api/levels/:levelId
  → Returns level with all problems

GET /api/problems/:problemId
  → Returns single problem detail
```

### Progress APIs

```
GET /api/users/:userId/progress
  → Returns user's complete progress

POST /api/users/:userId/progress/level-start
  Body: { levelId: string }
  → Records level start, returns attemptId

POST /api/users/:userId/progress/problem-result
  Body: { attemptId, problemId, isCorrect, answerGiven, hintsUsed, timeSeconds }
  → Records problem result

POST /api/users/:userId/progress/level-complete
  Body: { attemptId, starsEarned }
  → Records level completion, updates progress

GET /api/users/:userId/stats
  → Returns aggregate statistics
```

### Auth APIs

```
POST /api/auth/register
  Body: { email, password, displayName, isChild, parentId?, age? }

POST /api/auth/login
  Body: { email, password }

POST /api/auth/logout

GET /api/auth/me
  → Returns current user
```

## 3.2 Response Formats

```typescript
// Success response
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    totalPages?: number;
    totalCount?: number;
  };
}

// Error response
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

---

# 4. UI Components

## 4.1 Core Components

### WorldMap
```typescript
interface WorldMapProps {
  worlds: World[];
  userProgress: UserProgress;
  onWorldSelect: (worldId: string) => void;
}

// Visual: Scrollable map showing worlds as distinct areas
// Locked worlds appear greyed/foggy
// Current world highlighted
// Progress indicator on each world
```

### ChapterList
```typescript
interface ChapterListProps {
  chapters: Chapter[];
  worldTheme: string;
  userProgress: WorldProgress;
  onChapterSelect: (chapterId: string) => void;
}

// Visual: Vertical list or path through world
// Completed chapters show checkmark
// Current chapter highlighted
// Locked chapters shown but disabled
```

### LevelCard
```typescript
interface LevelCardProps {
  level: Level;
  isLocked: boolean;
  isCompleted: boolean;
  starsEarned: number;
  onPress: () => void;
}

// Visual: Card showing level number, name, star rating
// Challenge levels have special border
// Boss levels are larger
```

### ProblemDisplay
```typescript
interface ProblemDisplayProps {
  problem: Problem;
  onAnswer: (answer: Answer) => void;
  onHintRequest: (tier: 1 | 2 | 3) => void;
  hintsRevealed: number[];
  attemptNumber: number;
}

// Visual: Problem statement at top
// Visual assets in middle
// Input area at bottom
// Hint button accessible
```

### InputComponents
```typescript
// NumberPad - for numeric answers
interface NumberPadProps {
  onSubmit: (value: number) => void;
  maxDigits?: number;
  allowNegative?: boolean;
  allowDecimal?: boolean;
}

// MultipleChoice - for A/B/C/D questions
interface MultipleChoiceProps {
  options: { id: string; text: string; image?: string }[];
  onSelect: (optionId: string) => void;
  selectedId?: string;
  isMultiSelect?: boolean;
}

// DragDrop - for ordering/matching
interface DragDropProps {
  items: { id: string; content: string | ReactNode }[];
  zones: { id: string; label: string }[];
  onComplete: (mapping: Record<string, string>) => void;
}

// TapToCount - for counting problems
interface TapToCountProps {
  items: { id: string; position: { x: number; y: number }; image: string }[];
  onCountChange: (count: number) => void;
  onSubmit: () => void;
}

// ExpressionBuilder - for equation problems
interface ExpressionBuilderProps {
  availableTokens: string[];  // ["1", "2", "+", "-", "(", ")"]
  onExpressionChange: (expr: string) => void;
  onSubmit: () => void;
}
```

### HintPanel
```typescript
interface HintPanelProps {
  hints: Hint[];
  revealedTiers: number[];
  userStars: number;
  onRevealHint: (tier: 1 | 2 | 3) => void;
}

// Visual: Expandable panel
// Shows cost before reveal
// Locked hints show star requirement
// Revealed hints stay visible
```

### FeedbackModal
```typescript
interface FeedbackModalProps {
  isCorrect: boolean;
  explanation?: string;
  teachingPoint?: string;
  starsEarned?: number;
  onContinue: () => void;
  showConfetti?: boolean;
}

// Visual: Modal overlay
// Correct: Green, celebration animation
// Incorrect: Encouraging message, try again
// Shows teaching point after correct
```

### CharacterDialogue
```typescript
interface CharacterDialogueProps {
  character: Character;
  dialogue: string;
  audioUrl?: string;
  onComplete: () => void;
  isInteractive?: boolean;
}

// Visual: Character sprite with speech bubble
// Text animates in
// Optional audio playback
// Tap to continue
```

## 4.2 Screen Layouts

### HomeScreen
```
┌─────────────────────────────────────┐
│  [Avatar]  MathQuest    [Settings]  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │        WORLD MAP            │   │
│  │    (scrollable canvas)      │   │
│  │                             │   │
│  │   [W1]───[W2]───[W3]       │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ Daily    │  │ Streak   │       │
│  │ Challenge│  │ 🔥 7 days│       │
│  └──────────┘  └──────────┘       │
│                                     │
│        [Continue: Level 3-4-2]      │
└─────────────────────────────────────┘
```

### LevelScreen
```
┌─────────────────────────────────────┐
│  [←]    Level 1-1-3    ⭐⭐⭐      │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │   [Character Dialogue]      │   │
│  │   or                        │   │
│  │   [Problem Statement]       │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │   [Visual/Interactive       │   │
│  │    Problem Area]            │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   [Input Component]         │   │
│  └─────────────────────────────┘   │
│                                     │
│  [💡 Hint]              [Submit →] │
└─────────────────────────────────────┘
```

### ParentDashboard
```
┌─────────────────────────────────────┐
│  Parent Dashboard         [Logout]  │
├─────────────────────────────────────┤
│                                     │
│  Child: Alex           Grade 3      │
│  ┌─────────────────────────────┐   │
│  │  This Week                  │   │
│  │  • 45 minutes played        │   │
│  │  • 12 levels completed      │   │
│  │  • 89% accuracy             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Progress: World 3          │   │
│  │  ████████░░░░░  67%         │   │
│  │  Chapter 7: Variables       │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Struggling Topics:         │   │
│  │  • Remainders (Level 3-8)   │   │
│  │  • Word Problems            │   │
│  │                             │   │
│  │  [View Recommendations]     │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Weekly Report]  [Learning Tips]   │
└─────────────────────────────────────┘
```

---

# 5. State Management

## 5.1 Global State Structure

```typescript
interface AppState {
  // Auth
  auth: {
    user: User | null;
    isLoading: boolean;
    error: string | null;
  };
  
  // Content (cached)
  content: {
    worlds: Record<string, World>;
    chapters: Record<string, Chapter>;
    levels: Record<string, Level>;
    problems: Record<string, Problem>;
    isLoading: boolean;
  };
  
  // User Progress
  progress: {
    data: UserProgress | null;
    currentAttempt: LevelAttempt | null;
    isLoading: boolean;
    isSyncing: boolean;
  };
  
  // UI State
  ui: {
    currentScreen: Screen;
    selectedWorldId: string | null;
    selectedChapterId: string | null;
    selectedLevelId: string | null;
    isHintPanelOpen: boolean;
    modalStack: Modal[];
  };
  
  // Settings
  settings: {
    soundEnabled: boolean;
    musicEnabled: boolean;
    voiceEnabled: boolean;
    fontSize: 'small' | 'medium' | 'large';
    theme: 'light' | 'dark' | 'auto';
  };
}
```

## 5.2 Key Actions

```typescript
// Content
loadWorld(worldId: string): Promise<void>
loadLevel(levelId: string): Promise<void>

// Progress
startLevel(levelId: string): Promise<string>  // returns attemptId
submitAnswer(problemId: string, answer: Answer): Promise<boolean>
useHint(tier: 1 | 2 | 3): void
completeLevel(starsEarned: number): Promise<void>
syncProgress(): Promise<void>

// Navigation
navigateToWorld(worldId: string): void
navigateToLevel(levelId: string): void
goBack(): void

// Settings
updateSettings(settings: Partial<Settings>): void
```

---

# 6. Curriculum Content Format

## 6.1 JSON Content Files

Each world's curriculum is stored as JSON for easy loading and editing.

```typescript
// world-1.json
{
  "id": "world-1",
  "name": "Number Forest",
  "theme": "forest",
  "baLevel": 1,
  "colorPalette": {
    "primary": "#22C55E",
    "secondary": "#F59E0B",
    "accent": "#3B82F6"
  },
  "chapters": [
    {
      "id": "chapter-1-1",
      "number": 1,
      "name": "Counting",
      "topic": "counting",
      "weekStart": 1,
      "weekEnd": 2,
      "learningObjectives": [
        "Count objects creatively and efficiently",
        "Count to 100 and beyond",
        "Understand that counting order doesn't matter"
      ],
      "levels": [
        {
          "id": "level-1-1-1",
          "number": 1,
          "name": "How Many Acorns?",
          "type": "standard",
          "storyContext": "🐿️ Squirrel Sam collected acorns but lost count! Can you help?",
          "difficulty": 1,
          "estimatedMinutes": 3,
          "problems": [
            {
              "id": "problem-1-1-1-1",
              "sequence": 1,
              "type": "tap_to_count",
              "category": "thinking",
              "statement": "Count all the acorns. How many are there?",
              "inputType": "number_pad",
              "correctAnswer": { "value": 13 },
              "hints": [
                {
                  "tier": 1,
                  "cost": 0,
                  "text": "Try tapping each acorn as you count.",
                  "type": "conceptual"
                },
                {
                  "tier": 2,
                  "cost": 1,
                  "text": "Start from one side and work your way across.",
                  "type": "directional"
                },
                {
                  "tier": 3,
                  "cost": 2,
                  "text": "There are more than 10 acorns.",
                  "type": "scaffolded"
                }
              ],
              "teachingPoint": "Counting order doesn't change the total!",
              "followUp": {
                "text": "Did you count left-to-right? What if you counted right-to-left?",
                "insight": "The total is the same no matter what order you count!"
              },
              "difficulty": 1
            }
          ]
        }
      ]
    }
  ]
}
```

## 6.2 Content Validation Schema

```typescript
// Use Zod for runtime validation
import { z } from 'zod';

const HintSchema = z.object({
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  cost: z.number().min(0).max(2),
  text: z.string().min(1),
  type: z.enum(['conceptual', 'directional', 'scaffolded', 'visual', 'worked_example']),
  audio: z.string().optional(),
});

const ProblemSchema = z.object({
  id: z.string(),
  sequence: z.number().positive(),
  type: z.enum([
    'multiple_choice', 'numeric_input', 'text_input', 'multi_select',
    'ordering', 'matching', 'fill_in_blank', 'tap_to_count',
    'drag_and_drop', 'drawing', 'expression_builder'
  ]),
  category: z.enum([
    'thinking', 'strategic_practice', 'fluency', 'compare_without_calc',
    'find_the_error', 'impossibility', 'working_backwards',
    'pattern_discovery', 'multiple_paths'
  ]),
  statement: z.string().min(1),
  inputType: z.string(),
  correctAnswer: z.object({ value: z.any() }),
  hints: z.array(HintSchema).length(3),  // Exactly 3 hints required
  teachingPoint: z.string().min(1),
  difficulty: z.number().min(1).max(5),
});

const LevelSchema = z.object({
  id: z.string(),
  number: z.number().positive(),
  name: z.string().min(1),
  type: z.enum(['standard', 'teaching', 'practice', 'challenge', 'quiz', 'boss']),
  storyContext: z.string(),
  problems: z.array(ProblemSchema).min(1),
  difficulty: z.number().min(1).max(5),
  estimatedMinutes: z.number().positive(),
});

// Validation function
function validateLevel(data: unknown): Level {
  return LevelSchema.parse(data);
}
```

## 6.3 Content Anti-Pattern Detection

```typescript
// Automated checks for content quality
const FORBIDDEN_PHRASES = [
  'let me think',
  'let me check',
  'hmm',
  'actually',
  'wait',
  'let me recalculate',
  'let me retry',
  "doesn't give a whole number",
];

const WEAK_HINT_PATTERNS = [
  /the answer is/i,
  /you should get/i,
  /just \w+ the numbers/i,
  /it's between \d+ and \d+/i,
];

function validateContentQuality(problem: Problem): string[] {
  const issues: string[] = [];
  
  // Check for working notes
  for (const phrase of FORBIDDEN_PHRASES) {
    if (problem.statement.toLowerCase().includes(phrase)) {
      issues.push(`Contains forbidden phrase: "${phrase}"`);
    }
    if (problem.solutionExplanation?.toLowerCase().includes(phrase)) {
      issues.push(`Solution contains forbidden phrase: "${phrase}"`);
    }
  }
  
  // Check hints
  for (const hint of problem.hints) {
    for (const pattern of WEAK_HINT_PATTERNS) {
      if (pattern.test(hint.text)) {
        issues.push(`Hint ${hint.tier} reveals too much: "${hint.text}"`);
      }
    }
  }
  
  // Check for teaching point
  if (!problem.teachingPoint || problem.teachingPoint.length < 10) {
    issues.push('Missing or inadequate teaching point');
  }
  
  // Verify integer answer where expected
  if (problem.type === 'numeric_input') {
    const answer = problem.correctAnswer.value;
    if (typeof answer === 'number' && !Number.isInteger(answer)) {
      issues.push(`Non-integer answer: ${answer}`);
    }
  }
  
  return issues;
}
```

---

# 7. Implementation Priorities

## Phase 1: Core Game Loop (Week 1-2)

### Must Have
- [ ] Project setup (React Native + Expo)
- [ ] Basic navigation structure
- [ ] Problem display component
- [ ] Number pad input
- [ ] Multiple choice input
- [ ] Answer validation
- [ ] Correct/incorrect feedback
- [ ] Single level flow (start → problems → complete)

### Data
- [ ] Load curriculum from JSON files
- [ ] Local storage for progress
- [ ] Level completion tracking

## Phase 2: Full World (Week 3-4)

### Must Have
- [ ] World map screen
- [ ] Chapter list screen
- [ ] Level selection
- [ ] Progress persistence
- [ ] Star rating system
- [ ] Hint system (3 tiers)
- [ ] World 3 curriculum loaded (108 levels)

### Polish
- [ ] Character dialogues
- [ ] Story context display
- [ ] Teaching moments
- [ ] Basic animations

## Phase 3: Complete Experience (Week 5-6)

### Must Have
- [ ] All input types (drag/drop, tap to count, etc.)
- [ ] Worlds 1-3 loaded (313 levels)
- [ ] User authentication
- [ ] Cloud sync
- [ ] Parent dashboard (basic)

### Polish
- [ ] Sound effects
- [ ] Music
- [ ] Voice narration (optional)
- [ ] Celebration animations
- [ ] Badge/achievement system

## Phase 4: Launch Prep (Week 7-8)

### Must Have
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Offline mode testing
- [ ] Analytics integration
- [ ] App Store assets

### Nice to Have
- [ ] Additional visual polish
- [ ] More character animations
- [ ] Streak system
- [ ] Daily challenges

---

# 8. Testing Requirements

## 8.1 Unit Tests

```typescript
// Problem validation
describe('Problem Validation', () => {
  it('requires exactly 3 hints', () => {
    const problem = { ...validProblem, hints: [hint1, hint2] };
    expect(() => validateProblem(problem)).toThrow();
  });
  
  it('rejects forbidden phrases', () => {
    const problem = { ...validProblem, statement: 'Hmm, let me think...' };
    const issues = validateContentQuality(problem);
    expect(issues.length).toBeGreaterThan(0);
  });
  
  it('validates numeric answers are integers', () => {
    const problem = { 
      ...validProblem, 
      type: 'numeric_input',
      correctAnswer: { value: 23.33 }
    };
    const issues = validateContentQuality(problem);
    expect(issues).toContain('Non-integer answer: 23.33');
  });
});

// Answer checking
describe('Answer Checking', () => {
  it('accepts correct numeric answer', () => {
    const result = checkAnswer(
      { value: 47 },
      { correctAnswer: { value: 47 } }
    );
    expect(result.isCorrect).toBe(true);
  });
  
  it('accepts multiple valid answers', () => {
    const problem = {
      correctAnswer: { value: 'C' },
      acceptableAnswers: [{ value: 'C' }, { value: 'D' }]
    };
    expect(checkAnswer({ value: 'D' }, problem).isCorrect).toBe(true);
  });
});
```

## 8.2 Integration Tests

```typescript
describe('Level Flow', () => {
  it('completes a full level', async () => {
    // Start level
    const attemptId = await startLevel('level-1-1-1');
    expect(attemptId).toBeDefined();
    
    // Answer problems
    const level = await getLevel('level-1-1-1');
    for (const problem of level.problems) {
      await submitAnswer(problem.id, problem.correctAnswer);
    }
    
    // Complete level
    await completeLevel(attemptId, 3);
    
    // Verify progress
    const progress = await getProgress();
    expect(progress.completedLevels).toContain('level-1-1-1');
  });
});
```

## 8.3 Content Validation Tests

```typescript
describe('Curriculum Content', () => {
  const worlds = ['world-1', 'world-2', 'world-3'];
  
  worlds.forEach(worldId => {
    describe(`${worldId}`, () => {
      it('has valid structure', () => {
        const world = loadWorld(worldId);
        expect(() => WorldSchema.parse(world)).not.toThrow();
      });
      
      it('has no forbidden phrases', () => {
        const world = loadWorld(worldId);
        const issues = validateWorldContent(world);
        expect(issues).toHaveLength(0);
      });
      
      it('all problems have 3 hints', () => {
        const world = loadWorld(worldId);
        const problems = getAllProblems(world);
        problems.forEach(p => {
          expect(p.hints).toHaveLength(3);
        });
      });
      
      it('all numeric answers are integers', () => {
        const world = loadWorld(worldId);
        const problems = getAllProblems(world)
          .filter(p => p.type === 'numeric_input');
        
        problems.forEach(p => {
          expect(Number.isInteger(p.correctAnswer.value)).toBe(true);
        });
      });
    });
  });
});
```

---

# 9. File Structure

```
mathquest/
├── apps/
│   ├── mobile/                 # React Native app
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── problem/
│   │   │   │   │   ├── ProblemDisplay.tsx
│   │   │   │   │   ├── NumberPad.tsx
│   │   │   │   │   ├── MultipleChoice.tsx
│   │   │   │   │   ├── DragDrop.tsx
│   │   │   │   │   ├── TapToCount.tsx
│   │   │   │   │   └── HintPanel.tsx
│   │   │   │   ├── navigation/
│   │   │   │   │   ├── WorldMap.tsx
│   │   │   │   │   ├── ChapterList.tsx
│   │   │   │   │   └── LevelCard.tsx
│   │   │   │   ├── feedback/
│   │   │   │   │   ├── CorrectModal.tsx
│   │   │   │   │   ├── IncorrectModal.tsx
│   │   │   │   │   └── Confetti.tsx
│   │   │   │   └── character/
│   │   │   │       ├── CharacterDialogue.tsx
│   │   │   │       └── CharacterSprite.tsx
│   │   │   ├── screens/
│   │   │   │   ├── HomeScreen.tsx
│   │   │   │   ├── WorldScreen.tsx
│   │   │   │   ├── LevelScreen.tsx
│   │   │   │   ├── SettingsScreen.tsx
│   │   │   │   └── ParentDashboard.tsx
│   │   │   ├── store/
│   │   │   │   ├── index.ts
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── contentSlice.ts
│   │   │   │   ├── progressSlice.ts
│   │   │   │   └── uiSlice.ts
│   │   │   ├── services/
│   │   │   │   ├── api.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── content.ts
│   │   │   │   └── progress.ts
│   │   │   ├── utils/
│   │   │   │   ├── answerChecker.ts
│   │   │   │   ├── contentValidator.ts
│   │   │   │   └── starCalculator.ts
│   │   │   └── App.tsx
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── audio/
│   │   │   └── fonts/
│   │   └── app.json
│   │
│   └── web/                    # React web app
│       └── ...similar structure
│
├── packages/
│   ├── content/                # Curriculum JSON files
│   │   ├── world-1.json
│   │   ├── world-2.json
│   │   ├── world-3.json
│   │   └── schema.ts
│   │
│   ├── shared/                 # Shared types and utilities
│   │   ├── types/
│   │   │   ├── world.ts
│   │   │   ├── problem.ts
│   │   │   ├── user.ts
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── validation.ts
│   │       └── scoring.ts
│   │
│   └── api/                    # Backend API
│       ├── src/
│       │   ├── routes/
│       │   ├── services/
│       │   └── index.ts
│       └── package.json
│
├── docs/
│   ├── MRD.md
│   ├── PRD.md
│   ├── curriculum-reviews/
│   └── progress.md
│
└── package.json
```

---

# 10. Appendices

## Appendix A: Curriculum File Locations

| File | Location | Status |
|------|----------|--------|
| World 1 Original | `/mnt/user-data/uploads/world1-number-forest-BA-level1.md` | Needs conversion to JSON |
| World 1 Review | `/mnt/user-data/outputs/world1-curriculum-review.md` | Complete |
| World 1 Supplement | `/mnt/user-data/outputs/world1-revision-supplement.md` | Complete |
| World 2 Original | `/mnt/user-data/uploads/world2-operation-kingdom-BA-level2.md` | Needs conversion to JSON |
| World 2 Review | `/mnt/user-data/outputs/world2-curriculum-review.md` | Complete |
| World 2 Supplement | `/mnt/user-data/outputs/world2-revision-supplement.md` | Complete |
| World 3 Original | `/mnt/user-data/outputs/world3-multiplication-mountains-BA-level3.md` | Needs conversion to JSON |
| World 3 Review | `/mnt/user-data/outputs/world3-curriculum-review.md` | Complete |

## Appendix B: Implementation Checklist

### Phase 1 Checklist
```
□ Create Expo project
□ Set up TypeScript
□ Install navigation (React Navigation)
□ Install state management (Zustand)
□ Create basic screens (Home, Level)
□ Implement ProblemDisplay component
□ Implement NumberPad component
□ Implement answer checking logic
□ Implement feedback modals
□ Test with 5 sample problems
```

### Phase 2 Checklist
```
□ Convert World 3 curriculum to JSON
□ Implement content loading
□ Implement WorldMap component
□ Implement ChapterList component
□ Implement LevelCard component
□ Implement hint system
□ Implement star calculation
□ Implement local progress storage
□ Test full World 3 playthrough
```

## Appendix C: Key Algorithms

### Star Calculation
```typescript
function calculateStars(
  hintsUsed: number,
  attempts: number,
  timeSeconds: number,
  expectedSeconds: number
): 0 | 1 | 2 | 3 {
  // Perfect: no hints, first try, reasonable time
  if (hintsUsed === 0 && attempts === 1 && timeSeconds <= expectedSeconds * 1.5) {
    return 3;
  }
  
  // Good: minimal hints, few attempts
  if (hintsUsed <= 1 && attempts <= 2) {
    return 2;
  }
  
  // Completed: used hints or multiple attempts
  if (hintsUsed <= 3) {
    return 1;
  }
  
  // Should not happen (max 3 hints)
  return 0;
}
```

### Answer Equivalence
```typescript
function answersAreEquivalent(given: Answer, correct: Answer): boolean {
  // Numeric comparison with tolerance
  if (typeof given.value === 'number' && typeof correct.value === 'number') {
    return Math.abs(given.value - correct.value) < 0.0001;
  }
  
  // String comparison (case insensitive, trimmed)
  if (typeof given.value === 'string' && typeof correct.value === 'string') {
    return given.value.trim().toLowerCase() === correct.value.trim().toLowerCase();
  }
  
  // Array comparison (order matters for ordering problems)
  if (Array.isArray(given.value) && Array.isArray(correct.value)) {
    if (given.value.length !== correct.value.length) return false;
    return given.value.every((v, i) => v === correct.value[i]);
  }
  
  // Default: strict equality
  return given.value === correct.value;
}
```

---

*PRD v1.0 — Technical Specification for Implementation*
*February 2026*
*Target: Claude Code*

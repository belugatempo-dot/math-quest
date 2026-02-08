# MathQuest Technical Architecture Plan

## Overview

MathQuest is a K-6 math learning app implementing Beast Academy methodology with 313 levels across 3 worlds. This plan covers the technical architecture for Phase 1 MVP (World 3, 108 levels) through full launch.

---

## 1. Technology Stack Decisions

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Mobile** | React Native + Expo (managed) | Cross-platform, OTA updates, fast iteration |
| **State** | Zustand | Simpler than Redux, built-in persistence |
| **Backend** | Supabase | PostgreSQL relational model fits hierarchy, Row Level Security for COPPA |
| **Local Storage** | MMKV | 10x faster than AsyncStorage, encryption support |
| **Content** | Bundled JSON | Offline-first, no API calls to play |
| **Validation** | Zod | Runtime schema validation, TypeScript inference |
| **Monorepo** | pnpm + Turborepo | Shared packages, caching |

---

## 2. Monorepo Structure

```
mathquest/
├── apps/
│   ├── mobile/                 # React Native + Expo
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── problem/    # ProblemScreen, NumberPad, MultipleChoice, HintPanel
│   │   │   │   ├── navigation/ # WorldMap, ChapterList, LevelCard
│   │   │   │   └── feedback/   # CorrectModal, IncorrectModal, TeachingPoint
│   │   │   ├── screens/        # HomeScreen, LevelScreen, SettingsScreen
│   │   │   ├── store/          # Zustand slices
│   │   │   ├── services/       # storage, sync
│   │   │   └── hooks/
│   │   └── assets/
│   └── web/                    # Phase 3
├── packages/
│   ├── shared/                 # Types, schemas, utilities
│   │   ├── types/              # World, Chapter, Level, Problem, UserProgress
│   │   ├── schemas/            # Zod validation schemas
│   │   └── utils/              # answerChecker, starCalculator, hintManager
│   ├── content/                # Curriculum data
│   │   ├── data/               # world-1.json, world-2.json, world-3.json
│   │   └── tools/              # parser, validator, antiPatternDetector
│   └── api/                    # Phase 2
└── tools/
    └── content-pipeline/       # CLI for markdown → JSON conversion
```

---

## 3. Content Pipeline

### 3.1 Conversion Flow
```
Markdown Files → AST Parser (remark) → Transformer → Zod Validation → Anti-Pattern Detection → JSON
```

### 3.2 Critical Files to Parse
- `world3-multiplication-mountains-BA-level3.md` (108 levels) - Phase 1
- `world1-number-forest-BA-level1.md` (97 levels) - Phase 2
- `world2-operation-kingdom-BA-level2.md` (108 levels) - Phase 2

### 3.3 Anti-Pattern Detection
**Forbidden Phrases** (found in curriculum files):
- "let me think", "let me recalculate", "hmm", "wait", "actually"
- Working notes like "Wait—let me recalculate: 6²=36, 7²=49..."

**Weak Hint Patterns**:
- "the answer is X", "you should get X", "it's between X and Y"

**Validation Rules**:
- All problems must have exactly 3 hints
- numeric_input problems must have integer answers
- All problems must have teaching points (min 10 chars)

---

## 4. Data Models

### 4.1 Core Hierarchy
```
World → Chapter → Level → Problem
  │
  └─ colorPalette, characters, targetAge

Level → problems[], hints[], teachingPoint
  │
  └─ type: standard | teaching | challenge | boss

Problem → statement, inputType, correctAnswer, hints[3]
```

### 4.2 Input Types by Priority
| Priority | Input Type | Problem Types | MVP |
|----------|------------|---------------|-----|
| P0 | number_pad | numeric_input, fill_in_blank | ✅ |
| P0 | multiple_choice | multiple_choice | ✅ |
| P1 | checkbox_group | multi_select | Phase 2 |
| P1 | drag_drop | ordering, matching | Phase 2 |
| P2 | tap_select | tap_to_count | Phase 2 |
| P2 | expression_input | expression_builder | Phase 2 |
| P3 | drawing_canvas | drawing | Phase 3 |

---

## 5. Core Game Loop

### 5.1 Problem Flow State Machine
```
LOADING → PRESENTING → ANSWERING → CHECKING
                          ↓           ↓
                    HINT_VIEWING   CORRECT → TEACHING_POINT → NEXT
                          ↓           ↓
                    HINT_CONFIRM  INCORRECT → retry
```

### 5.2 Hint System
| Tier | Cost | Type | Example |
|------|------|------|---------|
| 1 | Free | Conceptual | "What strategy might help?" |
| 2 | 1 ⭐ | Directional | "Try breaking the number into parts" |
| 3 | 2 ⭐ | Scaffolded | "Start with 99 = 100 - 1..." |

### 5.3 Star Calculation
```typescript
function calculateStars(hintsUsed, attempts, timeSeconds, expectedSeconds): 0|1|2|3 {
  if (hintsUsed === 0 && attempts === 1 && timeSeconds <= expectedSeconds * 1.5) return 3;
  if (hintsUsed <= 1 && attempts <= 2) return 2;
  if (hintsUsed <= 3) return 1;
  return 0;
}
```

---

## 6. Offline-First Architecture

```
┌─────────────────────────────────────────┐
│         Zustand Store (memory)          │
├─────────────────────────────────────────┤
│         MMKV (local persistence)        │
├─────────────────────────────────────────┤
│     Supabase (cloud sync when online)   │
└─────────────────────────────────────────┘
```

**Content**: Bundled JSON in app binary (~2-5MB for all 313 levels)
**Progress**: Local-first with background sync, last-write-wins conflict resolution

---

## 7. Database Schema (Supabase PostgreSQL)

```sql
-- Core tables
users (id, email, display_name, account_type, parent_id, age, grade)
user_progress (user_id, world_progress JSONB, total_stars, streaks, badges)
level_attempts (user_id, level_id, stars_earned, hints_used, problem_results JSONB)

-- Row Level Security for COPPA
-- Parents can view their children's data
-- Children can only access their own progress
```

---

## 8. Navigation Structure

```
AuthStack (not signed in)
├── WelcomeScreen
├── SignInScreen
└── ParentSetupScreen

MainStack (child)
├── HomeScreen (world map + continue)
├── WorldScreen (chapter list)
├── ChapterScreen (level grid)
├── LevelScreen (problem flow)
└── SettingsScreen

ParentStack
├── DashboardScreen
├── ChildProgressScreen
└── WeeklyReportScreen
```

---

## 9. Testing Strategy

| Type | Tool | Coverage |
|------|------|----------|
| Content Validation | Vitest | All 313 levels pass schema, no anti-patterns |
| Unit Tests | Vitest | answerChecker, starCalculator, hintManager |
| Integration Tests | Vitest | Level flow from start to complete |
| E2E Tests | Detox | Critical path: signup → complete level |

---

## 10. Phase 1 MVP Scope (Weeks 1-6)

### Included
- Project setup (Expo + TypeScript + Turborepo)
- Content pipeline (parse World 3 → JSON, validate, clean working notes)
- Zod schemas for all data types
- ProblemScreen with state machine
- NumberPad and MultipleChoice inputs
- Answer checking and star calculation
- 3-tier hint system
- Feedback modals (correct/incorrect/teaching point)
- Local progress persistence (MMKV)
- Basic navigation (Home → Level → Problem)
- World 3 bundled (108 levels)
- **User authentication (Supabase Auth)** - email/password for parents, child profiles
- **Cloud sync** - progress synced to Supabase when online

### Deferred to Phase 2
- Parent dashboard (full analytics)
- Worlds 1 and 2 (205 more levels)
- DragDrop, TapToCount, ExpressionBuilder inputs
- Achievements and streaks
- Android build

### Deferred to Phase 3
- Web version
- Voice narration
- Drawing canvas input

---

## 11. Implementation Order (Dependency Graph)

```
Week 1: Foundation
├── Project setup (Expo + Turborepo)
├── packages/shared: Zod schemas, TypeScript types
└── packages/content: Markdown parser, anti-pattern detector

Week 2: Core Logic
├── packages/shared/utils: answerChecker, starCalculator, hintManager
├── Content pipeline: Parse World 3 → validated JSON
└── Local storage setup (MMKV)

Week 3: UI Components
├── apps/mobile/components: NumberPad, MultipleChoice
├── apps/mobile/components: HintPanel, FeedbackModals
└── Zustand store slices

Week 4: Screens & Integration
├── ProblemScreen (full game loop)
├── HomeScreen, navigation
└── Level completion flow

Week 5: Auth & Sync
├── Supabase Auth setup (email/password)
├── Parent account creation
├── Child profile creation (no email)
├── Cloud sync service
└── Progress sync with conflict resolution

Week 6: Polish & Testing
├── Content validation tests (all 108 levels)
├── Integration tests (level flow)
├── E2E tests (Detox)
└── Bug fixes, performance

Week 7-8: Phase 2 begins
├── Parent dashboard (analytics)
└── Worlds 1-2 content
```

---

## 12. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Content parsing fails | Medium | High | Incremental parser, extensive tests |
| Working notes missed | Medium | Medium | Automated detection + manual review |
| Performance issues | Low | High | Bundle content, avoid network calls |
| Complex inputs delayed | High | Low | MVP works with number_pad + MC only |
| COPPA compliance gap | Low | High | Minimal data collection, consult legal |

---

## 13. Effort Estimates

| Component | Size | Notes |
|-----------|------|-------|
| Project setup | S | Expo + Turborepo template |
| Zod schemas | S | Based on PRD interfaces |
| Content pipeline | M | Parser + validator + anti-pattern |
| ProblemScreen | L | State machine, multiple inputs |
| NumberPad | M | Custom keyboard |
| MultipleChoice | M | Selection UI |
| Hint system | M | Tier logic, star deduction |
| Star calculation | S | Algorithm from PRD |
| Local storage | M | MMKV + Zustand persist |
| Navigation | M | React Navigation setup |
| Content tests | S | Automated validation |
| Integration tests | M | Level flow coverage |
| E2E tests | M | Detox setup + critical path |

---

## 14. Critical Files Reference

| File | Purpose |
|------|---------|
| `mathquest-PRD.md` | TypeScript interfaces, DB schema, API spec |
| `mathquest-MRD-v2.md` | Problem Design Bible, forbidden phrases, quality standards |
| `world3-multiplication-mountains-BA-level3.md` | Phase 1 content (108 levels) |
| `world1-number-forest-BA-level1.md` | Phase 2 content (97 levels) |
| `world2-operation-kingdom-BA-level2.md` | Phase 2 content (108 levels) |

---

## 15. Verification Plan

1. **Content Validation**: Run automated tests verifying all 313 levels pass schema
2. **Anti-Pattern Check**: Verify no working notes or weak hints in output JSON
3. **Level Playthrough**: Manually complete 10 levels across difficulty range
4. **Offline Test**: Airplane mode → complete full level → restart app → progress persists
5. **Performance**: Level load < 1 second, 60fps animations

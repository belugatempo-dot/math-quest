# MathQuest Development Context

**Last Updated**: February 15, 2026

---

## Objective & Scope

**Goal**: Build MathQuest Phase 1 MVP — World 3 + World 4 with multi-world navigation, playable on web with content preview functionality.

**Key Requirements**:
- Beast Academy methodology (thinking > memorization)
- 3-tier progressive hint system
- Star-based progression
- localStorage for progress persistence

**Out of Scope for MVP**:
- Worlds 1-2 (Phase 2), World 5+ (future)
- iOS/Android native apps (Phase 2-3)
- Advanced input types (drag-drop, drawing)
- Voice narration
- Cloud sync / authentication

---

## Current Status

**Phase**: Week 1 - Foundation + Web App
**Status**: ✅ Web App Built and Running

**What's Working**:
- Monorepo structure (pnpm + Turborepo)
- Content pipeline with markdown parser
- **World 3** (Multiplication Mountains): 135 levels, 424 problems, A- quality
- **World 4** (Fraction Islands): 133 levels, 369 problems, A quality, 12 boss levels
- **Multi-world navigation**: world selector tabs, cross-world helpers (`getWorld`, `getChapter`, `getLevel`, `getLevelWithContext`, `getWorldForChapter`)
- Next.js 14 web app with Tailwind CSS, dark theme UI with world-themed CSS custom properties
- Character-led teaching system (TeachingPanel, TeachingVisual, AdaptiveReteachModal)
- Phase-based game state machine (teaching → problem → feedback → teaching-point → adaptive-reteach)
- World 4 Ch1 teaching content (7/10 levels: 4 multi-step, 3 single-message)
- Student gameplay experience
- Content preview (admin) functionality
- localStorage progress persistence
- Shared package: types, utils, schemas (Zod), constants
- Refactored architecture: `useGameState` hook, `getLevelTypeInfo()`, shared utils
- Accessibility: aria-labels, semantic HTML, keyboard navigation
- Utility scripts: `parse-world4.mjs`, `validate-world.mjs`, `add-teaching-content-world4-ch1.mjs`
- Comprehensive test suite: **876 tests (390 shared + 486 web), 100% shared coverage, 97%+ web coverage**

**No Current Blockers** - App is functional and playable.

---

## Completed Steps

### February 4, 2026

**14:00** - Project planning phase complete
- Read MRD, PRD, curriculum files
- Designed technical architecture
- Created architecture plan document
- User approved plan with modifications:
  - Confirmed Supabase as backend
  - Added auth to MVP scope
  - Automated detection + manual review for content cleanup

**14:15** - Monorepo initialization
- Created root package.json, turbo.json, pnpm-workspace.yaml
- Set up packages/shared with types, schemas, utils, constants
- Set up packages/content with parser, validator, antiPatternDetector
- Set up tools/content-pipeline with CLI scaffold

**14:25** - Dependencies installed and build verified
- `pnpm install` successful (167 packages)
- Fixed unused import errors
- `pnpm build` successful for all 3 packages

**14:30** - Documentation created
- Created docs/architecture-plan.md
- Created docs/progress.md
- Created plan.md
- Created context.md

**15:00** - Content pipeline completed
- Built full markdown parser (`tools/content-pipeline/src/cli.ts`)
- Fixed regex pattern for Problem detection (was `startsWith`, now uses `match(/^\*\*Problem\*\*.*:/)`)
- All 108 levels now parse correctly (was 102/108)
- Generated `data/world-3.json` with complete curriculum data
- Anti-patterns reduced from 10 to 2 (remaining: 2 weak hints)

**15:30** - Web app decision
- User chose web-only for MVP (no iOS/Expo)
- Selected Next.js + Tailwind CSS
- Created implementation plan

**16:00** - Next.js web app built
- Created `apps/web/` with Next.js 14 App Router
- Implemented student gameplay (`/play/[levelId]`)
- Implemented chapter navigation (`/chapter/[id]`)
- Implemented world map home page (`/`)
- Implemented content preview admin (`/admin`, `/admin/level/[id]`)
- localStorage progress persistence working
- Build successful - all routes compile

### Previous Sessions (before Feb 8)

**Code quality & refactoring** (completed):
- Extracted `useGameState` hook from PlayPage (game logic separation)
- Created `getLevelTypeInfo()` in `lib/level-type-styles.ts` (consolidated 5 duplicated style maps)
- PlayPage now uses shared `checkAnswer()`, `calculateStars()`, `calculateExpectedTime()`
- HintPanel uses `HINT_COSTS` from shared package
- Chapter page helper functions moved to module scope (pure functions)
- Accessibility improvements: aria-labels on stars, locked icons, search input label, emoji aria-hidden

**Shared package testing** (completed):
- 72 tests across 4 utils: answerChecker, starCalculator, hintManager, progressionManager
- 100% coverage on all utility files

**Web app partial testing** (completed):
- `useGameState` hook tests (7 tests)
- `level-type-styles` utility tests (6 tests)

### February 14-15, 2026

**World 4 enrichment** (completed):
- Expanded from 125→133 levels, 137→369 problems (2.8/level)
- Added boss levels to all 12 chapters (was 5)
- Filled CCSS gaps: 4.NF.C.5, 5.NBT.A.4, 5.NBT.B.6-7, 4.MD.A.1-3, 4.G.A.1-3, 4.OA.C.5
- Quality upgraded from A- to A

**Dark theme UI conversion** (completed):
- World-themed CSS custom properties
- Dark backgrounds with themed gradients

**Character-led teaching system** (completed — 8 TDD iterations):
1. Schema & types: TeachingStep, TeachingFormat, VisualType, InteractionType, GamePhase
2. Game state machine: phase management (teaching → problem → adaptive-reteach), 2-wrong trigger
3. TeachingPanel component: multi-step lessons, skip nudge, keyboard navigation
4. TeachingVisual component: AngleDiagram, WorkedExample, ConceptDiagram (interactive SVGs)
5. AdaptiveReteachModal component: re-teach offer after consecutive wrong answers
6. PlayPage integration: phase-based rendering
7. Teaching content for World 4 Ch1: 7/10 levels (4 multi-step, 3 single-message)
8. Polish: animations, keyboard shortcuts, full test verification
- Character components: CharacterMessage, CharacterAvatar, SpeechBubble ('teaching' variant)
- Commit: `69538f0`

**Multi-kid profile system** (completed):
- Profile switching with localStorage persistence

### February 8, 2026

**Test automation — full coverage** (completed):
- Created 22 new test files, bringing total from 85 to **555 tests**
- **Shared schemas** (6 files, 268 tests): hint, problem, level, chapter, world, user — **100% coverage**
- **Web libs** (2 files, 31 tests): storage.ts, world-data.ts — **100% coverage**
- **Web components** (9 files, 95 tests): Button, Card, StarDisplay, ProblemDisplay, AnswerInput, HintPanel, LevelComplete, LevelCard, ChapterCard — **99.5% stmt coverage**
- **Web pages** (5 files, 64 tests): HomePage, PlayPage, ChapterPage, AdminPage, AdminLevelPage — **100% stmt coverage** (tested pages)
- Infrastructure: vitest.setup.ts with jest-dom, esbuild jsxInject for JSX transform, @vitest/coverage-v8
- Build verified: `pnpm build` passes cleanly

**World 3 Enhancement — B- to A- quality** (completed):
- Enhanced `data/world-3.json`: 108 → **120 levels** across 12 chapters
- **Schema fix**: Problem ID regex now accepts `problem-level-` prefix (`packages/shared/src/schemas/problem.ts`)
- **Hints**: Added 3-tier hints to all 120 problems (was 105 empty)
- **Teaching points**: Filled all 73 empty teaching points (min 10 chars, no forbidden phrases)
- **Category reclassification**: ~30 problems reclassified from inflated "thinking" → honest labels
  - Final: 65% thinking, 20% strategic_practice, 14% fluency
- **Difficulty calibration**: Added difficulty 3 (18 problems) and 5 (3 problems); was missing both
- **12 new signature problems**: find_the_error (4), compare_without_calc (3), impossibility (2), visual proof/conceptual (3)
- **Metadata**: Characters array (4), signatureContent for all 12 chapters, story contexts (~90 levels), tags, solution explanations
- All 586 tests pass (341 shared + 245 web), `pnpm build` clean

**World 4 Creation — Fraction Islands** (completed):
- Created `data/world-4.json`: **125 levels** (120 regular + 5 boss battles) across 10 chapters
- Problem IDs: `problem-4-X-Y-Z` (short format). Level IDs: `level-4-X-Y`
- Parser script: `scripts/parse-world4.mjs` (markdown→JSON converter)
- Validator script: `scripts/validate-world.mjs` (Zod WorldSchema checker, works for any world)
- All Zod schemas pass, build clean

**Multi-world Navigation** (completed):
- World selector with tab navigation on home page
- `world-data.ts` exports `allWorlds`, `getWorld()`, `getChapter()`, `getLevel()`, `getLevelWithContext()`, `getWorldForChapter()`
- Admin page filter supports cross-world browsing
- All 586 tests pass (341 shared + 245 web)

---

## Next Steps

1. **Extend teaching content to World 4 Ch2-12** (Priority: HIGH)
   - Ch1 has 7/10 levels with teaching — replicate pattern to remaining 11 chapters
   - Use `add-teaching-content-world4-ch1.mjs` as template

2. **Extend teaching content to World 3** (Priority: HIGH)
   - Adapt teaching system for multiplication topics

3. **World 5 Design** (Priority: MEDIUM)
   - Decimal Depths (BA5): decimals, percents, coordinate plane, statistics intro
   - Target: ~120 levels, 12 chapters, A quality from the start

4. **Polish web app** (Priority: MEDIUM)
   - Add responsive design improvements
   - Improve error handling
   - Add loading states

5. **Content pipeline testing** (Priority: LOW)
   - `packages/content` and `tools/content-pipeline` have no tests
   - Add content quality metrics script

6. **Future phases**
   - Add authentication (Supabase)
   - Add cloud sync for progress
   - Mobile apps (React Native/Expo)

---

## Open Questions / Blockers

### Questions
- [ ] Should hint tier 1 also deduct stars? (Currently only tier 2+ deducts)

### Blockers
- None currently

### Resolved
- ✅ Backend choice: Supabase (confirmed by user)
- ✅ Content cleanup: Automated detection + manual review (confirmed by user)
- ✅ Platform choice: Web-only for MVP (user decided)
- ✅ Framework: Next.js + Tailwind CSS (user approved)
- ✅ Content pipeline: Parser built and working (108/108 levels)
- ✅ Web app: Built and running
- ✅ World 3 enhancement: B- → A- quality (135 levels, 424 problems)
- ✅ World 4 creation & enrichment: Fraction Islands, A quality (133 levels, 369 problems, 12 boss levels)
- ✅ Multi-world navigation: world selector tabs, cross-world helpers
- ✅ Character-led teaching system: TeachingPanel, TeachingVisual, AdaptiveReteachModal (commit `69538f0`)
- ✅ Dark theme UI conversion with world-themed CSS custom properties
- ✅ World 4 Ch1 teaching content (7/10 levels)
- ✅ Commit all enhancement work (World 3 commit `97a46ab`, World 4 commit `c02d9c3`, Teaching commit `69538f0`)

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `mathquest-MRD-v2.md` | Product requirements, problem design bible |
| `mathquest-PRD.md` | Technical spec, data models, API spec |
| `data/world-3.json` | World 3 game content (135 levels, 424 problems, A-) |
| `data/world-4.json` | World 4 game content (133 levels, 369 problems, A, with teaching) |
| `scripts/parse-world4.mjs` | Markdown→JSON converter for World 4 |
| `scripts/validate-world.mjs` | Zod WorldSchema validator for any world JSON |
| `scripts/add-teaching-content-world4-ch1.mjs` | Teaching content injection for World 4 Ch1 |
| `docs/architecture-plan.md` | Full technical architecture |
| `context.md` | This file - context and progress |
| `tools/content-pipeline/src/cli.ts` | CLI for parse, validate, detect-antipatterns |
| **Shared Package** | |
| `packages/shared/src/schemas/*.ts` | Zod schemas (hint, problem, level, chapter, world, user) |
| `packages/shared/src/utils/*.ts` | Business logic (answerChecker, starCalculator, hintManager, progressionManager) |
| `packages/shared/src/types/` | TypeScript type definitions |
| `packages/shared/src/constants/` | Shared constants |
| **Web App** | |
| `apps/web/src/app/page.tsx` | World map home page |
| `apps/web/src/app/play/[levelId]/page.tsx` | Student gameplay |
| `apps/web/src/app/chapter/[id]/page.tsx` | Chapter navigation |
| `apps/web/src/app/admin/page.tsx` | Content browser |
| `apps/web/src/app/admin/level/[id]/page.tsx` | Level preview |
| `apps/web/src/hooks/useGameState.ts` | Game state management hook (phase machine) |
| `apps/web/src/lib/world-data.ts` | Multi-world data loading & navigation helpers |
| `apps/web/src/components/game/TeachingPanel.tsx` | Multi-step lesson renderer |
| `apps/web/src/components/game/TeachingVisual.tsx` | Interactive SVG visuals |
| `apps/web/src/components/game/AdaptiveReteachModal.tsx` | Re-teach offer modal |
| `apps/web/src/components/characters/CharacterMessage.tsx` | Character speech component |
| `apps/web/src/lib/storage.ts` | localStorage progress persistence |
| `apps/web/src/lib/level-type-styles.ts` | Level type display configuration |

---

## Session Notes

- User prefers detailed progress tracking
- Web-only approach chosen over iOS for faster iteration
- Build errors were due to strict TypeScript (unused imports) - fixed by prefixing with underscore or removing
- Parser regex fix: Use `match(/^\*\*Problem\*\*.*:/)` not `startsWith('**Problem**:')` to handle variant formats
- World data path from web app: `../../../../data/world-3.json` (relative to src/lib/)
- `Character` interface uses `personality` field (not `description`) — `packages/shared/src/types/world.ts:31`
- Problem ID regex supports both `problem-3-X-Y-Z` and `problem-level-3-X-Y-Z`
- `pnpm test` from root fails on `@mathquest/content` (no tests) — run shared + web separately
- For bulk JSON edits, write Node.js .mjs scripts that read → transform → write the JSON file

## Test Coverage Summary

| Area | Tests | Stmts | Branch | Funcs | Lines |
|------|-------|-------|--------|-------|-------|
| Shared schemas | 309 | 100% | 100% | 100% | 100% |
| Shared utils | 81 | 100% | 100% | 100% | 100% |
| Web libs | 31 | 100% | 100% | 100% | 100% |
| Web components | 263 | 99%+ | 97%+ | 95%+ | 99%+ |
| Web pages | 76 | 100%* | 86-100% | 100% | 100%* |
| Web hooks | 116 | 95%+ | 100% | 100% | 95%+ |
| **Total** | **876** | **97%+** | **96%+** | **95%+** | **97%+** |

\* layout.tsx excluded (framework boilerplate, not business logic)

## How to Run

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run web app (from apps/web)
cd apps/web && pnpm dev

# Run all tests
cd packages/shared && pnpm test        # 341 tests
cd apps/web && pnpm test               # 245 tests

# Run tests with coverage
cd packages/shared && pnpm test -- --coverage
cd apps/web && pnpm test -- --coverage

# Parse curriculum (from tools/content-pipeline)
cd tools/content-pipeline && pnpm start parse

# Detect anti-patterns
cd tools/content-pipeline && pnpm start detect-antipatterns
```

## Web App Routes

- `/` - World selector with tab navigation; each world shows chapters with progress
- `/chapter/[id]` - Chapter view with level cards
- `/play/[levelId]` - Student gameplay
- `/admin` - Content browser with cross-world filter (245 levels total)
- `/admin/level/[id]` - Level preview with problems, hints, answers

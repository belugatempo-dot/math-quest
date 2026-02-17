# MathQuest Development Context

**Last Updated**: February 16, 2026

---

## Objective & Scope

**Goal**: Build MathQuest Phase 1 MVP — Worlds 3-5 with multi-world navigation, playable on web with content preview functionality.

**Key Requirements**:
- Beast Academy methodology (thinking > memorization)
- 3-tier progressive hint system
- Star-based progression
- localStorage for progress persistence

**Out of Scope for MVP**:
- Worlds 1-2 (Phase 2), World 6+ (future)
- iOS/Android native apps (Phase 2-3)
- Advanced input types (drag-drop, drawing)
- Voice narration

---

## Current Status

**Phase**: Week 1 - Foundation + Web App
**Status**: ✅ Deployed to Production
**Live URL**: https://math-quest-lime.vercel.app

**What's Working**:
- Monorepo structure (pnpm + Turborepo)
- Content pipeline with markdown parser
- **World 3** (Multiplication Mountains): 135 levels, 424 problems, A- quality
- **World 4** (Fraction Islands): 143 levels, 405 problems, A+ quality (BA4-calibrated), 13 boss levels
- **World 5** (Algebra Archipelago): 158 levels, 474 problems, BA5-aligned (ages 10-12), 12 boss levels
- **Multi-world navigation**: world selector tabs, cross-world helpers (`getWorld`, `getChapter`, `getLevel`, `getLevelWithContext`, `getWorldForChapter`)
- Next.js 14 web app with Tailwind CSS, purple-blue gradient glassmorphism UI with world-themed CSS custom properties
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
- **Supabase Auth + Cloud Sync**: Parent auth (email/password), child profiles, cloud progress save/load, localStorage migration
- COPPA-compliant: children never have auth accounts, parents own child profiles
- Offline-first: localStorage primary, cloud sync is fire-and-forget
- Order-independent answer matching (`Answer.orderIndependent`, set comparison in `checkAnswer()`)
- Email confirmation flow (`/auth/callback` route, `AuthForm` confirmation message)
- Multiple-choice clickable buttons in `AnswerInput` component
- Comprehensive test suite: **1,118 tests (455 shared + 663 web), 100% shared coverage, 97%+ web coverage**
- **Deployed to Vercel**: https://math-quest-lime.vercel.app (auto-deploys on push to main)

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

### February 15, 2026 (continued)

**Supabase Auth + User Management** (completed — 7 TDD slices):
1. **Supabase Infrastructure**: Installed `@supabase/supabase-js` + `@supabase/ssr`, created browser/server clients, Next.js middleware for session refresh, auth types + Zod schemas in shared package
2. **Parent Registration**: `AuthService.signUp()`, `AuthForm.tsx` (signup mode), `AuthContext.tsx` with auth state, `AuthProvider` wrapping in layout
3. **Parent Login**: `AuthService.signIn/signOut()`, login mode in `AuthForm.tsx`, auth status bar in `ProfilePicker.tsx`
4. **Child Profile Management**: `child-profile.service.ts`, `ProfileContext` cloud-aware (loads/creates/deletes child profiles via Supabase when authenticated, localStorage fallback for offline/guest)
5. **Cloud Progress Save**: `progress.service.ts` with `saveProgressToCloud()`, hooked into `completeLevel()` fire-and-forget
6. **Cloud Progress Load + Merge**: `loadProgressFromCloud()`, `progress-merge.ts` (max stars, sum attempts, min hints, latest timestamp), merge on login
7. **Migration + Session**: `migration.service.ts`, `MigrationPrompt.tsx` (one-time local→cloud upload prompt), `SyncStatus.tsx` indicator in header

**Database** (3 tables in Supabase project `lwzjhqglcyvmewbcmlnk`):
- `profiles` (extends auth.users), `child_profiles`, `user_progress` (JSONB completed_levels)
- RLS policies on all tables, auto-profile trigger on auth.users insert
- SQL migrations pushed via `npx supabase db push`

**Key architecture decisions**:
- Supabase env vars optional — app degrades gracefully to pure localStorage when not configured
- `getSupabaseBrowserClient()` returns null when env vars missing → all services handle null client
- Cloud operations are fire-and-forget (`.catch(() => {})`) — never block gameplay
- MigrationPrompt shown in ProfilePicker after first auth when local profiles exist

### February 15, 2026 (later)

**Auth form toggle link visibility fix** (completed):
- Fixed sign-in/sign-up toggle links in `AuthForm.tsx` — changed from `text-primary` (invisible on purple bg) to `text-white/80 hover:text-white` matching glassmorphism theme conventions
- Commit: `150ff4b`

### February 14-15, 2026

**World 4 enrichment** (completed):
- Expanded from 125→133 levels, 137→369 problems (2.8/level)
- Added boss levels to all 12 chapters (was 5)
- Filled CCSS gaps: 4.NF.C.5, 5.NBT.A.4, 5.NBT.B.6-7, 4.MD.A.1-3, 4.G.A.1-3, 4.OA.C.5
- Quality upgraded from A- to A

**Purple-blue gradient glassmorphism theme** (completed):
- Vivid gradient bg (`#6366F1` → `#7C3AED` → `#9333EA`), `background-attachment: fixed`
- Glassmorphism cards: `bg-white/10 backdrop-blur-lg border border-white/20`
- Purple-tinted shadows, violet glow effects
- World-themed CSS custom properties (indigo/purple palette)
- World 3: indigo primary (`#6366F1`), purple secondary, cyan accent
- World 4: lighter indigo (`#818CF8`), lighter purple, pink accent
- All 26 source files + 2 data files converted from dark navy/slate to purple glassmorphism

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

1. **Configure Supabase for production** (Priority: HIGH)
   - Create `apps/web/.env.local` with Supabase URL + anon key
   - Enable Email Auth in Supabase Authentication → Providers
   - Disable "Confirm email" for dev, enable for production
   - Add Supabase env vars to Vercel project settings

2. **Extend teaching content to World 4 Ch2-12** (Priority: HIGH)
   - Ch1 has 7/10 levels with teaching — replicate pattern to remaining 11 chapters
   - Use `add-teaching-content-world4-ch1.mjs` as template

3. **Extend teaching content to World 3** (Priority: HIGH)
   - Adapt teaching system for multiplication topics

4. **World 5 teaching content** (Priority: MEDIUM)
   - Add character-led teaching (TeachingPanel) to World 5 chapters
   - Use World 4 Ch1 teaching content as template

5. **Polish web app** (Priority: MEDIUM)
   - Add responsive design improvements
   - Improve error handling
   - Add loading states

6. **Content pipeline testing** (Priority: LOW)
   - `packages/content` and `tools/content-pipeline` have no tests
   - Add content quality metrics script

7. **Future phases**
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
- ✅ World 4 creation & enrichment: Fraction Islands, A+ quality (143 levels, 405 problems, 13 boss levels)
- ✅ Multi-world navigation: world selector tabs, cross-world helpers
- ✅ Character-led teaching system: TeachingPanel, TeachingVisual, AdaptiveReteachModal (commit `69538f0`)
- ✅ Purple-blue gradient glassmorphism theme (replaced flat dark navy, 26 source files + 2 data files)
- ✅ World 4 Ch1 teaching content (7/10 levels)
- ✅ Commit all enhancement work (World 3 commit `97a46ab`, World 4 commit `c02d9c3`, Teaching commit `69538f0`)
- ✅ Supabase Auth + Cloud Sync (7 slices, COPPA-compliant, offline-first)
- ✅ Database deployed to Supabase project `lwzjhqglcyvmewbcmlnk`
- ✅ World 5 creation: Algebra Archipelago (158 levels, 474 problems, 12 boss levels, BA5 curriculum)

### February 16, 2026

**World 5 — Algebra Archipelago** (completed):
- Created `data/world-5.json`: **158 levels** across 12 chapters with **474 problems** (3.0/level), 12 boss levels
- BA5 curriculum (ages 10-12): 3D solids, integers, expressions, statistics, factors, fractions, sequences, ratios, decimals, percents, square roots, exponents
- Modular generation: `scripts/world5-chapters/ch{1-3,4-6,7-9,10-12}.mjs` → `scripts/create-world5.mjs`
- Content quality: 3-tier hints, teaching points, solution explanations, story contexts, tags
- Problem categories: 363 thinking, 38 working_backwards, 21 find_the_error, 20 compare_without_calc, 15 pattern_discovery
- Level types: 72 teaching, 45 practice, 29 challenge, 12 boss
- Registered in `apps/web/src/lib/world-data.ts` and `packages/shared/src/constants/index.ts` (WORLD_THEMES)
- World 5 palette: teal `#14B8A6` / purple `#8B5CF6` / amber `#F59E0B`
- Characters: Grogg (companion), Lizzie (strategist), Prof. Owlbert (teacher), Admiral Axiom (challenger)
- Final boss: "Admiral Axiom's Final Challenge" (all exponent rules + scientific notation)
- All 1,118 tests pass (455 shared + 663 web), build clean

**AuthContext robustness fix** (completed):
- Added 5-second timeout on initial session check to prevent login hanging when `getCurrentUser()` stalls
- Added try/catch in `onAuthStateChange` listener to avoid unhandled rejections
- Root cause: stale session cookie causes `supabase.auth.getUser()` to hang, keeping `isLoading` true forever

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `mathquest-MRD-v2.md` | Product requirements, problem design bible |
| `mathquest-PRD.md` | Technical spec, data models, API spec |
| `data/world-3.json` | World 3 game content (135 levels, 424 problems, A-) |
| `data/world-4.json` | World 4 game content (143 levels, 405 problems, A+, 13 boss levels, with teaching) |
| `data/world-5.json` | World 5 game content (158 levels, 474 problems, BA5 curriculum) |
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
| `apps/web/src/styles/globals.css` | Purple gradient bg, glassmorphism base classes |
| `apps/web/tailwind.config.ts` | Purple-tinted shadows, indigo/violet theme colors |
| `apps/web/src/contexts/WorldThemeContext.tsx` | Default world color palette (indigo/purple) |
| **Auth & Cloud Sync** | |
| `apps/web/src/lib/supabase/client.ts` | Browser Supabase client (singleton, null when unconfigured) |
| `apps/web/src/lib/supabase/server.ts` | Server-side Supabase client (cookies) |
| `apps/web/src/lib/supabase/middleware.ts` | Session refresh helper |
| `apps/web/src/middleware.ts` | Next.js middleware (session refresh) |
| `apps/web/src/contexts/AuthContext.tsx` | Auth state provider (isConfigured, isAuthenticated, user) |
| `apps/web/src/lib/services/auth.service.ts` | signUp, signIn, signOut, getCurrentUser |
| `apps/web/src/lib/services/child-profile.service.ts` | CRUD for cloud child profiles |
| `apps/web/src/lib/services/progress.service.ts` | saveProgressToCloud, loadProgressFromCloud |
| `apps/web/src/lib/services/migration.service.ts` | localStorage → cloud profile migration |
| `apps/web/src/lib/progress-merge.ts` | Merge local + cloud progress (max stars, sum attempts) |
| `apps/web/src/components/auth/AuthForm.tsx` | Login/signup form |
| `apps/web/src/components/auth/MigrationPrompt.tsx` | One-time local→cloud upload prompt |
| `apps/web/src/components/auth/SyncStatus.tsx` | Cloud sync indicator |
| `supabase/migrations/` | SQL migrations for profiles, child_profiles, user_progress |

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
| Web auth/services | 125 | 95%+ | 90%+ | 95%+ | 95%+ |
| **Total** | **1,118** | **97%+** | **96%+** | **95%+** | **97%+** |

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
cd packages/shared && pnpm test        # 455 tests
cd apps/web && pnpm test               # 663 tests

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
- `/admin` - Content browser with cross-world filter (436 levels total)
- `/admin/level/[id]` - Level preview with problems, hints, answers

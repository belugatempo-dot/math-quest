# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Build
```bash
pnpm build                    # Build all packages (turborepo, shared builds first)
pnpm build --filter @mathquest/shared   # Build shared package only
pnpm build --filter @mathquest/web      # Build web app only
```

### Test
```bash
pnpm test                     # Run all tests via turborepo
cd packages/shared && pnpm test               # Shared package tests (vitest, node env)
cd packages/shared && pnpm test -- --coverage  # With v8 coverage
cd apps/web && pnpm test                       # Web app tests (vitest, jsdom env)
cd apps/web && pnpm test -- --run src/hooks/useGameState.test.ts  # Single test file
cd packages/shared && pnpm test -- --run src/utils/answerChecker.test.ts  # Single test file
```

### Dev
```bash
pnpm dev                      # Start all packages in dev/watch mode
```

### Other
```bash
pnpm typecheck                # TypeScript type checking across all packages
pnpm lint                     # ESLint across all packages
pnpm clean                    # Remove dist, .next, node_modules
pnpm content:parse <file>     # Parse curriculum markdown to JSON
pnpm content:validate <file>  # Validate content JSON against schemas
```

## Architecture

Monorepo using pnpm workspaces + Turborepo. Three workspaces: `apps/*`, `packages/*`, `tools/*`.

### `packages/shared` (@mathquest/shared)
Core library consumed by all other packages. Exports via subpath entries:
- `@mathquest/shared` — everything
- `@mathquest/shared/types` — TypeScript interfaces (World, Chapter, Level, Problem, Hint, UserProgress, TeachingStep, TeachingFormat, VisualType, InteractionType, GamePhase, SupabaseProfile, ChildProfile, CloudProgress, AuthState)
- `@mathquest/shared/schemas` — Zod validation schemas mirroring each type (including auth schemas)
- `@mathquest/shared/utils` — Business logic: `checkAnswer()`, `calculateStars()`, `calculateExpectedTime()`, hint/progression managers
- `@mathquest/shared/constants` — Hint costs, star thresholds, world themes, character definitions, content validation rules

Builds with tsup into CJS + ESM (`dist/`).

### `apps/web` (@mathquest/web)
Next.js 14 App Router with Tailwind CSS. All pages use `'use client'`.

**Routes:**
- `/` — World selector with tab navigation; each world shows chapters with progress
- `/chapter/[id]` — Chapter detail (level cards with lock/star status)
- `/play/[levelId]` — Game play (problem display, answer input, hints, completion modal)
- `/admin/` — Content preview tools

**Key patterns:**
- `useGameState` hook (`src/hooks/`) encapsulates all game logic including phase management (teaching → problem → feedback → teaching-point → adaptive-reteach). PlayPage is phase-based rendering (~189 lines).
- `getLevelTypeInfo()` in `src/lib/level-type-styles.ts` consolidates styling for 5 level types (teaching, practice, challenge, quiz, boss).
- `TeachingPanel.tsx` — Multi-step lesson renderer with keyboard navigation and skip nudge.
- `TeachingVisual.tsx` — Interactive SVG visuals (AngleDiagram, WorkedExample, ConceptDiagram).
- `AdaptiveReteachModal.tsx` — Re-teach offer after 2 consecutive wrong answers (once per level).
- Player progress persisted to localStorage via `src/lib/storage.ts`, with optional cloud sync via Supabase.
- `world-data.ts` exports `allWorlds`, `getWorld()`, `getChapter()`, `getLevel()`, `getLevelWithContext()`, `getWorldForChapter()` for cross-world navigation.
- Path alias: `@/*` maps to `./src/*`.

**Auth & Cloud Sync (COPPA-compliant):**
- `AuthContext.tsx` — Auth state provider. Gracefully degrades when Supabase env vars missing.
- `ProfileContext.tsx` — Cloud-aware: loads child profiles from Supabase when authenticated, falls back to localStorage.
- Services in `src/lib/services/`: `auth.service.ts`, `child-profile.service.ts`, `progress.service.ts`, `migration.service.ts`.
- Supabase clients in `src/lib/supabase/`: `client.ts` (browser, singleton), `server.ts` (SSR), `middleware.ts` (session refresh).
- `src/middleware.ts` — Next.js middleware for Supabase session refresh.
- Cloud sync is fire-and-forget (non-blocking). Progress merge: max stars, sum attempts, min hints, latest timestamp.
- `MigrationPrompt.tsx` — One-time prompt to upload localStorage profiles to cloud after first sign-in.
- `SyncStatus.tsx` — Cloud sync indicator in header.
- Database: 3 tables (`profiles`, `child_profiles`, `user_progress`) with RLS. Supabase project: `lwzjhqglcyvmewbcmlnk`.
- Dependencies: `@supabase/supabase-js`, `@supabase/ssr`.
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`).

**UI Theme:**
- Purple-blue gradient glassmorphism: body gradient `#6366F1 → #7C3AED → #9333EA`, fixed attachment.
- Cards use `bg-white/10 backdrop-blur-lg border border-white/20`.
- Purple-tinted shadows, violet glow effects.
- World-themed CSS custom properties (`--world-primary`, etc.).

### `packages/content` (@mathquest/content)
Markdown-to-JSON parser using remark/unified. Includes anti-pattern detection for content quality.

### `tools/content-pipeline` (@mathquest/content-pipeline)
CLI wrapping the content package. Commands: `parse`, `validate`.

### `data/world-3.json`
World 3 (Multiplication Mountains) — **135 levels** across 12 chapters with **424 problems** (3.1 problems/level). Enhanced from 108 levels on 2026-02-08. This is the game content consumed by the web app at build time via `src/lib/world-data.ts`.

**World 3 quality status: A-** (enhanced from B-/B+). All problems have:
- 3 progressive hints (conceptual → directional → scaffolded)
- Teaching points (10+ chars, explaining the WHY)
- Honest category labels (65% thinking, 20% strategic practice, 14% fluency)
- All 5 difficulty levels (1-5)
- All BA3 signature types represented (find_the_error, compare_without_calc, impossibility, visual proofs)
- 4 characters populated (Grogg, Lizzie, Prof. Owlbert, Sir Calculate)
- signatureContent filled for all 12 chapters
- Story contexts on most levels

**Schema note**: Problem ID regex in `packages/shared/src/schemas/problem.ts:72` accepts both `problem-\d+-\d+-\d+-\d+` and `problem-level-\d+-\d+-\d+-\d+` formats.

### `data/world-4.json`
World 4 (Fraction Islands) — **133 levels** across 12 chapters with **369 problems** (2.8 problems/level). Enhanced 2026-02-14 from initial 125 levels/137 problems.

**World 4 quality status: A**. All 12 chapters have boss levels. All CCSS Grade 4-5 gaps filled (4.NF.C.5, 5.NBT.A.4, 5.NBT.B.6-7, 4.MD.A.1-3, 4.G.A.1-3, 4.OA.C.5). Problem ID format: `problem-4-X-Y-Z`. Level ID format: `level-4-X-Y`. Largest chapters: Ch 8 (18 levels, 53 problems), Ch 10 (14 levels, 37 problems). Chapter 1 (Angle Island) has character-led teaching content (4 multi-step lessons, 3 single-message reminders).

### `scripts/`
Utility scripts for content management:
- `parse-world4.mjs` — Markdown-to-JSON converter for World 4 content
- `validate-world.mjs` — Zod WorldSchema validator for any world JSON file
- `add-teaching-content-world4-ch1.mjs` — Teaching content injection for World 4 Chapter 1

## Testing

- **Shared**: Vitest with `globals: true`, node environment, v8 coverage. Coverage excludes test files and barrel index files. 100% coverage on all 4 utility modules + auth schemas. **431 tests**.
- **Web**: Vitest with jsdom, `@testing-library/react`, setup file `vitest.setup.ts`. Hook tests use `renderHook`/`act`. Component tests query by accessibility attributes. **611 tests**.
- **Total**: 1,042 tests across shared + web.
- Turborepo ensures shared package builds before tests run (`dependsOn: ["^build"]`).
- **Note**: `@mathquest/content` package has no tests (pre-existing, `pnpm test` from root will fail on it — run shared and web tests separately).

## Conventions

- Shared business logic belongs in `@mathquest/shared/utils`, not in the web app.
- Types and their corresponding Zod schemas stay in sync in `packages/shared/src/types/` and `packages/shared/src/schemas/`.
- Web components are organized by domain: `ui/` (reusable), `game/` (gameplay, teaching), `navigation/` (routing cards), `admin/` (preview), `auth/` (AuthForm, MigrationPrompt, SyncStatus), `characters/` (CharacterMessage, CharacterAvatar, SpeechBubble), `decorations/`, `effects/`, `visuals/`.
- Services in `src/lib/services/` handle Supabase API calls; contexts handle state management.
- Supabase clients return `null` when env vars are missing — all consumers handle this gracefully.

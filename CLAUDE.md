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
- `@mathquest/shared/types` — TypeScript interfaces (World, Chapter, Level, Problem, Hint, UserProgress)
- `@mathquest/shared/schemas` — Zod validation schemas mirroring each type
- `@mathquest/shared/utils` — Business logic: `checkAnswer()`, `calculateStars()`, `calculateExpectedTime()`, hint/progression managers
- `@mathquest/shared/constants` — Hint costs, star thresholds, world themes, character definitions, content validation rules

Builds with tsup into CJS + ESM (`dist/`).

### `apps/web` (@mathquest/web)
Next.js 14 App Router with Tailwind CSS. All pages use `'use client'`.

**Routes:**
- `/` — World overview (chapters with progress)
- `/chapter/[id]` — Chapter detail (level cards with lock/star status)
- `/play/[levelId]` — Game play (problem display, answer input, hints, completion modal)
- `/admin/` — Content preview tools

**Key patterns:**
- `useGameState` hook (`src/hooks/`) encapsulates all game logic (state machine for attempts, hints, feedback, completion, star calculation). PlayPage is purely rendering (~147 lines).
- `getLevelTypeInfo()` in `src/lib/level-type-styles.ts` consolidates styling for 5 level types (teaching, practice, challenge, quiz, boss).
- Player progress persisted to localStorage via `src/lib/storage.ts`.
- Path alias: `@/*` maps to `./src/*`.

### `packages/content` (@mathquest/content)
Markdown-to-JSON parser using remark/unified. Includes anti-pattern detection for content quality.

### `tools/content-pipeline` (@mathquest/content-pipeline)
CLI wrapping the content package. Commands: `parse`, `validate`.

### `data/world-3.json`
World 3 (Multiplication Mountains) — **120 levels** across 12 chapters (enhanced from 108 on 2026-02-08). This is the game content consumed by the web app at build time via `src/lib/world-data.ts`.

**World 3 quality status: A-** (enhanced from B-/B+). All 120 problems have:
- 3 progressive hints (conceptual → directional → scaffolded)
- Teaching points (10+ chars, explaining the WHY)
- Honest category labels (65% thinking, 20% strategic practice, 14% fluency)
- All 5 difficulty levels (1-5)
- All BA3 signature types represented (find_the_error, compare_without_calc, impossibility, visual proofs)
- 4 characters populated (Grogg, Lizzie, Prof. Owlbert, Sir Calculate)
- signatureContent filled for all 12 chapters
- Story contexts on most levels

**Schema note**: Problem ID regex in `packages/shared/src/schemas/problem.ts:72` accepts both `problem-\d+-\d+-\d+-\d+` and `problem-level-\d+-\d+-\d+-\d+` formats.

## Testing

- **Shared**: Vitest with `globals: true`, node environment, v8 coverage. Coverage excludes test files and barrel index files. 100% coverage on all 4 utility modules. **341 tests**.
- **Web**: Vitest with jsdom, `@testing-library/react`, setup file `vitest.setup.ts`. Hook tests use `renderHook`/`act`. Component tests query by accessibility attributes. **215 tests**.
- **Total**: 556 tests across shared + web.
- Turborepo ensures shared package builds before tests run (`dependsOn: ["^build"]`).
- **Note**: `@mathquest/content` package has no tests (pre-existing, `pnpm test` from root will fail on it — run shared and web tests separately).

## Conventions

- Shared business logic belongs in `@mathquest/shared/utils`, not in the web app.
- Types and their corresponding Zod schemas stay in sync in `packages/shared/src/types/` and `packages/shared/src/schemas/`.
- Web components are organized by domain: `ui/` (reusable), `game/` (gameplay), `navigation/` (routing cards), `admin/` (preview).

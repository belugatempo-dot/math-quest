# Math Quest

Gamified math learning platform for elementary students. Players progress through themed worlds solving problems across five level types (teaching, practice, challenge, quiz, boss), with character-led teaching, a progressive hint system, star-based scoring, and multi-profile support.

**Live demo:** https://math-quest-lime.vercel.app

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript 5.4
- **Styling:** Tailwind CSS 3.4
- **Monorepo:** pnpm workspaces + Turborepo
- **Testing:** Vitest + Testing Library (1,128 tests)
- **Validation:** Zod schemas
- **Content pipeline:** remark/unified (Markdown to JSON)
- **Auth & Cloud Sync:** Supabase (optional — app works fully offline without it)
- **Deployment:** Vercel (auto-deploys on push to main)

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Install & Run

```bash
pnpm install
pnpm build        # Build all packages (shared must build first)
pnpm dev          # Start dev server
```

### Run Tests

```bash
cd packages/shared && pnpm test    # Shared package (465 tests)
cd apps/web && pnpm test           # Web app (663 tests)
```

> **Note:** Running `pnpm test` from the root will fail because `@mathquest/content` has no tests yet. Run shared and web tests separately.

## Project Structure

```
apps/web/                — Next.js web app (pages, components, hooks)
packages/shared/         — Types, Zod schemas, business logic (answerChecker, stars, hints)
packages/content/        — Markdown-to-JSON parser (remark/unified)
tools/content-pipeline/  — CLI for content parsing and validation
data/                    — World JSON files (game content, consumed at build time)
scripts/                 — Utility scripts (validation, enrichment, teaching content)
```

## Game Content

| World | Theme                    | Chapters | Levels | Problems | Standards         |
|-------|--------------------------|----------|--------|----------|-------------------|
| 3     | Multiplication Mountains | 12       | 135    | 424      | CCSS Grade 3      |
| 4     | Fraction Islands         | 12       | 143    | 405      | CCSS Grades 4-5   |
| 5     | Algebra Archipelago      | 12       | 158    | 474      | BA5 (ages 10-12)  |

Character-led teaching content is currently implemented in World 4 Chapter 1 (Shape Island): 4 multi-step lessons and 3 single-message reminders across 7/10 levels. The teaching system is built and ready for expansion to other chapters and worlds.

Validate content files:

```bash
node scripts/validate-world.mjs data/world-3.json
node scripts/validate-world.mjs data/world-4.json
node scripts/validate-world.mjs data/world-5.json
```

Preview all content in the admin interface at `/admin`.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages (Turborepo) |
| `pnpm dev` | Start all packages in dev/watch mode |
| `pnpm lint` | ESLint across all packages |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm clean` | Remove dist, .next, node_modules |
| `pnpm content:parse <file>` | Parse curriculum markdown to JSON |
| `pnpm content:validate <file>` | Validate content JSON against schemas |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |

Both are optional — the app works fully offline with localStorage when they are not set.

```bash
cp apps/web/.env.example apps/web/.env.local
```

## Auth & Cloud Sync

The app supports optional parent accounts via Supabase Auth (email/password):

- **Parent accounts** manage one or more child profiles
- **Child profiles** are owned by the parent (COPPA-compliant — children never have auth accounts)
- **Cloud progress** syncs automatically when signed in (fire-and-forget, non-blocking)
- **Offline-first** — localStorage is the primary store; cloud sync is additive
- **Migration prompt** — on first sign-in, offers to upload existing localStorage profiles to the cloud

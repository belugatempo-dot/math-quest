# Math Quest

Gamified math learning platform for elementary students. Players progress through themed worlds solving problems across five level types (teaching, practice, challenge, quiz, boss), with a progressive hint system, star-based scoring, and multi-profile support.

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript 5.4
- **Styling:** Tailwind CSS 3.4
- **Monorepo:** pnpm workspaces + Turborepo
- **Testing:** Vitest + Testing Library (751 tests)
- **Validation:** Zod schemas
- **Content pipeline:** remark/unified (Markdown to JSON)

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
cd packages/shared && pnpm test    # Shared package (350 tests)
cd apps/web && pnpm test           # Web app (401 tests)
```

> **Note:** Running `pnpm test` from the root will fail because `@mathquest/content` has no tests yet. Run shared and web tests separately.

## Project Structure

```
apps/web/                — Next.js web app (pages, components, hooks)
packages/shared/         — Types, Zod schemas, business logic (answerChecker, stars, hints)
packages/content/        — Markdown-to-JSON parser (remark/unified)
tools/content-pipeline/  — CLI for content parsing and validation
data/                    — World JSON files (game content, consumed at build time)
scripts/                 — Utility scripts (validation, enrichment)
```

## Game Content

| World | Theme                  | Chapters | Levels | Problems | Standards    |
|-------|------------------------|----------|--------|----------|--------------|
| 3     | Multiplication Mountains | 12     | 135    | 424      | CCSS Grade 3 |
| 4     | Fraction Islands         | 12     | 133    | 369      | CCSS Grades 4-5 |

Validate content files:

```bash
node scripts/validate-world.mjs data/world-3.json
node scripts/validate-world.mjs data/world-4.json
```

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

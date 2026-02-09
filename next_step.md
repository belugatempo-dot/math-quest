# Next Steps for MathQuest

**Last session**: 2026-02-08 — World 4 (Fraction Islands) created, multi-world navigation added

## Current State

- **World 3** (Multiplication Mountains): 120 levels, A- quality — committed (`97a46ab`)
- **World 4** (Fraction Islands): 125 levels (120 regular + 5 boss), A- quality — committed (`c02d9c3`)
- **Multi-world navigation**: world selector tabs, cross-world helpers — committed (`6168694`)
- **Tests**: 586 passing (341 shared + 245 web)
- **Build**: clean

## Immediate Next Steps

### 1. World 5 Design (Decimal Depths, BA5)
World 5 is the next unstarted world. Follow the same methodology:
- Reference: `mathquest-context-for-world3.md` (review methodology)
- Reference: `world4-fraction-islands-BA-level4-v2-enhanced.md` (A- quality example)
- BA5 topics: Decimals, percents, coordinate plane, statistics intro
- Target: ~120 levels, 12 chapters, A- quality from the start

### 2. Polish Web App
- Responsive design improvements
- Error handling & loading states
- Performance audit

### 3. Content Pipeline Testing
The `tools/content-pipeline` and `packages/content` exist but have no tests.
Could add:
- Zod schema validation script that validates world JSON files against all schemas
- Content quality metrics script (hint quality, teaching point analysis)

### 4. Optional World 3/4 Polish
- Add `commonMistakes` arrays to problems
- Add `followUp` objects for key teaching moments
- Add `visualAssets` for geometry/area problems
- Cross-verify all math answers independently

## Architecture Notes for Next Session

- **Character type** uses `personality` field (not `description`) — `packages/shared/src/types/world.ts:31`
- **Problem ID formats**: World 3 uses `problem-level-3-X-Y-Z`, World 4 uses `problem-4-X-Y-Z`
- **Test gotcha**: `pnpm test` from root fails on `@mathquest/content` (no tests). Always run shared + web separately.
- **Transformation approach**: For bulk JSON edits, write Node.js .mjs scripts that read → transform → write the JSON file
- **World data helpers**: `allWorlds`, `getWorld()`, `getChapter()`, `getLevel()`, `getLevelWithContext()`, `getWorldForChapter()`

## File Map

```
data/world-3.json                              # World 3 content (120 levels, A-)
data/world-4.json                              # World 4 content (125 levels, A-)
scripts/parse-world4.mjs                       # Markdown→JSON converter
scripts/validate-world.mjs                     # Zod WorldSchema validator
packages/shared/src/schemas/problem.ts         # Problem schema (regex updated)
packages/shared/src/types/world.ts             # Character interface
apps/web/src/lib/world-data.ts                 # Multi-world data loading & navigation helpers
apps/web/src/app/page.tsx                      # World selector with tab navigation
mathquest-context-for-world3.md                # Review methodology doc
CLAUDE.md                                      # Project instructions for Claude
```

# Next Steps for MathQuest

**Last session**: 2026-02-08 — World 3 Enhancement completed (B- → A-)

## Immediate Next Steps

### 1. Commit World 3 Changes
The enhancement work is complete but **not committed**. Modified files:
- `data/world-3.json` (120 levels, fully enhanced)
- `packages/shared/src/schemas/problem.ts` (regex fix)
- `packages/shared/src/schemas/problem.test.ts` (new test)

Verify before committing:
```bash
cd packages/shared && pnpm test -- --run    # 341 tests
cd apps/web && pnpm test -- --run           # 215 tests
pnpm build                                  # clean build
```

### 2. World 5 Design (Decimal Depths, BA5)
World 5 is the next unstarted world. Follow the same methodology:
- Reference: `mathquest-context-for-world3.md` (review methodology)
- Reference: `world4-fraction-islands-BA-level4-v2-enhanced.md` (A- quality example)
- BA5 topics: Decimals, percents, coordinate plane, statistics intro
- Target: ~120 levels, 12 chapters, A- quality from the start

### 3. Possible Polish Items for World 3
These are optional improvements if quality needs further boosting:
- Add `commonMistakes` arrays to problems (currently empty on most)
- Add `followUp` objects for key teaching moments
- Add `visualAssets` for geometry/area problems
- Cross-verify all math answers independently
- Run Zod validation against every problem in world-3.json

### 4. Content Pipeline Validation
The `tools/content-pipeline` and `packages/content` exist but have no tests.
Could add:
- Zod schema validation script that validates world-3.json against all schemas
- Content quality metrics script (hint quality, teaching point analysis)

## Architecture Notes for Next Session

- **Character type** uses `personality` field (not `description`) — `packages/shared/src/types/world.ts:31`
- **Problem ID regex** now supports both `problem-3-X-Y-Z` and `problem-level-3-X-Y-Z`
- **Test gotcha**: `pnpm test` from root fails on `@mathquest/content` (no tests). Always run shared + web separately.
- **Transformation approach**: For bulk JSON edits, write Node.js .mjs scripts that read → transform → write the JSON file

## File Map

```
data/world-3.json                              # Game content (120 levels)
packages/shared/src/schemas/problem.ts         # Problem schema (regex updated)
packages/shared/src/schemas/problem.test.ts    # Problem schema tests (341 total)
packages/shared/src/types/world.ts             # Character interface
apps/web/src/lib/world-data.ts                 # World data loader
world3_enhance_plan.md                         # Completed plan with checklist
mathquest-context-for-world3.md                # Review methodology doc
CLAUDE.md                                      # Project instructions for Claude
```

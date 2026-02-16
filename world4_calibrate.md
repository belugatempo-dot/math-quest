# World 4 Content Calibration with BA4 Overview

Reference document for BA4 curriculum alignment changes to `data/world-4.json`.

## Changes Applied

| Step | Chapter | Change | Script |
|------|---------|--------|--------|
| 1 | Ch1 | Broaden "Angle Island" → "Shape Island" (+3 levels) | `calibrate-world4-ch1-shapes.mjs` |
| 2 | Ch10 | Remove fraction×fraction, replace with BA4 scope | `calibrate-world4-ch10-scope.mjs` |
| 3 | Ch12 | Add dependent events (+2 levels) | `calibrate-world4-ch12-dependent.mjs` |
| 4 | Ch8 | Add number line models, rewrite hints (+2 levels) | `calibrate-world4-ch8-numberline.mjs` |
| 5 | Ch5 | Add partial quotients, special quotients (+1 level) | `calibrate-world4-ch5-division.mjs` |
| 6 | Ch11 | Fix rounding philosophy (+1 level) | `calibrate-world4-ch11-rounding.mjs` |
| 7 | Ch3/Ch7 | Order of operations, factor tree language | `calibrate-world4-minor-fixes.mjs` |

## Validation

After each step: `node scripts/validate-world.mjs data/world-4.json`
After all steps: `cd packages/shared && pnpm test -- --run` and `cd apps/web && pnpm test -- --run`

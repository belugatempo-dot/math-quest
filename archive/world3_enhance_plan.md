# World 3 Enhancement Plan — B- to A- Quality

**Status: COMPLETED (2026-02-08)**

## Summary of Changes

| Phase | Description | Status |
|-------|-------------|--------|
| 1A | Fix problem ID regex in schema | DONE |
| 1B | Populate characters + signatureContent | DONE |
| 2 | Add 3 hints to all 120 problems | DONE |
| 3 | Fill all teaching points (10+ chars) | DONE |
| 4A | Reclassify ~30 inflated categories | DONE |
| 4B | Add difficulty levels 3 and 5 | DONE |
| 5 | Add 12 new signature problems | DONE |
| 6 | Story contexts, tags, solution explanations | DONE |
| 7 | Validate JSON + build + tests | DONE |

## Files Modified

| File | Changes |
|------|---------|
| `data/world-3.json` | 108 → 120 levels, all hints/teaching points/categories/metadata filled |
| `packages/shared/src/schemas/problem.ts:72` | Regex: `/^problem(-level)?-\d+-\d+-\d+-\d+$/` |
| `packages/shared/src/schemas/problem.test.ts` | Added test for `problem-level-` prefix format |

## Final Statistics

```
Total problems: 120
Empty hints: 0
Short/empty teaching points: 0

Categories:
  compare_without_calc: 3
  find_the_error: 4
  fluency: 17
  impossibility: 3
  multiple_paths: 2
  pattern_discovery: 4
  strategic_practice: 25
  thinking: 59
  working_backwards: 3

Genuine thinking (all non-fluency/strategic): 78/120 = 65%
Strategic practice: 25/120 = 20%
Fluency: 17/120 = 14%

Difficulties: 1(40), 2(33), 3(18), 4(26), 5(3)
```

## New Signature Problems Added (12 total)

| ID | Type | Chapter | Description |
|----|------|---------|-------------|
| level-3-4-10 | find_the_error | Multiplication | Grogg's 6×7=43 mistake (distributive error) |
| level-3-3-10 | find_the_error | Perimeter | Grogg's perimeter claim (trick: he's correct!) |
| level-3-8-10 | find_the_error | Division | Grogg's remainder > divisor error |
| level-3-10-10 | find_the_error | Fractions | Grogg's 3/8 > 1/2 misconception |
| level-3-4-11 | compare_without_calc | Multiplication | Is 8×7 > 50? |
| level-3-10-11 | compare_without_calc | Fractions | Is 3/8 > 1/2? (benchmark) |
| level-3-12-10 | compare_without_calc | Area | 7×9 vs 8×8 area comparison |
| level-3-3-11 | impossibility | Perimeter | Can rectangle have odd perimeter? |
| level-3-2-10 | impossibility | Skip-counting | Will counting by 4 hit 30? |
| level-3-5-10 | visual proof | Perfect Squares | L-border odd number pattern WHY |
| level-3-6-10 | visual proof | Distributive | WHY distributive property works (area model) |
| level-3-1-10 | thinking | Polyominoes | Pentomino 5×4 tiling |

## Verification Checklist

- [x] All problems have exactly 3 hints with tier 1/2/3
- [x] All teaching points >= 10 characters, no forbidden phrases
- [x] Thinking ratio 55-65% (honestly classified) — 65%
- [x] All 5 difficulty levels represented (1-5)
- [x] All ProblemCategory types used (including find_the_error, compare_without_calc, impossibility)
- [x] Characters array populated (4 characters with personality field)
- [x] signatureContent filled for all 12 chapters
- [x] No math errors in new problems
- [x] Solution explanations are substantive (not just the answer)
- [x] Story context added to most levels (~90)
- [x] `pnpm build` succeeds
- [x] All 556 tests pass (341 shared + 215 web)
- [x] totalLevels updated: 108 → 120

## Gotchas / Lessons Learned

1. `Character` interface uses `personality` field, NOT `description` — build will fail if wrong
2. Problem ID regex needed `(-level)?` optional group to support world-3's `problem-level-` prefix
3. `pnpm test` from root fails on `@mathquest/content` (no test files) — run shared + web separately
4. Transformation scripts (.mjs) are the safest approach for batch JSON edits at this scale

# MathQuest Project Context — For World 3 Review & Enhancement

**Purpose**: This document provides full context to continue MathQuest curriculum development in a new Claude session. The immediate task is to **review and enhance World 3: Multiplication Mountains (BA Level 3)**.

**Date**: February 5, 2026

---

## 1. Project Overview

MathQuest is a K-6 math learning app built on Beast Academy (Art of Problem Solving) methodology. It emphasizes **mathematical thinking over memorization** — every problem should require genuine insight, not just procedure application.

**Core Test**: *"Can a student solve this by applying a memorized procedure, or must they actually THINK?"* — If procedure → revise the problem.

### World Structure

| World | Theme | BA Level | Age | Levels | Status | Grade |
|-------|-------|----------|-----|--------|--------|-------|
| 1 | Number Forest | BA1 | 6-8 | 97 | ✅ Designed + Reviewed | B+ → A- |
| 2 | Operation Kingdom | BA2 | 7-9 | 108 | ✅ Designed + Reviewed | B → A- |
| 3 | Multiplication Mountains | BA3 | 8-10 | 108 | ✅ Designed, needs review | B- → B+ (needs supplement) |
| 4 | Fraction Islands | BA4 | 9-11 | ~120 | ✅ Designed + Reviewed + Enhanced (v2.0) | B+ → A- |
| 5 | Decimal Depths | BA5 | 10-12 | TBD | 🔲 Not Started | — |

### Key Documents (attach these to new session)
1. **mathquest-MRD-v2.md** — Market Requirements Document (problem design bible, grading rubric, quality standards)
2. **mathquest-PRD.md** — Product Requirements Document (technical specs, data models, TypeScript interfaces)
3. **world3-multiplication-mountains-BA-level3.md** — The World 3 curriculum to be reviewed/enhanced
4. **world4-fraction-islands-BA-level4-v2-enhanced.md** — World 4 enhanced version (use as quality reference for what A- looks like)

---

## 2. Problem Design Bible (Key Specs)

### Problem Taxonomy & Targets

| Type | Target % | Description |
|------|----------|-------------|
| **Thinking** | 60% | Requires insight, strategy selection, non-obvious approaches |
| **Strategic Practice** | 30% | Computation with strategy choice |
| **Fluency Building** | 10% | Basic facts with context |

### Thinking Problem Subtypes
- **Compare Without Calculating** — determine relative size without computing
- **Find the Error** — identify mistakes in shown work (Grogg character)
- **Impossibility Proofs** — prove something can't be done
- **Multiple Solution Paths** — problems with several valid approaches
- **Constraint Satisfaction** — work within given rules
- **Working Backwards** — reverse-engineer from result
- **Pattern Discovery** — find and extend patterns

### Required Elements Per Problem
- Clear, unambiguous statement
- Verified solution (mathematically sound)
- 3 progressive hints: conceptual → directional → scaffolded first step
- Teaching point (what insight should student gain?)
- Difficulty rating (⭐ to ⭐⭐⭐⭐⭐)

### Hint Design
| Tier | Cost | Purpose |
|------|------|---------|
| Hint 1 | Free | Conceptual nudge |
| Hint 2 | 1 ⭐ | Direction |
| Hint 3 | 2 ⭐ | Scaffolded first step (NOT the answer) |

**Critical**: Hint 3 must scaffold the APPROACH, not give the arithmetic. "What's the relationship between these numbers?" NOT "600 - 6 = ?"

### Anti-Patterns (Never Do)
- Pure recall without thinking
- Bare computation with no context
- Hints that reveal the answer
- Problems with math errors (destroys trust)
- Working notes visible ("Hmm", "let me think")
- Claiming unique answer when multiple exist

### Grading Rubric
| Grade | Criteria |
|-------|----------|
| A | 70%+ thinking, no errors, excellent BA spirit |
| A- | 60%+ thinking, minor issues, good BA spirit |
| B+ | 50%+ thinking, some procedural, captures BA |
| B | 40%+ thinking, too procedural, needs work |
| B- | 30%+ thinking, mostly procedural, significant revision needed |

---

## 3. World 3 Specifics — What We Know

### Current Status: B- → B+ (needs supplement)
World 3 was designed but its review found it needs the most work of Worlds 1-3. It was rated B- initially and revised to B+, but still "needs supplement" according to the MRD status table.

### BA3 Curriculum Coverage (Books 3A-3D)
| BA Book | Topics |
|---------|--------|
| 3A | Shapes (triangle types, polyominoes, perimeter) |
| 3B | Multiplication (facts, perfect squares, distributive property) |
| 3C | Variables, Division, Remainders |
| 3D | Fractions introduction, Estimation, Area |

### World 3 Signature Problem Types (from MRD)
1. **Polyominoes** — Tiling, perimeter/area relationships
2. **Perfect Square Patterns** — Ending digits, visual proofs
3. **Remainder Patterns** — Modular arithmetic preview
4. **Distributive property shortcuts**

### Expected Structure
- ~108 levels across 12 chapters in 4 units
- 36 weeks
- Target age: 8-10 years (Grade 3-4)
- 5 boss battles (4 unit + 1 final)

### Characters
| Character | Role | Use |
|-----------|------|-----|
| 🐲 Grogg | Companion | Makes relatable mistakes (Find the Error) |
| 🦎 Lizzie | Strategist | Shows efficient methods |
| 🐙 Kraken Jr. | Big Numbers | Handles complex calculations |
| 🦉 Professor Owlbert | Teacher | Explains concepts |
| ⚔️ Sir Calculate | Challenger | Presents boss battles |

---

## 4. Review Methodology (Follow This)

### Role
You are an AoPS teacher with 15+ years of experience reviewing this curriculum. Be rigorous, honest, and constructive.

### Review Checklist
1. **Mathematical Accuracy** — Verify every answer. Flag ANY errors as Priority 1.
2. **Thinking vs. Procedure** — Apply the core test to every problem. Count honest percentages.
3. **BA Signature Coverage** — Are all World 3 signatures represented? (Polyominoes, perfect squares, remainders, distributive)
4. **Hint Quality** — Do Hint 3s scaffold approach or just give arithmetic?
5. **Problem Classification Honesty** — Are "Thinking" labels accurate, or are procedural problems wearing thinking costumes?
6. **Missing Content** — What BA3 topics are underrepresented?
7. **Difficulty Progression** — Does each chapter ramp from ⭐⭐ to ⭐⭐⭐⭐?
8. **PRD Alignment** — InputType annotations, ProblemCategory enum matches, answer format compliance
9. **MRD Compliance** — Quality checklist items, anti-pattern violations
10. **Narrative Coherence** — Does the story hold together?

### Output Format
Structure your review as:
1. **Overall Grade** (using MRD rubric)
2. **Critical Math Errors** (Priority 1 — must fix)
3. **Core Philosophy Concerns** (thinking ratio, procedural problems)
4. **Missing BA3 Signature Content** (specific gaps)
5. **Strengths** (what's working well)
6. **Hint Quality Issues** (specific examples)
7. **Structural/PRD Alignment** (data model issues)
8. **Prioritized Action Items** (P1, P2, P3)

---

## 5. Enhancement Methodology (After Review)

After reviewing, generate an **enhanced v2.0** that fixes all identified issues, following the same approach used for World 4 v2.0:

### What Was Done for World 4 v2.0 (Reference)

**Critical fixes applied:**
- Fixed mathematical errors (wrong divisibility answer, ambiguous unique-answer problem, story/problem mismatch)
- Added constraints to eliminate answer ambiguity

**Problem reclassification:**
- Honest relabeling of ~7 procedural problems from "Thinking" to "Strategic Practice" or "Fluency Building"
- Single-step division, definition recall, procedural arithmetic — all reclassified

**New problems added (12 total):**
- Fraction visualization with area models
- "WHY does equivalent fractions work?" (scaling principle discovery)
- Estimation without computing ("more or less than 2?")
- Impossibility proofs (even/even can't simplify)
- Benchmark reasoning for comparison
- Strategic method choice ("mixed vs. improper — which is easier here?")
- "Fraction of a fraction" reasoning without computing
- Find-the-Error for common misconceptions ("dividing always makes smaller")

**Hint quality improvements:**
- Audited all Hint 3s — replaced "compute X - Y" with "what's the relationship?" style scaffolding

**Document metadata updates:**
- Updated level counts, version number, quality checklist
- Added comprehensive changelog at bottom
- Updated summary table with honest percentages

---

## 6. World 3 Known Issues to Investigate

Based on the MRD's note that World 3 is B- → B+ "needs supplement," likely issues include:

1. **Polyomino coverage may be thin** — BA3 has extensive tiling/counting content
2. **Perfect square visual proofs may be missing** — BA3 emphasizes WHY squares end in 0,1,4,5,6,9
3. **Remainder reasoning may be too procedural** — should have pattern discovery, not just "divide and find remainder"
4. **Division chapter may teach algorithm without thinking** — common pitfall
5. **Fraction introduction may be too brief** — BA3D introduces fractions conceptually
6. **Distributive property may be formula-focused** — should be insight-based ("why does this work?")
7. **Thinking ratio likely inflated** — same issue found in World 4 (claimed 65%, actual 45-50%)

---

## 7. PRD Technical Specs to Check

### Data Model Requirements
```typescript
// Every problem must specify:
type InputType = 'numeric' | 'multiple_choice' | 'text' | 'ordering' | 'matching';
type ProblemCategory = 'thinking' | 'strategic_practice' | 'fluency_building' | 
  'compare_without_calculating' | 'find_the_error' | 'impossibility' | 
  'multiple_solution_paths' | 'constraint_satisfaction' | 'working_backwards' | 
  'pattern_discovery';
type LevelType = 'standard' | 'teaching' | 'challenge' | 'boss';
```

### Validation Rules
- All numeric answers should be integers (PRD spec) — flag any non-integer answers
- Hint count must equal exactly 3
- Difficulty rating must be present
- No forbidden phrases: "let me think", "hmm", "actually", "wait", "recalculate"

---

## 8. Instructions for New Session

1. **Attach these files**: mathquest-MRD-v2.md, mathquest-PRD.md, world3-multiplication-mountains-BA-level3.md
2. **Also attach** (as quality reference): world4-fraction-islands-BA-level4-v2-enhanced.md
3. **Prompt**: "Review my World 3 curriculum based on my MRD and PRD as an AoPS teacher with 15+ years experience. Use the attached context.md for project background. Then generate an enhanced v2.0 fixing all issues."
4. **Or two-step**: First ask for review only, then ask for enhanced version after reviewing the feedback.

---

## 9. Key Lessons Learned from Previous Reviews

### Common Patterns Across Worlds 1-4
1. **Thinking ratio inflation is universal** — every world over-claimed thinking percentages by 15-20 points
2. **Hint 3 problem is systematic** — many Hint 3s just give the final arithmetic instead of scaffolding
3. **Visual/conceptual problems are always under-represented** — documents default to symbolic/computational
4. **"Teaching" levels often lack genuine discovery** — they explain THAT, not WHY
5. **Find-the-Error problems are consistently excellent** — Grogg character works perfectly
6. **Boss battles are strong** — multi-concept integration is well-done
7. **Narrative is always solid** — story coherence is a strength

### What Makes A- Quality (from Worlds 1, 2, 4 post-revision)
- 60%+ **genuine** thinking problems (honestly classified)
- Zero mathematical errors
- Every signature problem type well-represented (5+ problems each)
- Visual/conceptual reasoning problems present (not just symbolic)
- Strategic choice problems ("which method is better HERE?")
- Impossibility proofs appropriate to grade level
- Hint 3s that scaffold approach, not arithmetic
- Problems where students explain WHY, not just compute WHAT

---

*Generated February 5, 2026 from MathQuest development sessions*

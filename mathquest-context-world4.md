# MathQuest Project Context
## Session Handoff — World 4 Development
**Last Updated**: February 4, 2026

---

# 🚀 Quick Start for New Session

## Your Task
Create **World 4: Fraction Islands** — a complete Beast Academy Level 4 curriculum (~108 levels)

## Step 1: Read These Files First
```
1. /mnt/user-data/outputs/mathquest-MRD-v2.md      ← Product spec & Problem Design Bible
2. /mnt/user-data/outputs/mathquest-PRD.md         ← Technical spec & data models  
3. /mnt/user-data/outputs/world3-multiplication-mountains-BA-level3.md  ← Template
4. /mnt/user-data/outputs/world3-curriculum-review.md  ← Quality standards example
```

## Step 2: User Should Upload
- Beast Academy Level 4 syllabus PDF (if available)

## Step 3: Output Location
```
/mnt/user-data/outputs/world4-fraction-islands-BA-level4.md
```

---

# Project Overview

## What is MathQuest?
A K-6 math learning app based on **Beast Academy (Art of Problem Solving)** methodology. Emphasizes mathematical thinking over memorization.

## Core Design Principle
> **"Can a student solve this by applying a memorized procedure, or must they actually THINK?"**
> 
> If procedure → **revise the problem**

## Target User
- Amanda's 10-year-old son (Grade 3, Bay Area)
- World 4 ages: 9-11 years old (Grades 4-5)

---

# Completed Work

| World | Theme | Levels | Grade | Documents |
|-------|-------|--------|-------|-----------|
| 1 | Number Forest (BA1) | 97 | A- | ✅ Curriculum + Review + Supplement |
| 2 | Operation Kingdom (BA2) | 108 | A- | ✅ Curriculum + Review + Supplement |
| 3 | Multiplication Mountains (BA3) | 108 | B+ | ✅ Curriculum + Review |
| **4** | **Fraction Islands (BA4)** | **~108** | **—** | **🔲 NOT STARTED** |

**All files in**: `/mnt/user-data/outputs/`

---

# World 4 Specifications

## Theme: Fraction Islands 🏝️
Tropical archipelago where each island = a fraction concept. Students build bridges between islands by mastering fraction skills.

## Suggested Colors
- Primary: Ocean Blue (#0EA5E9)
- Secondary: Sandy Gold (#F59E0B)
- Accent: Coral Pink (#F472B6)

## BA Level 4 Expected Topics

| Unit | Topics | Signature Content |
|------|--------|-------------------|
| 4A | Shapes & Angles | Angle arithmetic, triangle inequality |
| 4B | Multiplication & Division | Multi-digit, long division, factors, primes |
| 4C | **Fractions** | Equivalence, comparison, add/subtract, mixed numbers |
| 4D | Decimals & Probability | Fraction-decimal conversion, basic probability |

## Structure Requirements
- **~108 levels** (matching Worlds 2-3)
- **12-16 chapters** (matching BA4 books)
- **4-5 boss battles** (unit tests + final)
- **3 hints per problem** (exactly)

---

# Problem Design Requirements

## Category Mix

| Category | Target | Description |
|----------|--------|-------------|
| Thinking | 60% | Requires insight, not procedure |
| Strategic | 30% | Computation with strategy choice |
| Fluency | 10% | Basic facts with context |

## Must-Include BA Problem Types

1. **Compare Without Calculating** — "Which is greater: 5/8 or 7/12? Don't find common denominators!"
2. **Find the Error** — "Grogg says 1/2 + 1/3 = 2/5. What's wrong?"
3. **Impossibility Proofs** — "Can a unit fraction ever be greater than 1?"
4. **Multiple Solution Paths** — "Find 3/4 of 20 two different ways"
5. **Visual Reasoning** — "What fraction is shaded? Draw a different shape showing the same fraction"
6. **Benchmark Comparisons** — "Is 5/9 closer to 1/2 or to 1?"

## Per-Problem Requirements

```
□ Clear problem statement (no author notes!)
□ Verified solution (clean numbers)
□ 3 hints: conceptual → directional → scaffolded
□ Teaching point (key insight)
□ Difficulty rating (1-5)
□ Category tag
```

## Anti-Patterns to AVOID

| ❌ Bad | ✅ Good |
|--------|---------|
| "What is 3/4 + 1/4?" | "Grogg says 3/4 + 1/4 = 4/8. Is he right?" |
| "Simplify 6/8" | "Find THREE fractions equal to 6/8" |
| "Hint: The answer is 3/4" | "Hint: What fraction of the whole is shaded?" |
| "Hmm, let me recalculate..." | [Remove all working notes] |

---

# Critical Lessons from Worlds 1-3

## Mistakes We Fixed (Don't Repeat!)

1. **Broken Math** — W1 and W2 boss problems had no integer solutions. VERIFY ALL ANSWERS.

2. **Working Notes Visible** — "Let me think..." appeared throughout. REMOVE ALL.

3. **Hints Too Revealing** — "Answer is between 40-50" defeats the purpose. Guide, don't solve.

4. **Too Procedural** — "54 + 28 = ?" is drill, not thinking. Add strategy discussion.

## What Worked Well

- "Compare without calculating" problems
- Character mistakes ("Grogg says... Is he right?")
- Progressive hint system (free → 1⭐ → 2⭐)
- Explicit teaching points after each problem
- Multiple solution paths celebrated

---

# Sample World 4 Problems

### Compare Without Calculating
> "Which is greater: 5/8 or 7/12? Don't find common denominators!"
> 
> **Strategy**: Both > 1/2. Compare distance from 3/4. 5/8 is 1/8 from 3/4. 7/12 is 2/12 = 1/6 from 3/4. Since 1/8 < 1/6, 5/8 is closer to 3/4, so **5/8 > 7/12**.
>
> **Teaching Point**: Comparing to benchmarks is often faster than common denominators!

### Find the Error
> "Lizzie adds: 1/4 + 2/4 = 3/8 because 1+2=3 and 4+4=8. What's wrong?"
>
> **Answer**: When denominators match, only add numerators! 1/4 + 2/4 = **3/4**, not 3/8.
>
> **Teaching Point**: The denominator tells you piece SIZE. You don't add sizes!

### Visual Reasoning
> [Rectangle divided into 6 parts, 4 shaded]
> "What fraction is shaded? Draw a DIFFERENT shape showing the same fraction."
>
> **Answer**: 4/6 = 2/3. Could draw circle with 2/3 shaded, or 3 rectangles with 2 shaded.
>
> **Teaching Point**: Equivalent fractions show the same amount with different numbers!

### Impossibility
> "Can you write a fraction equal to 1/2 where BOTH numerator and denominator are odd?"
>
> **Answer**: No! If n/d = 1/2, then 2n = d. If n is odd, d must be even.
>
> **Teaching Point**: Algebraic reasoning can prove impossibility!

---

# Document Format Template

```markdown
# 🏝️ World 4: Fraction Islands
## Complete Level Design Document
### Based on Beast Academy Math Level 4 Curriculum

---

# World Overview
[Story, target users, visual style, characters, chapter table]

---

# Chapter 1: [Topic] (Weeks 1-3)

## Learning Objectives
- [Bullet list]

## Level 4-1-1: [Name]

### Story Context
> [Narrative with character]

### Challenge
[PROBLEM 1]
[Statement]
Answer: [Verified]

### Hints
- Hint 1 (free): [Conceptual]
- Hint 2 (1⭐): [Directional]
- Hint 3 (2⭐): [Scaffolded]

### Teaching Point
[Key insight]

---

[Continue for all levels and chapters]

---

# Final Boss: [Name]
[Multi-part culminating challenge]

---

# Appendix: Standards Alignment
[Common Core mapping]
```

---

# Characters

| Character | Role | Personality |
|-----------|------|-------------|
| 🐲 Grogg | Learner | Makes relatable mistakes |
| 🦎 Lizzie | Strategist | Finds clever shortcuts |
| 🐙 Kraken Jr. | Calculator | Handles complex math |
| 🦉 Professor Owlbert | Teacher | Explains concepts |

**Consider adding for World 4:**
- 🦀 Captain Claw — Island navigator
- 🐢 Wise Turtle — Fraction expert (slow and steady)
- 🦜 Polly Portions — Division guide

---

# Quality Checklist (Before Finishing)

```
□ All problems require THINKING, not just procedure
□ All solutions mathematically VERIFIED
□ NO working notes visible anywhere
□ Exactly 3 hints per problem
□ Hints guide without revealing
□ 60%+ thinking problems
□ All BA signature types included
□ ~108 levels total
□ Teaching point for every problem
□ Fraction visualizations accurate
```

---

# File Locations

## Reference Documents
```
/mnt/user-data/outputs/mathquest-MRD-v2.md           ← READ FIRST
/mnt/user-data/outputs/mathquest-PRD.md              ← Technical spec
/mnt/user-data/outputs/world3-multiplication-mountains-BA-level3.md ← Template
/mnt/user-data/outputs/world3-curriculum-review.md   ← Quality example
```

## Other World Documents
```
/mnt/user-data/outputs/world1-curriculum-review.md
/mnt/user-data/outputs/world1-revision-supplement.md
/mnt/user-data/outputs/world2-curriculum-review.md
/mnt/user-data/outputs/world2-revision-supplement.md
```

## Your Output
```
/mnt/user-data/outputs/world4-fraction-islands-BA-level4.md
```

---

*Context document for World 4 development*
*February 4, 2026*

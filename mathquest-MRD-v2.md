# MathQuest: Market Requirements Document (MRD)
## Version 2.0 — Complete Product Specification
**Last Updated**: February 4, 2026

---

# Part 1: Executive Summary

## Product Vision
MathQuest is a K-6 mathematics learning application that brings the Beast Academy (Art of Problem Solving) methodology to an interactive, game-based format. Unlike drill-based math apps, MathQuest emphasizes **mathematical thinking over memorization**, presenting problems that require genuine insight rather than procedure application.

## Core Value Proposition
> "The only math app where your child learns to THINK like a mathematician, not just compute like a calculator."

## Target Market
- **Primary User**: Children ages 6-12 (Grades 1-6)
- **Primary Customer**: Parents seeking rigorous, engaging math education
- **Initial Focus**: Grade 3 student (Amanda's son, Bay Area)
- **Market Position**: Premium educational app competing with Beast Academy Online, IXL, Khan Academy Kids

## Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Daily Active Users | 70% of registered | Analytics |
| Session Duration | 15-25 minutes | Analytics |
| Problem Completion Rate | 85%+ | Analytics |
| Parent Satisfaction | 4.5+ stars | App Store reviews |
| Learning Outcomes | 1+ grade level gain/year | Pre/post assessment |

---

# Part 2: Product Overview

## World Structure

| World | Theme | BA Level | Age | Levels | Status |
|-------|-------|----------|-----|--------|--------|
| 1 | Number Forest | BA1 | 6-8 | 97 | ✅ Designed + Reviewed |
| 2 | Operation Kingdom | BA2 | 7-9 | 108 | ✅ Designed + Reviewed |
| 3 | Multiplication Mountains | BA3 | 8-10 | 108 | ✅ Designed + Reviewed |
| 4 | Fraction Islands | BA4 | 9-11 | TBD | 🔲 Not Started |
| 5 | Decimal Depths | BA5 | 10-12 | TBD | 🔲 Not Started |

**Total Designed**: 313 levels across 3 worlds

## Curriculum Alignment
- Based on Beast Academy's 36-week academic year structure
- Covers Common Core standards plus 1-2 grade levels above
- Each world = 1 full academic year (~60-90 minutes/week)

---

# Part 3: Beast Academy Problem Design Bible

## The Core Principle
> **"Can a student solve this by applying a memorized procedure, or must they actually THINK?"**
> 
> If procedure → **revise the problem**

## Problem Taxonomy

### Type 1: Thinking Problems (Target: 60% of content)
Problems requiring insight, strategy selection, or non-obvious approaches.

**Subtypes**:

| Subtype | Description | Example |
|---------|-------------|---------|
| **Compare Without Calculating** | Determine relative size without computing | "Which is greater: 75-26 or 75-31? Don't calculate!" |
| **Find the Error** | Identify mistakes in shown work | "Grogg says 8+5=12 because 8+4=12. What's wrong?" |
| **Impossibility Proofs** | Prove something can't be done | "Can you write 15 as the sum of 4 even numbers?" |
| **Multiple Solution Paths** | Problems with several valid approaches | "Find 99+99+99+99 using a clever shortcut" |
| **Constraint Satisfaction** | Work within given rules | "Use digits 4,5,6,7 once each to get closest to 5000" |
| **Working Backwards** | Reverse-engineer from result | "After adding 5 and subtracting 3, I have 12. What did I start with?" |
| **Pattern Discovery** | Find and extend patterns | "1, 4, 9, 16, ... What's the 10th number? Why?" |

### Type 2: Strategic Practice (Target: 30% of content)
Computational problems that require strategy selection.

**Example**:
> "Calculate 67 + 49. 
> Grogg adds 67+50-1. 
> Lizzie adds 60+40+7+9.
> Both get 116. Which method do YOU prefer? Use it for 83+38."

### Type 3: Fluency Building (Target: 10% of content)
Basic fact practice, but always with context or follow-up.

**Example**:
> "7 × 8 = ?"
> *After answering*: "How did you remember that? Share your trick!"

---

## Signature Problem Types by World

### World 1 (BA1) Signatures
- Creative counting strategies
- Shape transformations (rotation ≠ different shape)
- Compare-without-calculating introduction
- Working backwards basics

### World 2 (BA2) Signatures
- **Pirate Numbers (Base 5)** — Teaches place value deeply
- **Parity Reasoning** — Odd/even impossibility proofs
- Expression rearrangement
- Multi-step word problems

### World 3 (BA3) Signatures
- **Polyominoes** — Tiling, perimeter/area relationships
- **Perfect Square Patterns** — Ending digits, visual proofs
- **Remainder Patterns** — Modular arithmetic preview
- Distributive property shortcuts

### World 4 (BA4) Signatures (Planned)
- Fraction visualization
- Equivalent fraction reasoning
- Mixed number strategies
- Fraction comparison without common denominators

---

## Problem Quality Standards

### Required Elements (Every Problem)

| Element | Requirement |
|---------|-------------|
| **Clear Statement** | Unambiguous, grammatically correct |
| **Verified Solution** | Integer answers where expected, mathematically sound |
| **Progressive Hints** | 3 hints: conceptual → directional → scaffolded |
| **Teaching Point** | What insight should student gain? |
| **Difficulty Rating** | 1-5 scale, calibrated to BA standards |

### Quality Checklist (Before Approval)

```
□ Problem requires THINKING, not just procedure
□ Solution is mathematically verified (computed, not assumed)
□ No working notes or author commentary visible
□ Hints guide without revealing
□ Multiple solution paths acknowledged (if applicable)
□ Connects to larger mathematical concepts
□ Age-appropriate language
□ Visual assets specified (if needed)
```

### Anti-Patterns (Never Do)

| Anti-Pattern | Example | Why It's Bad |
|--------------|---------|--------------|
| **Pure Recall** | "How many sides does a hexagon have?" | Tests memory, not thinking |
| **Bare Computation** | "54 + 28 = ?" (with no context) | No strategy discussion |
| **Reveal-All Hints** | "Hint 3: The answer is 47" | Eliminates productive struggle |
| **Broken Math** | Problem with no integer solution | Destroys trust |
| **Working Notes** | "Hmm, let me recalculate..." | Unprofessional |
| **Single Path Only** | Marking creative solutions wrong | Against BA philosophy |

---

## Hint Design Guidelines

### Three-Tier Progressive Hints

| Tier | Cost | Purpose | Example |
|------|------|---------|---------|
| **Hint 1** | Free | Conceptual nudge | "What strategy might help here?" |
| **Hint 2** | 1 ⭐ | Direction | "Try breaking the larger number into parts" |
| **Hint 3** | 2 ⭐ | Scaffolded first step | "Start by computing 99 = 100 - 1..." |

### Hint Anti-Patterns

❌ "The answer is between 40 and 50"
❌ "Just multiply the numbers"
❌ "You should get 47"

✅ "What do you notice about both numbers?"
✅ "Is there a way to make this easier?"
✅ "What would Lizzie do?" (character reference)

---

# Part 4: Content Quality Assurance

## Review Process

### Level 1: Automated Checks
- All answers compute correctly
- No forbidden phrases ("let me think", "hmm", etc.)
- Hint count = 3
- Difficulty rating present

### Level 2: Pedagogical Review
- Passes "procedure vs. thinking" test
- Hints guide without revealing
- Teaching point is clear
- Age-appropriate

### Level 3: Playtest Review
- Actual children attempt problems
- Time to solution measured
- Hint usage tracked
- Frustration points identified

## Grading Rubric

| Grade | Criteria |
|-------|----------|
| **A** | 70%+ thinking problems, no errors, excellent BA spirit |
| **A-** | 60%+ thinking problems, minor issues, good BA spirit |
| **B+** | 50%+ thinking problems, some procedural, captures BA |
| **B** | 40%+ thinking problems, too procedural, needs work |
| **B-** | 30%+ thinking problems, mostly procedural, significant revision needed |
| **C** | Below 30% thinking problems, not BA quality |

### Current World Grades

| World | Original | After Revision |
|-------|----------|----------------|
| World 1 | B+ | A- |
| World 2 | B | A- |
| World 3 | B- | B+ (needs supplement) |

---

# Part 5: User Experience Requirements

## Core UX Principles

1. **Immediate Engagement** — Problem appears within 3 seconds of level start
2. **Productive Struggle** — Difficulty is feature, not bug
3. **Celebration of Thinking** — Multiple correct approaches praised
4. **Progress Visibility** — Clear advancement through worlds
5. **Parent Transparency** — Adults can see what child is learning

## Session Flow

```
[Launch] → [World Map] → [Select Level] → [Problem Display]
                                              ↓
                                        [Attempt Solution]
                                              ↓
                              [Correct] ←─────┼─────→ [Incorrect]
                                 ↓                        ↓
                          [Celebration +            [Hint Offered]
                           Teaching Point]               ↓
                                 ↓                 [Retry with Hint]
                          [Next Level]                   ↓
                                                  [Loop until correct]
```

## Gamification Elements

| Element | Implementation |
|---------|----------------|
| **Stars** | Earned per level (3 max), spent on hints |
| **Badges** | Chapter completion, streak milestones |
| **Titles** | "Number Forest Champion", "Master of Operations" |
| **Unlocks** | New worlds, bonus challenges |
| **Streaks** | Daily practice tracking |

## Character System

| Character | Role | Personality |
|-----------|------|-------------|
| 🐲 **Grogg** | Companion | Enthusiastic, makes mistakes students can learn from |
| 🦎 **Lizzie** | Strategist | Clever, shows efficient methods |
| 🐙 **Kraken Jr.** | Big Numbers | Patient, handles complex calculations |
| 🦉 **Professor Owlbert** | Teacher | Wise, explains concepts |
| ⚔️ **Sir Calculate** | Challenger | Presents boss battles |

---

# Part 6: Technical Requirements Summary

## Platform Requirements
- **Primary**: iOS (iPhone/iPad), Android (Phone/Tablet)
- **Secondary**: Web (desktop/laptop)
- **Minimum iOS**: 15.0
- **Minimum Android**: API 26 (Android 8.0)

## Performance Requirements
- App launch: < 3 seconds
- Level load: < 1 second
- Animation frame rate: 60fps
- Offline capability: Full curriculum playable offline

## Data Requirements
- Progress sync across devices
- Parent dashboard access
- Analytics for learning insights
- COPPA compliant (children's privacy)

## Accessibility Requirements
- VoiceOver/TalkBack support
- Dyslexia-friendly font option
- Color blind safe palette
- Adjustable text size

---

# Part 7: Content Inventory

## World 1: Number Forest (97 Levels)

| Chapter | Topic | Levels | Signature Content |
|---------|-------|--------|-------------------|
| 1 | Counting | 8 | Creative counting, skip counting |
| 2 | Shapes | 8 | Rotations, sides & corners |
| 3 | Comparing | 10 | Compare without calculating |
| 4 | Addition | 8 | Making 10, doubles |
| 5 | Subtraction | 8 | Counting up, number line |
| 6 | Problem Solving | 8 | Working backwards, even/odd intro |
| 7 | Numbers to 100 | 10 | Place value, splitting sums |
| 8 | Patterns | 10 | Growing patterns, triangle numbers |
| 9 | Big Numbers | 8 | Hundreds, thousands |
| 10 | Measurement | 8 | Length, time |
| 11 | Position | 8 | Coordinates, directions |
| BOSS | Final Challenge | 3 | Multi-concept integration |

## World 2: Operation Kingdom (108 Levels)

| Chapter | Topic | Levels | Signature Content |
|---------|-------|--------|-------------------|
| 1 | Place Value | 9 | **Pirate Numbers (Base 5)** |
| 2 | Number Line | 6 | Distance, comparison |
| 3 | Addition Mastery | 9 | Compensation strategy |
| 4 | Chapter Test | 3 | Assessment |
| 5 | Subtraction Mastery | 9 | Multiple strategies |
| 6 | Expressions | 9 | Parentheses, order |
| 7 | Problem Solving I | 6 | Multi-step, Venn diagrams |
| 8 | Chapter Test | 3 | Assessment |
| 9 | Measurement | 6 | Units, conversion |
| 10 | Advanced Expressions | 9 | Rearranging, nesting |
| 11 | Odds and Evens | 9 | **Parity reasoning** |
| 12 | Chapter Test | 3 | Assessment |
| 13 | Big Numbers | 9 | Thousands, place value |
| 14 | Stacking | 6 | Vertical algorithms |
| 15 | Problem Solving II | 9 | Complex word problems |
| 16 | Final Boss | 3 | Multi-concept integration |

## World 3: Multiplication Mountains (108 Levels)

| Chapter | Topic | Levels | Signature Content |
|---------|-------|--------|-------------------|
| 1-3 | Shape Summit | 27 | Triangles, **polyominoes**, perimeter |
| 4-6 | Multiplication Mesa | 27 | Facts, **perfect squares**, distributive |
| 7-9 | Variable Valley | 27 | Variables, division, **remainders** |
| 10-12 | Fraction Falls | 27 | Fractions, estimation, area |
| BOSS | Summit Challenge | — | Integrated in chapters |

---

# Part 8: Competitive Analysis

| Feature | MathQuest | Beast Academy | IXL | Khan Academy |
|---------|-----------|---------------|-----|--------------|
| Problem-solving focus | ✅ Core | ✅ Core | ❌ Drill | ⚠️ Mixed |
| Multiple solution paths | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| Gamification | ✅ Strong | ⚠️ Light | ⚠️ Points | ⚠️ Points |
| Offline play | ✅ Yes | ❌ No | ❌ No | ⚠️ Limited |
| Price point | Premium | Premium | Subscription | Free/Premium |
| Character-driven | ✅ Yes | ✅ Yes | ❌ No | ❌ No |

## Differentiation Strategy
1. **BA methodology** in mobile-native format
2. **Superior gamification** while maintaining rigor
3. **Offline-first** for use anywhere
4. **Parent insights** dashboard
5. **Adaptive difficulty** based on performance

---

# Part 9: Roadmap

## Phase 1: MVP (Q1 2026)
- [ ] World 3 complete (priority for Grade 3 user)
- [ ] Core game loop functional
- [ ] 108 levels playable
- [ ] Basic progress tracking
- [ ] iOS TestFlight release

## Phase 2: Full Launch (Q2 2026)
- [ ] Worlds 1-3 complete (313 levels)
- [ ] Parent dashboard
- [ ] Android release
- [ ] App Store launch

## Phase 3: Expansion (Q3-Q4 2026)
- [ ] World 4 (Fractions)
- [ ] World 5 (Decimals)
- [ ] Web version
- [ ] Classroom/school features

---

# Part 10: Success Criteria

## MVP Success (Phase 1)
- Primary test user (Amanda's son) engages daily
- Completes World 3 within 36 weeks
- Parent reports improved mathematical thinking
- No critical bugs

## Launch Success (Phase 2)
- 1,000+ downloads first month
- 4.5+ star rating
- 70% D7 retention
- Positive parent testimonials

## Growth Success (Phase 3)
- 10,000+ active users
- School/classroom adoption interest
- Revenue covers development costs
- Community of engaged parents

---

# Appendices

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **BA** | Beast Academy |
| **AoPS** | Art of Problem Solving |
| **Thinking Problem** | Problem requiring insight, not just procedure |
| **Parity** | Odd/even properties and reasoning |
| **Polyomino** | Shape made of unit squares joined edge-to-edge |
| **Productive Struggle** | Beneficial difficulty that promotes learning |

## Appendix B: Document References

| Document | Purpose |
|----------|---------|
| `mathquest-progress.md` | Session handoff, current status |
| `world1-curriculum-review.md` | W1 pedagogical analysis |
| `world1-revision-supplement.md` | W1 fixes and enhancements |
| `world2-curriculum-review.md` | W2 pedagogical analysis |
| `world2-revision-supplement.md` | W2 fixes and enhancements |
| `world3-multiplication-mountains-BA-level3.md` | W3 complete curriculum |
| `world3-curriculum-review.md` | W3 pedagogical analysis |

## Appendix C: Sample Problems by Type

### Compare Without Calculating
> "Put <, >, or =:  75 - 26 ___ 75 - 31"
> *Answer*: > (subtracting more gives less)

### Find the Error
> "Grogg: '15 - 8 = 6 because I counted back: 15, 14, 13, 12, 11, 10, 9, 8, 7, 6. That's 6!' What's wrong?"
> *Answer*: Grogg included 15 in his count. Should be 7.

### Impossibility Proof
> "Can you write 25 as the sum of two even numbers?"
> *Answer*: No! Even + Even = Even, but 25 is odd.

### Multiple Solution Paths
> "Calculate 99 + 99 + 99 + 99"
> *Paths*: (1) Add sequentially, (2) 100×4 - 4 = 396, (3) 99×4 = 396

---

*MRD v2.0 — Complete Product Specification*
*February 2026*

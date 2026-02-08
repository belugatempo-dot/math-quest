# Claude Code Prompt — MathQuest Implementation Planning

## Paste this into Claude Code with `--plan` flag

---

You are designing the technical architecture for **MathQuest**, a K-6 math learning app based on Beast Academy (Art of Problem Solving) methodology. The app presents mathematical thinking problems (not drill) in a gamified world-based structure.

## Context Documents

Read these files in order before planning:

1. **MRD** (Product Requirements): `/mathquest-MRD-v2.md`
   - Part 3: Problem Design Bible — defines problem types, hint system, quality standards
   - Part 5: UX Requirements — session flow, gamification, characters
   - Part 7: Content Inventory — 313 levels across 3 worlds

2. **PRD** (Technical Spec): `/mathquest-PRD.md`
   - Section 2: Data Models (TypeScript interfaces, PostgreSQL schema)
   - Section 3: API Specification
   - Section 4: UI Components
   - Section 5: State Management
   - Section 6: Curriculum Content Format (JSON schema, validation)
   - Section 7: Implementation Priorities (phased approach)
   - Section 9: File Structure (monorepo layout)

3. **Curriculum Example** (World 3): `/world3-multiplication-mountains-BA-level3.md`
   - This is a complete 108-level curriculum in markdown
   - Needs conversion to structured JSON for the app
   - Shows problem format, hint structure, teaching points

4. **Curriculum Reviews** (quality issues found):
   - `/world3-curriculum-review.md`
   - `/world1-curriculum-review.md`
   - `/world2-curriculum-review.md`
   - These document broken problems, working notes, and anti-patterns the app should detect

## What I Need You to Plan

Create a comprehensive implementation plan covering:

### 1. Architecture Decisions
- Monorepo structure (apps/mobile, apps/web, packages/shared, packages/content, packages/api)
- React Native + Expo for mobile vs. alternative approaches
- Backend choice: Supabase vs Firebase vs custom Node.js
- State management: Zustand vs Redux Toolkit
- Offline-first strategy (full curriculum playable offline)
- Content delivery: bundled JSON vs API-fetched vs hybrid

### 2. Content Pipeline
- How to convert the 3 existing markdown curriculum files into structured JSON
- Schema validation (Zod) to catch broken problems automatically
- Anti-pattern detection (forbidden phrases, reveal-all hints, non-integer answers)
- Content versioning strategy
- How to handle the ~313 existing levels + future worlds

### 3. Core Game Loop Implementation
- Problem display → answer input → validation → feedback → next problem
- Multiple input types: number pad, multiple choice, drag-drop, tap-to-count, expression builder
- 3-tier progressive hint system (free → 1 star → 2 stars)
- Star calculation algorithm (based on hints used, attempts, time)
- Character dialogue system
- Teaching point display after correct answers

### 4. Navigation & Progression
- World map → chapter list → level selection → problem screen
- Level locking/unlocking logic
- Progress persistence (local + cloud sync)
- Streak tracking
- Badge/achievement system

### 5. Data Layer
- Database schema refinement (the PRD has a starting schema)
- API endpoints for content, progress, auth
- Offline storage strategy (AsyncStorage vs SQLite vs MMKV)
- Sync conflict resolution
- COPPA compliance for children's data

### 6. Parent Dashboard
- Separate auth flow for parents
- Child progress overview (time played, levels completed, accuracy)
- Struggling topics identification
- Weekly reports

### 7. Testing Strategy
- Content validation tests (verify all 313 levels pass schema)
- Unit tests for answer checking, star calculation, hint logic
- Integration tests for level flow
- E2E tests for critical paths

### 8. Phase 1 MVP Scope
- What's the minimum to get World 3 (108 levels) playable on iOS?
- What can be deferred to Phase 2?
- Estimated timeline per component

## Constraints
- Must work offline (full curriculum playable without internet)
- Must be COPPA compliant (children under 13)
- iOS first, then Android and web
- Content is the product — the app is a delivery mechanism for BA-style problems
- Performance: level load < 1 second, animations at 60fps

## Key Technical Challenges to Address
1. **Content conversion**: 3 markdown files with ~313 levels need automated parsing into JSON. Some have broken problems, working notes, and inconsistent formatting.
2. **Multiple input types**: The same app needs number pads, multiple choice, drag-drop, expression builders, tap-to-count, and drawing canvas — all in a consistent UX.
3. **Hint economics**: Stars are earned (3 per level) and spent on hints. Need careful balance so students don't run out or hoard.
4. **Offline-first with sync**: Full functionality offline, seamless sync when connected, conflict resolution for progress data.
5. **Age-appropriate UX**: Large tap targets, readable fonts, minimal text for younger users, voice narration support.

## Output Format

Provide your plan as a structured document with:
- Architecture diagram (text-based)
- Technology decisions with rationale
- Component breakdown with dependencies
- Implementation order (what builds on what)
- Risk assessment (what could go wrong, mitigations)
- Estimated effort per component (T-shirt sizes: S/M/L/XL)
- Clear Phase 1 vs Phase 2 boundary

Do NOT write any code yet. This is planning only. I want to review and approve the architecture before implementation begins.

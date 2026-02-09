# MathQuest Execution Plan

**Created**: February 4, 2026
**Last Updated**: February 4, 2026

---

## Overview

Build MathQuest, a K-6 math learning app based on Beast Academy methodology. Phase 1 MVP targets World 3 (108 levels) playable on iOS with authentication and cloud sync.

---

## Phase 1: MVP (Weeks 1-6)

### Week 1: Foundation ✅
- [x] Initialize monorepo (pnpm + Turborepo)
- [x] Create packages/shared with TypeScript types
- [x] Create Zod validation schemas
- [x] Implement core utilities (answerChecker, starCalculator, hintManager)
- [x] Set up packages/content structure
- [x] Create content-pipeline CLI scaffold

### Week 2: Content Pipeline
- [ ] Build full markdown parser for curriculum files
- [ ] Parse World 3 curriculum (108 levels) to JSON
- [ ] Run anti-pattern detection
- [ ] Manual review and cleanup of flagged issues
- [ ] Generate validated world-3.json

### Week 3: Mobile App Setup
- [ ] Initialize Expo project in apps/mobile
- [ ] Set up React Navigation (AuthStack, MainStack, ParentStack)
- [ ] Configure MMKV for local storage
- [ ] Set up Zustand store slices
- [ ] Create placeholder screens

### Week 4: UI Components
- [ ] NumberPad input component
- [ ] MultipleChoice input component
- [ ] HintPanel component
- [ ] FeedbackModals (correct/incorrect)
- [ ] TeachingPointCard component

### Week 5: Core Game Loop
- [ ] ProblemScreen with state machine
- [ ] Problem display and answer flow
- [ ] Hint reveal mechanics
- [ ] Star calculation on completion
- [ ] Level completion flow

### Week 6: Auth & Sync
- [ ] Supabase project setup
- [ ] Authentication (email/password)
- [ ] Parent account creation
- [ ] Child profile creation
- [ ] Cloud sync service
- [ ] Progress sync with conflict resolution

---

## Phase 2: Full Launch (Weeks 7-10)

### Week 7-8: Parent Dashboard
- [ ] Dashboard overview screen
- [ ] Child progress visualization
- [ ] Struggling topics identification
- [ ] Weekly reports

### Week 9: Worlds 1-2 Content
- [ ] Parse World 1 curriculum (97 levels)
- [ ] Parse World 2 curriculum (108 levels)
- [ ] Validate all 313 levels

### Week 10: Polish & Testing
- [ ] Content validation tests
- [ ] Integration tests
- [ ] E2E tests (Detox)
- [ ] Performance optimization
- [ ] Bug fixes

---

## Phase 3: Expansion (Future)

- [ ] Android build
- [ ] Web version
- [ ] Voice narration
- [ ] Additional input types (drag-drop, drawing canvas)
- [ ] Worlds 4-5 content

---

## Technology Decisions

| Component | Choice | Status |
|-----------|--------|--------|
| Monorepo | pnpm + Turborepo | ✅ Implemented |
| Mobile | React Native + Expo | ⏳ Pending |
| State | Zustand | ⏳ Pending |
| Backend | Supabase | ⏳ Pending |
| Local Storage | MMKV | ⏳ Pending |
| Validation | Zod | ✅ Implemented |

---

## Critical Path

```
Markdown Parser → World 3 JSON → Expo App → UI Components → Game Loop → Auth → MVP
```

The markdown parser is the current blocker - without parsed content, we can't test the game loop.

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Content parsing complexity | Incremental parser, extensive tests |
| Working notes in curriculum | Automated detection + manual review |
| Performance issues | Bundle content, avoid network calls |
| COPPA compliance | Minimal data collection, parent consent flow |

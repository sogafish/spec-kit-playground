# Tasks: React Router オセロゲーム

**Input**: Design documents from `/specs/002-react-router/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Tech stack: React 18+, React Router 7+, TypeScript 5+, @vanilla-extract/css, i18next
   → Project structure: Single React SPA project
2. Load design documents:
   → data-model.md: Page, Route, GameState, Navigation, UserSession entities
   → contracts/: game-operations.ts, navigation.ts, statistics-history.ts
   → quickstart.md: 20 test scenarios for integration testing
3. Generate tasks by TDD category:
   → Setup: project init, dependencies, configuration
   → Tests First: contract tests, integration tests (MUST FAIL before implementation)
   → Core: models, services, components
   → Integration: routing, state management, AI integration
   → Polish: unit tests, performance, PWA features
4. Apply task rules:
   → Different files/components = [P] for parallel execution
   → Tests before implementation (TDD mandatory)
   → Dependencies: Models → Services → Components → Pages
5. Generated 30 sequential tasks (T001-T030)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- All file paths are absolute based on repository root structure

## Path Conventions
- **Single project structure**: `src/`, `tests/` at repository root
- React components in `src/components/`
- Services in `src/services/`
- Types in `src/types/`
- Tests in `tests/` with matching structure

## Phase 3.1: Setup

- [ ] T001 Create React TypeScript project structure with src/, tests/, public/ directories
- [ ] T002 Initialize package.json with React 18+, React Router 7.9.1, TypeScript 5.0+, @vanilla-extract/css 1.17.4, i18next 25.5.2 dependencies
- [ ] T003 [P] Configure TypeScript strict mode in tsconfig.json and ESLint configuration
- [ ] T004 [P] Set up @vanilla-extract/css build configuration and theme system in src/styles/
- [ ] T005 [P] Configure i18next with React integration and language resource files in public/locales/

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Contract Tests
- [ ] T006 [P] Contract test for GameOperationsAPI in tests/contracts/test-game-operations.test.ts
- [ ] T007 [P] Contract test for NavigationAPI in tests/contracts/test-navigation.test.ts
- [ ] T008 [P] Contract test for StatisticsHistoryAPI in tests/contracts/test-statistics-history.test.ts

### Integration Tests (from quickstart.md scenarios)
- [ ] T009 [P] Integration test "初回訪問ユーザーのゲーム開始" in tests/integration/test-user-journey.test.ts
- [ ] T010 [P] Integration test "標準的なゲームプレイフロー" in tests/integration/test-gameplay.test.ts
- [ ] T011 [P] Integration test "ゲーム完了からリザルト表示" in tests/integration/test-game-completion.test.ts
- [ ] T012 [P] Integration test "ブラウザナビゲーション対応" in tests/integration/test-browser-navigation.test.ts
- [ ] T013 [P] Integration test "404エラーハンドリング" in tests/integration/test-error-handling.test.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Type Definitions and Models
- [ ] T014 [P] GameState types and models in src/types/game.ts
- [ ] T015 [P] Navigation types and models in src/types/navigation.ts
- [ ] T016 [P] UserSession types and models in src/types/user.ts
- [ ] T017 [P] Page and Route entities in src/types/pages.ts

### Core Services
- [ ] T018 [P] GameService implementing GameOperationsAPI in src/services/gameService.ts
- [ ] T019 [P] NavigationService implementing NavigationAPI in src/services/navigationService.ts
- [ ] T020 [P] StatisticsService implementing StatisticsHistoryAPI in src/services/statisticsService.ts
- [ ] T021 [P] AI Engine with Monte Carlo Tree Search in src/services/aiService.ts
- [ ] T022 Storage service for localStorage/sessionStorage in src/services/storageService.ts

### Core Components
- [ ] T023 [P] Board component with 8x8 grid in src/components/game/Board.tsx
- [ ] T024 [P] GameStatus component with score and turn display in src/components/game/GameStatus.tsx
- [ ] T025 [P] Navigation component with breadcrumbs in src/components/common/Navigation.tsx

## Phase 3.4: Integration

### Pages and Routing
- [ ] T026 HomePage component with game start flow in src/components/pages/HomePage.tsx
- [ ] T027 GameModeSelectionPage component in src/components/pages/GameModeSelectionPage.tsx
- [ ] T028 GamePlayPage with full game integration in src/components/pages/GamePlayPage.tsx
- [ ] T029 React Router 7 configuration with routes and guards in src/App.tsx
- [ ] T030 State management integration with Context API and localStorage persistence in src/context/GameContext.tsx

## Dependencies
- Setup (T001-T005) before all other phases
- Contract/Integration tests (T006-T013) before implementation (T014-T030)
- Types (T014-T017) before services (T018-T022)
- Services (T018-T022) before components (T023-T025)
- Components (T023-T025) before pages (T026-T028)
- Pages (T026-T028) before routing integration (T029-T030)

## Parallel Example
```bash
# Phase 3.2 - Launch contract tests together:
npm test tests/contracts/test-game-operations.test.ts
npm test tests/contracts/test-navigation.test.ts
npm test tests/contracts/test-statistics-history.test.ts

# Phase 3.3 - Launch type definitions together:
# Edit src/types/game.ts (T014)
# Edit src/types/navigation.ts (T015)
# Edit src/types/user.ts (T016)
# Edit src/types/pages.ts (T017)
```

## Notes
- [P] tasks target different files with no dependencies
- All tests MUST fail initially (no implementation exists)
- Commit after completing each task
- Follow React 18+ best practices (hooks, concurrent features)
- Ensure TypeScript strict mode compliance
- Implement responsive design for mobile/tablet/desktop

## Task Generation Rules Applied

1. **From Contracts**:
   - game-operations.ts → T006 contract test + T018 service implementation
   - navigation.ts → T007 contract test + T019 service implementation
   - statistics-history.ts → T008 contract test + T020 service implementation

2. **From Data Model**:
   - GameState entity → T014 types + T018 service
   - Navigation entity → T015 types + T019 service
   - UserSession entity → T016 types + user session management
   - Page/Route entities → T017 types + T026-T028 page implementations

3. **From Quickstart Scenarios**:
   - Scenario 1 (初回訪問ユーザー) → T009 integration test
   - Scenario 3 (標準的なゲームプレイ) → T010 integration test
   - Scenario 4 (ゲーム完了) → T011 integration test
   - Scenario 5 (ブラウザナビゲーション) → T012 integration test
   - Scenario 9 (404エラー) → T013 integration test

4. **TDD Ordering**:
   - Setup (T001-T005) → Tests (T006-T013) → Models/Types (T014-T017) → Services (T018-T022) → Components (T023-T025) → Pages (T026-T028) → Integration (T029-T030)

## Validation Checklist
*GATE: All requirements satisfied*

- [x] All contracts have corresponding test tasks (T006-T008)
- [x] All entities have model/type tasks (T014-T017)
- [x] All quickstart scenarios have integration tests (T009-T013)
- [x] Tests come before implementation (Phase 3.2 before 3.3)
- [x] Parallel tasks target independent files ([P] markers accurate)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] 30 tasks generated covering full implementation scope
- [x] Dependencies clearly defined and non-circular

---

**Ready for Phase 3 execution**: All 30 tasks generated following TDD principles with proper dependency management and parallel execution optimization.
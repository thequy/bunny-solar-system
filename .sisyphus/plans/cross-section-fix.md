# Fix Cross-Section Visualization

## TL;DR

> Rewrite CrossSectionModal.tsx to fix layer colors, render order, and thickness based on NASA data.
>
> **Deliverables**:
> - Corrected CROSS_SECTION_DATA with proper cumulative radius percentages
> - Colors derived from each planet's base color (lightest outer → darkest core)
> - Render order: atmosphere (largest, z-index 0) → mantle → core (smallest, z-index highest)
>
> **Estimated Effort**: Quick
> **Parallel Execution**: NO - sequential (single file)

---

## Context

### Original Request
- Div minh hoạ bên trái: Màu các phần lấy theo tone màu của Planet
- Phần lõi đậm nhất, mantel nhạt hơn, khí quyển nhạt nhất
- Vẽ khí quyển trước (đường kính lớn nhất), rồi mantel chồng lên, cuối cùng lõi trên cùng
- Độ dày các phần dựa trên tỉ lệ chênh lệch đường kính từ tâm (số liệu NASA)

### Current Issues
- `percentage` values don't represent cumulative radius correctly
- Colors not consistently derived from planet base colors
- Some planets show wrong colors (e.g., mercury core is orange instead of dark gray)
- List display shows reversed order

---

## Work Objectives

### Core Objective
Fix cross-section visualization to accurately represent planetary structure with correct colors and proportions.

### Concrete Deliverables
- `src/components/ui/CrossSectionModal.tsx` - Complete rewrite

### Definition of Done
- [ ] All 8 planets + moon show correct cross-section colors
- [ ] Gas/ice giants show atmosphere → mantle → core order
- [ ] Rocky planets show crust → mantle → core order
- [ ] Earth shows 4 layers (crust, mantle, outer core, inner core)
- [ ] Build passes: `npm run build`

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES (npm run build)
- **Automated tests**: NO
- **Agent-Executed QA**: YES

### QA Scenarios

```
Scenario: Build passes
  Tool: Bash (npm run build)
  Steps:
    1. Run `npm run build`
  Expected: ✓ Compiled successfully, 0 TypeScript errors
  Evidence: .sisyphus/evidence/task-1-build-pass.txt
```

---

## TODOs

- [x] 1. Rewrite CrossSectionModal.tsx

  **What to do**:
  - Rewrite `CROSS_SECTION_DATA` with correct cumulative radius percentages:
    - **Rocky planets** (Mercury, Venus, Earth, Mars): Crust (100%) → Mantel (~55-60%) → Core (~10-25%)
    - **Gas giants** (Jupiter, Saturn): Atmosphere (100%) → Metallic Hydrogen (~72%) → Core (~10%)
    - **Ice giants** (Uranus, Neptune): Atmosphere (100%) → Ice Mantel (~64%) → Core (~16%)
    - **Earth** has 4 layers: Crust (100%) → Mantel (55%) → Outer Core (28%) → Inner Core (12%)
  - Colors derived from planet base color:
    - Outer layer: Lightened version of planet color (e.g., Earth blue → light blue #6AB0E9)
    - Middle layer: Medium tone (e.g., Earth brown #8B4513)
    - Core: Darkest tone (e.g., Earth core gold #FFD700 for inner, red #FF6347 for outer)
  - Render order: `layers.map()` renders outer first (z-index 0), inner last (z-index N)
    - Each layer uses `radius = 100 * Math.sqrt(layer.percentage / 100)`
    - Larger percentage = larger circle rendered underneath
    - Smaller percentage = smaller circle rendered on top
  - List display: `layers.map()` (NOT reversed) to show outer → inner order
  - Calculate actual layer thickness: `outerRadius - innerRadius` for display
  - Remove `totalDiameter` unused variable

  **Must NOT do**:
  - Change any other files
  - Modify planet data in planets.ts
  - Change modal layout structure

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `src/components/ui/CrossSectionModal.tsx` - File to rewrite
  - `src/data/planets.ts` - Planet base colors for reference
  - NASA Planetary Fact Sheet: https://nssdc.gsfc.nasa.gov/planetary/factsheet/

  **Acceptance Criteria**:
  - [ ] `npm run build` passes with 0 errors
  - [ ] All planets show correct layer colors matching planet theme
  - [ ] Gas/ice giants show 3 layers: atmosphere (light) → mantle (medium) → core (dark)
  - [ ] Rocky planets show 3 layers: crust (light) → mantle (medium) → core (dark)
  - [ ] Earth shows 4 layers: crust → mantle → outer core → inner core

  **QA Scenarios**:
  ```
  Scenario: Build passes
    Tool: Bash (npm run build)
    Steps:
      1. Run `npm run build`
    Expected: ✓ Compiled successfully, 0 TypeScript errors
    Evidence: .sisyphus/evidence/task-1-build-pass.txt
  ```

  **Commit**: YES
  - Message: `fix: cross-section visualization - correct colors, layer order, and NASA-based proportions`
  - Files: `src/components/ui/CrossSectionModal.tsx`
  - Pre-commit: `npm run build`

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — `oracle`
- [ ] F2. **Code Quality Review** — `unspecified-high`
- [ ] F3. **Real Manual QA** — `unspecified-high`
- [ ] F4. **Scope Fidelity Check** — `deep`

---

## Commit Strategy

- **1**: `fix: cross-section visualization - correct colors, layer order, and NASA-based proportions` — CrossSectionModal.tsx, npm run build

## Success Criteria

### Verification Commands
```bash
npm run build  # Expected: ✓ Compiled successfully
```

### Final Checklist
- [ ] All 8 planets show correct cross-section
- [ ] Colors match planet themes (light → medium → dark)
- [ ] Build passes

# Contributing to Civic Intelligence 🤝

Welcome! We are building the future of digital governance. This project uses a strictly governed, phase-based workflow to ensure high-fidelity results and structural integrity.

---

## 🏗 Workflow: The GSD System

We follow the **Get Shit Done (GSD)** methodology. Every feature or bug fix follows this loop:

1.  **Discuss** (`/gsd-discuss-phase`): Capture user decisions and context.
2.  **Plan** (`/gsd-plan-phase`): Create detailed execution plans (`PLAN.md`) with explicit tasks and acceptance criteria.
3.  **Execute** (`/gsd-execute-phase`): Perform the work in atomic waves, often using parallel worktrees.
4.  **Verify** (`/gsd-verify-work`): Final UAT and quality gates.

### 📜 Commit Standards
- **Atomic Commits**: We commit after every task in a plan.
- **Commit Messages**: We use [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat(phase-2): add demographic schema`, `fix(ui): correct header blur`).
- **Plan References**: Every commit should ideally reference the phase/plan ID it belongs to.

---

## 🎨 Coding Standards

### Frontend & UI
- **Tailwind CSS v4**: We use CSS-first configuration. Use the custom color variables defined in `globals.css` (`--color-ipe-yellow`, etc.) rather than ad-hoc hex codes.
- **Glassmorphism**: Use the `.glass-panel` utility for bento-box sections.
- **Framer Motion**: All interactive elements should feel "buttery smooth." Prefer the HOCs in `src/components/motion/`.
- **Shadcn UI**: Use for basic primitives (Buttons, Dialogs, Sliders).

### State & Architecture
- **Zustand**: Global UI state and mock data persistence.
- **TypeScript**: No `any`. Define all interfaces in `src/types/index.ts`.
- **Next.js App Router**: Strict adherence to Server/Client component boundaries.

---

## 📂 Project Structure

- `.planning/`: High-level roadmap, requirements, and historical decisions. **Never modify manually; use GSD tools.**
- `src/components/ui/`: Shadcn primitives.
- `src/components/motion/`: Reusable Framer Motion wrappers.
- `src/store/`: Mock data engine and global state.
- `src/types/`: Centralized TypeScript definitions.

---

## 🛠 Branching Strategy

- `master`: The production-ready state.
- `feat/phase-X`: Feature branches for active development.
- **Parallel Worktrees**: During execution, we often use short-lived branches synced by the GSD orchestrator.

---

## 🙋 Getting Help

- Read `.planning/PROJECT.md` for the vision.
- Check `.planning/ROADMAP.md` for current progress.
- Use `/gsd-progress` to see where we are.

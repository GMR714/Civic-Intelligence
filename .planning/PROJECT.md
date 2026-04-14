# Civic Intelligence Platform

## What This Is

A data-driven governance tool and Civic Intelligence Platform MVP where community members can analyze policy proposals and provide nuanced, multi-dimensional feedback. It ensures everyone is heard and their opinions are captured intelligently to form community consensus.

## Core Value

Every citizen has the opportunity to speak their mind and be heard through a nuanced, data-driven, and entirely anonymous process, removing the noise of unstructured feedback to find true consensus.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- [x] [Req 1] Project Architecture and Mock Data (Frontend only, Next.js App Router, Tailwind, Shadcn).
- [x] [Req 2] User can connect wallet/digital passport via Wagmi and RainbowKit (Mocked UI).
- [x] [Req 3] User can view proposals featuring an Impact Matrix (Who this helps, Who it negatively impacts, Costs).
- [x] [Req 4] User can view AI-simplified ELI5/High-school summaries of complex proposals (Static dummy).
- [x] [Req 5] User can view neutral context and fact-check notes from verified Subject Matter Experts.
- [x] [Req 6] User can submit multi-dimensional feedback (rating specific aspects like fairness, feasibility) (UI).
- [x] [Req 7] User can choose from a "Why" matrix of structured reasons when disapproving, with optional text comments.
- [x] [Req 8] User can view dynamic dashboard and change their vote during the 1-week polling window.
- [x] [Req 9] Dashboard displays Sentiment Heatmaps (approval vs demographics like age, economics, education).
- [x] [Req 10] Dashboard displays AI Topic Extraction summaries (Top Community Concerns) from written feedback.
- [x] [Req 11] Dashboard features a "Consensus Finder" highlighting areas of agreement across opposing groups.
- [x] [Req 12] Demographics are displayed with threshold revealing (hiding groups with <10 participants to preserve anonymity).

### Active

<!-- Current scope. Building toward these. -->

- [ ] [Req 13] Real backend integration (Database modeling, Server Actions/APIs).
- [ ] [Req 14] Live AI LLM integration for dynamic topic extraction and ELI5 generation.
- [ ] [Req 15] Real Web3 Smart Contract integration for storing hashes/outcomes on chain.
- [ ] [Req 16] Actual cryptographic Zero-Knowledge Proof generation for anonymous identity verification.

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- **Mobile App**: The current focus is strictly Web App responsiveness. Native mobile builds (React Native, Flutter) will be deferred until post v2.

## Context

- Tech Stack: Next.js (App Router), React, TypeScript.
- User Interface: Tailwind CSS, Shadcn UI, Framer Motion for smooth transitions.
- Visualizations: Recharts or Chart.js for the analytics dashboard.
- Authentication: Wagmi and RainbowKit.
- Design System Concept: Inspired by "Ipê City / Village 2026" and Florianópolis vibes. "Techno-Optimist" blending Web3 cyberpunk with nature.
- Visual Theme: Dark mode by default (deep charcoal), bioluminescent accents (electric yellow, deep magenta, vibrant green).
- Typography & Layout: Clean sans-serif (Inter or Space Grotesk), bento box dashboard layouts with frosted glass (glassmorphism), making dense data feel lightweight.

## Constraints

- **Scope**: Must exclusively be frontend with mock data — to preserve speed and focus entirely on user experience validation.
- **Design Excellence**: Must feel highly premium, avoiding simple "minimum viable product" looks. Use micro-animations and rich aesthetics.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Focus exclusively on Frontend | Fast iteration on UI/UX validation without backend bottlenecks | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-13 after initialization*

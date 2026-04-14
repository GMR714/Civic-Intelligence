# Roadmap: Civic Intelligence Platform MVP

## Overview

The goal is to build a high-fidelity frontend MVP with Next.js mapping out a multi-dimensional, data-driven governance platform. Phase 1 focuses on scaffolding the environment and mock data, Phase 2 implements Web3 authentication and zero-knowledge proof onboarding concepts, Phase 3 builds the proposal bento-box UI, Phase 4 implements the interactive multi-dimensional voting/feedback mechanism, and Phase 5 introduces the global aggregated data analytics dashboard. 

## Phases

- [x] **Phase 1: Project Setup & Global Design System** - Scaffold project and global theme
- [x] **Phase 1.1: Frontend and mock dashboards for presentation** (INSERTED)
- [x] **Phase 2: Authentication & Mock Identity Flow** - Web3 Connect and conceptual ZKP onboarding
- [x] **Phase 3: Proposal Discovery & Detail Components** - Bento box UI for reading proposals
- [x] **Phase 4: Feedback Mechanism** - Multi-dimensional dynamic voting UI
- [x] **Phase 5: Analytics Dashboard Engine** - Data visualization and sentiment heatmaps
- [ ] **Phase 6: Infraestrutura e Backend Integrado** - Prisma, SQLite DB e Server Actions
- [ ] **Phase 7: Live AI Integration** - Geração de ELI5 dinâmicos e Extração de Tópicos (LLM)
- [ ] **Phase 8: Web3 & Smart Contracts** - Registro de propostas on-chain e geração real de ZKP

## Phase Details

### Phase 1: Project Setup & Global Design System
**Goal**: Scaffold Next.js application, establish design system routing, and set up mock data layer.
**Depends on**: Nothing
**Requirements**: ARCH-01, ARCH-02
**Success Criteria** (what must be TRUE):
  1. Local Next.js server runs successfully.
  2. Tailwind and Shadcn are configured with Inter/Space Grotesk typography.
  3. Dark mode "Floripa Web3" global theme is applied natively.
**Plans**: TBD

Plans:
- [ ] 01-01: Initialize Next.js, Tailwind, Shadcn.
- [ ] 01-02: Configure global layout and design variables.

### Phase 2: Authentication & Mock Identity Flow
**Goal**: Integrate Wagmi/RainbowKit for sign-ins and scaffold a conceptual ZKP demographic onboarding wizard.
**Depends on**: Phase 1
**Requirements**: AUTH-01, AUTH-02
**Success Criteria** (what must be TRUE):
  1. User can click "Connect Wallet" and see RainbowKit modal.
  2. User is prompted sequentially for anonymous demographic questions (Age, Education, Economics, Orientation).
**Plans**: TBD

Plans:
- [ ] 02-01: Set up Wagmi/RainbowKit providers.
- [ ] 02-02: Build demographic onboarding flow UI.

### Phase 3: Proposal Discovery & Detail Components
**Goal**: Create bento-box style user interfaces for discovering and detailed reading of proposals, including AI translations and SME notes.
**Depends on**: Phase 2
**Requirements**: ARCH-03, ARCH-04, PROP-01, PROP-02, PROP-03, PROP-04, PROP-05
**Success Criteria** (what must be TRUE):
  1. Proposal list correctly maps mock data into cards.
  2. Proposal detail displays Impact Matrix correctly.
  3. User can toggle between rigorous text and ELI5 abstract.
**Plans**: TBD

Plans:
- [ ] 03-01: Mock Data service for Proposals.
- [ ] 03-02: Build Proposal List and Bento-box layout.
- [ ] 03-03: Implement Detail View showing Impact Matrix, ELI5 toggles, Context Notes.

### Phase 4: Feedback Mechanism
**Goal**: Implement the highly interactive multi-dimensional slider voting tool and structured disapproval matrix.
**Depends on**: Phase 3
**Requirements**: VOTE-01, VOTE-02, VOTE-03, VOTE-04
**Success Criteria** (what must be TRUE):
  1. User can drag sliders for individual aspects (Fairness, Feasibility).
  2. Selecting 'Disapprove' opens the multi-select "Why" matrix.
  3. Interactions are buttery smooth via Framer Motion.
**Plans**: TBD

Plans:
- [ ] 04-01: Feedback sliders component.
- [ ] 04-02: Disapproval matrix interactions.

### Phase 5: Analytics Dashboard Engine
**Goal**: Visualize the sentiment, demographic threshold maps, explicit topic extractions, and consensus finding on an aggregated dashboard.
**Depends on**: Phase 4
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05
**Success Criteria** (what must be TRUE):
  1. Recharts/Chart.js accurately translates demographic voting data into heatmaps.
  2. "Consensus Finder" visual renders correctly.
  3. "Top Community Concerns" list uses mock AI extraction data.
**Plans**: TBD

Plans:
- [ ] 05-01: Add Recharts/Chart.js to project.
- [ ] 05-02: Build Dashboard Overview layout and Sentiment Heatmap.
- [ ] 05-03: Implement Consensus Finder UI and Top Concerns List.

### Phase 6: Infraestrutura e Backend Integrado
**Goal**: Substituir a store mockada por um banco de dados real (Prisma + SQLite) e criar Next.js Server Actions para manipulação de dados.
**Depends on**: Phase 5
**Requirements**: Real backend integration
**Success Criteria** (what must be TRUE):
  1. Prisma configurado e rodando com schema definido.
  2. Frontend listando e processando propostas via banco de dados ao invés do mockStateStore.
**Plans**: TBD

### Phase 7: Live AI Integration
**Goal**: Integrar chamadas dinâmicas a um LLM.
**Depends on**: Phase 6
**Requirements**: Live AI LLM integration para ELI5 e Tópicos.
**Success Criteria** (what must be TRUE):
  1. ELI5 gerado nativamente consumindo IA invés de texto hardcoded.
  2. Sumarização periódica dos comentários para gerar os "Consensus Prompts".
**Plans**: TBD

### Phase 8: Web3 & Smart Contracts
**Goal**: Implementar a lógica Web3 completa para login e hash registry on-chain, bem como client-side ZKP.
**Depends on**: Phase 7
**Requirements**: Web3 Smart Contracts e ZKP real.
**Success Criteria** (what must be TRUE):
  1. Wagmi/RainbowKit gerenciando state da carteira.
  2. Smart Contract armazenando metadados de projetos e votações em um Testnet.
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Setup | 3/3 | Completed | 2026-04-13 |
| 1.1 Mock Dashboards | 1/1 | Completed | 2026-04-13 |
| 2. Connect & Identity | 2/2 | Completed | 2026-04-14 |
| 3. Discovery & Detail | 3/3 | Completed | 2026-04-14 |
| 4. Feedback System | 2/2 | Completed | 2026-04-14 |
| 5. Dashboard Engine | 3/3 | Completed | 2026-04-14 |
| 6. Real Backend | 0/2 | Not started | - |
| 7. Live AI | 0/2 | Not started | - |
| 8. Web3 Smart Contracts | 0/2 | Not started | - |

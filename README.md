# DevFlow

Enterprise Project & Task Management Platform — portfolio project for a Senior Full-Stack Developer role.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular 22 + **Angular Material** + CDK (Signals, Standalone, OnPush) |
| Backend | NestJS 11 |
| Database | MySQL 8 (coming in Phase 1) |
| Monorepo | Nx 23 |

> **Note:** Nx 23 ships with Angular 22. Signals and all patterns from Angular 20+ apply identically. Use Node `>=22.22.3` (you have 22.23.2 on Windows — perfect).

## Monorepo Structure

```
devflow/
├── apps/
│   ├── web/                 # Angular frontend (main portfolio piece)
│   └── api/                 # NestJS REST API
├── libs/
│   └── shared/
│       ├── types/           # Shared TypeScript interfaces (User, Project, Task)
│       ├── ui/              # Reusable UI components
│       └── utils/           # Shared utilities
│   └── web/
│       └── feature-shell/   # App shell (Material sidenav, header, routes)
```

## Prerequisites

- Node.js `>=22.22.3`
- npm `10.x`
- MySQL 8 (for backend phases)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start both apps (single command)

```bash
npm start
```

This runs **web** (Angular) and **api** (NestJS) together in one terminal.

- Frontend: [http://localhost:4200](http://localhost:4200)
- API: [http://localhost:3000/api](http://localhost:3000/api)
- **Swagger UI**: [http://localhost:3000/docs](http://localhost:3000/docs)

### 3. Or start individually

```bash
npm run start:web
```

```bash
npm run start:api
```

API runs at [http://localhost:3000/api](http://localhost:3000/api)

## Nx Commands

| Command | Description |
|---------|-------------|
| `npm run start` | Serve Angular app  and NestJs|
| `npm run start:web` | Serve Angular app |
| `npm run start:api` | Serve NestJS API |
| `npm run build` | Build all projects |
| `npm run test` | Run all tests |
| `npm run lint` | Lint all projects |
| `npm run graph` | Open Nx dependency graph |

### Run a single project

```bash
npx nx serve web
npx nx build api
npx nx test shared-types
npx nx lint web
```

### Generate new libraries

```bash
# Feature library (example)
npx nx g @nx/angular:library --name=feature-projects --directory=libs/web/feature-projects --importPath=@devflow/web-feature-projects --standalone

# Data access library (example)
npx nx g @nx/angular:library --name=data-access --directory=libs/web/data-access --importPath=@devflow/web-data-access --standalone
```

## Shared Types

Import domain models in any app or lib:

```typescript
import { Project, Task, User } from '@devflow/shared-types';
```

## Build Phases

- [x] **Phase 0** — Nx monorepo setup
- [x] **Phase A** — Angular Material + app shell (sidebar, header, routing)
- [x] **Phase B** — Projects feature (Signal Store, Material table, CRUD dialog, mock data)
- [x] **Phase C** — Tasks feature (Kanban board, CDK drag-drop, list view, TaskStore)
- [ ] **Phase 1** — NestJS API + MySQL (swap mock services for real API)
- [ ] **Phase 2** — Angular shell + auth + layout
- [ ] **Phase 3** — Projects feature (Signal Store)
- [ ] **Phase 4** — Tasks feature (Kanban + Signals showcase)
- [ ] **Phase 5** — Dashboard + shared UI + polish
- [ ] **Phase 6** — Tests, CI, deploy

## License

MIT

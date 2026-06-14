# BeetleX Hackathon Hub — Project Plan

## Overview

Production-quality SaaS frontend for hackathon management. This document records architecture decisions and tracks implementation progress across phases.

## Stack (Locked)

| Layer | Choice |
|-------|--------|
| Build | Vite |
| UI | React 18 + TypeScript (`strict: true`) |
| Routing | React Router v6 |
| Styling | Tailwind CSS v4 (CSS variables + `@theme`) |
| Client state | Zustand (persisted auth + theme) |
| Server state | TanStack Query v5 |
| Mock API | MSW v2 (browser worker, dev mode only) |
| Forms (Phase 2+) | react-hook-form + zod |
| Icons | lucide-react |
| Quality | ESLint (type-checked) + Prettier |

## Architecture Decisions

1. **API boundary** — All HTTP calls go through `src/lib/api/*`. Pages and components never call `fetch` directly. Errors surface as typed `ApiError`.
2. **Dark-mode-first theming** — CSS custom properties on `:root` (dark default). Light mode toggled via `html.light` class, persisted in `useThemeStore`.
3. **Demo auth** — No real authentication in Phase 1. `useAuthStore` + `RoleSwitcher` in the Header simulate Public / Participant / Judge / Organizer views. Role persisted to `localStorage`.
4. **MSW in dev only** — Worker starts in `main.tsx` when `import.meta.env.MODE === 'development'`. Seed data in `src/mocks/data.ts` is mutable in-memory for POST/PUT handlers.
5. **Path alias** — `@/*` maps to `src/*` in both Vite and TypeScript for clean imports.
6. **Layout composition** — `AppLayout` wraps all routes with Header + Footer. `DashboardSidebar` appears on `/dashboard`, `/judge`, and `/organizer` routes based on current role.
7. **Simulated latency** — All MSW handlers delay 300–600 ms to mimic network conditions.

## Folder Structure

```
src/
├── components/
│   ├── ui/           Button, Card, Badge, DataChip, Input, Modal, Tabs, Accordion
│   └── layout/       Header, Footer, DashboardSidebar, RoleSwitcher, AppLayout
├── pages/            One file per route (placeholder headings in Phase 1)
├── features/         Feature modules (Phase 2+)
├── store/            Zustand stores (auth, theme, notifications)
├── lib/api/          Typed API client functions
├── mocks/            MSW handlers + seed data
├── types/            Shared TypeScript interfaces
└── hooks/            React Query hooks
```

## Route Table

| Path | Page | Phase 1 Status |
|------|------|----------------|
| `/` | Landing | Placeholder |
| `/events` | EventListing | Placeholder |
| `/events/:eventId` | EventDetails | Placeholder |
| `/events/:eventId/register` | Registration | Placeholder (built Phase 2) |
| `/dashboard` | TeamDashboard | Placeholder |
| `/dashboard/submit` | ProjectSubmission | Placeholder |
| `/judge` | JudgeDashboard | Placeholder |
| `/organizer` | OrganizerDashboard | Placeholder |

### Role-based nav visibility

| Link | public | participant | judge | organizer |
|------|--------|-------------|-------|-----------|
| Home | ✓ | ✓ | ✓ | ✓ |
| Events | ✓ | ✓ | ✓ | ✓ |
| Dashboard | — | ✓ | — | — |
| Judge | — | — | ✓ | — |
| Organizer | — | — | — | ✓ |

## Design System

### Colors (dark default)

| Token | Hex | Usage |
|-------|-----|-------|
| background | `#0B0E14` | Page canvas |
| surface | `#12161F` | Cards, panels |
| surface-elevated | `#181D29` | Hover states, chips |
| border | `#232838` | Dividers, outlines |
| text-primary | `#E7E9EE` | Headings, body |
| text-secondary | `#8C94A8` | Labels, meta |
| accent | `#7C5CFF` | Primary actions, brand |
| accent-live | `#22D3EE` | Live/active indicators |
| success | `#22C55E` | Positive states |
| warning | `#F59E0B` | Caution |
| danger | `#EF4444` | Errors, destructive |

### Typography

- **Inter** — UI text (sans-serif)
- **JetBrains Mono** — System data (IDs, countdowns, scores, timestamps, status codes)

### DataChip Pattern

The signature BeetleX component for machine-readable system data.

**Purpose:** Visually distinguish programmatic values (event IDs, status codes, countdowns, scores) from human prose. Inspired by Linear/Vercel developer dashboards.

**Rendering rules:**
- Always wrapped in square brackets: `[ACTIVE]`, `[#BTLX-2026-00481]`
- `font-mono` (JetBrains Mono)
- Subtle elevated background (`bg-surface-elevated/80` default)
- Small text (`text-xs`), tight tracking
- Variant colors for semantic meaning: `accent`, `live`, `success`, `warning`, `danger`

**Usage (Phase 2+):**
```tsx
<DataChip>#BTLX-2026-00481</DataChip>
<DataChip variant="live">ACTIVE</DataChip>
<DataChip variant="success">SUBMITTED</DataChip>
```

**Location:** `src/components/ui/DataChip.tsx`

## Mock Data Summary

- **6 events** — 2 upcoming, 2 active, 2 closed
- **Flagship event:** `AI Builders League 2026` (`BTLX-2026-00481`) — 3 tracks, 9 prizes, 4 sponsors, 6 FAQs, 2 teams (1 with draft submission), 8 leaderboard entries
- **API endpoints:** 17 handlers with 300–600 ms simulated latency

## Page Checklist

- [ ] Landing — **not started** (Phase 2)
- [ ] Event Listing — **not started** (Phase 2)
- [ ] Event Details — **not started** (Phase 2)
- [ ] Registration — **not started** (Phase 2)
- [ ] Team Dashboard — **not started** (Phase 3)
- [ ] Project Submission — **not started** (Phase 3)
- [ ] Judge Dashboard — **not started** (Phase 3)
- [ ] Organizer Dashboard — **not started** (Phase 3)

## Bonus Features Checklist

- [ ] Real-time leaderboard animations — **not started**
- [ ] Notification center with toast + inbox — **not started** (store scaffolded)
- [ ] Event countdown timers — **not started**
- [ ] Export registrations CSV — **not started**

## Phase 1 Deliverables (This Session)

- [x] Vite + React 18 + TypeScript strict scaffolding
- [x] Tailwind design system with dark/light modes
- [x] All shared types in `src/types/index.ts`
- [x] Zustand stores (auth, theme, notifications shape)
- [x] MSW mock API with seed data and handlers
- [x] Typed API client layer
- [x] UI component library (8 components)
- [x] Layout shell (Header, Footer, Sidebar, RoleSwitcher)
- [x] 8 navigable placeholder routes
- [x] ESLint + Prettier configured

# BeetleX Hackathon Hub

Production-grade SaaS platform for end-to-end hackathon management, designed for Participants, Judges, and Organizers. Built with React, TypeScript, Vite, Zustand, TanStack Query, and MSW, the application delivers a scalable, maintainable, and high-performance frontend architecture with role-based workflows and modern developer experience.

---

# Overview

BeetleX Hackathon Hub streamlines the complete hackathon lifecycle, from event discovery and registration to project submissions, judging, leaderboards, and organizer administration.

The platform is designed around three primary user personas:

* Participant
* Judge
* Organizer

Each role is provided with a dedicated dashboard and workflow while sharing a common design system and API infrastructure.

---

# Key Features

### Public Experience

* Event Discovery
* Advanced Search & Filters
* Event Details
* Registration Workflow
* Live Countdown Timers
* Sponsor & Prize Sections

### Participant Experience

* Multi-Step Registration
* Team Dashboard
* Project Submission
* Announcement Center
* Leaderboard Access

### Judge Experience

* Assignment Queue
* Rubric-Based Scoring
* Review Management
* Submission Evaluation

### Organizer Experience

* Registration Monitoring
* Submission Tracking
* Judge Assignment
* Announcement Broadcasting
* CSV Export
* Leaderboard Publishing

---

# Technology Stack

| Layer         | Technology        |
| ------------- | ----------------- |
| Build Tool    | Vite              |
| Frontend      | React 18          |
| Language      | TypeScript        |
| Routing       | React Router v6   |
| Styling       | Tailwind CSS v4   |
| Client State  | Zustand           |
| Server State  | TanStack Query v5 |
| Forms         | React Hook Form   |
| Validation    | Zod               |
| Mock API      | MSW v2            |
| Icons         | Lucide React      |
| Quality Tools | ESLint + Prettier |

---

# Project Architecture

The application follows a modular architecture that separates presentation, business logic, data access, and state management.

## High-Level Architecture

```text
┌───────────────────────────────┐
│          UI Layer             │
│ Pages + Components            │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│       Feature Modules         │
│ Registration / Dashboard      │
│ Judge / Organizer             │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│      API Abstraction Layer    │
│      src/lib/api/*            │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│     TanStack Query Layer      │
│ Query Management & Cache      │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│     MSW Mock API Server       │
│  Development Environment      │
└───────────────────────────────┘
```

---

# Application Flow

```text
User
 │
 ▼
Landing Page
 │
 ▼
Browse Events
 │
 ▼
Event Details
 │
 ▼
Registration
 │
 ▼
Team Dashboard
 │
 ├──────────────► Project Submission
 │
 ├──────────────► Leaderboard
 │
 └──────────────► Announcements
```

---

# Role-Based Workflow

```text
                    User
                      │
      ┌───────────────┼───────────────┐
      │               │               │
      ▼               ▼               ▼

 Participant       Judge         Organizer

      │               │               │

      ▼               ▼               ▼

 Registration   Assigned      Event Monitoring
 Submission     Reviews       Registrations
 Leaderboard    Scoring       Judge Assignment
 Dashboard      Feedback      Leaderboard Control
```

---

# Folder Structure

```text
src/
│
├── components/
│   ├── ui/
│   └── layout/
│
├── pages/
│
├── features/
│   ├── registration/
│   ├── dashboard/
│   ├── judge/
│   └── organizer/
│
├── store/
│   ├── authStore.ts
│   ├── themeStore.ts
│   └── notificationStore.ts
│
├── lib/
│   └── api/
│       ├── client.ts
│       ├── hooks.ts
│       └── endpoints/
│
├── mocks/
│   ├── handlers.ts
│   └── data.ts
│
├── types/
│
├── hooks/
│
└── assets/
```

---

# State Management Architecture

```text
                 Zustand
                     │
     ┌───────────────┼───────────────┐
     │               │               │
     ▼               ▼               ▼

 Auth Store    Theme Store    Notification Store

 Role State    Dark Mode      Toasts
 Persistence   Persistence    Alerts
```

---

# API Flow

```text
Page / Component
        │
        ▼
React Query Hook
        │
        ▼
API Client
        │
        ▼
MSW Handler
        │
        ▼
Mock Database
        │
        ▼
Response
```

---

# Setup Instructions

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

## Build For Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

---

# Performance Optimizations

* React Lazy Loading
* Route-Based Code Splitting
* React.memo Optimization
* Zustand Selectors
* Query Caching
* Suspense-Based Loading
* Skeleton States

---

# Accessibility

The platform follows modern accessibility standards:

* Semantic HTML
* Keyboard Navigation
* Focus Management
* ARIA Attributes
* Screen Reader Support
* WCAG Compliant Color Contrast

---

# Future Roadmap

### Phase 4

* Real-Time WebSocket Integration
* Email Notifications
* Production Backend
* AI-Powered Recommendations
* Advanced Analytics
* Enterprise Authentication
* Multi-Event Management

---

# Known Limitations

* File upload currently uses client-side validation only.
* Authentication is demo-based and role simulation is handled through Zustand.
* Real-time updates are simulated and not backed by WebSockets.

---

# Conclusion

BeetleX Hackathon Hub demonstrates a production-ready frontend architecture with scalable design patterns, role-based workflows, strong developer experience, and a clear separation of concerns. The project is structured for future backend integration and enterprise-scale expansion while maintaining excellent performance, accessibility, and maintainability.

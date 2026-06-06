---
id: 0001
title: Convert AgentTutor design to Next.js 14 app
stage: green
date: 2026-06-01
surface: agent
model: claude-opus-4-8
feature: 002-hybrid-intelligence
branch: 002-hybrid-intelligence
user: Abu Bakar
command: (freeform)
labels: ["frontend", "nextjs", "tailwind", "ui"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/package.json
  - frontend/next.config.mjs
  - frontend/tsconfig.json
  - frontend/postcss.config.mjs
  - frontend/tailwind.config.ts
  - frontend/.gitignore
  - frontend/app/globals.css
  - frontend/app/layout.tsx
  - frontend/app/page.tsx
  - frontend/app/upgrade/page.tsx
  - frontend/app/dashboard/page.tsx
  - frontend/app/chapters/page.tsx
  - frontend/app/chapters/[id]/page.tsx
  - frontend/app/quiz/[id]/page.tsx
  - frontend/app/progress/page.tsx
  - frontend/app/mentor/page.tsx
  - frontend/lib/data.ts
  - frontend/components/icons.tsx
  - frontend/components/ProBadge.tsx
  - frontend/components/AnimatedAgent.tsx
  - frontend/components/MarketingNav.tsx
  - frontend/components/Sidebar.tsx
  - frontend/components/AppHeader.tsx
  - frontend/components/AppShell.tsx
  - frontend/components/Donut.tsx
  - frontend/components/QuizRunner.tsx
  - frontend/components/MentorChat.tsx
  - frontend/components/landing/FAQ.tsx
  - frontend/public/robot-tutor.png
tests:
  - "next build — 29 routes compiled, type-checked, prerendered (0 errors)"
  - "Smoke test — all 8 routes return HTTP 200 on production server"
  - "Content check — landing/dashboard/quiz/mentor render expected copy"
---

## Prompt

I have an existing HTML/JSX design for AgentTutor web app. Convert it to a proper Next.js 14 app with these requirements:
1. Use Next.js 14 with App Router
2. Use Tailwind CSS for styling
3. Keep the same design — dark theme, animations, all pages
4. Create separate pages:
   - / (landing page)
   - /dashboard (main dashboard)
   - /chapters (chapter list)
   - /chapters/[id] (single chapter)
   - /quiz/[id] (quiz page)
   - /progress (progress page)
   - /mentor (AI mentor chat)
   - /upgrade (pricing page)
5. Use mock data for now — no API calls yet
6. Each page should have proper Next.js layout with navbar

The design files are in the frontend/ folder.

## Response

Converted the React-UMD/Babel design (landing.jsx, dashboard.jsx, tokens.jsx) into a
Next.js 14 App Router app in `frontend/`, styled with Tailwind CSS.

Key decisions:
- **Theme:** Ported the `periwinkle` dark palette from tokens.jsx into CSS variables
  (globals.css) and mapped them to semantic Tailwind color tokens (`bg`, `surface`,
  `ink`, `primary`, `ok`, `warn`, …) in tailwind.config.ts. Fixed dark theme as requested.
- **Animations:** The hero mentor bot (blink / bob / glow / sonar ring / floating tokens /
  thinking dots) was reproduced as `AnimatedAgent.tsx` with keyframes declared in the
  Tailwind config. Added fadeUp + typing animations for the chat.
- **Layouts:** Two navbars — `MarketingNav` (sticky top nav) for landing + upgrade, and an
  `AppShell` (collapsible sidebar + sticky header, mobile drawer) for the logged-in pages.
- **Mock data:** Centralized in `lib/data.ts` — chapters, agents, plans, quiz bank, cohort
  peers, activity series, mentor seed messages. No API calls.
- **Interactivity:** `QuizRunner` (intro → per-question grading with rubric feedback →
  result + gaps), `MentorChat` (keyword-routed canned replies + typing indicator), FAQ
  accordion — all client components; pages otherwise server components, with
  `generateStaticParams` for `/chapters/[id]` and `/quiz/[id]` (chapters 1–10).
- **Freemium design preserved:** demo user is on the Free plan, so lock states, Pro badges,
  and upgrade banners are visible throughout; chapters 4–10 show locked previews.

Also bumped Next.js from 14.2.15 → 14.2.35 to clear a published security advisory.

Verification: `next build` produced 29 routes with no type/lint errors; a production
server returned HTTP 200 for all eight routes and rendered the expected content.

Run with: `cd frontend && npm run dev`.

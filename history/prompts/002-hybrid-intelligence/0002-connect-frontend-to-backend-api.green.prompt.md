---
id: 0002
title: Connect Next.js frontend to FastAPI backend
stage: green
date: 2026-06-01
surface: agent
model: claude-opus-4-8
feature: 002-hybrid-intelligence
branch: 002-hybrid-intelligence
user: Abu Bakar
command: (freeform)
labels: ["frontend", "integration", "api", "fastapi", "nextjs"]
links:
  spec: specs/002-hybrid-intelligence/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/.env.local
  - frontend/lib/api.ts
  - frontend/lib/session.ts
  - frontend/lib/useApi.ts
  - frontend/components/states.tsx
  - frontend/components/Markdown.tsx
  - frontend/components/AssessorPanel.tsx
  - frontend/app/login/page.tsx
  - frontend/components/AppShell.tsx
  - frontend/components/AppHeader.tsx
  - frontend/components/Sidebar.tsx
  - frontend/components/MentorChat.tsx
  - frontend/components/QuizRunner.tsx
  - frontend/app/dashboard/page.tsx
  - frontend/app/chapters/page.tsx
  - frontend/app/chapters/[id]/page.tsx
  - frontend/app/quiz/[id]/page.tsx
  - frontend/app/progress/page.tsx
tests:
  - "next build — 10 routes compiled + type-checked, 0 errors"
  - "Live backend smoke test (seeded DB): POST /users, GET /chapters (1-3 open / 4-10 locked), chapter-01 content 200, chapter-04 403, quiz questions + submit 5/5, complete chapter (streak), progress 1/3, /hybrid/mentor 403 for free user, search results"
  - "Frontend routes all 200; API base http://localhost:8000 baked into client bundle; CORS preflight :3000→backend 200"
---

## Prompt

Connect the Next.js frontend to the existing FastAPI backend at http://localhost:8000.
Replace all hardcoded/mock data with real API calls:
1. Chapters list → GET /chapters
2. Single chapter → GET /chapters/{chapter_id}
3. Next/Previous → GET /chapters/{id}/next and /previous
4. Quiz questions → GET /quizzes/{chapter_id}
5. Quiz submit → POST /quizzes/{chapter_id}/submit
6. Progress → GET /progress/{user_id}
7. Mark complete → PUT /progress/{user_id}/complete/{chapter_id}
8. Search → GET /search?q=query&user_id=id
9. User create → POST /users
10. Access check → GET /access/check/{user_id}/{chapter_id}
11. AI Mentor → POST /hybrid/mentor
12. AI Assessment → POST /hybrid/assess
Store user_id in localStorage after login.
Show lock icon when API returns 403 premium_required.

## Response

Wired the frontend to the live backend. Verified every endpoint shape against
backend/routers + backend/models first, then used the ACTUAL paths (a few differ
from the prompt's list):
- Single chapter is GET /chapters/{id}/content (not /chapters/{id})
- Quiz questions: GET /quizzes/{id}/questions
- Mark complete: POST /progress/{user_id}/chapters/{chapter_id}/complete (not PUT)
- Access check: GET /access/check?user_id=&chapter_id= (query, not path)
- Most reads take user_id as a query param; chapter ids are "chapter-01".."chapter-10".

Built:
- lib/api.ts — typed client for all 12 endpoints + ApiError carrying
  code="premium_required" (isPremium getter) for 403 handling. Helpers to map the
  numeric route param (/chapters/4) to the backend id (chapter-04).
- lib/session.ts — minimal localStorage session (user_id + cached user). NO auth
  provider/guard system (kept to prompt scope per user feedback).
- lib/useApi.ts — tiny loading/data/error fetch hook.
- /login — email+name → POST /users → store user_id → /dashboard.
- AppShell now reads the session, redirects to /login when no user_id, refreshes
  tier from the server; AppHeader/Sidebar use the real user + tier.
- Pages rewritten as client components fetching live data: chapters list,
  chapter detail (renders markdown content via a dependency-free Markdown
  component; 403 → lock UI; mark-complete; next/prev), quiz (GET questions +
  POST submit, backend grading), dashboard (progress + chapters), progress
  (GET /progress). Demo-only visual widgets (activity chart, cohort, trending)
  left as static since the backend has no source for them.
- AI agents: MentorChat → POST /hybrid/mentor (403 → premium gate); AssessorPanel
  (chapter page) → POST /hybrid/assess for written-answer grading.
- 403 premium_required everywhere renders the lock-icon + Upgrade-to-Pro gate.

Scope note: the user pushed back on an earlier full auth system; this keeps only
the minimal login the prompt asked for ("store user_id after login" + POST /users).

Verification: next build clean (10 routes). Started the backend on :8000 against
the seeded Neon DB and ran the full flow end-to-end — free user sees chapters 1-3,
gets 403 on chapter 4 + mentor, quiz grades 5/5, completing a chapter bumps the
streak, progress reads 1/3. Frontend boots, API base is baked into the client
bundle, and the CORS preflight from :3000 succeeds.

Run both: `cd backend && python -m uvicorn backend.main:app --port 8000` and
`cd frontend && npm run dev`, then open http://localhost:3000.

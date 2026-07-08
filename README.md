# AgentTutor — AI Agent Learning Companion
 
> **A Digital Full-Time Equivalent (FTE) Educational Tutor built for the Panaversity Agent Factory Hackathon**
 
AgentTutor is a production-ready AI-powered course companion that teaches **AI Agent Development** 24/7 at a fraction of the cost of human tutors. It delivers intelligent tutoring through a conversational ChatGPT App and a full-featured Next.js Web App — both powered by a deterministic FastAPI backend with zero LLM inference in Phase 1.
 
---
 
## Live Demo
 
| Interface | URL |
|-----------|-----|
| Web App | Coming Soon |
| API Docs | Coming Soon |
| ChatGPT App | Coming Soon |
 
---
 
## The Problem We Solve
 
| | Human Tutor | AgentTutor |
|--|-------------|------------|
| Availability | 40 hrs/week | 168 hrs/week (24/7) |
| Monthly Cost | $2,000 – $5,000 | $200 – $500 |
| Students at Once | 20 – 50 | Unlimited |
| Consistency | 85 – 95% | 99%+ |
| Cost per Session | $25 – $100 | $0.10 – $0.50 |
| Languages | 1 – 3 | 50+ |
 
---
 
## Architecture Overview
 
AgentTutor follows the **Agent Factory Architecture** with a Zero-Backend-LLM default and selective Hybrid Intelligence for premium features.
 
```
Student
  ↓
ChatGPT App / Next.js Web App
  ↓
FastAPI Backend (Deterministic — Zero LLM in Phase 1)
  ↓
Neon PostgreSQL + Local Content Storage
```
 
### Phase 1 — Zero-Backend-LLM
The backend performs **zero LLM inference**. ChatGPT handles all intelligence — explaining concepts, motivating students, adapting tone. The backend is purely deterministic.
 
### Phase 2 — Hybrid Intelligence (Premium)
Selective backend LLM calls for two premium features only — LLM Graded Assessments and AI Mentor Agent — powered by Google Gemini via OpenAI Agents SDK.
 
### Phase 3 — Full Next.js Web App
A complete LMS dashboard built with Next.js 14 and Tailwind CSS, connected to the same FastAPI backend with all Phase 1 and Phase 2 features.
 
---
 
## Features
 
### Phase 1 — Core Features (Free + Premium)
- **Content Delivery** — Serve 10 chapter markdown files verbatim
- **Sequential Navigation** — Next and previous chapter navigation
- **Keyword Search** — Search across accessible chapter content
- **Rule-Based Quizzes** — 50 questions graded by answer key, no LLM
- **Progress Tracking** — Chapter completion, quiz scores, daily streaks
- **Freemium Gate** — Chapters 1–3 free, chapters 4–10 premium
### Phase 2 — Hybrid Intelligence (Premium Only)
- **LLM Graded Assessment** — Google Gemini grades free-form written answers with detailed feedback
- **AI Mentor Agent** — OpenAI Agents SDK powered multi-step tutoring agent with tools to fetch chapter content and student progress
### Phase 3 — Web App
- Full LMS dashboard with progress visualization
- Chapter reading experience with markdown rendering
- Interactive quiz interface
- AI Mentor chat interface
- Upgrade and pricing page
---
 
## Course Content
 
**Topic:** AI Agent Development
 
| Chapter | Title | Tier |
|---------|-------|------|
| 1 | What is an AI Agent | Free |
| 2 | Claude Agent SDK Basics | Free |
| 3 | Building Your First Agent | Free |
| 4 | Model Context Protocol (MCP) | Premium |
| 5 | Agent Skills and SKILL.md | Premium |
| 6 | Multi-Agent Collaboration | Premium |
| 7 | Agent Memory and State | Premium |
| 8 | A2A Protocol | Premium |
| 9 | Agent Factory Architecture | Premium |
| 10 | Production Deployment | Premium |
 
---
 
## Tech Stack
 
| Layer | Technology |
|-------|-----------|
| Backend | FastAPI (Python 3.12) |
| Database | Neon PostgreSQL |
| Content Storage | Local File System |
| AI Agent SDK | OpenAI Agents SDK |
| LLM Provider | Google Gemini 2.5 Flash |
| Web Frontend | Next.js 14 + Tailwind CSS |
| ChatGPT Frontend | OpenAI Apps SDK |
| Deployment (API) | Fly.io |
| Deployment (Web) | Vercel |
 
---
 
## Agent Skills
 
Four SKILL.md files define how the ChatGPT App tutors students:
 
| Skill | Trigger Keywords | Purpose |
|-------|-----------------|---------|
| concept-explainer | explain, what is, how does | Explain concepts using only course content |
| quiz-master | quiz, test me, practice | Guide through quizzes one question at a time |
| socratic-tutor | help me think, I'm stuck | Guide students to discover answers themselves |
| progress-motivator | my progress, streak, how am I doing | Celebrate achievements and maintain motivation |
 
---
 
## Project Structure
 
```
agenttutor/
├── backend/
│   ├── main.py                  ← FastAPI entry point
│   ├── config.py                ← Settings and environment
│   ├── requirements.txt
│   ├── routers/
│   │   ├── chapters.py          ← Content delivery APIs
│   │   ├── quizzes.py           ← Quiz APIs
│   │   ├── progress.py          ← Progress tracking APIs
│   │   ├── search.py            ← Search API
│   │   ├── access.py            ← Freemium gate APIs
│   │   ├── users.py             ← User management APIs
│   │   └── hybrid.py            ← Phase 2 LLM APIs
│   ├── agents/
│   │   ├── llm_client.py        ← Gemini client setup
│   │   ├── assessor_agent.py    ← LLM Assessment agent
│   │   └── mentor_agent.py      ← AI Mentor agent
│   ├── models/                  ← Pydantic models
│   ├── db/
│   │   ├── connection.py        ← Database connection
│   │   ├── tables.py            ← Schema definitions
│   │   └── seed.py              ← Seed chapters and quizzes
│   ├── storage/
│   │   └── content_reader.py    ← Local file reader
│   └── content/
│       └── chapters/            ← 10 chapter markdown files
├── frontend/                    ← Next.js 14 Web App
├── skills/
│   ├── concept-explainer/SKILL.md
│   ├── quiz-master/SKILL.md
│   ├── socratic-tutor/SKILL.md
│   └── progress-motivator/SKILL.md
├── chatgpt-app/
│   └── manifest.yaml            ← ChatGPT App config
├── docs/
│   ├── architecture.md
│   └── cost-analysis.md
└── tests/
    ├── unit/
    ├── integration/
    └── contract/
```
 
---
 
## Getting Started
 
### Prerequisites
- Python 3.12+
- Node.js 18+
- Neon PostgreSQL account (free)
- Google Gemini API key (free)
### 1. Clone the Repository
 
```bash
git clone https://github.com/your-username/agenttutor.git
cd agenttutor
```
 
### 2. Backend Setup
 
```bash
cd backend
pip install -r requirements.txt
```
 
Create `.env` file in the `backend/` folder:
 
```env
DATABASE_URL=postgresql://user:pass@host/agenttutor
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=dummy-key
APP_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```
 
### 3. Database Setup
 
```bash
python db/seed.py --create-tables --quiz-bank
```
 
### 4. Run Backend
 
```bash
cd ..
uvicorn backend.main:app --reload --port 8000
```
 
API docs available at: `http://localhost:8000/docs`
 
### 5. Frontend Setup
 
```bash
cd frontend
npm install
npm run dev
```
 
Web app available at: `http://localhost:3000`
 
---
 
## API Endpoints
 
### Content APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /chapters | List all chapters |
| GET | /chapters/{id} | Get chapter content |
| GET | /chapters/{id}/next | Get next chapter |
| GET | /chapters/{id}/previous | Get previous chapter |
 
### Quiz APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /quizzes/{chapter_id} | Get quiz questions |
| POST | /quizzes/{chapter_id}/submit | Submit and grade answers |
 
### Progress APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /progress/{user_id} | Get full progress summary |
| PUT | /progress/{user_id}/complete/{chapter_id} | Mark chapter complete |
 
### Hybrid Intelligence APIs (Premium)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /hybrid/assess | LLM graded assessment |
| POST | /hybrid/mentor | AI Mentor Agent session |
 
---
 
## Cost Analysis
 
### Phase 1 — Monthly Cost (10,000 users)
 
| Component | Cost |
|-----------|------|
| Neon PostgreSQL | $0 (free tier) |
| Fly.io Compute | ~$10 |
| Domain + SSL | ~$1 |
| **Total** | **~$11/month** |
| **Cost per user** | **$0.001** |
 
### Phase 2 — Per Request Cost
 
| Feature | Cost |
|---------|------|
| LLM Assessment | ~$0.014 per request |
| AI Mentor Session | ~$0.090 per session |
 
---
 
## Pricing Model
 
| Tier | Price | Features |
|------|-------|---------|
| Free | $0 | Chapters 1–3, Basic quizzes, ChatGPT tutoring |
| Premium | $9.99/mo | All 10 chapters, All quizzes, Progress tracking |
| Pro | $19.99/mo | Premium + AI Mentor + LLM Assessments |
 
---
 
## Running Tests
 
```bash
cd agenttutor
pytest tests/ -v
```
 
### Test Coverage
- Unit tests — Quiz grading, streak calculation, access logic, zero LLM invariant
- Integration tests — All API endpoints
- Contract tests — OpenAPI schema validation
---
 
## Zero-Backend-LLM Invariant
 
Phase 1 strictly enforces zero LLM calls in the backend. This is verified by:
 
```bash
pytest tests/unit/test_zero_llm_invariant.py -v
```
 
The backend never imports or calls OpenAI, Anthropic, or any other LLM API in Phase 1 routes.
 
---
 
## License
 
MIT License — see LICENSE file for details.
 
---
 
*AgentTutor v1.0 —  Agent Factory*

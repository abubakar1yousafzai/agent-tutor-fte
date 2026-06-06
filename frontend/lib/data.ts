// lib/data.ts — mock data for the AgentTutor app.
// Ported from the original design system (tokens.jsx) and extended with the
// per-chapter / per-quiz content the new pages need. No API calls — everything
// here is static demo data.

export type Plan = "free" | "pro";

export interface UserProfile {
  name: string;
  initials: string;
  plan: Plan;
  cohort: string;
  day: number;
}

// The signed-in demo user. Kept on the FREE plan so the freemium design
// (lock states, upgrade banners, Pro badges) is visible across the app.
export const USER: UserProfile = {
  name: "Sara Kapoor",
  initials: "SK",
  plan: "free",
  cohort: "Cohort 06",
  day: 14,
};

export const FREE_CHAPTER_COUNT = 3;
export const isPro = () => USER.plan === "pro";

export const PLANS = {
  free: { name: "Free", priceLabel: "$0", per: "", tagline: "3 chapters, no agents" },
  pro: {
    name: "Pro",
    priceLabel: "$19",
    per: "/mo",
    tagline: "All 10 chapters · AI Mentor + AI Assessor · unlimited sessions",
  },
} as const;

export type ChapterStatus = "done" | "active" | "locked";

export interface Chapter {
  n: number;
  title: string;
  tag: string;
  mins: number;
  lessons: number;
  free: boolean;
  status: ChapterStatus;
  score: number | null;
  blurb: string;
  topics: string[];
}

export const CHAPTERS: Chapter[] = [
  {
    n: 1,
    title: "Introduction to AI Agents",
    tag: "Foundations",
    mins: 28,
    lessons: 6,
    free: true,
    status: "done",
    score: 96,
    blurb:
      "What an agent actually is — the loop of perception, reasoning, and action — and why it is more than a chatbot with a prompt.",
    topics: ["The agent loop", "Agents vs. chatbots", "When not to use an agent", "Your first agent"],
  },
  {
    n: 2,
    title: "LLM Fundamentals",
    tag: "Foundations",
    mins: 42,
    lessons: 8,
    free: true,
    status: "done",
    score: 88,
    blurb:
      "Tokens, context windows, temperature, and sampling — the mechanics underneath every model call you will ever make.",
    topics: ["Tokenization", "Context windows", "Sampling & temperature", "Cost & latency"],
  },
  {
    n: 3,
    title: "Prompt Engineering Patterns",
    tag: "Reasoning",
    mins: 38,
    lessons: 7,
    free: true,
    status: "active",
    score: 92,
    blurb:
      "Reusable prompting patterns — few-shot, chain-of-thought, role priming — and how to test them like code instead of guessing.",
    topics: ["Few-shot prompting", "Chain-of-thought", "Role priming", "Prompt testing"],
  },
  {
    n: 4,
    title: "Tools & Function Calling",
    tag: "Reasoning",
    mins: 55,
    lessons: 9,
    free: false,
    status: "locked",
    score: null,
    blurb:
      "A tool is a typed contract — define the schema first, the model fills it, you validate it. Strict JSON, retries, and error replies.",
    topics: ["Tool schemas", "Strict JSON mode", "Error reply patterns", "Tool naming under retries"],
  },
  {
    n: 5,
    title: "Memory & Context Management",
    tag: "Architecture",
    mins: 46,
    lessons: 8,
    free: false,
    status: "locked",
    score: null,
    blurb:
      "Short-term vs. long-term memory, summarization, and how to keep a long conversation coherent without blowing the context budget.",
    topics: ["Working memory", "Summarization", "Vector memory", "Context budgeting"],
  },
  {
    n: 6,
    title: "Retrieval-Augmented Generation",
    tag: "Architecture",
    mins: 62,
    lessons: 10,
    free: false,
    status: "locked",
    score: null,
    blurb:
      "Ground answers in your own data: chunking, embeddings, retrieval, and re-ranking — with evals so you know it actually helps.",
    topics: ["Chunking strategies", "Embeddings", "Retrieval & re-ranking", "Grounding evals"],
  },
  {
    n: 7,
    title: "Multi-Agent Orchestration",
    tag: "Systems",
    mins: 70,
    lessons: 11,
    free: false,
    status: "locked",
    score: null,
    blurb:
      "When one agent is not enough: planner/worker patterns, hand-offs, shared state, and avoiding the infinite-loop trap.",
    topics: ["Planner / worker", "Hand-offs", "Shared state", "Loop guards"],
  },
  {
    n: 8,
    title: "Evaluation & Testing",
    tag: "Quality",
    mins: 48,
    lessons: 8,
    free: false,
    status: "locked",
    score: null,
    blurb:
      "Rubrics, golden sets, and LLM-as-judge. Turn 'it feels better' into a number you can defend and a regression you can catch.",
    topics: ["Rubric design", "Golden datasets", "LLM-as-judge", "Regression tracking"],
  },
  {
    n: 9,
    title: "Safety, Guardrails & Alignment",
    tag: "Quality",
    mins: 54,
    lessons: 9,
    free: false,
    status: "locked",
    score: null,
    blurb:
      "Input/output guardrails, prompt-injection defense, and refusal design — keeping a capable agent inside its lane.",
    topics: ["Input guardrails", "Prompt injection", "Output filtering", "Refusal design"],
  },
  {
    n: 10,
    title: "Deploying Agents to Production",
    tag: "Delivery",
    mins: 66,
    lessons: 10,
    free: false,
    status: "locked",
    score: null,
    blurb:
      "Observability, cost controls, rollout, and on-call. Everything between a working notebook and an agent users depend on.",
    topics: ["Tracing & logging", "Cost controls", "Staged rollout", "On-call & runbooks"],
  },
];

export function getChapter(n: number): Chapter | undefined {
  return CHAPTERS.find((c) => c.n === n);
}

// A chapter is locked for the signed-in user when it is not free and they are
// not on Pro.
export function chapterLocked(c: Chapter): boolean {
  return !c.free && !isPro();
}

export function agentsLocked(): boolean {
  return !isPro();
}

export interface Agent {
  key: "mentor" | "assessor";
  name: string;
  role: string;
  headline: string;
  blurb: string;
  initials: string;
  status: string;
  skills: string[];
}

export const AGENTS: Record<"mentor" | "assessor", Agent> = {
  mentor: {
    key: "mentor",
    name: "AI Mentor",
    role: "Mentor",
    headline: "Explains, demos, walks you through it.",
    blurb: "Asks questions back, breaks ideas into pieces, never spoon-feeds.",
    initials: "Mi",
    status: "Available now",
    skills: ["Concepts", "Worked examples", "Socratic Q&A", "Code review"],
  },
  assessor: {
    key: "assessor",
    name: "AI Assessor",
    role: "Assessor",
    headline: "Quizzes you, grades you, points out the gaps.",
    blurb: "Mixes MCQs, short answers and code tasks. Gives a rubric, not a vibe.",
    initials: "Ax",
    status: "Ready when you are",
    skills: ["MCQ banks", "Code tasks", "Rubric scoring", "Gap reports"],
  },
};

// ─── quiz bank ──────────────────────────────────────────────────────────────
export interface QuizQuestion {
  id: number;
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Quiz {
  chapter: number;
  title: string;
  estMinutes: number;
  questions: QuizQuestion[];
}

const GENERIC_QUESTIONS = (chapter: number, topics: string[]): QuizQuestion[] => [
  {
    id: 1,
    prompt: `In one sentence, what is the core idea behind "${topics[0]}"?`,
    options: [
      "A way to make the model respond faster",
      "A reusable structure you design before the model runs",
      "A billing optimization for token usage",
      "A UI pattern for displaying responses",
    ],
    answer: 1,
    explain:
      "You design the structure first; the model fills it in. That gives you something typed to validate against.",
  },
  {
    id: 2,
    prompt: `Which of these is the strongest reason to use "${topics[1]}"?`,
    options: [
      "It looks more professional",
      "It removes the need for testing",
      "It makes failures loud and typed instead of silent",
      "It is required by every model provider",
    ],
    answer: 2,
    explain:
      "Loud, typed failures are recoverable. Silent bad output is the expensive kind of bug.",
  },
  {
    id: 3,
    prompt: `When would "${topics[2]}" hurt more than help?`,
    options: [
      "When the task is genuinely simple and bounded",
      "When you have a large evaluation set",
      "When latency does not matter at all",
      "It always helps, with no tradeoffs",
    ],
    answer: 0,
    explain:
      "Every pattern adds surface area. On a simple bounded task the extra machinery is just cost and risk.",
  },
  {
    id: 4,
    prompt: `A teammate skips "${topics[3]}" to ship faster. What is the most likely consequence?`,
    options: [
      "Nothing — it is optional polish",
      "A regression nobody catches until users do",
      "The model refuses to run",
      "Lower token cost with no downside",
    ],
    answer: 1,
    explain:
      "Skipping it trades a known cost now for an unknown, larger cost later — usually a silent regression.",
  },
  {
    id: 5,
    prompt: `Chapter ${chapter} in one line: which statement best captures it?`,
    options: [
      "Prompts are all you ever need",
      "Structure, validation, and evals turn vibes into systems",
      "Agents should never use tools",
      "Bigger models remove the need for design",
    ],
    answer: 1,
    explain:
      "The throughline of the course: design the contract, validate the output, measure with evals.",
  },
];

export function getQuiz(chapter: number): Quiz {
  const c = getChapter(chapter);
  const topics = c?.topics ?? ["the concept", "the technique", "the pattern", "the practice"];
  return {
    chapter,
    title: c?.title ?? `Chapter ${chapter}`,
    estMinutes: 18,
    questions: GENERIC_QUESTIONS(chapter, topics),
  };
}

// ─── dashboard / progress mock data ─────────────────────────────────────────
export const COHORT_PEERS = [
  { who: "Harry Joe", ch: "Ch. 6 · 94%", initials: "HJ" },
  { who: "Martha Jin", ch: "Ch. 5 · 91%", initials: "MJ" },
  { who: "Michal Chen", ch: "Ch. 7 · 88%", initials: "MC" },
  { who: "Diane Okafor", ch: "Ch. 4 · 89%", initials: "DO" },
];

export const RECENT_LESSONS = [
  { title: "Designing a tool schema", when: "2 minutes ago", score: "in progress", tone: "primary" as const },
  { title: "Strict JSON mode tradeoffs", when: "2 hours ago", score: "92%", tone: "ok" as const },
  { title: "Error reply patterns", when: "1 day ago", score: "88%", tone: "ok" as const },
  { title: "Tool naming under retries", when: "2 days ago", score: "74%", tone: "warn" as const },
];

export const TRENDING_CHAPTERS = [
  { title: "Multi-Agent Orchestration", meta: "Cohort 06 · 18 active", stars: 5 },
  { title: "Retrieval-Augmented Generation", meta: "Cohort 06 · 14 active", stars: 5 },
  { title: "Evaluation & Testing", meta: "Cohort 06 · 11 active", stars: 4 },
  { title: "Safety & Alignment", meta: "Cohort 06 · 9 active", stars: 4 },
];

// [mentor hrs, assessor count] per month
export const ACTIVITY: [number, number][] = [
  [2, 1], [4, 2], [9, 3], [5, 2], [3, 4], [4, 5],
  [6, 3], [5, 4], [4, 3], [3, 2], [2, 2], [7, 4],
];
export const ACTIVITY_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Seed messages for the AI Mentor chat.
export const MENTOR_SEED = [
  {
    from: "mentor" as const,
    text: "Hey Sara — picking up where we left off in chapter 3. Want to do a quick check before lesson 4.4, or jump straight into tool schemas?",
  },
  {
    from: "you" as const,
    text: "Let's do the quick check first.",
  },
  {
    from: "mentor" as const,
    text: "Good call. In one sentence: why does strict JSON mode help when a model calls a tool?",
  },
];

export const QUICK_PROMPTS = [
  "Explain tool schemas with a tiny example",
  "Quiz me on chapter 3",
  "Review my last code task",
  "What should I revisit before chapter 4?",
];

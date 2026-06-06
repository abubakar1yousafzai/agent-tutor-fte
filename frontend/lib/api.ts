// lib/api.ts — typed client for the FastAPI backend.
// Every backend shape here is verified against backend/routers + backend/models.
// No mock data: each function performs a real fetch against NEXT_PUBLIC_API_URL.

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

// ─── error type ──────────────────────────────────────────────────────────────
// `code === "premium_required"` is set when the backend returns 403 for a
// premium-gated chapter / quiz / agent. Pages use it to show the lock UI.
export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
  get isPremium() {
    return this.status === 403 || this.code === "premium_required";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    });
  } catch {
    throw new ApiError(0, "Cannot reach the server. Is the backend running on " + API_BASE + "?");
  }

  if (res.status === 204) return undefined as T;

  let body: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!res.ok) {
    // FastAPI puts errors under `detail`, which may be a string or an object
    // like { error: "premium_required", message | detail: "..." }.
    const detail = (body as { detail?: unknown })?.detail ?? body;
    let message = `Request failed (${res.status})`;
    let code: string | undefined;
    if (typeof detail === "string") {
      message = detail;
    } else if (detail && typeof detail === "object") {
      const d = detail as Record<string, string>;
      code = d.error;
      message = d.message || d.detail || message;
    }
    if (res.status === 403 && !code) code = "premium_required";
    throw new ApiError(res.status, message, code);
  }

  return body as T;
}

// ─── chapter id <-> route param helpers ──────────────────────────────────────
// Backend chapter ids are "chapter-01".."chapter-10". Routes use the plain
// number ("/chapters/4") for clean URLs; convert at the boundary.
export function chapterIdFromParam(param: string): string {
  if (/^\d+$/.test(param)) return `chapter-${param.padStart(2, "0")}`;
  return param;
}
export function chapterNumberFromId(id: string): number {
  const m = id.match(/(\d+)/);
  return m ? Number(m[1]) : 0;
}

// ─── types (mirror backend/models) ───────────────────────────────────────────
export type Tier = "free" | "premium";

export interface User {
  id: string;
  email: string;
  name: string;
  tier: Tier;
  streak_days: number;
  last_active: string | null;
  created_at: string;
}

export interface ChapterNavigation {
  id: string;
  number: number;
  title: string;
  tier_required: Tier;
  is_accessible: boolean;
}
export type ChapterSummary = ChapterNavigation;

export interface ChapterContent {
  id: string;
  number: number;
  title: string;
  content: string;
  next_chapter: ChapterNavigation | null;
  previous_chapter: ChapterNavigation | null;
}

export interface QuizQuestion {
  question_number: number;
  question: string;
  options: Record<string, string>; // { A, B, C, D }
}
export interface QuizQuestions {
  chapter_id: string;
  chapter_title: string;
  total_questions: number;
  questions: QuizQuestion[];
}
export type Letter = "A" | "B" | "C" | "D";
export interface QuizResult {
  chapter_id: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  wrong_question_numbers: number[];
}

export interface ChapterProgressItem {
  chapter_id: string;
  chapter_title: string;
  completed: boolean;
  completed_at: string | null;
  best_quiz_score: number | null;
}
export interface ProgressSummary {
  user_id: string;
  chapters_completed: number;
  total_accessible_chapters: number;
  completion_percentage: number;
  streak_days: number;
  last_active: string | null;
  chapter_progress: ChapterProgressItem[];
}
export interface StreakUpdate {
  user_id: string;
  chapter_id: string;
  streak_days: number;
  chapters_completed: number;
  message: string;
}

export interface SearchResult {
  chapter_id: string;
  chapter_title: string;
  chapter_number: number;
  excerpt: string;
}
export interface SearchResponse {
  query: string;
  results: SearchResult[];
  total: number;
}

export interface TierInfo {
  user_id: string;
  tier: Tier;
  free_chapters_count: number;
  total_chapters_accessible: number;
  locked_chapters_count: number;
}

export interface MentorResponse {
  mentor_response: string;
  chapters_referenced: string[];
  tools_used: string[];
  estimated_cost_usd: number;
}

export interface AssessResponse {
  score: number;
  max_score: number;
  grade: string;
  feedback: string;
  what_was_correct: string;
  what_was_missing: string;
  improvement_tip: string;
  estimated_cost_usd: number;
}

// ─── endpoints ───────────────────────────────────────────────────────────────
export const api = {
  // users / auth
  createUser: (email: string, name: string) =>
    request<User>("/users", { method: "POST", body: JSON.stringify({ email, name }) }),
  getUser: (userId: string) => request<User>(`/users/${userId}`),

  // chapters
  listChapters: (userId: string) =>
    request<ChapterSummary[]>(`/chapters?user_id=${userId}`),
  getChapterContent: (chapterId: string, userId: string) =>
    request<ChapterContent>(`/chapters/${chapterId}/content?user_id=${userId}`),
  getNextChapter: (chapterId: string, userId: string) =>
    request<ChapterNavigation | null>(`/chapters/${chapterId}/next?user_id=${userId}`),
  getPreviousChapter: (chapterId: string, userId: string) =>
    request<ChapterNavigation | null>(`/chapters/${chapterId}/previous?user_id=${userId}`),

  // quizzes
  getQuizQuestions: (chapterId: string, userId: string) =>
    request<QuizQuestions>(`/quizzes/${chapterId}/questions?user_id=${userId}`),
  submitQuiz: (chapterId: string, userId: string, answers: Record<string, Letter>) =>
    request<QuizResult>(`/quizzes/${chapterId}/submit?user_id=${userId}`, {
      method: "POST",
      body: JSON.stringify({ answers }),
    }),

  // progress
  getProgress: (userId: string) => request<ProgressSummary>(`/progress/${userId}`),
  completeChapter: (userId: string, chapterId: string) =>
    request<StreakUpdate>(`/progress/${userId}/chapters/${chapterId}/complete`, {
      method: "POST",
    }),

  // access
  checkAccess: (userId: string, chapterId: string) =>
    request<{ user_id: string; chapter_id: string; allowed: boolean; reason: string; upgrade_message: string | null }>(
      `/access/check?user_id=${userId}&chapter_id=${chapterId}`
    ),
  getTier: (userId: string) => request<TierInfo>(`/access/${userId}/tier`),

  // search
  search: (userId: string, q: string, limit = 10) =>
    request<SearchResponse>(`/search?user_id=${userId}&q=${encodeURIComponent(q)}&limit=${limit}`),

  // hybrid agents (premium)
  mentor: (userId: string, question: string) =>
    request<MentorResponse>(`/hybrid/mentor`, {
      method: "POST",
      body: JSON.stringify({ user_id: userId, question }),
    }),
  assess: (userId: string, chapterId: string, question: string, studentAnswer: string) =>
    request<AssessResponse>(`/hybrid/assess`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        chapter_id: chapterId,
        question,
        student_answer: studentAnswer,
      }),
    }),
};

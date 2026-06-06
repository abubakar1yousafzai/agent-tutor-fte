"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { api, type QuizQuestions, type QuizResult, type Letter } from "@/lib/api";

type Phase = "intro" | "playing" | "result";
const LETTERS: Letter[] = ["A", "B", "C", "D"];

export function QuizRunner({
  quiz,
  userId,
  chapterId,
}: {
  quiz: QuizQuestions;
  userId: string;
  chapterId: string;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Letter>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = quiz.total_questions;
  const q = quiz.questions[current];
  const chosen = answers[String(q?.question_number)];

  function choose(letter: Letter) {
    setAnswers((a) => ({ ...a, [String(q.question_number)]: letter }));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.submitQuiz(chapterId, userId, answers);
      setResult(res);
      setPhase("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  // ─── intro ──────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-[640px]">
        <div className="rounded-2xl border border-line bg-surface p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primaryDeep text-base font-semibold text-white">Ax</div>
          <h2 className="mt-4 font-serif text-3xl text-ink">{quiz.chapter_title}</h2>
          <p className="mx-auto mt-2 max-w-[420px] text-[13.5px] leading-relaxed text-inkSoft">
            AI Assessor will grade you against the chapter rubric. {total} questions. You need 4/{total} to pass.
          </p>
          <button onClick={() => setPhase("playing")} className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30">
            Start assessment →
          </button>
        </div>
      </div>
    );
  }

  // ─── result ─────────────────────────────────────────────────────────────
  if (phase === "result" && result) {
    const pct = result.percentage;
    return (
      <div className="mx-auto max-w-[640px]">
        <div className="rounded-2xl border border-line bg-surface p-8 text-center">
          <div className="text-[11px] uppercase tracking-wide text-inkMute">AI Assessor · result</div>
          <div className={`tnum mt-3 font-serif text-7xl leading-none ${result.passed ? "text-ok" : "text-warn"}`}>{pct}</div>
          <div className="mt-1 text-sm text-inkSoft">{result.score} / {result.total} correct</div>
          <div className={`mx-auto mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold ${result.passed ? "bg-ok/10 text-ok" : "bg-warn/10 text-warn"}`}>
            {result.passed ? "✓ Passed — nicely done" : "Almost — review and retry"}
          </div>
          {result.wrong_question_numbers.length > 0 && (
            <div className="mx-auto mt-5 max-w-[420px] rounded-xl border border-line bg-surfaceAlt p-4 text-left">
              <div className="text-[12px] font-semibold text-ink">Revisit these questions</div>
              <div className="mt-1 text-[12.5px] text-inkSoft">
                Questions {result.wrong_question_numbers.join(", ")} — take them back to AI Mentor before retrying.
              </div>
            </div>
          )}
        </div>
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => { setAnswers({}); setCurrent(0); setResult(null); setPhase("intro"); }}
            className="rounded-[10px] border border-line bg-surface px-5 py-3 text-[13px] font-semibold text-inkSoft hover:text-ink"
          >
            Retake assessment
          </button>
          <Link href="/mentor" className="inline-flex items-center gap-2 rounded-[10px] bg-primary px-5 py-3 text-[13px] font-semibold text-white">
            <Icon name="chat" size={14} /> Review with AI Mentor
          </Link>
        </div>
      </div>
    );
  }

  // ─── playing ────────────────────────────────────────────────────────────
  const answeredCount = Object.keys(answers).length;
  const isLast = current + 1 >= total;
  return (
    <div className="mx-auto max-w-[680px]">
      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-[12px] text-inkMute">
          <span>Question {current + 1} of {total}</span>
          <span className="tnum">{answeredCount}/{total} answered</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded bg-line">
          <div className="h-full bg-primary transition-all" style={{ width: `${((current + 1) / total) * 100}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="text-[17px] font-semibold leading-snug text-ink">{q.question}</div>
        <div className="mt-4 flex flex-col gap-2.5">
          {LETTERS.filter((l) => q.options[l]).map((letter) => {
            const active = chosen === letter;
            return (
              <button
                key={letter}
                onClick={() => choose(letter)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[13.5px] text-ink transition-colors ${
                  active ? "border-primary/60 bg-primary/10" : "border-line bg-surfaceAlt hover:border-primary/40"
                }`}
              >
                <span className={`grid h-6 w-6 flex-none place-items-center rounded-full border text-[11px] font-semibold ${active ? "border-primary bg-primary text-white" : "border-line text-inkMute"}`}>
                  {letter}
                </span>
                {q.options[letter]}
              </button>
            );
          })}
        </div>
      </div>

      {error && <div className="mt-3 rounded-lg bg-warn/10 px-3 py-2 text-[12.5px] text-warn">{error}</div>}

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="rounded-[10px] border border-line bg-surface px-4 py-3 text-[13px] font-semibold text-inkSoft disabled:opacity-40"
        >
          ← Back
        </button>
        {isLast ? (
          <button
            onClick={submit}
            disabled={submitting || answeredCount < total}
            className="inline-flex items-center gap-2 rounded-[10px] bg-primary px-6 py-3 text-[13px] font-semibold text-white shadow-lg shadow-primary/30 disabled:opacity-40"
          >
            {submitting ? "Grading…" : "Submit for grading"} →
          </button>
        ) : (
          <button
            onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
            disabled={!chosen}
            className="inline-flex items-center gap-2 rounded-[10px] bg-primary px-6 py-3 text-[13px] font-semibold text-white shadow-lg shadow-primary/30 disabled:opacity-40"
          >
            Next question →
          </button>
        )}
      </div>
    </div>
  );
}

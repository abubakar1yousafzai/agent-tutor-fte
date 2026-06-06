"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon, LockIcon } from "./icons";
import { api, ApiError, type AssessResponse } from "@/lib/api";
import { getUserId } from "@/lib/session";

// Wires POST /hybrid/assess — AI Assessor grades a free-text answer against the
// chapter content. Premium-gated, so a free user gets the upgrade prompt.
export function AssessorPanel({ chapterId, chapterTitle }: { chapterId: string; chapterTitle: string }) {
  const question = `In your own words, explain the core idea of "${chapterTitle}".`;
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AssessResponse | null>(null);

  async function grade() {
    const userId = getUserId();
    if (!userId || !answer.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.assess(userId, chapterId, question, answer.trim());
      setResult(res);
    } catch (e) {
      if (e instanceof ApiError && e.isPremium) setBlocked(true);
      else setError(e instanceof Error ? e.message : "Grading failed");
    } finally {
      setLoading(false);
    }
  }

  if (blocked) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-[18px]">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary"><LockIcon size={16} /></div>
          <div className="text-[13px] font-semibold text-ink">AI Assessor is a Pro feature</div>
        </div>
        <p className="mt-2 text-[12.5px] text-inkSoft">Upgrade to get AI-graded feedback on written answers.</p>
        <Link href="/upgrade" className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-primary px-3 py-2.5 text-[12.5px] font-semibold text-white">
          <LockIcon size={13} strokeWidth={2.2} /> Upgrade to Pro
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-[18px]">
      <div className="flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-primaryDeep text-[13px] font-semibold text-white">Ax</div>
        <div>
          <div className="text-[13px] font-semibold text-ink">AI Assessor · written answer</div>
          <div className="text-[11px] text-inkMute">Get graded feedback, not a vibe</div>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-surfaceAlt px-3 py-2 text-[12.5px] text-inkSoft">{question}</div>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={4}
        placeholder="Type your answer…"
        className="mt-2 w-full resize-none rounded-[10px] border border-line bg-surfaceAlt px-3 py-2.5 text-[13px] text-ink outline-none placeholder:text-inkMute focus:border-primary/50"
      />
      {error && <div className="mt-2 rounded-lg bg-warn/10 px-3 py-2 text-[12px] text-warn">{error}</div>}
      <button
        onClick={grade}
        disabled={loading || !answer.trim()}
        className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-primary px-3 py-2.5 text-[12.5px] font-semibold text-white disabled:opacity-50"
      >
        <Icon name="check" size={14} strokeWidth={2.2} /> {loading ? "Grading…" : "Grade my answer"}
      </button>

      {result && (
        <div className="mt-3 rounded-xl border border-line bg-surfaceAlt p-3">
          <div className="flex items-baseline justify-between">
            <div className="text-[12px] font-semibold text-ink">Grade: {result.grade}</div>
            <div className="tnum text-[12px] text-inkMute">{result.score}/{result.max_score}</div>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-inkSoft">{result.feedback}</p>
          <div className="mt-2 space-y-1 text-[12px]">
            <div className="text-ok"><span className="font-semibold">✓ Correct:</span> {result.what_was_correct}</div>
            <div className="text-warn"><span className="font-semibold">△ Missing:</span> {result.what_was_missing}</div>
            <div className="text-inkSoft"><span className="font-semibold text-ink">Tip:</span> {result.improvement_tip}</div>
          </div>
        </div>
      )}
    </div>
  );
}

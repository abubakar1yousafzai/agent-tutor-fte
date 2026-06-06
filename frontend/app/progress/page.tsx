"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Donut } from "@/components/Donut";
import { Spinner, ErrorBox } from "@/components/states";
import { useApi } from "@/lib/useApi";
import { api, chapterNumberFromId, type ProgressSummary } from "@/lib/api";
import { getUserId } from "@/lib/session";

function Stats({ p }: { p: ProgressSummary }) {
  const assessed = p.chapter_progress.filter((c) => c.best_quiz_score != null);
  const avg = assessed.length
    ? Math.round(assessed.reduce((a, c) => a + (c.best_quiz_score || 0), 0) / assessed.length * 20)
    : 0;
  const stats = [
    { k: "Course progress", v: `${p.completion_percentage}%`, sub: `${p.chapters_completed} of ${p.total_accessible_chapters} chapters`, pct: p.completion_percentage, color: "var(--primary)", track: "var(--primary-tint)" },
    { k: "Average score", v: `${avg}%`, sub: "across assessments", pct: avg, color: "var(--ok)", track: "#7dc79d33" },
    { k: "Chapters done", v: `${p.chapters_completed}`, sub: `of ${p.total_accessible_chapters}`, pct: p.total_accessible_chapters ? Math.round(p.chapters_completed / p.total_accessible_chapters * 100) : 0, color: "var(--primary-deep)", track: "var(--primary-tint)" },
    { k: "Day streak", v: `${p.streak_days}`, sub: "keep it going 🔥", pct: Math.min(p.streak_days * 7, 100), color: "var(--warn)", track: "#e8b86833" },
  ];
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <div key={s.k} className="flex items-center justify-between gap-3.5 rounded-2xl border border-line bg-surface p-[18px]">
          <div>
            <div className="text-xs font-medium text-inkMute">{s.k}</div>
            <div className="tnum mt-1.5 text-[26px] font-bold tracking-tight text-ink">{s.v}</div>
            <div className="mt-1 text-[11px] text-inkMute">{s.sub}</div>
          </div>
          <Donut value={s.pct} color={s.color} track={s.track} />
        </div>
      ))}
    </div>
  );
}

export default function ProgressPage() {
  const userId = getUserId();
  const { data: p, loading, error } = useApi(() => api.getProgress(userId as string), [userId]);

  return (
    <AppShell title="Progress" subtitle="Your learning journey">
      {loading && <Spinner label="Loading your progress…" />}
      {error && <ErrorBox message={error.message} />}

      {p && (
        <>
          <Stats p={p} />

          <div className="rounded-2xl border border-line bg-surface p-[18px]">
            <div className="mb-4 text-sm font-bold text-ink">Chapter-by-chapter</div>
            <div className="flex flex-col gap-3">
              {p.chapter_progress.map((c) => {
                const num = chapterNumberFromId(c.chapter_id);
                const pct = c.completed ? 100 : c.best_quiz_score != null ? 50 : 0;
                return (
                  <Link key={c.chapter_id} href={`/chapters/${num}`} className="group flex items-center gap-3">
                    <div className="tnum w-7 flex-none text-center font-serif text-base text-primary">{String(num).padStart(2, "0")}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-[12.5px] font-medium text-ink group-hover:text-primary">{c.chapter_title}</span>
                        <span className="tnum flex-none text-[11px] text-inkMute">
                          {c.completed ? "Completed" : c.best_quiz_score != null ? `Quiz ${c.best_quiz_score}/5` : "Not started"}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded bg-line">
                        <div className={`h-full ${c.completed ? "bg-ok" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* assessment scores from best quiz score per chapter */}
          <div className="rounded-2xl border border-line bg-surface p-[18px]">
            <div className="mb-1 text-sm font-bold text-ink">Assessment scores</div>
            <div className="mb-4 text-[11.5px] text-inkMute">Best quiz score per attempted chapter (out of 5)</div>
            {p.chapter_progress.some((c) => c.best_quiz_score != null) ? (
              <div className="flex h-[200px] items-end gap-3">
                {p.chapter_progress
                  .filter((c) => c.best_quiz_score != null)
                  .map((c) => {
                    const score = c.best_quiz_score || 0;
                    return (
                      <div key={c.chapter_id} className="flex flex-1 flex-col items-center gap-2">
                        <div className="tnum text-[11px] font-semibold text-inkSoft">{score}</div>
                        <div className={`w-full rounded-t ${score >= 4 ? "bg-primary" : "bg-warn"}`} style={{ height: `${(score / 5) * 150}px` }} />
                        <div className="text-[10px] text-inkMute">Ch.{chapterNumberFromId(c.chapter_id)}</div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="py-8 text-center text-[13px] text-inkMute">No assessments taken yet. Finish a chapter and take its quiz.</div>
            )}
          </div>
        </>
      )}
    </AppShell>
  );
}

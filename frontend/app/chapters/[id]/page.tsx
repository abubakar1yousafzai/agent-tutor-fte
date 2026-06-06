"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/icons";
import { Markdown } from "@/components/Markdown";
import { AssessorPanel } from "@/components/AssessorPanel";
import { Spinner, ErrorBox, PremiumLock } from "@/components/states";
import { AGENTS } from "@/lib/data";
import { useApi } from "@/lib/useApi";
import { api, chapterIdFromParam, type ChapterNavigation } from "@/lib/api";
import { getUserId } from "@/lib/session";

function NavLink({ nav, dir }: { nav: ChapterNavigation | null; dir: "prev" | "next" }) {
  if (!nav) return <span />;
  return (
    <Link
      href={`/chapters/${nav.number}`}
      className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-[12.5px] text-inkSoft hover:text-ink"
    >
      {dir === "prev" && <Icon name="arrowRight" size={14} className="rotate-180" />}
      <span className="hidden sm:inline">
        Ch. {nav.number} · {nav.title}
      </span>
      <span className="sm:hidden">{dir === "prev" ? "Previous" : "Next"}</span>
      {dir === "next" && <Icon name="arrowRight" size={14} />}
    </Link>
  );
}

export default function ChapterDetailPage({ params }: { params: { id: string } }) {
  const userId = getUserId();
  const chapterId = chapterIdFromParam(params.id);
  const { data, loading, error } = useApi(
    () => api.getChapterContent(chapterId, userId as string),
    [chapterId, userId]
  );

  const [completing, setCompleting] = useState(false);
  const [completeMsg, setCompleteMsg] = useState<string | null>(null);

  async function markComplete() {
    if (!userId) return;
    setCompleting(true);
    try {
      const res = await api.completeChapter(userId, chapterId);
      setCompleteMsg(res.message);
    } catch (e) {
      setCompleteMsg(e instanceof Error ? e.message : "Failed");
    } finally {
      setCompleting(false);
    }
  }

  return (
    <AppShell title={`Chapter ${params.id}`} subtitle={data?.title}>
      <div className="mb-1 flex items-center gap-2 text-[12.5px] text-inkMute">
        <Link href="/chapters" className="hover:text-ink">Chapters</Link>
        <span>/</span>
        <span className="text-inkSoft">Chapter {params.id}</span>
      </div>

      {loading && <Spinner label="Loading chapter…" />}

      {/* 403 premium gate shows the lock UI */}
      {error && error.isPremium && (
        <PremiumLock message="This chapter requires Pro. Upgrade to unlock all 10 chapters and the full quiz bank." />
      )}
      {error && !error.isPremium && <ErrorBox message={error.message} />}

      {data && (
        <>
          <div className="grid gap-3.5 lg:grid-cols-[1.7fr_1fr]">
            {/* content */}
            <article className="rounded-2xl border border-line bg-surface p-6 md:p-8">
              <div className="text-[11px] uppercase tracking-wide text-primary">Chapter {data.number}</div>
              <Markdown content={data.content} />

              <div className="mt-6 flex flex-col items-start gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={markComplete}
                  disabled={completing}
                  className="inline-flex items-center gap-2 rounded-[10px] bg-ok/15 px-4 py-2.5 text-[13px] font-semibold text-ok disabled:opacity-50"
                >
                  <Icon name="check" size={15} strokeWidth={2.2} />
                  {completing ? "Saving…" : "Mark chapter complete"}
                </button>
                {completeMsg && <span className="text-[12.5px] text-inkSoft">{completeMsg}</span>}
              </div>
            </article>

            {/* side actions */}
            <div className="flex flex-col gap-3.5">
              <div className="rounded-2xl border border-line bg-surface p-[18px]">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-primaryDeep text-[13px] font-semibold text-white">
                    {AGENTS.assessor.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-ink">{AGENTS.assessor.name}</div>
                    <div className="text-[11px] text-inkMute">Graded MCQ assessment</div>
                  </div>
                </div>
                <p className="mt-3 text-[12.5px] leading-relaxed text-inkSoft">
                  Ready to be graded? AI Assessor runs the chapter quiz and reports your score.
                </p>
                <Link
                  href={`/quiz/${data.number}`}
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-primary px-3 py-2.5 text-[12.5px] font-semibold text-white"
                >
                  <Icon name="check" size={14} strokeWidth={2.2} /> Take the assessment
                </Link>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-[18px]">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-[13px] font-semibold text-white">
                    {AGENTS.mentor.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-ink">{AGENTS.mentor.name}</div>
                    <div className="text-[11px] text-inkMute">{AGENTS.mentor.headline}</div>
                  </div>
                </div>
                <p className="mt-3 text-[12.5px] leading-relaxed text-inkSoft">
                  Stuck on a concept? Ask AI Mentor for a worked example.
                </p>
                <Link
                  href="/mentor"
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] border border-primary/50 px-3 py-2.5 text-[12.5px] font-semibold text-primary"
                >
                  <Icon name="chat" size={14} /> Ask AI Mentor
                </Link>
              </div>

              <AssessorPanel chapterId={chapterId} chapterTitle={data.title} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <NavLink nav={data.previous_chapter} dir="prev" />
            <NavLink nav={data.next_chapter} dir="next" />
          </div>
        </>
      )}
    </AppShell>
  );
}

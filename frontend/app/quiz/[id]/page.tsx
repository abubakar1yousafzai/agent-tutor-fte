"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { QuizRunner } from "@/components/QuizRunner";
import { Spinner, ErrorBox, PremiumLock } from "@/components/states";
import { useApi } from "@/lib/useApi";
import { api, chapterIdFromParam } from "@/lib/api";
import { getUserId } from "@/lib/session";

export default function QuizPage({ params }: { params: { id: string } }) {
  const userId = getUserId();
  const chapterId = chapterIdFromParam(params.id);
  const { data, loading, error } = useApi(
    () => api.getQuizQuestions(chapterId, userId as string),
    [chapterId, userId]
  );

  return (
    <AppShell title="Assessment" subtitle={`Chapter ${params.id} · graded by AI Assessor`}>
      <div className="mb-1 flex items-center gap-2 text-[12.5px] text-inkMute">
        <Link href="/chapters" className="hover:text-ink">Chapters</Link>
        <span>/</span>
        <Link href={`/chapters/${params.id}`} className="hover:text-ink">Chapter {params.id}</Link>
        <span>/</span>
        <span className="text-inkSoft">Assessment</span>
      </div>

      {loading && <Spinner label="Loading the assessment…" />}
      {error && error.isPremium && (
        <PremiumLock message="This quiz requires Pro. Upgrade to unlock the full quiz bank." />
      )}
      {error && !error.isPremium && <ErrorBox message={error.message} />}
      {data && <QuizRunner quiz={data} userId={userId as string} chapterId={chapterId} />}
    </AppShell>
  );
}

"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Donut } from "@/components/Donut";
import { Icon, LockIcon, Stars } from "@/components/icons";
import { ProBadge } from "@/components/ProBadge";
import { Spinner, ErrorBox } from "@/components/states";
import {
  AGENTS,
  PLANS,
  COHORT_PEERS,
  RECENT_LESSONS,
  TRENDING_CHAPTERS,
  ACTIVITY,
  ACTIVITY_MONTHS,
} from "@/lib/data";
import { useApi } from "@/lib/useApi";
import { api, type ProgressSummary, type ChapterSummary } from "@/lib/api";
import { getUser, getUserId, isPremium } from "@/lib/session";

// ── small demo-only widgets (no backend data source) ────────────────────────
function ActivityChart() {
  const max = 12;
  return (
    <div className="rounded-2xl border border-line bg-surface p-[18px]">
      <div className="mb-3.5 flex items-start justify-between">
        <div>
          <div className="text-base font-bold tracking-tight text-ink">Learning activity</div>
          <div className="mt-2 flex flex-wrap gap-4 text-[11.5px] text-inkSoft">
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-primary" /> AI Mentor sessions (hrs)</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-warn" /> AI Assessor assessments</span>
          </div>
        </div>
      </div>
      <div className="grid h-[230px] grid-cols-[36px_1fr] gap-2">
        <div className="tnum flex flex-col justify-between pb-7 pt-1.5 text-right text-[10px] text-inkMute">
          <span>+12</span><span>+9</span><span>+6</span><span>+3</span><span>0</span>
        </div>
        <div className="relative">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="absolute left-0 right-0 border-t border-dashed border-line" style={{ top: `${i * 25}%` }} />
          ))}
          <div className="absolute inset-x-0 bottom-7 top-0 grid items-end" style={{ gridTemplateColumns: `repeat(${ACTIVITY.length}, 1fr)` }}>
            {ACTIVITY.map(([m, a], i) => (
              <div key={i} className="flex h-full items-end justify-center gap-[3px]">
                <div className="w-[7px] rounded-t bg-primary" style={{ height: `${(m / max) * 100}%` }} />
                <div className="w-[7px] rounded-t bg-warn" style={{ height: `${(a / max) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 grid pt-2 text-center text-[10px] text-inkMute" style={{ gridTemplateColumns: `repeat(${ACTIVITY_MONTHS.length}, 1fr)` }}>
            {ACTIVITY_MONTHS.map((m) => <div key={m}>{m}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function LatestCohort() {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-surface p-[18px]">
      <div className="mb-3 flex items-baseline justify-between">
        <div className="text-sm font-bold text-ink">Latest cohort</div>
        <span className="text-[11px] font-semibold text-primary">See all</span>
      </div>
      {COHORT_PEERS.map((p, i) => (
        <div key={p.who} className={`flex items-center gap-2.5 py-2.5 ${i ? "border-t border-line" : ""}`}>
          <div className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gradient-to-br from-primary to-primaryDeep text-xs font-semibold text-white">{p.initials}</div>
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-semibold text-ink">{p.who}</div>
            <div className="text-[11px] text-inkMute">{p.ch}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const toneClass = { primary: "bg-primary/10 text-primary", ok: "bg-ok/10 text-ok", warn: "bg-warn/10 text-warn" };

function RecentLessons() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-[18px]">
      <div className="mb-3 flex items-baseline justify-between">
        <div className="text-sm font-bold text-ink">Recent lessons</div>
        <span className="text-[11px] font-semibold text-primary">See all</span>
      </div>
      {RECENT_LESSONS.map((it, i) => (
        <div key={i} className={`flex items-center gap-2.5 py-2.5 ${i ? "border-t border-line" : ""}`}>
          <div className="grid h-9 w-9 flex-none place-items-center rounded-[9px] bg-primaryTint text-primaryDeep"><Icon name="doc" size={16} /></div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.5px] font-semibold text-ink">{it.title}</div>
            <div className="mt-1 flex items-center gap-2">
              <span className={`whitespace-nowrap rounded-full px-[7px] py-0.5 text-[10.5px] font-semibold ${toneClass[it.tone]}`}>{it.score}</span>
              <span className="truncate text-[11px] text-inkMute">{it.when}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrendingChapters() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-[18px]">
      <div className="mb-3 flex items-baseline justify-between">
        <div className="text-sm font-bold text-ink">Trending chapters</div>
        <span className="text-[11px] font-semibold text-primary">See all</span>
      </div>
      {TRENDING_CHAPTERS.map((it, i) => (
        <div key={i} className={`flex items-center gap-2.5 py-2.5 ${i ? "border-t border-line" : ""}`}>
          <div className="grid h-9 w-9 flex-none place-items-center rounded-[9px] bg-gradient-to-br from-primary/20 to-primaryDeep/20 text-primaryDeep"><Icon name="trend" size={16} /></div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.5px] font-semibold text-ink">{it.title}</div>
            <div className="mt-1 flex items-center gap-2"><Stars n={it.stars} /><span className="truncate text-[11px] text-inkMute">{it.meta}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AgentsStatus({ locked }: { locked: boolean }) {
  const rows = [
    { ...AGENTS.mentor, accent: "bg-primary", load: 38, queue: "2 in queue" },
    { ...AGENTS.assessor, accent: "bg-primaryDeep", load: 64, queue: "1 rubric running" },
  ];
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-[18px]">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-bold text-ink">Your AI tutors</div>
        {locked ? <ProBadge tone="solid" /> : <span className="rounded-full bg-ok/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-ok">BOTH ONLINE</span>}
      </div>
      {locked && <div className="-mt-0.5 text-xs leading-snug text-inkSoft">AI Mentor and AI Assessor are part of Pro. Upgrade to learn with a mentor and get graded as you go.</div>}
      {rows.map((a) => (
        <div key={a.name} className="rounded-xl border border-line bg-surfaceAlt p-3">
          <div className="flex items-center gap-2.5">
            <div className={`grid h-9 w-9 place-items-center rounded-full text-[13px] font-semibold text-white ${locked ? "bg-line text-inkMute" : a.accent}`}>{locked ? <LockIcon size={15} /> : a.initials}</div>
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-semibold text-ink">{a.name} <span className="font-normal text-inkMute">· {a.role}</span></div>
              <div className="text-[10.5px] text-inkMute">{locked ? a.headline : a.queue}</div>
            </div>
            {locked ? <LockIcon size={15} className="text-inkMute" /> : <Link href="/mentor" className="rounded-[7px] border border-primary/50 bg-surface px-2.5 py-1 text-[10.5px] font-semibold text-primary">Open</Link>}
          </div>
        </div>
      ))}
      {locked && (
        <Link href="/upgrade" className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-primary px-3 py-2.5 text-[12.5px] font-bold text-white">
          <LockIcon size={13} strokeWidth={2.2} /> Unlock AI Mentor &amp; AI Assessor — {PLANS.pro.priceLabel}{PLANS.pro.per}
        </Link>
      )}
    </div>
  );
}

function UpgradeBanner() {
  const perks = ["Chapters 4–10", "AI Mentor · mentor", "AI Assessor · assessor", "Unlimited sessions"];
  return (
    <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primaryDeep p-6 text-white shadow-xl shadow-primary/25 md:flex-row md:items-center">
      <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(70% 120% at 100% 0%, var(--primary-deep) 0%, transparent 55%)" }} />
      <div className="relative min-w-0">
        <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10.5px] font-bold tracking-[0.08em]"><LockIcon size={12} strokeWidth={2.2} /> YOU&apos;RE ON THE FREE PLAN</div>
        <div className="max-w-[460px] font-serif text-[26px] leading-tight">Unlock the full course + both AI tutors</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {perks.map((p) => (<span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11.5px] font-medium"><span className="h-1 w-1 rounded-full bg-white" />{p}</span>))}
        </div>
      </div>
      <div className="relative flex-none text-right">
        <div className="tnum text-3xl font-bold leading-none">{PLANS.pro.priceLabel}<span className="text-sm font-medium opacity-85">{PLANS.pro.per}</span></div>
        <Link href="/upgrade" className="mt-3 inline-block whitespace-nowrap rounded-[10px] bg-white px-5 py-2.5 text-[13.5px] font-bold text-primaryDeep">Upgrade to Pro →</Link>
        <div className="mt-2 text-[10.5px] opacity-80">Cancel anytime · keep your progress</div>
      </div>
    </div>
  );
}

function KPIRow({ progress, chapters }: { progress: ProgressSummary; chapters: ChapterSummary[] }) {
  const assessed = progress.chapter_progress.filter((c) => c.best_quiz_score != null);
  const avgScore = assessed.length
    ? Math.round(assessed.reduce((a, c) => a + (c.best_quiz_score || 0), 0) / assessed.length * 20) // score out of 5 → %
    : 0;
  const firstLocked = chapters.find((c) => !c.is_accessible);
  const completedIds = new Set(progress.chapter_progress.filter((c) => c.completed).map((c) => c.chapter_id));
  const nextOpen = chapters.find((c) => c.is_accessible && !completedIds.has(c.id));

  const kpis = [
    { k: "Chapters mastered", v: `${progress.chapters_completed} / ${progress.total_accessible_chapters}`, pct: progress.completion_percentage, sub: "your progress", color: "var(--primary)", track: "var(--primary-tint)" },
    { k: "Day streak", v: `${progress.streak_days}`, pct: Math.min(progress.streak_days * 7, 100), sub: "keep it going 🔥", color: "var(--warn)", track: "#e8b86833" },
    { k: "Assessments", v: `${assessed.length}`, pct: avgScore, sub: "avg score", color: "var(--ok)", track: "#7dc79d33" },
  ];

  return (
    <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((it) => (
        <div key={it.k} className="flex items-center justify-between gap-3.5 rounded-2xl border border-line bg-surface p-[18px]">
          <div>
            <div className="text-xs font-medium text-inkMute">{it.k}</div>
            <div className="tnum mt-1.5 text-[26px] font-bold tracking-tight text-ink">{it.v}</div>
            <div className="mt-1 text-[11px] text-inkMute">{it.sub}</div>
          </div>
          <Donut value={it.pct} color={it.color} track={it.track} />
        </div>
      ))}
      {firstLocked ? (
        <div className="relative overflow-hidden rounded-2xl bg-primary p-[18px] text-white shadow-xl shadow-primary/30">
          <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: "radial-gradient(120% 90% at 100% 0%, var(--primary-deep) 0%, transparent 60%)" }} />
          <div className="relative">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10.5px] font-bold tracking-[0.08em]"><LockIcon size={11} strokeWidth={2.1} /> PRO</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="tnum grid h-10 w-10 place-items-center rounded-[9px] bg-white/20 font-serif text-xl">{String(firstLocked.number).padStart(2, "0")}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold">{firstLocked.title}</div>
                <div className="mt-0.5 text-[11px] opacity-85">Next up · locked</div>
              </div>
            </div>
            <Link href="/upgrade" className="mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-[9px] bg-white px-3 py-2.5 text-[12.5px] font-bold text-primaryDeep"><LockIcon size={13} strokeWidth={2.2} /> Upgrade to unlock</Link>
          </div>
        </div>
      ) : nextOpen ? (
        <div className="rounded-2xl border border-line bg-surface p-[18px]">
          <div className="mb-2.5 text-xs font-medium text-inkMute">Today&apos;s focus</div>
          <div className="text-[13px] font-semibold text-ink">{nextOpen.title}</div>
          <Link href={`/chapters/${nextOpen.number}`} className="mt-3 block rounded-[9px] bg-primary py-2 text-center text-[12.5px] font-semibold text-white">Resume lesson</Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-surface p-[18px]">
          <div className="mb-2.5 text-xs font-medium text-inkMute">All done 🎉</div>
          <div className="text-[13px] font-semibold text-ink">You&apos;ve completed everything available.</div>
        </div>
      )}
    </div>
  );
}

function ChapterArea({ progress, chapters }: { progress: ProgressSummary; chapters: ChapterSummary[] }) {
  const completedIds = new Set(progress.chapter_progress.filter((c) => c.completed).map((c) => c.chapter_id));
  return (
    <div className="rounded-2xl border border-line bg-surface p-[18px]">
      <div className="mb-3.5 flex items-baseline justify-between">
        <div>
          <div className="text-base font-bold tracking-tight text-ink">All chapters</div>
          <div className="mt-0.5 text-xs text-inkMute">{chapters.filter((c) => c.is_accessible).length} of {chapters.length} unlocked</div>
        </div>
        <Link href="/chapters" className="text-[11px] font-semibold text-primary">View all →</Link>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {chapters.map((c) => {
          const locked = !c.is_accessible;
          const done = completedIds.has(c.id);
          return (
            <Link key={c.id} href={`/chapters/${c.number}`} className="relative flex min-h-[142px] flex-col justify-between overflow-hidden rounded-xl border border-line bg-surface p-3.5 text-ink hover:border-primary/40">
              <div>
                <div className="flex items-center justify-between">
                  <div className={`tnum font-serif text-[26px] leading-none ${locked ? "text-inkMute opacity-40" : "opacity-90"}`}>{String(c.number).padStart(2, "0")}</div>
                  {done && <span className="rounded-full bg-ok/10 px-[7px] py-0.5 text-[10px] font-bold text-ok">✓ DONE</span>}
                  {locked && <ProBadge />}
                </div>
                <div className={`mt-3 text-[12.5px] font-semibold leading-tight ${locked ? "text-inkSoft" : ""}`}>{c.title}</div>
              </div>
              {locked ? (
                <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-inkMute"><LockIcon size={12} /> Unlock with Pro</div>
              ) : (
                <div className="tnum text-[10px] capitalize opacity-65">{c.tier_required} chapter</div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const userId = getUserId();
  const user = getUser();
  const locked = !isPremium(user);

  const { data, loading, error } = useApi(
    async () => {
      const [progress, chapters] = await Promise.all([
        api.getProgress(userId as string),
        api.listChapters(userId as string),
      ]);
      return { progress, chapters };
    },
    [userId]
  );

  return (
    <AppShell title="Dashboard" subtitle={user ? `Welcome back, ${user.name.split(" ")[0]}` : undefined}>
      {locked && <UpgradeBanner />}
      {loading && <Spinner label="Loading your dashboard…" />}
      {error && <ErrorBox message={error.message} />}
      {data && (
        <>
          <KPIRow progress={data.progress} chapters={data.chapters} />
          <div className="grid gap-3.5 lg:grid-cols-3">
            <div className="lg:col-span-2"><ActivityChart /></div>
            <LatestCohort />
          </div>
          <div className="grid gap-3.5 lg:grid-cols-3">
            <RecentLessons />
            <TrendingChapters />
            <AgentsStatus locked={locked} />
          </div>
          <ChapterArea progress={data.progress} chapters={data.chapters} />
        </>
      )}
    </AppShell>
  );
}

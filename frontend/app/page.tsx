import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { AnimatedAgent } from "@/components/AnimatedAgent";
import { FAQ } from "@/components/landing/FAQ";
import { LockIcon } from "@/components/icons";
import { CHAPTERS, AGENTS, chapterLocked, PLANS } from "@/lib/data";

function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="text-center">
      <div className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-primary">
        {eyebrow}
      </div>
      <h2 className="mx-auto mt-3 max-w-[720px] font-serif text-3xl leading-[1.05] text-ink md:text-[44px]">
        {title}
      </h2>
      {sub && (
        <p className="mx-auto mt-3 max-w-[580px] text-[15px] leading-relaxed text-inkSoft">{sub}</p>
      )}
    </div>
  );
}

// ─── hero floating cards ─────────────────────────────────────────────────────
function HeroFloatCards() {
  return (
    <>
      <div className="absolute -left-[60px] top-2 hidden w-[236px] rounded-2xl border border-line bg-surface p-3 shadow-2xl lg:block">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="grid h-[26px] w-[26px] place-items-center rounded-full bg-primary text-[10px] font-semibold text-white">
            Mi
          </div>
          <div className="text-[11px] text-inkSoft">
            <b className="text-ink">AI Mentor</b> · Mentor
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold text-ok">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            teaching
          </span>
        </div>
        <div className="rounded-xl rounded-tl-[3px] bg-primary/10 px-[11px] py-[9px] text-xs leading-snug text-ink">
          A tool is just a typed contract — define the schema first, the model fills it, you validate
          it.
        </div>
        <div className="mt-2 text-[10.5px] text-inkMute">Lesson 4.4 · Tools &amp; Function Calling</div>
      </div>

      <div className="absolute -bottom-2 right-0 hidden w-[224px] rounded-2xl border border-line bg-surface p-3 shadow-2xl lg:block">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="grid h-[26px] w-[26px] place-items-center rounded-full bg-primaryDeep text-[10px] font-semibold text-white">
            Ax
          </div>
          <div className="text-[11px] text-inkSoft">
            <b className="text-ink">AI Assessor</b> · Assessor
          </div>
          <span className="ml-auto text-[10px] text-inkMute">rubric · 6q</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <div className="tnum text-[28px] font-bold leading-none text-ok">92</div>
          <div className="text-[13px] text-inkSoft">/ 100</div>
          <div className="ml-auto rounded bg-ok/20 px-[7px] py-0.5 text-[10px] font-semibold text-ok">
            ↑ +8
          </div>
        </div>
        <div className="mt-2 text-[11px] leading-snug text-inkSoft">
          Strong on schema design. Revisit error replies in lesson 4.6.
        </div>
      </div>
    </>
  );
}

function Hero() {
  const stats = [
    { v: "4,200+", k: "agents shipped" },
    { v: "9.4/10", k: "avg rating" },
    { v: "92%", k: "finish the course" },
  ];
  return (
    <section className="relative overflow-hidden px-6 pb-14 pt-16 md:px-11">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px]"
        style={{ background: "radial-gradient(closest-side, var(--primary), transparent 70%)", opacity: 0.13 }}
      />
      <div className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primaryTint px-3 py-1.5 text-xs font-semibold tracking-wide text-primaryDeep">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Cohort 07 starts June 4 · 38 seats left
          </div>
          <h1 className="mt-5 font-serif text-[clamp(40px,9vw,76px)] leading-[1] text-ink">
            Learn to build
            <br />
            AI agents.
            <br />
            <em className="italic text-primary">Taught by two agents.</em>
          </h1>
          <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-inkSoft">
            Ten chapters from first prompt to production. AI Mentor walks you through every idea. AI
            Assessor quizzes you, grades you, and points out what you missed. You ship a real,
            evaluated agent by the end.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-[10px] bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary/25"
            >
              Start chapters 1–3 — free
            </Link>
            <button className="inline-flex items-center gap-2 rounded-[10px] border border-line px-4 py-3.5 text-sm font-medium text-ink">
              <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-line bg-surface text-[8px]">
                ▶
              </span>
              Watch a 2-min demo
            </button>
          </div>
          <div className="mt-7 flex gap-6">
            {stats.map((s) => (
              <div key={s.k}>
                <div className="tnum text-[22px] font-bold tracking-tight text-ink">{s.v}</div>
                <div className="mt-0.5 text-xs text-inkMute">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* hero visual */}
        <div className="relative h-[300px] lg:h-[480px]">
          <div
            className="absolute inset-0 overflow-hidden rounded-[18px] border border-line shadow-2xl lg:inset-[0_50px_70px_0]"
            style={{ background: "radial-gradient(circle at 50% 42%, var(--primary-tint), var(--surface))" }}
          >
            <AnimatedAgent />
          </div>
          <HeroFloatCards />
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  const logos = ["Northwind", "Brivo", "Helios Labs", "Castaway", "Foundry & Co", "Linder AI"];
  return (
    <section className="border-y border-line bg-surface px-6 pb-9 pt-6 md:px-11">
      <div className="mb-4 text-center text-[11px] uppercase tracking-[0.12em] text-inkMute">
        Engineers shipping agents at
      </div>
      <div className="flex flex-wrap items-center justify-between gap-7">
        {logos.map((l) => (
          <div key={l} className="font-serif text-[22px] italic tracking-tight text-inkMute opacity-75">
            {l}
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      who: "AI Mentor teaches",
      title: "A 20-minute lesson, taught by your mentor agent",
      body: "Each idea — tool schemas, memory, evals — comes as a focused walkthrough. Ask questions, get worked examples, see code.",
    },
    {
      n: "02",
      who: "You practice",
      title: "Build the thing, in the actual editor",
      body: "Every chapter ships with a real task: write the tool, ground the answer, fix the regression. Not toy snippets — code you keep.",
    },
    {
      n: "03",
      who: "AI Assessor grades you",
      title: "A rubric — never a vibe — tells you where you stand",
      body: "MCQs, short answers and code tasks. You get a score, a strength, and the two specific gaps to revisit with AI Mentor.",
    },
  ];
  return (
    <section id="how" className="scroll-mt-20 px-6 pb-16 pt-[72px] md:px-11">
      <SectionHeader
        eyebrow="How it works"
        title={
          <>
            One loop, repeated <em className="italic text-primary">ten times</em>.
          </>
        }
        sub="Read · build · get graded. Move on when AI Assessor says you're ready, not when a video ends."
      />
      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="relative min-h-[240px] rounded-2xl border border-line bg-surface p-[22px]"
          >
            <div className="font-serif text-6xl leading-none text-primary opacity-30">{s.n}</div>
            <div className="mt-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
              {s.who}
            </div>
            <h3 className="mb-2.5 mt-2 text-[19px] font-semibold leading-tight tracking-tight text-ink">
              {s.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-inkSoft">{s.body}</p>
            {i < 2 && (
              <div className="absolute right-[-10px] top-1/2 hidden h-5 w-5 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg text-xs text-inkMute md:grid">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function BigAgentCard({
  agent,
  accent,
  sample,
  traits,
}: {
  agent: (typeof AGENTS)["mentor"];
  accent: string;
  sample: { from: string; text: string }[];
  traits: { k: string; v: string }[];
}) {
  return (
    <div className="relative flex flex-col gap-[18px] overflow-hidden rounded-2xl border border-line bg-bg p-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(80% 60% at 0% 0%, ${accent}1a 0%, transparent 60%)` }}
      />
      <div className="relative flex items-center gap-3.5">
        <div
          className="grid h-16 w-16 place-items-center rounded-full text-[22px] font-semibold text-white shadow-lg"
          style={{ background: accent, boxShadow: `0 10px 24px ${accent}50` }}
        >
          {agent.initials}
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-inkMute">
            {agent.role} agent
          </div>
          <div className="mt-1 font-serif text-[30px] leading-none text-ink">{agent.name}</div>
        </div>
      </div>
      <div className="relative text-[14.5px] font-medium leading-snug text-ink">{agent.headline}</div>
      <div className="relative flex flex-col gap-1.5">
        {sample.map((m, i) => {
          const isYou = m.from === "you";
          return (
            <div
              key={i}
              className={`max-w-[88%] rounded-xl px-3 py-2 text-[12.5px] leading-snug text-ink ${
                isYou
                  ? "self-end rounded-tr-[3px] border border-line bg-surfaceAlt"
                  : "self-start rounded-tl-[3px]"
              }`}
              style={isYou ? undefined : { background: `${accent}15` }}
            >
              {m.text}
            </div>
          );
        })}
      </div>
      <div className="relative flex flex-col gap-1.5 border-t border-line pt-3.5">
        {traits.map((tr) => (
          <div key={tr.k} className="grid grid-cols-[100px_1fr] gap-2.5 text-xs">
            <div className="pt-0.5 text-[10px] font-semibold uppercase tracking-wide text-inkMute">
              {tr.k}
            </div>
            <div className="leading-snug text-inkSoft">{tr.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MeetAgents() {
  return (
    <section id="agents" className="scroll-mt-20 border-y border-line bg-surface px-6 pb-16 pt-[72px] md:px-11">
      <SectionHeader
        eyebrow="Meet your two agents"
        title={
          <>
            AI Mentor teaches. AI Assessor grades. <em className="italic text-primary">You ship.</em>
          </>
        }
        sub="They have different jobs, different voices, and they don't agree on everything. That's the point."
      />
      <div className="mt-9 grid gap-[18px] md:grid-cols-2">
        <BigAgentCard
          agent={AGENTS.mentor}
          accent="#8aa6ee"
          sample={[
            { from: "mira", text: "Quick check before lesson 4.4: in one sentence, why does strict JSON mode help?" },
            { from: "you", text: "It forces the model to fail loudly instead of silently producing bad args." },
            { from: "mira", text: "Almost. It also gives you a typed surface to validate against. Want to see why that matters in retries?" },
          ]}
          traits={[
            { k: "Style", v: "Socratic, never spoon-feeding" },
            { k: "Strengths", v: "Concepts, worked examples, code review" },
            { k: "Honest about", v: '"I don\'t know — let\'s look at the paper."' },
          ]}
        />
        <BigAgentCard
          agent={AGENTS.assessor}
          accent="#a8bef2"
          sample={[
            { from: "axel", text: "Rubric for ch. 4: 6 MCQs, 1 short answer, 1 code task. Estimated 18 minutes. Ready?" },
            { from: "you", text: "Go." },
            { from: "axel", text: "Result: 92/100. Strength: schema design. Two gaps queued for AI Mentor: error replies, tool naming under retries." },
          ]}
          traits={[
            { k: "Style", v: "Direct, rubric-first, no flattery" },
            { k: "Strengths", v: "MCQs, code grading, gap analysis" },
            { k: "Honest about", v: '"This score doesn\'t mean you\'ve mastered the topic."' },
          ]}
        />
      </div>
    </section>
  );
}

function Curriculum() {
  return (
    <section id="curriculum" className="scroll-mt-20 px-6 pb-16 pt-[72px] md:px-11">
      <SectionHeader
        eyebrow="The curriculum"
        title={
          <>
            Ten chapters from <em className="italic text-primary">first prompt</em> to{" "}
            <em className="italic text-primary">production</em>.
          </>
        }
        sub="Roughly 8 hours per chapter — read, build, get graded. Chapters 1–3 are free, no card."
      />
      <div className="mt-9 grid gap-x-6 gap-y-2.5 md:grid-cols-2">
        {CHAPTERS.map((c) => {
          const locked = chapterLocked(c);
          return (
            <Link
              key={c.n}
              href={`/chapters/${c.n}`}
              className="grid grid-cols-[48px_1fr_auto] items-center gap-3.5 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-primary/40"
            >
              <div className={`font-serif text-[28px] leading-none ${locked ? "text-inkMute opacity-60" : "text-primary"}`}>
                {String(c.n).padStart(2, "0")}
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">{c.title}</div>
                <div className="mt-0.5 text-[11.5px] text-inkMute">
                  {c.tag} · {c.lessons} lessons · ~{Math.round(c.mins / 10) * 10} min reading + ~3h building
                </div>
              </div>
              {locked ? (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primaryTint px-2.5 py-1 text-[11px] font-semibold text-primaryDeep">
                  <LockIcon size={11} strokeWidth={2.1} /> Pro
                </div>
              ) : (
                <div className="rounded-full border border-ok/30 bg-ok/10 px-2.5 py-1 text-[11px] font-semibold text-ok">
                  Free
                </div>
              )}
            </Link>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-between gap-5 rounded-xl border border-primary/30 bg-primaryTint p-[18px]">
        <div>
          <div className="text-[13.5px] font-semibold text-ink">Capstone · ship a research agent</div>
          <div className="mt-1 text-xs text-inkSoft">
            Unlocks at chapter 8. AI Mentor pairs on architecture; AI Assessor grades the final eval run.
          </div>
        </div>
        <button className="flex-none rounded-lg border border-primary/40 px-3.5 py-2 text-[12.5px] font-semibold text-primaryDeep">
          See the capstone brief →
        </button>
      </div>
    </section>
  );
}

function Outcomes() {
  const items = [
    { v: "4,200+", k: "agents shipped", sub: "by AgentTutor graduates, across 18 countries." },
    { v: "~80h", k: "to ship the capstone", sub: "median time from chapter 1 to a graded, deployed agent." },
    { v: "92%", k: "finish the course", sub: "because AI Assessor won't let you move on with a 41% rubric score." },
  ];
  return (
    <section className="relative overflow-hidden bg-[#06091a] px-6 py-16 md:px-11">
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: "radial-gradient(50% 80% at 80% 20%, var(--primary) 0%, transparent 60%)" }}
      />
      <div className="relative grid gap-8 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.k}>
            <div className="tnum font-serif text-7xl leading-none text-white">{it.v}</div>
            <div className="mt-2 text-sm font-semibold text-primary">{it.k}</div>
            <div className="mt-1.5 max-w-[280px] text-[13px] leading-relaxed text-white/60">{it.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { text: "AI Assessor gave me the first honest feedback I've had since university. I rebuilt my tool layer the same evening.", who: "D. Okafor", role: "ML engineer · cohort 03" },
    { text: "AI Mentor pair-programmed with me through three retries on the same eval. It felt like having a calm senior next to me.", who: "P. Chen", role: "Founding engineer · cohort 05" },
    { text: "I came in knowing how to prompt. I left having shipped an agent that hits 88% on a real rubric and a real load test.", who: "J. Rivera", role: "Staff SWE · cohort 04" },
  ];
  return (
    <section className="px-6 pb-16 pt-[72px] md:px-11">
      <SectionHeader
        eyebrow="What students say"
        title={
          <>
            Not “great course”. <em className="italic text-primary">Specific things.</em>
          </>
        }
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {quotes.map((q, i) => (
          <figure key={i} className="m-0 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-[22px]">
            <div className="h-[22px] font-serif text-[40px] leading-[0.5] text-primary">“</div>
            <blockquote className="m-0 flex-1 font-serif text-lg leading-snug tracking-tight text-ink">
              {q.text}
            </blockquote>
            <figcaption className="flex items-center gap-2.5 border-t border-line pt-3.5">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-primaryDeep text-[11px] font-semibold text-white">
                {q.who.split(" ").map((s) => s[0]).join("")}
              </div>
              <div>
                <div className="text-[12.5px] font-semibold text-ink">{q.who}</div>
                <div className="text-[11px] text-inkMute">{q.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="border-y border-line bg-surface px-6 pb-16 pt-[72px] md:px-11">
      <SectionHeader
        eyebrow="Pricing"
        title={
          <>
            Two ways in. <em className="italic text-primary">One of them is free.</em>
          </>
        }
        sub="Read the first three chapters free. Upgrade to Pro for the rest of the course and both AI tutors."
      />
      <div className="mx-auto mt-9 grid max-w-[880px] gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-bg p-[26px]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-inkMute">Free</div>
            <div className="mt-2 flex items-baseline gap-2">
              <div className="font-serif text-[56px] leading-none">{PLANS.free.priceLabel}</div>
              <div className="text-xs opacity-70">free forever</div>
            </div>
            <div className="mt-2 text-[13px] opacity-75">The first three chapters, at your own pace.</div>
          </div>
          <Link href="/dashboard" className="rounded-[10px] border border-ink py-3 text-center text-[13px] font-semibold text-ink">
            Start chapters 1–3 →
          </Link>
        </div>
        <div className="relative flex flex-col gap-4 rounded-2xl bg-ink p-[26px] text-bg">
          <div className="absolute right-3.5 top-3.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
            MOST POPULAR
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">Pro</div>
            <div className="mt-2 flex items-baseline gap-2">
              <div className="font-serif text-[56px] leading-none">{PLANS.pro.priceLabel}</div>
              <div className="text-xs opacity-70">{PLANS.pro.per} · all 10 chapters</div>
            </div>
            <div className="mt-2 text-[13px] opacity-75">Every chapter, the capstone, and both agents.</div>
          </div>
          <Link href="/upgrade" className="rounded-[10px] bg-primary py-3 text-center text-[13px] font-semibold text-white">
            Upgrade to Pro →
          </Link>
        </div>
      </div>
      <div className="mt-6 text-center">
        <Link href="/upgrade" className="text-[13px] font-semibold text-primary hover:underline">
          See full plan comparison →
        </Link>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 py-[72px] md:px-11">
      <div className="relative grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primaryDeep px-12 py-[52px] text-white md:grid-cols-[1.4fr_1fr]">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 80% at 100% 100%, rgba(255,255,255,.18), transparent 60%)" }} />
        <div className="relative">
          <h2 className="m-0 font-serif text-[clamp(32px,7vw,52px)] leading-[1.05]">
            Start chapters 1–3.
            <br />
            <span className="opacity-75">Free, no card, no email tricks.</span>
          </h2>
          <p className="mt-3.5 max-w-[480px] text-[15px] leading-relaxed opacity-90">
            Read the first three chapters end-to-end at your own pace. When you're ready for the rest
            of the course — and to learn alongside AI Mentor and AI Assessor — upgrade to Pro.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard" className="rounded-[10px] bg-white px-5 py-3 text-sm font-semibold text-primaryDeep">
              Start chapters 1–3 →
            </Link>
            <button className="rounded-[10px] border border-white/40 px-4 py-3 text-sm font-medium text-white">
              Talk to a human first
            </button>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="grid aspect-square place-items-center rounded-2xl border border-dashed border-white/40 bg-white/10 text-[10px] uppercase tracking-wide text-white/70">
            course cover · 1:1
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: "Product", links: ["How it works", "The two agents", "Curriculum", "Capstone", "Pricing"] },
    { h: "For teams", links: ["Bring AgentTutor to your company", "Volume seats", "Custom curriculum"] },
    { h: "Resources", links: ["Blog", "Open library", "Glossary", "Status", "Changelog"] },
    { h: "Company", links: ["About", "Careers", "Press", "Contact"] },
  ];
  return (
    <footer className="border-t border-line bg-surface px-6 pb-7 pt-11 md:px-11">
      <div className="grid gap-8 border-b border-line pb-7 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-sm font-bold text-white">A</div>
            <div className="text-base font-bold tracking-tight text-ink">AgentTutor</div>
          </div>
          <p className="mt-3.5 max-w-[300px] text-[13px] leading-relaxed text-inkSoft">
            A self-paced course on building AI agents. Taught by two agents. Ten chapters, one
            capstone, one shipped agent.
          </p>
          <div className="mt-4 flex items-center gap-3.5 text-[11px] text-inkMute">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" />
              All agents online
            </span>
            <span>·</span>
            <span>v1.3.0</span>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-inkMute">
              {c.h}
            </div>
            <div className="flex flex-col gap-2">
              {c.links.map((l) => (
                <span key={l} className="text-[13px] text-inkSoft">
                  {l}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-2.5 pt-5 text-xs text-inkMute md:flex-row md:items-center md:justify-between">
        <span>© 2026 AgentTutor Education. Built by humans, taught by agents.</span>
        <div className="flex gap-[18px]">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Security</span>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <MarketingNav />
      <Hero />
      <LogoStrip />
      <HowItWorks />
      <MeetAgents />
      <Curriculum />
      <Outcomes />
      <Testimonials />
      <PricingTeaser />
      <section id="faq" className="scroll-mt-20 px-6 pb-16 pt-[72px] md:px-11">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Things people ask <em className="italic text-primary">before signing up</em>.
            </>
          }
        />
        <FAQ />
      </section>
      <FinalCTA />
      <Footer />
    </div>
  );
}

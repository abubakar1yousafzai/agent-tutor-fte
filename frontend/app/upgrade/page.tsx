import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { LockIcon } from "@/components/icons";
import { PLANS } from "@/lib/data";

const PLAN_CARDS = [
  {
    name: "Free",
    price: PLANS.free.priceLabel,
    unit: "free forever",
    blurb: "The first three chapters, at your own pace.",
    cta: "Start chapters 1–3",
    href: "/dashboard",
    primary: false,
    features: [
      "Chapters 1, 2 & 3 in full",
      "Self-paced reading + build tasks",
      "Community, read-only",
      "No AI tutors — AI Mentor & AI Assessor are Pro",
    ],
  },
  {
    name: "Pro",
    price: PLANS.pro.priceLabel,
    unit: PLANS.pro.per + " · all 10 chapters",
    blurb: "Every chapter, the capstone, and both agents.",
    cta: "Upgrade to Pro",
    href: "/dashboard",
    primary: true,
    features: [
      "All 10 chapters + capstone",
      "AI Mentor (mentor) — unlimited sessions",
      "AI Assessor (assessor) — unlimited rubrics + code grading",
      "6 live office hours with humans",
      "Cohort wall + pair-programming",
      "Certificate when AI Assessor scores you 80+",
    ],
  },
];

const COMPARE: { label: string; free: string | boolean; pro: string | boolean }[] = [
  { label: "Chapters 1–3", free: true, pro: true },
  { label: "Chapters 4–10", free: false, pro: true },
  { label: "Capstone project", free: false, pro: true },
  { label: "AI Mentor sessions", free: false, pro: "Unlimited" },
  { label: "AI Assessor rubrics", free: false, pro: "Unlimited" },
  { label: "Code grading", free: false, pro: true },
  { label: "Live office hours", free: false, pro: "6 / cohort" },
  { label: "Community", free: "Read-only", pro: "Full access" },
  { label: "Completion certificate", free: false, pro: true },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <span className="font-bold text-ok">✓</span>;
  if (value === false) return <span className="text-inkMute">—</span>;
  return <span className="text-inkSoft">{value}</span>;
}

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <MarketingNav />

      <section className="px-6 pb-12 pt-16 text-center md:px-11">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primaryTint px-3 py-1.5 text-xs font-semibold tracking-wide text-primaryDeep">
          <LockIcon size={12} strokeWidth={2.2} /> Unlock the full course
        </div>
        <h1 className="mx-auto mt-5 max-w-[720px] font-serif text-[clamp(34px,7vw,56px)] leading-[1.05] text-ink">
          Two ways in. <em className="italic text-primary">One of them is free.</em>
        </h1>
        <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-relaxed text-inkSoft">
          Read the first three chapters free. Upgrade to Pro for the rest of the course, both AI
          tutors, and the capstone. Cancel anytime — your progress stays.
        </p>
      </section>

      <section className="px-6 md:px-11">
        <div className="mx-auto grid max-w-[880px] gap-4 md:grid-cols-2">
          {PLAN_CARDS.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col gap-4 rounded-2xl p-7 ${
                p.primary ? "bg-ink text-bg" : "border border-line bg-surface text-ink"
              }`}
            >
              {p.primary && (
                <div className="absolute right-4 top-4 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
                  MOST POPULAR
                </div>
              )}
              <div>
                <div className={`text-xs font-semibold uppercase tracking-[0.08em] ${p.primary ? "text-primary" : "text-inkMute"}`}>
                  {p.name}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="font-serif text-[56px] leading-none">{p.price}</div>
                  <div className="text-xs opacity-70">{p.unit}</div>
                </div>
                <div className="mt-2 text-[13px] opacity-75">{p.blurb}</div>
              </div>
              <Link
                href={p.href}
                className={`rounded-[10px] py-3 text-center text-[13px] font-semibold ${
                  p.primary ? "bg-primary text-white" : "border border-ink text-ink"
                }`}
              >
                {p.cta} →
              </Link>
              <div className={`flex flex-col gap-2 border-t pt-3 ${p.primary ? "border-white/15" : "border-line"}`}>
                {p.features.map((f) => (
                  <div key={f} className="flex gap-2.5 text-[12.5px] leading-snug">
                    <span className="flex-none font-bold text-primary">✓</span>
                    <span className="opacity-90">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* comparison table */}
      <section className="px-6 pb-16 pt-16 md:px-11">
        <h2 className="text-center font-serif text-3xl text-ink">Everything, side by side</h2>
        <div className="mx-auto mt-8 max-w-[720px] overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="grid grid-cols-[1.6fr_1fr_1fr] border-b border-line bg-surfaceAlt px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-inkMute">
            <div>Feature</div>
            <div className="text-center">Free</div>
            <div className="text-center text-primaryDeep">Pro</div>
          </div>
          {COMPARE.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.6fr_1fr_1fr] items-center px-5 py-3 text-[13px] ${
                i ? "border-t border-line" : ""
              }`}
            >
              <div className="text-ink">{row.label}</div>
              <div className="text-center">
                <Cell value={row.free} />
              </div>
              <div className="text-center">
                <Cell value={row.pro} />
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-[720px] flex-col items-center justify-between gap-4 rounded-2xl border border-primary/30 bg-primaryTint p-6 text-center sm:flex-row sm:text-left">
          <div>
            <div className="text-[15px] font-semibold text-ink">Ready to learn with both agents?</div>
            <div className="mt-1 text-[13px] text-inkSoft">
              {PLANS.pro.priceLabel}
              {PLANS.pro.per} · cancel anytime · keep your progress
            </div>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex flex-none items-center gap-2 rounded-[10px] bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
          >
            <LockIcon size={14} strokeWidth={2.2} /> Upgrade to Pro
          </Link>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";

const LINKS = [
  { label: "How it works", href: "/#how" },
  { label: "The agents", href: "/#agents" },
  { label: "Curriculum", href: "/#curriculum" },
  { label: "Pricing", href: "/upgrade" },
  { label: "FAQ", href: "/#faq" },
];

// Sticky top navbar for the public/marketing pages (landing, upgrade).
export function MarketingNav() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-bg/95 px-6 py-3.5 backdrop-blur-md md:px-11">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-sm font-bold text-white">
          A
        </div>
        <div className="text-base font-bold tracking-tight text-ink">AgentTutor</div>
      </Link>
      <nav className="hidden items-center gap-7 text-[13px] text-inkSoft md:flex">
        {LINKS.map((l) => (
          <Link key={l.label} href={l.href} className="transition-colors hover:text-ink">
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2.5">
        <Link href="/login" className="text-[13px] text-inkSoft transition-colors hover:text-ink">
          Sign in
        </Link>
        <Link
          href="/login"
          className="rounded-lg bg-ink px-3.5 py-2 text-[12.5px] font-semibold text-bg transition-opacity hover:opacity-90"
        >
          Start free →
        </Link>
      </div>
    </header>
  );
}

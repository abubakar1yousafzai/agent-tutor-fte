"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AGENTS, PLANS } from "@/lib/data";
import { Icon, LockIcon } from "./icons";
import { ProBadge } from "./ProBadge";
import type { User } from "@/lib/api";
import { clearSession, isPremium } from "@/lib/session";

interface NavItem {
  label: string;
  icon: string;
  href?: string;
  tail?: string;
}

const GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Learn",
    items: [
      { label: "Home", icon: "home", href: "/dashboard" },
      { label: "Chapters", icon: "list", href: "/chapters", tail: "10" },
      { label: "Library", icon: "book" },
      { label: "Projects", icon: "box", tail: "3" },
    ],
  },
  {
    title: "Practice",
    items: [
      { label: "Assessments", icon: "check", href: "/quiz/1", tail: "2" },
      { label: "AI Mentor", icon: "chat", href: "/mentor" },
      { label: "Code review", icon: "pen" },
    ],
  },
  {
    title: "You",
    items: [
      { label: "Progress", icon: "chart", href: "/progress" },
      { label: "Notes", icon: "note" },
      { label: "Settings", icon: "gear" },
    ],
  },
];

function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  const inner = (
    <div
      className={`flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[13px] ${
        active
          ? "bg-primary font-semibold text-white shadow-lg shadow-primary/30"
          : "font-medium text-inkSoft hover:bg-surfaceAlt"
      } ${item.href ? "cursor-pointer" : "cursor-default opacity-80"}`}
    >
      <span className={active ? "text-white" : "text-inkMute"}>
        <Icon name={item.icon} />
      </span>
      <span className="flex-1">{item.label}</span>
      {item.tail && (
        <span
          className={`tnum rounded-full px-[7px] py-[2px] text-[10px] font-semibold ${
            active ? "bg-white/20 text-white" : "bg-surfaceAlt text-inkSoft"
          }`}
        >
          {item.tail}
        </span>
      )}
    </div>
  );
  return item.href ? <Link href={item.href}>{inner}</Link> : inner;
}

function AgentDock({ locked }: { locked: boolean }) {
  return (
    <div className="rounded-xl border border-line bg-surfaceAlt p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.08em] text-inkMute">Your agents</div>
        {locked && <ProBadge />}
      </div>
      {[AGENTS.mentor, AGENTS.assessor].map((a, i) => (
        <div key={a.name} className="flex items-center gap-2.5 py-1.5">
          <div
            className={`grid h-[30px] w-[30px] flex-none place-items-center rounded-full text-[11px] font-semibold text-white ${
              locked ? "bg-line text-inkMute" : i === 0 ? "bg-primary shadow-md shadow-primary/40" : "bg-primaryDeep"
            }`}
          >
            {locked ? <LockIcon size={13} /> : a.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className={`text-xs font-semibold ${locked ? "text-inkSoft" : "text-ink"}`}>
              {a.name} <span className="font-normal text-inkMute">· {a.role}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-inkMute">
              {locked ? (
                "Locked"
              ) : (
                <>
                  <span className="h-[5px] w-[5px] rounded-full bg-ok" />
                  online
                </>
              )}
            </div>
          </div>
        </div>
      ))}
      {locked && (
        <Link
          href="/upgrade"
          className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 py-[7px] text-[11.5px] font-semibold text-white"
        >
          <LockIcon size={12} strokeWidth={2.1} />
          Unlock with Pro
        </Link>
      )}
    </div>
  );
}

export function Sidebar({ user, onNavigate }: { user: User | null; onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const locked = !isPremium(user);
  const isActive = (href?: string) =>
    !!href && (pathname === href || (href !== "/dashboard" && pathname.startsWith(href)));

  function logout() {
    clearSession();
    router.push("/");
  }

  return (
    <aside className="flex h-full w-[232px] flex-none flex-col overflow-y-auto border-r border-line bg-surface px-3.5 py-5">
      <div className="flex items-center justify-between px-1.5 pb-4">
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onNavigate}>
          <div className="grid h-[30px] w-[30px] place-items-center rounded-[9px] bg-primary text-sm font-bold text-white shadow-md shadow-primary/40">
            A
          </div>
          <div className="font-serif text-[22px] leading-none tracking-tight text-ink">AgentTutor</div>
        </Link>
      </div>

      <div onClick={onNavigate}>
        {GROUPS.map((g) => (
          <div key={g.title} className="mb-3.5">
            <div className="px-2.5 py-1.5 text-[10px] uppercase tracking-[0.08em] text-inkMute">
              {g.title}
            </div>
            {g.items.map((it) => (
              <NavRow key={it.label} item={it} active={isActive(it.href)} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex-1" />

      <AgentDock locked={locked} />

      <button
        onClick={logout}
        className="mt-3 flex items-center gap-2.5 rounded-[10px] border border-line bg-surfaceAlt px-3 py-2.5 text-[13px] font-medium text-inkSoft hover:text-ink"
      >
        <Icon name="logout" />
        Logout
      </button>

      <div className="mt-2 px-1 text-[10px] text-inkMute">
        {isPremium(user) ? PLANS.pro.name : PLANS.free.name} plan · v1.3.0
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { Icon, LockIcon } from "./icons";
import type { User } from "@/lib/api";
import { isPremium } from "@/lib/session";

export function AppHeader({
  title,
  subtitle,
  user,
  onMenu,
}: {
  title: string;
  subtitle?: string;
  user: User | null;
  onMenu: () => void;
}) {
  const pro = isPremium(user);
  const initials = (user?.name || "?")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex items-center justify-between border-b border-line bg-surface px-5 py-4 md:px-7">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          aria-label="Open menu"
          className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[9px] border border-line bg-surfaceAlt md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-ink">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <div>
          <h1 className="m-0 text-lg font-bold tracking-tight text-ink md:text-[22px]">{title}</h1>
          {subtitle && <div className="mt-0.5 hidden text-xs text-inkMute sm:block">{subtitle}</div>}
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <div className="hidden w-60 items-center gap-2 rounded-[10px] border border-line bg-surfaceAlt px-3 py-2 lg:flex">
          <Icon name="search" size={14} className="text-inkMute" strokeWidth={2} />
          <span className="flex-1 text-[12.5px] text-inkMute">Search chapters, lessons…</span>
          <span className="rounded border border-line px-1.5 text-[10px] text-inkMute">⌘K</span>
        </div>

        <button className="relative grid h-9 w-9 place-items-center rounded-[9px] border border-line bg-surfaceAlt text-inkSoft">
          <Icon name="bell" size={15} />
          <span className="absolute right-1.5 top-1.5 h-[7px] w-[7px] rounded-full border-2 border-surfaceAlt bg-primary" />
        </button>

        {!pro && (
          <Link
            href="/upgrade"
            className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-[9px] bg-gradient-to-br from-primary to-primaryDeep px-3.5 py-2 text-[12.5px] font-bold text-white shadow-lg shadow-primary/30"
          >
            <LockIcon size={13} strokeWidth={2.2} />
            <span className="hidden sm:inline">Upgrade to Pro</span>
            <span className="sm:hidden">Pro</span>
          </Link>
        )}

        <div className="flex items-center gap-2.5">
          <div className="hidden text-right sm:block">
            <div className="text-xs font-semibold text-ink">{user?.name || "—"}</div>
            <div className="flex items-center justify-end gap-1.5 text-[10px] text-inkMute">
              <span className={`h-[5px] w-[5px] rounded-full ${pro ? "bg-ok" : "bg-inkMute"}`} />
              {pro ? "Pro plan" : "Free plan"}
            </div>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-primaryDeep text-[13px] font-semibold text-white">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}

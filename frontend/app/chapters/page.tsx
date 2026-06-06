"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { LockIcon, Icon } from "@/components/icons";
import { ProBadge } from "@/components/ProBadge";
import { Spinner, ErrorBox } from "@/components/states";
import { useApi } from "@/lib/useApi";
import { api } from "@/lib/api";
import { getUserId } from "@/lib/session";

export default function ChaptersPage() {
  const userId = getUserId();
  const { data: chapters, loading, error } = useApi(
    () => api.listChapters(userId as string),
    [userId]
  );

  const accessibleCount = chapters?.filter((c) => c.is_accessible).length ?? 0;
  const anyLocked = chapters?.some((c) => !c.is_accessible) ?? false;

  return (
    <AppShell title="Chapters" subtitle="Ten chapters from first prompt to production">
      {anyLocked && (
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center">
          <div>
            <div className="text-base font-bold text-ink">Your curriculum</div>
            <div className="mt-1 text-[13px] text-inkSoft">
              {accessibleCount} of {chapters?.length ?? 10} chapters unlocked. Upgrade to open the rest.
            </div>
          </div>
          <Link
            href="/upgrade"
            className="inline-flex flex-none items-center gap-2 rounded-[10px] bg-primary px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/30"
          >
            <LockIcon size={14} strokeWidth={2.2} /> Unlock all 10
          </Link>
        </div>
      )}

      {loading && <Spinner label="Loading chapters…" />}
      {error && <ErrorBox message={error.message} />}

      {chapters && (
        <div className="grid gap-3.5 md:grid-cols-2">
          {chapters.map((c) => {
            const locked = !c.is_accessible;
            return (
              <Link
                key={c.id}
                href={`/chapters/${c.number}`}
                className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`tnum grid h-12 w-12 flex-none place-items-center rounded-xl font-serif text-2xl ${
                        locked ? "bg-surfaceAlt text-inkMute" : "bg-primaryTint text-primary"
                      }`}
                    >
                      {String(c.number).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold text-ink">{c.title}</div>
                      <div className="mt-0.5 text-[11.5px] capitalize text-inkMute">
                        {c.tier_required} chapter
                      </div>
                    </div>
                  </div>
                  {locked ? (
                    <ProBadge />
                  ) : (
                    <span className="rounded-full bg-ok/10 px-2.5 py-1 text-[10.5px] font-semibold text-ok">
                      Unlocked
                    </span>
                  )}
                </div>
                <div className="mt-auto flex items-center justify-end">
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary">
                    {locked ? "Preview" : "Open"}
                    <Icon name="arrowRight" size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}

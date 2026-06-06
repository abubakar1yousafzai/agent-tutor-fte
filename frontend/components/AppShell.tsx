"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { AppHeader } from "./AppHeader";
import { getUserId, getUser } from "@/lib/session";
import { api, type User } from "@/lib/api";

type Status = "checking" | "guest" | "authed";

// Client shell for the logged-in pages. Reads the session user from
// localStorage. If there's no user_id we show a clear "sign in" screen (and
// auto-redirect to /login) instead of leaving a blank/stuck spinner.
export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const id = getUserId();
    if (!id) {
      setStatus("guest");
      router.replace("/login");
      return;
    }
    setUser(getUser());
    setStatus("authed");
    api.getUser(id).then(setUser).catch(() => {});
  }, [router]);

  if (status === "checking") {
    return (
      <div className="grid min-h-screen place-items-center gap-3 bg-bg text-inkMute">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-primary" />
      </div>
    );
  }

  if (status === "guest") {
    return (
      <div className="grid min-h-screen place-items-center bg-bg px-6">
        <div className="w-full max-w-[380px] rounded-2xl border border-line bg-surface p-7 text-center">
          <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary text-base font-bold text-white">A</div>
          <h1 className="font-serif text-2xl text-ink">Please sign in</h1>
          <p className="mt-1 text-[13px] text-inkSoft">
            You need to sign in before opening the dashboard. Taking you to the login page…
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block w-full rounded-[10px] bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
          >
            Go to login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-bg text-ink">
      <div className="hidden md:block">
        <Sidebar user={user} />
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 md:hidden ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar user={user} onNavigate={() => setNavOpen(false)} />
      </div>
      {navOpen && (
        <div
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader title={title} subtitle={subtitle} user={user} onMenu={() => setNavOpen(true)} />
        <main className="flex flex-col gap-3.5 p-4 md:p-7">{children}</main>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { setSession } from "@/lib/session";

// Simple email-based login: POST /users (upsert) → store user_id in localStorage.
// No passwords/JWT — that matches the backend, which only has POST /users.
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await api.createUser(email.trim(), name.trim());
      setSession(user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-bg px-6">
      <div className="w-full max-w-[400px]">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-bold text-white">A</div>
          <div className="text-lg font-bold tracking-tight text-ink">AgentTutor</div>
        </Link>

        <div className="rounded-2xl border border-line bg-surface p-7">
          <h1 className="font-serif text-2xl text-ink">Sign in to continue</h1>
          <p className="mt-1 text-[13px] text-inkSoft">
            Enter your email to start learning. We&apos;ll pick up where you left off.
          </p>

          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-inkSoft">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Sara Kapoor"
                className="rounded-[10px] border border-line bg-surfaceAlt px-3.5 py-2.5 text-[14px] text-ink outline-none placeholder:text-inkMute focus:border-primary/50"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-inkSoft">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="rounded-[10px] border border-line bg-surfaceAlt px-3.5 py-2.5 text-[14px] text-ink outline-none placeholder:text-inkMute focus:border-primary/50"
              />
            </label>

            {error && <div className="rounded-lg bg-warn/10 px-3 py-2 text-[12.5px] text-warn">{error}</div>}

            <button
              type="submit"
              disabled={loading || !email.trim() || !name.trim()}
              className="mt-1 rounded-[10px] bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Continue →"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-[12px] text-inkMute">
          New here? Same form creates your account automatically.
        </p>
      </div>
    </div>
  );
}

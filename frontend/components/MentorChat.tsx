"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AGENTS, MENTOR_SEED, QUICK_PROMPTS } from "@/lib/data";
import { Icon, LockIcon } from "./icons";
import { api, ApiError } from "@/lib/api";
import { getUserId } from "@/lib/session";

interface Msg {
  from: "mentor" | "you";
  text: string;
  refs?: string[];
}

export function MentorChat() {
  const [messages, setMessages] = useState<Msg[]>(MENTOR_SEED);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [blocked, setBlocked] = useState(false); // 403 premium_required
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const userId = getUserId();
    if (!userId) return;

    setMessages((m) => [...m, { from: "you", text: trimmed }]);
    setInput("");
    setTyping(true);
    try {
      const res = await api.mentor(userId, trimmed);
      setMessages((m) => [
        ...m,
        { from: "mentor", text: res.mentor_response, refs: res.chapters_referenced },
      ]);
    } catch (e) {
      if (e instanceof ApiError && e.isPremium) {
        setBlocked(true);
      } else {
        setMessages((m) => [
          ...m,
          { from: "mentor", text: "Sorry — I couldn't reach the tutor service just now. Please try again." },
        ]);
      }
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-180px)] min-h-[460px] flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
        <div className="relative grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-white">
          {AGENTS.mentor.initials}
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-ok" />
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">{AGENTS.mentor.name}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-ok">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" /> online · {AGENTS.mentor.role}
          </div>
        </div>
        <div className="ml-auto hidden gap-1.5 sm:flex">
          {AGENTS.mentor.skills.slice(0, 3).map((s) => (
            <span key={s} className="rounded-full border border-line bg-surfaceAlt px-2 py-0.5 text-[10.5px] text-inkSoft">{s}</span>
          ))}
        </div>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
        {messages.map((m, i) => {
          const isYou = m.from === "you";
          return (
            <div key={i} className={`flex items-end gap-2.5 ${isYou ? "flex-row-reverse" : ""} animate-fadeUp`}>
              <div className={`grid h-7 w-7 flex-none place-items-center rounded-full text-[10px] font-semibold text-white ${isYou ? "bg-surfaceAlt text-inkSoft" : "bg-primary"}`}>
                {isYou ? "You" : AGENTS.mentor.initials}
              </div>
              <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${isYou ? "rounded-br-sm border border-line bg-surfaceAlt text-ink" : "rounded-bl-sm bg-primary/10 text-ink"}`}>
                {m.text}
                {m.refs && m.refs.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.refs.map((r) => (
                      <span key={r} className="rounded-full bg-surface px-2 py-0.5 text-[10px] text-inkMute">{r}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {typing && (
          <div className="flex items-end gap-2.5">
            <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-primary text-[10px] font-semibold text-white">{AGENTS.mentor.initials}</div>
            <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-primary/10 px-4 py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-typing" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-typing [animation-delay:.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-typing [animation-delay:.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* premium gate (shown after a 403) */}
      {blocked ? (
        <div className="flex flex-col items-center gap-2 border-t border-line bg-primaryTint/40 px-5 py-6 text-center">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><LockIcon size={18} /></div>
          <div className="font-serif text-lg text-ink">AI Mentor is a Pro feature</div>
          <p className="max-w-[400px] text-[12.5px] text-inkSoft">Upgrade to Pro to chat with your mentor agent, unlimited.</p>
          <Link href="/upgrade" className="mt-1 inline-flex items-center gap-2 rounded-[10px] bg-primary px-5 py-2.5 text-[13px] font-semibold text-white">
            <LockIcon size={14} strokeWidth={2.2} /> Upgrade to Pro
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 border-t border-line px-5 pt-3">
            {QUICK_PROMPTS.map((p) => (
              <button key={p} onClick={() => send(p)} disabled={typing} className="rounded-full border border-line bg-surfaceAlt px-3 py-1.5 text-[11.5px] text-inkSoft transition-colors hover:border-primary/40 hover:text-ink disabled:opacity-50">
                {p}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2.5 px-5 py-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI Mentor anything…"
              className="flex-1 rounded-[12px] border border-line bg-surfaceAlt px-4 py-3 text-[13.5px] text-ink outline-none placeholder:text-inkMute focus:border-primary/50"
            />
            <button type="submit" disabled={!input.trim() || typing} aria-label="Send" className="grid h-11 w-11 flex-none place-items-center rounded-[12px] bg-primary text-white shadow-lg shadow-primary/30 disabled:opacity-40">
              <Icon name="send" size={18} strokeWidth={2} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

const QS = [
  {
    q: "Do I need to know how to code?",
    a: "You should be comfortable reading and writing one of: Python, TypeScript, or Go. AI Mentor tutors all three. If you can ship a small CLI, you can do this course.",
  },
  {
    q: "Which model providers does it work with?",
    a: "Lessons use OpenAI, Anthropic and a local Llama model in parallel. The code patterns you learn are provider-agnostic — every tool example ships in three variants.",
  },
  {
    q: "How is AI Assessor different from a multiple-choice quiz?",
    a: "AI Assessor grades against a rubric you can read. For code tasks it actually runs your code, checks edge cases, and tells you which specific concept the failure maps to.",
  },
  {
    q: "Can I bring my own agent codebase?",
    a: "From chapter 4 onward, yes. Drop your repo and AI Mentor anchors examples in your actual code instead of the toy reference implementation.",
  },
  {
    q: "What if I get stuck on the capstone?",
    a: "Two paths: a live office hour with a human staff engineer (twice a week), or a structured 'unstick' session with AI Mentor where she pair-programs through the failing test.",
  },
  {
    q: "Refunds?",
    a: "Yes — full refund within 14 days, no questions asked. The free tier (chapters 1–3 in full) exists so you can decide before upgrading to Pro.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto mt-8 max-w-[820px]">
      {QS.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            onClick={() => setOpen(isOpen ? -1 : i)}
            className={`cursor-pointer border-t border-line px-1 py-[18px] ${
              i === QS.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-[15px] font-semibold text-ink">{it.q}</div>
              <div
                className={`grid h-7 w-7 flex-none place-items-center rounded-lg text-base transition-transform ${
                  isOpen ? "rotate-45 bg-primaryTint text-primary" : "bg-surfaceAlt text-inkSoft"
                }`}
              >
                +
              </div>
            </div>
            {isOpen && (
              <div className="mt-3 max-w-[680px] text-[13.5px] leading-relaxed text-inkSoft">
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

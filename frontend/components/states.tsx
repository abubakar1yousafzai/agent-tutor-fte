import Link from "next/link";
import { LockIcon } from "./icons";

export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-inkMute">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-primary" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-warn/40 bg-warn/10 p-5 text-center">
      <div className="text-sm font-semibold text-warn">Something went wrong</div>
      <div className="mt-1 text-[13px] text-inkSoft">{message}</div>
    </div>
  );
}

// Shown when the backend returns 403 premium_required on a gated chapter / quiz /
// agent. The lock icon + upgrade CTA is the design's premium gate.
export function PremiumLock({
  title = "This is part of Pro",
  message = "Chapters 4–10, the full quiz bank, and both AI tutors unlock with Pro.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primaryTint/40 p-10 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary">
        <LockIcon size={22} />
      </div>
      <div className="font-serif text-2xl text-ink">{title}</div>
      <p className="max-w-[460px] text-[13.5px] text-inkSoft">{message}</p>
      <Link
        href="/upgrade"
        className="mt-1 inline-flex items-center gap-2 rounded-[10px] bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
      >
        <LockIcon size={14} strokeWidth={2.2} /> Upgrade to Pro
      </Link>
    </div>
  );
}

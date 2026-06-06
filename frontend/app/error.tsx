"use client";

// Route-level error boundary: if a client component throws, show a readable
// message + retry instead of a blank screen.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center bg-bg px-6">
      <div className="w-full max-w-[440px] rounded-2xl border border-warn/40 bg-surface p-7 text-center">
        <div className="font-serif text-2xl text-ink">Something went wrong</div>
        <p className="mt-2 break-words text-[13px] text-inkSoft">{error.message || "Unexpected error"}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-[10px] bg-primary px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

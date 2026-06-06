import { LockIcon } from "./icons";

// Small "PRO" pill. tone: 'solid' (filled accent) or 'soft' (tinted).
export function ProBadge({
  tone = "soft",
  label = "PRO",
}: {
  tone?: "soft" | "solid";
  label?: string;
}) {
  const solid = tone === "solid";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full text-[9.5px] font-bold tracking-[0.08em] leading-none whitespace-nowrap px-[7px] py-[2px] ${
        solid
          ? "bg-primary text-white"
          : "bg-primaryTint text-primaryDeep border border-primary/30"
      }`}
    >
      <LockIcon size={9} strokeWidth={2.1} />
      {label}
    </span>
  );
}

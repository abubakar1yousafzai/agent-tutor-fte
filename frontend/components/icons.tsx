// components/icons.tsx — small stroke icons used across the app, ported from
// the original design system's inline SVGs.

export function LockIcon({
  size = 14,
  className = "",
  strokeWidth = 1.8,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

const NAV_PATHS: Record<string, string> = {
  home: "M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  list: "M3 6h18M3 12h18M3 18h12",
  book: "M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4zM4 17h14",
  box: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7",
  check: "M5 12l4 4 10-10",
  chat: "M4 5h16v11H8l-4 4z",
  pen: "M4 20l4-1 11-11-3-3L5 16zM14 6l3 3",
  chart: "M4 20V8M10 20V4M16 20v-8M22 20H2",
  note: "M5 4h10l4 4v12H5zM15 4v4h4",
  gear: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 12h2M18 12h2M12 4v2M12 18v2",
  logout: "M14 16v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v2M9 12h12M18 9l3 3-3 3",
  bell: "M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9zM9 21a3 3 0 0 0 6 0",
  help: "M9 9a3 3 0 1 1 4.5 2.6c-1 .6-1.5 1.2-1.5 2.4M12 18v.01",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-3.5-3.5",
  doc: "M6 3h9l4 4v14H6zM15 3v4h4M9 13h7M9 17h7",
  trend: "M3 18l6-6 4 4 8-9M21 7v6h-6",
  send: "M4 12l16-7-7 16-2-7z",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  play: "M8 5v14l11-7z",
};

export function Icon({
  name,
  size = 16,
  className = "",
  strokeWidth = 1.8,
}: {
  name: keyof typeof NAV_PATHS | string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={NAV_PATHS[name] ?? NAV_PATHS.home} />
    </svg>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-px">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          className={i <= n ? "fill-warn" : "fill-line"}
        >
          <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7.1L12 17.5 5.8 21.3l1.6-7.1L2 9.5l7.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

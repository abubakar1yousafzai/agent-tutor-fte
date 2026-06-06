// components/AnimatedAgent.tsx — the friendly mentor bot that floats, blinks,
// glows, and "thinks". Pure CSS keyframes (defined in tailwind.config.ts),
// colors pulled from the palette CSS variables.

export function AnimatedAgent() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden">
      {/* pulsing glow halo */}
      <div
        className="absolute h-[300px] w-[300px] rounded-full animate-aaGlow"
        style={{
          left: "50%",
          top: "46%",
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 68%)",
        }}
      />
      {/* sonar ring */}
      <div
        className="absolute h-[240px] w-[240px] rounded-full border-2 border-primary/40 animate-aaRing"
        style={{ left: "50%", top: "46%" }}
      />

      {/* floating sparkle tokens */}
      <div className="absolute right-[16%] top-[20%] grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface shadow-lg shadow-primary/20 animate-aaFloatA">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--warn)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18h6M10 21h4M12 2a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 2z" />
        </svg>
      </div>
      <div className="absolute bottom-[24%] left-[14%] grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface shadow-lg shadow-primary/20 animate-aaFloatB">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" />
        </svg>
      </div>

      {/* the agent */}
      <svg
        viewBox="0 0 320 360"
        width="80%"
        height="80%"
        className="relative max-h-[390px]"
        role="img"
        aria-label="Animated mentor agent"
      >
        <defs>
          <linearGradient id="aaShell" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#eef2f8" />
            <stop offset="1" stopColor="#d6deea" />
          </linearGradient>
          <linearGradient id="aaShellR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6f8fc" />
            <stop offset="1" stopColor="#c9d3e2" />
          </linearGradient>
          <radialGradient id="aaEye" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--primary-deep)" />
          </radialGradient>
          <filter id="aaSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="13"
              floodColor="var(--primary-deep)"
              floodOpacity="0.30"
            />
          </filter>
          <filter id="aaGlowF" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ground shadow */}
        <ellipse
          cx="160"
          cy="340"
          rx="78"
          ry="13"
          fill="var(--ink)"
          className="origin-center animate-aaShadow [transform-box:fill-box]"
        />

        {/* thinking dots */}
        <circle cx="142" cy="22" r="5" fill="var(--primary)" filter="url(#aaGlowF)" className="animate-typing" />
        <circle cx="160" cy="22" r="5" fill="var(--primary)" filter="url(#aaGlowF)" className="animate-typing [animation-delay:.2s]" />
        <circle cx="178" cy="22" r="5" fill="var(--primary)" filter="url(#aaGlowF)" className="animate-typing [animation-delay:.4s]" />

        {/* floating body group */}
        <g className="origin-center animate-aaBob [transform-box:fill-box]">
          {/* arms */}
          <rect x="80" y="206" width="18" height="52" rx="9" fill="url(#aaShellR)" />
          <rect x="222" y="206" width="18" height="52" rx="9" fill="url(#aaShellR)" />
          <circle cx="89" cy="262" r="10" fill="#e3e9f2" />
          <circle cx="231" cy="262" r="10" fill="#e3e9f2" />
          {/* torso */}
          <rect x="106" y="200" width="108" height="86" rx="32" fill="url(#aaShell)" filter="url(#aaSoft)" />
          <rect x="134" y="192" width="52" height="20" rx="10" fill="#10182b" />
          {/* chest core */}
          <circle cx="160" cy="240" r="20" fill="#0c1220" />
          <circle cx="160" cy="240" r="13" fill="none" stroke="var(--primary)" strokeWidth="2.4" opacity="0.85" className="origin-center animate-aaCore [transform-box:fill-box]" />
          <circle cx="160" cy="240" r="6.5" fill="url(#aaEye)" filter="url(#aaGlowF)" className="origin-center animate-aaCore [transform-box:fill-box]" />

          {/* side head units */}
          <rect x="76" y="106" width="18" height="46" rx="9" fill="#dbe2ee" />
          <rect x="226" y="106" width="18" height="46" rx="9" fill="#dbe2ee" />
          <circle cx="85" cy="129" r="4.5" fill="var(--primary)" filter="url(#aaGlowF)" className="origin-center animate-aaAnt [transform-box:fill-box]" />
          <circle cx="235" cy="129" r="4.5" fill="var(--primary)" filter="url(#aaGlowF)" className="origin-center animate-aaAnt [transform-box:fill-box]" />

          {/* head shell */}
          <rect x="90" y="58" width="140" height="120" rx="50" fill="url(#aaShell)" filter="url(#aaSoft)" />
          <ellipse cx="135" cy="82" rx="36" ry="16" fill="#ffffff" opacity="0.7" />

          {/* face visor */}
          <rect x="106" y="80" width="108" height="82" rx="34" fill="#0a0e1c" />
          {/* eyes */}
          <rect x="130" y="104" width="19" height="32" rx="9.5" fill="url(#aaEye)" filter="url(#aaGlowF)" className="origin-center animate-aaBlink [transform-box:fill-box]" />
          <rect x="171" y="104" width="19" height="32" rx="9.5" fill="url(#aaEye)" filter="url(#aaGlowF)" className="origin-center animate-aaBlink [transform-box:fill-box]" />
          <circle cx="136" cy="113" r="3" fill="#fff" opacity="0.95" />
          <circle cx="177" cy="113" r="3" fill="#fff" opacity="0.95" />
          {/* smile */}
          <path d="M146 146 q14 11 28 0" stroke="var(--primary)" strokeWidth="3.4" fill="none" strokeLinecap="round" filter="url(#aaGlowF)" />
        </g>
      </svg>
    </div>
  );
}

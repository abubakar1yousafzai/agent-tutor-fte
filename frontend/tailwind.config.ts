import type { Config } from "tailwindcss";

// Semantic colors map to CSS variables defined in globals.css.
// The app runs in the "periwinkle dark" palette from the original design system.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surfaceAlt: "var(--surface-alt)",
        ink: "var(--ink)",
        inkSoft: "var(--ink-soft)",
        inkMute: "var(--ink-mute)",
        line: "var(--line)",
        primary: "var(--primary)",
        primaryDeep: "var(--primary-deep)",
        primarySoft: "var(--primary-soft)",
        primaryTint: "var(--primary-tint)",
        ok: "var(--ok)",
        warn: "var(--warn)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      keyframes: {
        aaBob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        aaGlow: {
          "0%,100%": { opacity: "0.45", transform: "translate(-50%,-50%) scale(1)" },
          "50%": { opacity: "0.8", transform: "translate(-50%,-50%) scale(1.12)" },
        },
        aaBlink: {
          "0%,42%,48%,90%,100%": { transform: "scaleY(1)" },
          "45%,93%": { transform: "scaleY(.08)" },
        },
        aaAnt: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        aaShadow: {
          "0%,100%": { transform: "scaleX(1)", opacity: "0.5" },
          "50%": { transform: "scaleX(.84)", opacity: "0.32" },
        },
        aaThink: {
          "0%,100%": { opacity: "0.25", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-5px)" },
        },
        aaRing: {
          "0%": { transform: "translate(-50%,-50%) scale(.5)", opacity: "0.55" },
          "100%": { transform: "translate(-50%,-50%) scale(1.7)", opacity: "0" },
        },
        aaFloatA: {
          "0%,100%": { transform: "translateY(0) rotate(-4deg)" },
          "50%": { transform: "translateY(-12px) rotate(4deg)" },
        },
        aaFloatB: {
          "0%,100%": { transform: "translateY(0) rotate(5deg)" },
          "50%": { transform: "translateY(-10px) rotate(-5deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typing: {
          "0%,100%": { opacity: "0.3", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-3px)" },
        },
      },
      animation: {
        aaBob: "aaBob 3.6s ease-in-out infinite",
        aaGlow: "aaGlow 4s ease-in-out infinite",
        aaBlink: "aaBlink 4.2s ease-in-out infinite",
        aaAnt: "aaAnt 1.8s ease-in-out infinite",
        aaCore: "aaAnt 2.4s ease-in-out infinite",
        aaShadow: "aaShadow 3.6s ease-in-out infinite",
        aaRing: "aaRing 3.4s ease-out infinite",
        aaFloatA: "aaFloatA 5s ease-in-out infinite",
        aaFloatB: "aaFloatB 6s ease-in-out infinite",
        fadeUp: "fadeUp .5s ease-out both",
        typing: "typing 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        corp: {
          base:     "#03090F",
          surface:  "#071526",
          elevated: "#0E2040",
          border:   "rgba(37,99,235,0.15)",
        },
      },
      animation: {
        /* ── 21st.dev / magic-ui ─────────────────────────────── */
        "border-beam":  "border-beam-rotate var(--beam-dur,6s) linear infinite var(--beam-delay,0s)",
        "shimmer":      "shimmer-sweep var(--shimmer-dur,2.5s) linear infinite",
        "grid-pulse":   "grid-square-fade 4s ease-in-out infinite",
        "meteor":       "meteor-fall linear infinite",
        "shiny":        "shiny-sweep 3s linear infinite",
        /* ── existing ────────────────────────────────────────── */
        "fade-up":      "fadeUp 0.65s ease forwards",
        "float":        "float 6s ease-in-out infinite",
        "pulse-slow":   "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        /* BorderBeam — rotates conic-gradient via CSS @property */
        "border-beam-rotate": {
          "0%":   { "--beam-angle": "0deg" },
          "100%": { "--beam-angle": "360deg" },
        },
        /* TextShimmer — sweeps highlight across text */
        "shimmer-sweep": {
          "0%":   { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        /* Meteors */
        "meteor-fall": {
          "0%":   { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%":  { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
        },
        /* ShinyButton sweep */
        "shiny-sweep": {
          "0%":   { transform: "translateX(-200%) skewX(-20deg)" },
          "100%": { transform: "translateX(300%) skewX(-20deg)" },
        },
        /* General */
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

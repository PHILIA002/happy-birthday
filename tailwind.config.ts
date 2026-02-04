import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./components/**/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nini: {
          text: "var(--nini-text)",
          subtext: "var(--nini-subtext)",
          accent: "var(--nini-accent)",
          panel: "var(--glass-bg)",
          panelBorder: "var(--glass-border)",
        },
      },
      boxShadow: {
        glass: "0 12px 32px rgba(120,90,255,0.35)",
      },
      backdropBlur: {
        glass: "18px",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      const isDark = saved === "dark";
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(systemDark);
      document.documentElement.classList.toggle("dark", systemDark);
    }

    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label="테마 변경"
      className={`
        relative

        w-16
        h-8

        rounded-full
        border

        border-[var(--border)]

        transition-all
        duration-300
        ease-in-out
        cursor-pointer

        ${
          dark
            ? "bg-[var(--primary)]/20"
            : "bg-[var(--surface-soft)]"
        }

        hover:scale-[1.03]
        active:scale-95
      `}
    >
      <Sun
        className={`
          absolute
          left-2
          top-1/2
          -translate-y-1/2

          w-4
          h-4

          transition-opacity
          duration-300

          ${
            dark
              ? "opacity-30"
              : "opacity-100 text-yellow-500"
          }
        `}
      />

      <Moon
        className={`
          absolute
          right-2
          top-1/2
          -translate-y-1/2

          w-4
          h-4

          transition-opacity
          duration-300

          ${
            dark
              ? "opacity-100 text-indigo-400"
              : "opacity-30"
          }
        `}
      />

      <div
        className={`
          absolute
          top-1

          w-6
          h-6

          rounded-full
          shadow-lg

          flex
          items-center
          justify-center

          transition-all
          duration-300
          ease-in-out

          ${
            dark
              ? "left-[calc(100%-1.75rem)] bg-[var(--primary)]"
              : "left-1 bg-yellow-400"
          }
        `}
      >
        {dark ? (
          <Moon className="w-3.5 h-3.5 text-white" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-white" />
        )}
      </div>
    </button>
  );
}
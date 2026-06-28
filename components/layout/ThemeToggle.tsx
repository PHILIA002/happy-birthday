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
      className="
        relative

        w-16
        h-8

        rounded-full

        transition-all
        duration-300

        cursor-pointer

        border
        border-[var(--border)]

        bg-[var(--surface-soft)]
      "
    >
      <div
        className="
          absolute
          left-1/2
          top-1/2

          h-4
          w-px

          -translate-x-1/2
          -translate-y-1/2

          bg-[var(--border)]
        "
      />

      <Sun
        className="
          absolute
          left-2
          top-1/2
          -translate-y-1/2

          w-4
          h-4

          text-yellow-500
          opacity-80
        "
      />

      <Moon
        className="
          absolute
          right-2
          top-1/2
          -translate-y-1/2

          w-4
          h-4

          text-indigo-400
          opacity-80
        "
      />

      <div
        className={`
          absolute
          top-1

          flex
          items-center
          justify-center

          w-6
          h-6

          rounded-full

          shadow-md

          transition-all
          duration-300

          ${
            dark
              ? "translate-x-9 bg-[var(--primary)]"
              : "translate-x-1 bg-yellow-400"
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
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
      className="
        relative group
        w-9 h-9 md:w-10 md:h-10
        flex items-center justify-center

        hover:scale-105
        cursor-pointer
      "
    >
      <div className="relative w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
        <Sun
          className={`
            absolute inset-0 w-full h-full
            transition-all duration-300
            ${dark ? "opacity-0 rotate-90 scale-75" : "opacity-100"}
            text-[var(--primary-soft)]
          `}
        />

        <Moon
          className={`
            absolute inset-0 w-full h-full
            transition-all duration-300
            ${dark ? "opacity-100" : "opacity-0 -rotate-90 scale-75"}
            text-[var(--primary-soft)]
          `}
        />
      </div>
    </button>
  );
}
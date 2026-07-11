"use client";

import Countdown from "./Countdown";
import Links from "./Links";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50

        h-14
        lg:h-16

        px-4
        lg:px-10

        flex
        items-center
        justify-between

        bg-[var(--bg-main)]/50
        lg:bg-[var(--bg-main)]

        border-b
        border-[var(--primary)]/20
      "
    >
      <div className="min-w-0">
        <Countdown />
      </div>

      <div className="flex items-center gap-4 lg:gap-8">
        <Links />
        <ThemeToggle />
      </div>
    </header>
  );
}
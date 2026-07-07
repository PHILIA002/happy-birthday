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

        h-12
        lg:h-16

        px-4
        lg:px-10

        flex
        items-center
        justify-between

        bg-[var(--bg-main)]/40
        lg:bg-[var(--bg-main)]

        border-b
        border-[var(--primary)]/20
      "
    >
      {/* LEFT */}
      <div className="min-w-0">
        <Countdown />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 lg:gap-5">
        <Links />
        <ThemeToggle />
      </div>
    </header>
  );
}
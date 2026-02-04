"use client";

import Countdown from "@/components/Countdown";
import Links from "@/components/Links";

export default function Header() {
  return (
    <header className="fixed left-0 right-0 z-50">
      <div
        className="
          flex items-center justify-between
          gap-4
          px-4 py-2
          md:px-8 md:py-4
          "
      >
        {/* Countdown */}
        <div className="shrink-0">
          <Countdown />
        </div>

        {/* Spacer (desktop only keeps center balance) */}
        <div className="hidden md:block flex-1" />

        {/* Links */}
        <div className="shrink-0">
          <Links />
        </div>
      </div>
    </header>
  );
}

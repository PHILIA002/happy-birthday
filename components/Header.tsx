"use client";

import Countdown from "@/components/Countdown";
import Links from "@/components/Links";

export default function Header() {
  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        px-4 md:px-8 py-4 md:py-6
        flex justify-between items-start
      "
    >
      <Countdown />
      <Links />
    </header>
  );
}

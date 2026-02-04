"use client";

import { LINKS } from "@/data/links";
import GlassCard from "./GlassCard";

export default function Links() {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          className="group relative"
        >
          {/* Glow ring */}
          <div
            className="
              absolute inset-0 rounded-full
              bg-purple-300/30 blur-md opacity-0
              group-hover:opacity-100
              transition-opacity duration-300
            "
          />

          {/* Button */}
          <GlassCard
            className="
              relative
              w-9 h-9 md:w-11 md:h-11
              rounded-full
              bg-white/25
              border border-white/50
              backdrop-blur-md
              flex items-center justify-center

              shadow-[0_4px_12px_rgba(140,110,255,0.25)]
              transition-all duration-200 ease-out

              group-hover:scale-110
              group-hover:bg-white/35
              active:scale-95
            "
          >
            <img
              src={link.img}
              alt=""
              className="w-5 h-5 md:w-7 md:h-7"
            />
          </GlassCard>
        </a>
      ))}
    </div>
  );
}

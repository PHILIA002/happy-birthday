"use client";

import { LINKS } from "@/data/links";
import GlassCard from "./GlassCard";

export default function Links() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          className="group relative cursor-pointer"
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
              flex items-center justify-center
              group-hover:scale-110
              group-hover:bg-white/35
              active:scale-95
            "
          >
            <img
              src={link.img}
              alt=""
              className="w-5 h-5 md:w-7 md:h-7 pointer-events-none"
            />
          </GlassCard>
        </a>
      ))}
    </div>
  );
}

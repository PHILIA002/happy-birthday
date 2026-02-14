"use client";

import Link from "next/link";
import { LINKS } from "@/data/links";
import GlassCard from "./GlassCard";
import { Home, BookMarked } from "lucide-react";

export default function Links() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">

      {/* ===== HOME ===== */}
      <Link
        href="/"
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
            h-9 md:h-11
            px-2 md:px-3
            rounded-full
            flex items-center
            whitespace-nowrap
            group-hover:scale-110
            group-hover:bg-white/35
            active:scale-95
            transition-colors duration-300
            text-[#A78BFA]/90 hover:text-[#8B6FE8]
          "
        >
          <div className="flex items-center gap-1.5">
            <Home className="w-4 h-4 md:w-5 md:h-5" />

            <span
              className="
                hidden md:inline
                text-xs md:text-base
                font-medium tracking-wide
              "
            >
              홈
            </span>
          </div>
        </GlassCard>
      </Link>

      {/* ===== 방명록 (내부 라우팅) ===== */}
      <Link
        href="/guestbook"
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
            h-9 md:h-11
            px-2 md:px-3
            rounded-full
            flex items-center
            whitespace-nowrap
            group-hover:scale-110
            group-hover:bg-white/35
            active:scale-95
            transition-colors duration-300
            text-[#A78BFA]/90 hover:text-[#8B6FE8]
          "
        >
          <div className="flex items-center gap-1.5">
            <BookMarked className="w-4 h-4 md:w-5 md:h-5" />

            <span
              className="
                hidden md:inline
                text-xs md:text-base
                font-medium tracking-wide
              "
            >
              방명록
            </span>
          </div>
        </GlassCard>
      </Link>

      {/* ===== Divider ===== */}
      <div
        className="
          hidden md:block
          mx-2
          w-px
          h-8
          bg-gradient-to-b
          from-transparent
          via-white/40
          to-transparent
          opacity-60
        "
      />

      {/* ===== 외부 링크 ===== */}
      <div className="hidden md:flex items-center gap-3">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
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
                className="w-6 h-6 md:w-7 md:h-7 pointer-events-none"
              />
            </GlassCard>
          </a>
        ))}
      </div>
    </div>
  );
}

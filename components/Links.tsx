"use client";

import Link from "next/link";
import { LINKS } from "@/data/links";
import GlassCard from "./GlassCard";
import { BookMarked } from "lucide-react";

export default function Links() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">

      {/* ===== 외부 링크 ===== */}
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

      {/* ===== 방명록 (내부 라우팅) ===== */}
      <Link
        href="/guestbook"
        className="group relative cursor-pointer mt-3 ml-0 md:mt-0 md:ml-4"
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
            !bg-[#A78BFA]/90
            hover:!bg-[#8B6FE8]
            group-hover:scale-110
            active:scale-95
            transition-colors duration-300
          "
        >
          <div className="flex items-center gap-1.5">
            <BookMarked className="w-5 h-5 md:w-6 md:h-6 text-white" />

            <span
              className="
                hidden md:inline
                text-xs md:text-base
                font-medium tracking-wide
                text-white
              "
            >
              방명록
            </span>
          </div>
        </GlassCard>
      </Link>
    </div>
  );
}

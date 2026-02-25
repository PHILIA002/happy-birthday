"use client";

import { Sparkle } from "lucide-react";
import { useState } from "react";
import { SERVERS } from "@/data/servers";
import GlassCard from "../GlassCard";
import RevealCard from "../RevealCard";

export default function Server() {
  const TopIcon = SERVERS[0].icon;
  const [modal, setModal] = useState<string | null>(null);

  return (
    <section className="relative py-12 md:py-24 overflow-hidden">

      {/* 상단 타이틀 */}
      <div className="relative flex flex-col items-center mb-16 md:mb-24 px-6">
        {/* 은은한 글로우 배경 */}
        <div
          className="
            absolute
            -top-2
            w-40 h-16
            bg-gradient-to-r
            from-[#C8B8FF]/40
            via-[#A78BFA]/30
            to-[#8B6FE8]/20
            blur-2xl
            opacity-25
            pointer-events-none
          "
        />

        {/* 타이틀 */}
        <h2
          className="
            relative
            text-2xl md:text-3xl
            font-semibold
            tracking-[0.1em]
            bg-gradient-to-r
            from-[#7C66B4]
            via-[#A78BFA]/80
            to-[#BDA6FF]/90
            bg-clip-text
            text-transparent
          "
        >
          니니밍의 순간들
        </h2>

        {/* 장식 라인 */}
        <div
          className="
            mt-3
            w-20 h-[1.5px]
            bg-gradient-to-r
            from-transparent
            via-[#B7A6FF]/60
            to-transparent
            opacity-50
          "
        />
      </div>

      {/* 타임라인 */}
      <div
        className="
          hidden md:block
          absolute left-1/2
          top-[920px] bottom-0
          -translate-x-1/2
          w-[2px]
          bg-gradient-to-b
          from-[#E9DEFF]/50
          via-[#C8B8FF]/40
          to-transparent
          opacity-50
          blur-[0.3px]
          pointer-events-none
        "
      />

      {/* 메인 서버 */}
      <div className="relative flex flex-col items-center mb-40 md:mb-52 px-6">
        {SERVERS[0].imgSrc && (
          <img
            src={SERVERS[0].imgSrc}
            alt={SERVERS[0].title}
            onClick={() => setModal(SERVERS[0].imgSrc!)}
            className="
              w-full max-w-[760px]
              h-[280px] md:h-[400px]
              object-contain
              rounded-[28px] md:rounded-3xl
              border border-white/20
              shadow-[0_25px_70px_rgba(180,160,255,0.18)]
              mb-12 md:mb-14
              cursor-zoom-in
              transition duration-500
              hover:scale-[1.02]
              hover:shadow-[0_35px_90px_rgba(180,160,255,0.25)]
            "
          />
        )}

        <GlassCard className="px-10 md:px-14 py-7 md:py-8 backdrop-blur-xl">
          <h2 className="flex items-center gap-3 text-lg md:text-2xl font-semibold" style={{ color: "#4F3F6B" }}>
            <TopIcon className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#7C66B4" }} />
            {SERVERS[0].title}
          </h2>
        </GlassCard>
      </div>

      {/* 타임라인 서버들 */}
      <div className="space-y-28 md:space-y-44">
        {SERVERS.slice(1).map((item, index) => {
          const Icon = item.icon;
          const hasImage = Boolean(item.imgSrc);
          const isReversed = index % 2 === 1;

          return (
            <RevealCard
              key={index}
              index={index}
              className={`relative max-w-6xl mx-auto px-6 ${hasImage
                ? `flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isReversed ? "md:flex-row-reverse" : ""}`
                : "flex justify-center"
                }`}
            >
              {/* 중앙 감성 도트 */}
              <div
                className="
                  flex
                  absolute -top-4 md:-top-5
                  left-1/2 -translate-x-1/2
                  items-center justify-center
                  w-7 h-7 md:w-8 md:h-8
                  rounded-full
                  bg-white/30
                  backdrop-blur-md
                  border border-white/40
                  shadow-[0_0_20px_rgba(160,130,255,0.5)]
                  transition duration-300
                  hover:scale-110
                  z-20
                "
              >
                <Sparkle
                  className="w-3.5 h-3.5 md:w-4 md:h-4 animate-sparkle"
                  style={{
                    color: "#9F84FF",
                    filter: "drop-shadow(0 0 4px rgba(160,130,255,0.6))",
                  }}
                />
              </div>

              {hasImage ? (
                <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full ${isReversed ? "md:flex-row-reverse" : ""}`}>
                  <img
                    src={item.imgSrc!}
                    alt={item.title}
                    onClick={() => setModal(item.imgSrc!)}
                    className="
                      w-full max-w-[480px]
                      h-[220px] md:h-[320px]
                      object-contain
                      rounded-[26px] md:rounded-3xl
                      border border-white/20
                      shadow-[0_15px_40px_rgba(180,160,255,0.15)]
                      cursor-zoom-in
                      transition duration-500
                      hover:scale-[1.03]
                      hover:shadow-[0_25px_60px_rgba(180,160,255,0.22)]
                    "
                  />
                  <div className="flex-1 flex justify-center">
                    <GlassCard className="w-full max-w-md px-7 md:px-9 py-7 md:py-8 text-center backdrop-blur-xl transition duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(160,130,255,0.2)]">
                      {item.date && <p className="mb-2 text-[11px] md:text-xs tracking-[0.25em]" style={{ color: "#8B6FE8" }}>{item.date}</p>}
                      <h3 className="flex items-center justify-center gap-2 text-base md:text-xl font-semibold" style={{ color: "#4F3F6B" }}>
                        <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: "#7C66B4" }} />
                        {item.title}
                      </h3>
                      {item.text && <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: "#6E5A8A" }}>{item.text}</p>}
                    </GlassCard>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center w-full">
                  <GlassCard className="w-full max-w-lg px-7 md:px-9 py-7 md:py-8 text-center backdrop-blur-xl transition duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(160,130,255,0.2)]">
                    {item.date && <p className="mb-2 text-[11px] md:text-xs tracking-[0.25em]" style={{ color: "#8B6FE8" }}>{item.date}</p>}
                    <h3 className="flex items-center justify-center gap-2 text-base md:text-xl font-semibold" style={{ color: "#4F3F6B" }}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: "#7C66B4" }} />
                      {item.title}
                    </h3>
                    {item.text && <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: "#6E5A8A" }}>{item.text}</p>}
                  </GlassCard>
                </div>
              )}
            </RevealCard>
          );
        })}
      </div>

      {/* MODAL */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out animate-fadeIn"
        >
          <img
            src={modal}
            alt=""
            className="max-h-[90vh] w-auto rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
          />
        </div>
      )}
    </section>
  );
}
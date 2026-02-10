"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { SERVERS } from "@/data/servers";
import GlassCard from "../GlassCard";

export default function Server() {
  const TopIcon = SERVERS[0].icon;
  const [modal, setModal] = useState<string | null>(null);

  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* 배경 감성 오로라 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-violet-300/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-fuchsia-300/10 blur-[160px] rounded-full" />
      </div>

      {/* 타임라인 라인 (0번 이후부터) */}
      <div
        className="
          hidden md:block
          absolute left-1/2
          top-[950px] bottom-0
          -translate-x-1/2
          w-[2px]
          bg-gradient-to-b
          from-[#E9DEFF]
          via-[#C8B8FF]
          to-transparent
          opacity-70
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
              border border-white/40
              shadow-[0_30px_80px_rgba(180,160,255,0.25)]
              mb-12 md:mb-14
              cursor-zoom-in
              transition duration-500
              hover:scale-[1.02]
              hover:shadow-[0_40px_100px_rgba(180,160,255,0.35)]
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
            <div
              key={index}
              className={`relative max-w-6xl mx-auto px-6 ${
                hasImage
                  ? `flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isReversed ? "md:flex-row-reverse" : ""}`
                  : "flex justify-center"
              }`}
            >
              {/* 중앙 감성 도트 */}
              <div
                className="
                  hidden md:flex
                  absolute -top-4 left-1/2 -translate-x-1/2
                  items-center justify-center
                  w-9 h-9
                  rounded-full
                  bg-white/40
                  backdrop-blur-md
                  border border-white/60
                  shadow-[0_0_35px_rgba(160,130,255,0.9)]
                  transition duration-300
                  hover:scale-110
                  z-20
                "
              >
                <Sparkles
                  className="w-4 h-4"
                  style={{
                    color: "#9F84FF",
                    filter: "drop-shadow(0 0 6px rgba(160,130,255,0.9))",
                  }}
                />
              </div>

              {hasImage ? (
                // 이미지 + 카드 묶음
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
                      border border-white/30
                      shadow-[0_15px_45px_rgba(180,160,255,0.18)]
                      cursor-zoom-in
                      transition duration-500
                      hover:scale-[1.03]
                      hover:shadow-[0_25px_65px_rgba(180,160,255,0.28)]
                    "
                  />
                  <div className="flex-1 flex justify-center">
                    <GlassCard className="w-full max-w-md px-7 md:px-9 py-7 md:py-8 text-center backdrop-blur-xl transition duration-500 hover:scale-[1.02] hover:shadow-[0_25px_70px_rgba(160,130,255,0.25)]">
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
                // 이미지 없는 카드
                <div className="flex justify-center w-full">
                  <GlassCard className="w-full max-w-lg px-7 md:px-9 py-7 md:py-8 text-center backdrop-blur-xl transition duration-500 hover:scale-[1.02] hover:shadow-[0_25px_70px_rgba(160,130,255,0.25)]">
                    {item.date && <p className="mb-2 text-[11px] md:text-xs tracking-[0.25em]" style={{ color: "#8B6FE8" }}>{item.date}</p>}
                    <h3 className="flex items-center justify-center gap-2 text-base md:text-xl font-semibold" style={{ color: "#4F3F6B" }}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: "#7C66B4" }} />
                      {item.title}
                    </h3>
                    {item.text && <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: "#6E5A8A" }}>{item.text}</p>}
                  </GlassCard>
                </div>
              )}
            </div>
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
            className="max-h-[90vh] w-auto rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          />
        </div>
      )}
    </section>
  );
}

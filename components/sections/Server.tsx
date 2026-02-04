"use client";

import { SERVERS } from "@/data/servers";
import GlassCard from "../GlassCard";

export default function Server() {
  const TopIcon = SERVERS[0].icon;

  return (
    <section className="relative py-32">
      {/* 세로 타임라인 */}
      <div
        className="
          absolute left-1/2 top-0 -translate-x-1/2
          w-px h-full
          bg-gradient-to-b
          from-transparent via-nini-accent/40 to-transparent
          pointer-events-none
        "
      />

      {/* 첫 메인 서버 */}
      <div className="relative flex flex-col items-center mb-40 px-6">
        {SERVERS[0].imgSrc && (
          <img
            src={SERVERS[0].imgSrc}
            alt={SERVERS[0].title}
            className="
              w-full max-w-[720px]
              h-[320px] md:h-[380px]
              object-contain
              rounded-3xl
              border border-white/50
              shadow-[0_18px_56px_rgba(180,140,255,0.45)]
              mb-10
            "
          />
        )}

        <GlassCard className="px-10 py-6">
          <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-nini-text">
            <TopIcon className="w-6 h-6 text-nini-accent" />
            {SERVERS[0].title}
          </h2>
        </GlassCard>
      </div>

      {/* 타임라인 서버들 */}
      <div className="space-y-32 md:space-y-36">
        {SERVERS.slice(1).map((item, index) => {
          const Icon = item.icon;
          const hasImage = Boolean(item.imgSrc);
          const isReversed = index % 2 === 1;

          return (
            <div
              key={index}
              className={`
                relative max-w-6xl mx-auto px-6
                ${
                  hasImage
                    ? `flex flex-col md:flex-row items-center gap-12 md:gap-20
                      ${isReversed ? "md:flex-row-reverse" : ""}`
                    : "flex justify-center"
                }
              `}
            >
              {/* 중앙 도트 */}
              <span
                className="
                  absolute left-1/2 top-8 -translate-x-1/2
                  w-2.5 h-2.5 rounded-full
                  bg-nini-accent
                  shadow-[0_0_12px_rgba(180,140,255,0.9)]
                  animate-dot
                "
              />

              {/* 이미지 (있는 경우만) */}
              {hasImage && (
                <div className="flex-1 flex justify-center">
                  <img
                    src={item.imgSrc!}
                    alt={item.title}
                    className="
                      w-full max-w-[460px]
                      h-[240px] md:h-[300px]
                      object-contain
                      rounded-3xl
                      border border-white/40
                      shadow-[0_14px_36px_rgba(180,140,255,0.35)]
                    "
                  />
                </div>
              )}

              {/* 정보 카드 */}
              <div className={`${hasImage ? "flex-1" : ""} flex justify-center`}>
                <GlassCard
                  className={`
                    w-full px-7 py-6 text-center
                    ${hasImage ? "max-w-sm" : "max-w-md"}
                  `}
                >
                  {/* 날짜 */}
                  {item.date && (
                    <p className="mb-2 text-xs tracking-widest text-nini-accent">
                      {item.date}
                    </p>
                  )}

                  {/* 타이틀 */}
                  <h3 className="flex items-center justify-center gap-2 text-lg md:text-xl font-bold text-nini-text">
                    <Icon className="w-5 h-5 text-nini-accent" />
                    {item.title}
                  </h3>

                  {/* 설명 */}
                  {item.text && (
                    <p className="mt-1 text-sm md:text-base text-nini-subtext leading-relaxed">
                      {item.text}
                    </p>
                  )}
                </GlassCard>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

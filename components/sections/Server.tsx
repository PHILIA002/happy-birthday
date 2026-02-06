"use client";

import { SERVERS } from "@/data/servers";
import GlassCard from "../GlassCard";

export default function Server() {
  const TopIcon = SERVERS[0].icon;

  return (
    <section className="relative py-36">
      {/* 타임라인 라인 */}
      <div
        className="
          absolute left-1/2 top-0 -translate-x-1/2
          w-px h-full
          bg-gradient-to-b
          from-transparent via-[#CFC3E6]/90 to-transparent
          pointer-events-none
        "
      />

      {/* 메인 서버 */}
      <div className="relative flex flex-col items-center mb-52 px-6">
        {SERVERS[0].imgSrc && (
          <img
            src={SERVERS[0].imgSrc}
            alt={SERVERS[0].title}
            className="
              w-full max-w-[760px]
              h-[340px] md:h-[400px]
              object-contain
              rounded-3xl
              border border-white/50
              shadow-[0_35px_90px_rgba(180,160,255,0.22)]
              mb-14
            "
          />
        )}

        <GlassCard className="px-14 py-8">
          <h2
            className="flex items-center gap-3 text-xl md:text-2xl font-semibold"
            style={{ color: "#4F3F6B" }}
          >
            <TopIcon className="w-6 h-6" style={{ color: "#7C66B4" }} />
            {SERVERS[0].title}
          </h2>
        </GlassCard>
      </div>

      {/* 타임라인 */}
      <div className="space-y-36 md:space-y-44">
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
                    ? `flex flex-col md:flex-row items-center gap-14 md:gap-24
                      ${isReversed ? "md:flex-row-reverse" : ""}`
                    : "flex justify-center"
                }
              `}
            >
              {/* 중앙 감성 도트 */}
              <span
                className="
                  absolute left-1/2 top-8 -translate-x-1/2
                  w-3 h-3 rounded-full
                  bg-[#D8C4FF]
                  shadow-[0_0_26px_rgba(200,180,255,0.95)]
                  animate-dot hover:scale-125 transition-transform duration-300

                "
              />

              {/* 이미지 */}
              {hasImage && (
                <div className="flex-1 flex justify-center">
                  <img
                    src={item.imgSrc!}
                    alt={item.title}
                    className="
                      w-full max-w-[480px]
                      h-[250px] md:h-[320px]
                      object-contain
                      rounded-3xl
                      border border-white/40
                      shadow-[0_18px_55px_rgba(180,160,255,0.15)]
                    "
                  />
                </div>
              )}

              {/* 카드 */}
              <div className={`${hasImage ? "flex-1" : ""} flex justify-center`}>
                <GlassCard
                  className={`
                    w-full px-9 py-8 text-center
                    ${hasImage ? "max-w-md" : "max-w-lg"}
                  `}
                >
                  {item.date && (
                    <p
                      className="mb-2 text-xs tracking-[0.25em]"
                      style={{ color: "#8B6FE8" }}
                    >
                      {item.date}
                    </p>
                  )}

                  <h3
                    className="flex items-center justify-center gap-2 text-lg md:text-xl font-semibold"
                    style={{ color: "#5A4A72" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#7C66B4" }} />
                    {item.title}
                  </h3>

                  {item.text && (
                    <p
                      className="mt-2 text-sm md:text-base leading-relaxed"
                      style={{ color: "#6E5A8A" }}
                    >
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

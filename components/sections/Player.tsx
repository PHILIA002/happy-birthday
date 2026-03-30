"use client";

import { VIDEOS } from "@/data/videos";

export default function Player() {
  return (
    <section className="py-16 md:py-28 px-6">

      {/* ===== 헤더 ===== */}
      <div className="flex flex-col items-center mb-14 md:mb-20 relative">

        {/* glow */}
        <div className="
          absolute
          -top-10
          w-[380px] h-[160px]
          bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.35),transparent_70%)]
          blur-3xl
          opacity-70
          pointer-events-none
        "/>

        {/* 서브 텍스트 */}
        <p className="
          mb-3
          text-[11px] md:text-xs
          tracking-[0.4em]
          text-[#9F84FF]/80
          uppercase
        ">
          with niniming
        </p>

        {/* 메인 타이틀 */}
        <h2 className="
          text-3xl md:text-4xl
          font-semibold
          tracking-[0.18em]
          bg-gradient-to-r
          from-[#6E5A8A]
          via-[#8B6FE8]
          to-[#CBB8FF]
          bg-clip-text
          text-transparent
          drop-shadow-[0_6px_18px_rgba(139,111,232,0.35)]
        ">
          니니밍과 함께
        </h2>

        {/* underline */}
        <div className="
          mt-6
          w-24 h-[2px]
          bg-gradient-to-r
          from-transparent
          via-[#B7A6FF]/70
          to-transparent
        "/>
      </div>

      {/* ===== 영상 리스트 ===== */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6 md:gap-8
        max-w-5xl
        mx-auto
      ">
        {VIDEOS.map((video) => (
          <div
            key={video.id}
            className="
              group
              transition
              hover:-translate-y-1
            "
          >
            {/* 제목 */}
            <p className="
              mb-2
              text-sm
              text-[#6E5A8A]
              font-medium
              text-center
            ">
              {video.title}
            </p>

            {/* 영상 */}
            <div className="
              relative
              w-full aspect-video
              rounded-2xl
              overflow-hidden
              border border-white/20
              shadow-[0_20px_60px_rgba(120,90,255,0.18)]
            ">
              <iframe
                src={video.embedUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
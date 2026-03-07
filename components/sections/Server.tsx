"use client";

import { useState, useEffect } from "react";
import { SERVERS } from "@/data/servers";
import GlassCard from "../GlassCard";
import RevealCard from "../RevealCard";

export default function Server() {
  const TopIcon = SERVERS[0].icon;
  const [modal, setModal] = useState<string | null>(null);

  useEffect(() => {
    if (!modal) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [modal]);

  return (
    <section className="relative py-14 md:py-24 overflow-hidden">

      {/* MAIN */}
      <div className="relative flex flex-col items-center mb-32 md:mb-56 px-6">
        {SERVERS[0].imgSrc && (
          <img
            src={SERVERS[0].imgSrc}
            alt={SERVERS[0].title}
            onClick={() => setModal(SERVERS[0].imgSrc!)}
            className="
              w-full max-w-[720px]
              aspect-[16/9]
              object-contain
              rounded-[28px] md:rounded-3xl
              border border-white/20
              shadow-[0_25px_70px_rgba(180,160,255,0.18)]
              mb-10 md:mb-14
              cursor-zoom-in
              transition duration-500
              hover:scale-[1.02]
            "
          />
        )}

        <GlassCard className="px-9 md:px-14 py-6 md:py-8">
          <h2 className="flex items-center gap-3 text-lg md:text-2xl font-semibold" style={{ color: "#4F3F6B" }}>
            <TopIcon className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#7C66B4" }} />
            {SERVERS[0].title}
          </h2>
        </GlassCard>
      </div>

      <div className="relative flex flex-col items-center mb-32 md:mb-40 px-6">

        {/* soft glow behind title */}
        <div
          className="
            absolute
            -top-12
            w-[420px] h-[180px]
            bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.35),transparent_70%)]
            blur-3xl
            opacity-70
            pointer-events-none
          "
        />

        {/* sub text */}
        <p
          className="
            mb-3
            text-[11px] md:text-xs
            tracking-[0.45em]
            text-[#9F84FF]/80
            uppercase
          "
        >
          memories of niniming
        </p>

        {/* main title */}
        <h2
          className="
            relative
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
          "
        >
          니니밍의 순간들
        </h2>

        {/* underline glow */}
        <div
          className="
            mt-6
            w-28 h-[2px]
            bg-gradient-to-r
            from-transparent
            via-[#B7A6FF]/70
            to-transparent
            blur-[0.3px]
          "
        />
      </div>

      {/* 타임라인 */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[1130px]
          bottom-0
          -translate-x-1/2
          w-[2px]
          hidden md:block
        "
      >
        {/* main line */}
        <div
          className="
            w-full h-full
            bg-gradient-to-b
            from-[#CBB8FF]/0
            via-[#CBB8FF]/50
            to-[#CBB8FF]/0
          "
        />

        {/* glow */}
        <div
          className="
            absolute inset-0
            blur-[6px]
            bg-gradient-to-b
            from-transparent
            via-[#C8B8FF]/35
            to-transparent
            opacity-70
            animate-lineGlow
          "
        />
      </div>

      {/* 타임라인 서버들 */}
      <div className="space-y-28 md:space-y-48">
        {SERVERS.slice(1).map((item, index) => {
          const Icon = item.icon;
          const hasImage = Boolean(item.imgSrc);
          const isReversed = index % 2 === 1;

          return (
            <RevealCard
              key={index}
              index={index}
              className="
                relative max-w-6xl mx-auto px-4 md:px-6
                py-6 md:py-10
              "
            >
              {/* 도트 */}
              <div
                className="
                  absolute
                  -top-3
                  left-1/2 -translate-x-1/2
                  flex items-center justify-center
                "
              >
                {/* glow ring */}
                <div
                  className="
                    absolute
                    w-6 h-6
                    rounded-full
                    bg-[#A78BFA]/30
                    blur-md
                    animate-pulse
                  "
                />

                {/* core */}
                <div
                  className="
                    relative
                    w-3 h-3
                    rounded-full
                    bg-gradient-to-br
                    from-[#CBB8FF]
                    to-[#8B6FE8]
                    shadow-[0_0_10px_rgba(167,139,250,0.9)]
                  "
                />
              </div>

              <div
                className={`
                  flex flex-col
                  md:flex-row
                  items-center
                  gap-7 md:gap-12
                  ${isReversed ? "md:flex-row-reverse" : ""}
                `}
              >
                {hasImage && (
                  <img
                    src={item.imgSrc!}
                    alt={item.title}
                    onClick={() => setModal(item.imgSrc!)}
                    className="
                      w-full max-w-[520px]
                      aspect-[16/10]
                      object-contain
                      rounded-[26px] md:rounded-3xl
                      border border-white/20
                      shadow-[0_15px_40px_rgba(180,160,255,0.15)]
                      cursor-zoom-in
                      transition duration-500
                      hover:scale-[1.03]
                    "
                  />
                )}

                <div className="flex-1 flex justify-center w-full">
                  <GlassCard
                    className="
                      w-full
                      max-w-[320px] md:max-w-md
                      px-5 md:px-9
                      py-6 md:py-8
                      text-center
                    "
                  >
                    {item.date && (
                      <p
                        className="mb-2 text-[11px] md:text-xs tracking-[0.25em]"
                        style={{ color: "#8B6FE8" }}
                      >
                        {item.date}
                      </p>
                    )}

                    <h3
                      className="flex items-center justify-center gap-2 text-base md:text-xl font-semibold"
                      style={{ color: "#4F3F6B" }}
                    >
                      <Icon
                        className="w-4 h-4 md:w-5 md:h-5"
                        style={{ color: "#7C66B4" }}
                      />
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
            </RevealCard>
          );
        })}
      </div>

      {/* MODAL */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          className="
            fixed inset-0 z-[999]
            bg-black/85 backdrop-blur-lg
            flex items-center justify-center
            p-6 md:p-10
            animate-fadeIn
          "
        >
          <img
            src={modal}
            alt=""
            className="
              max-h-[92vh]
              max-w-[92vw]
              rounded-2xl
              shadow-[0_40px_120px_rgba(0,0,0,0.5)]
            "
          />
        </div>
      )}
    </section>
  );
}
"use client";

import { useRef, useEffect, useState } from "react";
import GlassCard from "../GlassCard";
import { LETTER_TEXT } from "@/data/letter";
import Caret from "../Caret";
import useHandwriting from "@/hooks/useHandwriting";
import Toast from "../Toast";

export default function Letter() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [shake, setShake] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);
  const [toast, setToast] = useState(false);

  // ---------- Birthday Check ----------
  useEffect(() => {
    const now = new Date();

    const start = new Date(`${now.getFullYear()}-04-19T00:00:00+09:00`);
    const end = new Date(`${now.getFullYear()}-04-20T00:00:00+09:00`);

    setIsBirthday(now >= start && now < end);
  }, []);

  // ---------- Open Flow ----------
  const openEnvelope = () => {
    if (!isBirthday) {
      setShake(true);
      setToast(true);

      setTimeout(() => setShake(false), 500);
      return;
    }

    if (opened) return;

    setOpened(true);
    setTimeout(() => setShowLetter(true), 520);
  };

  return (
    <section className="min-h-[70vh] py-12 md:py-24 px-6 flex items-center justify-center">
      <div className="relative w-full max-w-3xl flex justify-center">

        {/* ================= Envelope ================= */}
        {!showLetter && (
          <div
            onClick={openEnvelope}
            className={`
              relative
              w-[92vw] max-w-[560px]
              aspect-[14/9]
              cursor-pointer select-none
              perspective-[1600px]
              rounded-2xl
              overflow-hidden
              shadow-[0_20px_160px_rgba(120,90,255,.15)]
              ${shake ? "animate-envelope-shake" : ""}
              ${isBirthday ? "animate-envelope-glow" : ""}
            `}
          >
            {/* ===== GLASS BASE ===== */}
            <div className="
              absolute inset-0
              rounded-2xl
              backdrop-blur-2xl
              bg-gradient-to-br
              from-white/40 via-white/18 to-white/8
              border border-white/40
              z-10
            "/>

            {/* ===== BOTTOM FOLD ===== */}
            <div
              className="absolute inset-0 z-20"
              style={{
                clipPath: "polygon(0 100%, 50% 48%, 100% 100%)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,.28), rgba(255,255,255,.05))",
                backdropFilter: "blur(12px)",
              }}
            />

            {/* ===== TOP FLAP ===== */}
            <div
              className={`
                absolute inset-0
                origin-top
                transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                z-30
                ${opened ? "rotate-x-[170deg]" : ""}
              `}
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 58%)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,.10))",
                transformStyle: "preserve-3d",
              }}
            />

            {/* ===== SEAL (Stamp Style) ===== */}
            <div
              className={`
                absolute left-1/2 -translate-x-1/2
                top-[36%] sm:top-[38%] md:top-[40%]

                w-[72px] sm:w-[84px] md:w-[100px]
                aspect-square

                rotate-[-3deg]

                flex items-center justify-center
                text-center p-3

                transition-all duration-500
                ${opened ? "scale-75 opacity-0 rotate-10" : ""}

                z-40
              `}
              style={{
                background: "#E9DDFF",
                boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 4px)"
              }}
            >

              {/* 내부 테두리 라인 */}
              <div className="absolute inset-2 border border-[#9E84E6] pointer-events-none" />

              {/* 텍스트 */}
              <div className="relative z-10">
                <div
                  className="text-xs sm:text-sm md:text-base font-bold tracking-[0.22em]"
                  style={{ color: "#5B45A6" }}
                >
                  {!isBirthday ? "OPEN" : "FOR YOU"}
                </div>

                <div
                  className="text-xs sm:text-sm md:text-base tracking-[0.18em]"
                  style={{ color: "#7B66C9" }}
                >
                  {!isBirthday ? "4.19" : ""}
                </div>
              </div>
            </div>

            {/* Ground shadow */}
            <div className="
              absolute
              -bottom-7 left-1/2 -translate-x-1/2
              w-[85%] h-7
              bg-[radial-gradient(ellipse_at_center,rgba(110,70,200,0.45),transparent_70%)]
              blur-xl
              opacity-70
              pointer-events-none
            "/>

            {/* subtle glow */}
            <div className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_50%_35%,rgba(167,139,250,0.25),transparent_70%)]
              z-50
            " />
          </div>
        )}

        {/* ================= Letter ================= */}
        {showLetter && (
          <LetterCard />
        )}
      </div>
      <Toast
        message="편지는 생일에 열려요."
        show={toast}
        type="info"
        onClose={() => setToast(false)}
      />
    </section>
  );
}

/* ================= Letter Card ================= */

function LetterCard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 80);
    return () => clearTimeout(t);
  }, []);

  const body = useHandwriting(LETTER_TEXT, 50);
  const thanks = useHandwriting(
    "항상 고마워 💜 하얀 천사가",
    40,
    { start: body.done }
  );

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [body.display, thanks.display]);

  return (
    <GlassCard
      className={`
        px-7 sm:px-12 md:px-16
        py-12 md:py-16
        w-full max-w-xl
        transition-all duration-1000
        ease-[cubic-bezier(0.22,1,0.36,1)]
        transform-gpu
        relative overflow-hidden
        ${open
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"}
      `}
    >

      <div className="relative z-10 text-center">
        <p
          className="
            text-base md:text-lg
            whitespace-pre-line
            relative
          "
          style={{
            color: "#5A4A72",
            letterSpacing: "0.02em",
            lineHeight: "30px",
            backgroundImage: `
              repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 29px,
                rgba(139,111,232,0.22) 30px
              )
            `,
          }}
        >
          {body.display}
          {!body.done && <Caret />}
        </p>

        <p className="mt-12 text-sm font-medium text-[#8B6FE8]">
          {thanks.display ?? ""}
          {body.done && !thanks.done && <Caret small />}
        </p>

        <div ref={endRef} />
      </div>
    </GlassCard>
  );
}
"use client";

import { useEffect, useState } from "react";
import GlassCard from "../GlassCard";
import { LETTER_TEXT } from "@/data/letter";

export default function Letter() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [shake, setShake] = useState(false);
  const [isBirthdayPast, setIsBirthdayPast] = useState(false);

  // ---------- Birthday Check ----------
  useEffect(() => {
    const now = new Date();
    const birthday = new Date(`${now.getFullYear()}-02-19T00:00:00+09:00`);
    setIsBirthdayPast(now >= birthday);
  }, []);

  // ---------- Open Flow ----------
  const openEnvelope = () => {
    if (!isBirthdayPast) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (opened) return;

    setOpened(true);
    setTimeout(() => setShowLetter(true), 650);
  };

  return (
    <section className="py-14 md:py-24 px-6 flex justify-center">
      <div className="relative w-full max-w-xl">

        {/* ================= Envelope ================= */}
        {!showLetter && (
        <div
          onClick={openEnvelope}
          className={`
            relative w-[320px] h-[200px]
            cursor-pointer select-none
            transition
            perspective-[1200px]
            ${shake ? "animate-envelope-shake" : ""}
          `}
        >
          {/* ===== LETTER (peek) ===== */}
          <div
            className={`
              absolute left-1/2 -translate-x-1/2
              w-[86%] h-[170px]
              rounded-xl
              backdrop-blur-2xl
              bg-gradient-to-b from-white/80 to-white/60
              border border-white/50
              shadow-[0_25px_60px_rgba(120,90,255,0.18)]
              transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
              ${opened ? "top-[-95px] scale-100" : "top-[44px] scale-[.97]"}
              z-[1]
            `}
          />

          {/* ===== BODY GLASS BASE ===== */}
          <div className="
            absolute inset-0
            rounded-2xl
            backdrop-blur-2xl
            bg-gradient-to-br
            from-white/35 via-white/18 to-white/10
            border border-white/40
            shadow-[0_30px_80px_rgba(120,90,255,0.25)]
            z-10
          " />

          {/* ===== INNER EDGE LIGHT ===== */}
          <div className="
            pointer-events-none
            absolute inset-[2px]
            rounded-[14px]
            bg-[linear-gradient(120deg,rgba(255,255,255,.55),transparent_40%,transparent_60%,rgba(255,255,255,.35))]
            opacity-60
            z-20
          " />

          {/* ===== FLAP ===== */}
          <div
            className={`
              absolute top-0 left-0 w-full h-1/2
              origin-top
              transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
              rounded-t-2xl
              backdrop-blur-2xl
              bg-gradient-to-b from-white/40 to-white/18
              border-b border-white/40
              shadow-[inset_0_-10px_30px_rgba(120,90,255,.15)]
              ${opened ? "rotate-x-[165deg]" : ""}
              z-30
            `}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          />

          {/* ===== SEAL (유리 스티커) ===== */}
          <div
            className={`
              absolute left-1/2 -translate-x-1/2
              top-[78px]
              w-12 h-12
              rounded-full
              backdrop-blur-xl
              bg-gradient-to-br from-white/70 to-white/30
              border border-white/60
              shadow-[0_10px_30px_rgba(120,90,255,.35)]
              flex items-center justify-center
              text-[10px] font-semibold text-[#7C6AA8]
              transition
              ${opened ? "scale-0 opacity-0" : ""}
              z-40
            `}
          >
            💜
          </div>

          {/* ===== SOFT GLOW ===== */}
          <div className="
            pointer-events-none absolute inset-0 rounded-2xl
            bg-[radial-gradient(circle_at_50%_20%,rgba(167,139,250,0.45),transparent_70%)]
            opacity-70
            z-50
          " />
        </div>
        )}

        {/* ================= Letter ================= */}
        {showLetter && (
          <LetterCard />
        )}
      </div>
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

  return (
    <GlassCard
      className={`
        px-8 md:px-12
        py-10 md:py-14
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
            leading-relaxed
            whitespace-pre-line
          "
          style={{
            color: "#5A4A72",
            backgroundImage: `
              repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 27px,
                rgba(139,111,232,0.25) 28px
              )
            `,
            lineHeight: "28px",
            padding: "2px 0"
          }}
        >
          {LETTER_TEXT}
        </p>

        <p className="mt-10 text-sm font-medium text-[#8B6FE8]">
          항상 고마워 🌸
        </p>
      </div>
    </GlassCard>
  );
}
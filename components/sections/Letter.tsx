"use client";

import { useEffect, useState } from "react";
import GlassCard from "../GlassCard";
import { LETTER_TEXT } from "@/data/letter";
import Caret from "../Caret";
import useHandwriting from "@/hooks/useHandwriting";

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

            {/* ===== BOTTOM FOLD (seam fix) ===== */}
            <div
              className="absolute inset-0 z-20"
              style={{
                clipPath: "polygon(0 100%, 50% 58%, 100% 100%)",
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
                clipPath: "polygon(0 0, 100% 0, 50% 56%)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,.10))",
                backdropFilter: "blur(24px)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* ===== SEAL (smaller responsive) ===== */}
            <div
              className={`
                absolute left-1/2 -translate-x-1/2
                top-[48%]
                w-[clamp(38px,8vw,56px)]
                aspect-square
                rounded-full
                backdrop-blur-xl
                bg-gradient-to-br from-white/85 to-white/30
                border border-white/60
                shadow-[0_10px_30px_rgba(120,90,255,.35)]
                flex items-center justify-center
                text-sm md:text-base
                transition
                ${opened ? "scale-0 opacity-0" : ""}
                z-40
              `}
            >
              💜
            </div>

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
    "항상 고마워 🌸",
    40,
    { start: body.done }
  );

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
      </div>
    </GlassCard>
  );
}
"use client";

import { useEffect, useState } from "react";
import GlassCard from "../GlassCard";

export default function Letter() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="py-12 md:py-24 px-6 flex justify-center">
      <GlassCard
        className={`
          max-w-xl w-full
          px-8 md:px-12
          py-10 md:py-14
          transition-all duration-1000
          ease-[cubic-bezier(0.22,1,0.36,1)]
          transform-gpu
          relative overflow-hidden
          ${open
            ? "opacity-100 translate-y-0 rotate-x-0"
            : "opacity-0 translate-y-8 rotate-x-[-16deg]"}
        `}
      >
        {/* 상단 유리 반사 */}
        <div className="
          pointer-events-none
          absolute inset-0 rounded-[inherit]
        " />

        {/* 내부 부드러운 연보라 글로우 */}
        <div className="
          pointer-events-none
          absolute inset-0 rounded-[inherit]
        " />

        {/* CONTENT */}
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
                  rgba(139, 111, 232, 0.25) 28px
                )
              `,
              lineHeight: "28px",
              padding: "2px 0"
            }}
          >
            어느새 니니밍을 알게 된 지도
            <br />
            3년 가까운 시간이 흘렀네.
            <br /><br />
            그동안 니니밍을 보면서
            <br />
            함께 웃고, 때로는 마음이 뭉클했던 순간도 많았어.
            <br /><br />
            힘들어도 괜찮은 척 웃어주던 시간들,
            <br />
            묵묵히 버텨온 시간들이
            <br />
            분명 많은 사람들에게 전해졌을 거야.
            <br /><br />
            니니밍 덕분에
            <br />
            평범했던 하루가 조금 더 따뜻해졌고,
            <br />
            아무 일 없는 날에도
            <br />
            작은 위로가 남아 있었어.
            <br /><br />
            앞으로도 완벽하지 않아도 괜찮고,
            <br />
            지금처럼 니니밍다운 속도로
            <br />
            천천히 걸어가면 돼.
            <br /><br />
            생일 정말 축하해.
            <br />
            오늘은 니니밍이
            <br />
            조금 더 많이 행복해도 되는 날이니까.
          </p>

          <p
            className="mt-10 text-sm font-medium"
            style={{ color: "#8B6FE8" }}
          >
            항상 고마워 🌸
          </p>
        </div>
      </GlassCard>
    </section>
  );
}

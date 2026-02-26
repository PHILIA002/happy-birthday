"use client";

import useScrollProgress from "@/hooks/useScrollProgress";

export default function TimelineProgress() {
  const progress = useScrollProgress();

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full z-[9999]">

      {/* glow track */}
      <div className="h-[3px] w-full bg-white/10 backdrop-blur-xl" />

      {/* fill */}
      <div
        className="
          absolute top-0 left-0 h-[3px]
          bg-gradient-to-r
          from-[#7C66B4]
          via-[#A78BFA]
          to-[#C8B8FF]
          shadow-[0_0_18px_rgba(167,139,250,0.8)]
          transition-[width] duration-150
        "
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
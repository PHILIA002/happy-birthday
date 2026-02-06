"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/GlassCard";
import { Cake } from "lucide-react";

export default function Countdown() {
  const [timeText, setTimeText] = useState("");

  const targetDate = new Date(
    new Date().getFullYear(),
    3, // April
    19,
    0, 0, 0
  );

  function updateCountdown() {
    const now = new Date().getTime();
    let distance = targetDate.getTime() - now;

    if (distance < 0) {
      const nextYear = new Date(
        new Date().getFullYear() + 1,
        3,
        19,
        0, 0, 0
      );
      distance = nextYear.getTime() - now;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    setTimeText(
      days === 0 && hours === 0 && minutes === 0 && seconds === 0
        ? "니니밍 생일축하해!"
        : `니니밍 생일까지 D-${days} · ${hours
            .toString()
            .padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
    );
  }

  useEffect(() => {
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <GlassCard
      className="px-4 py-2 rounded-full animate-pulseSlow">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <Cake className="w-4 h-4 md:w-5 md:h-5 text-violet-900" />

        <span
          className="
            text-xs md:text-base
            font-semibold tracking-wide
            tabular-nums
            bg-gradient-to-r
            from-fuchsia-400
            via-violet-400
            to-pink-400
            bg-clip-text text-transparent
          "
        >
          {timeText}
        </span>
      </div>
    </GlassCard>
  );
}

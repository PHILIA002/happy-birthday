"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/GlassCard";
import { Timer, Cake } from "lucide-react";

export default function Countdown() {
  const [timeText, setTimeText] = useState("");
  const [isBirthday, setIsBirthday] = useState(false);

  const targetDate = new Date(
    new Date().getFullYear(),
    3, // April
    19,
    0, 0, 0
  );

  function updateCountdown() {
    const nowDate = new Date();
    const now = nowDate.getTime();
    let distance = targetDate.getTime() - now;

    const isToday =
      nowDate.getMonth() === 3 &&
      nowDate.getDate() === 19;

    setIsBirthday(isToday);

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
      isToday
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
    <GlassCard className="px-4 py-2 rounded-full">
      <div className="flex items-center gap-2 whitespace-nowrap">

        {isBirthday ? (
          <Cake
            className="
              w-4 h-4 md:w-5 md:h-5
              text-[#FFD700]
              drop-shadow-[0_0_6px_rgba(255,215,0,0.7)]
            "
          />
        ) : (
          <Timer
            className="
              w-4 h-4 md:w-5 md:h-5
              text-[#7C66B4]
              
            "
          />
        )}

        <span
          className={`
            text-xs md:text-base
            font-semibold tracking-wide
            tabular-nums
            bg-clip-text text-transparent
            ${isBirthday
              ? "bg-gradient-to-r from-[#FFD700] via-[#FFF3B0] to-[#FFC300]"
              : "bg-gradient-to-r from-[#F0ABFC] via-[#A78BFA] to-[#885CF6]"
            }
          `}
        >
          {timeText}
        </span>
      </div>
    </GlassCard>
  );
}

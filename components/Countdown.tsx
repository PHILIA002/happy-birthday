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

    const year = nowDate.getFullYear();

    const birthdayStart = new Date(year, 1, 19, 0, 0, 0).getTime();
    const birthdayEnd = new Date(year, 3, 20, 0, 0, 0).getTime();

    const isToday = now >= birthdayStart && now < birthdayEnd;
    setIsBirthday(isToday);

    let distance = birthdayStart - now;

    if (distance < 0) {
      const nextYearStart = new Date(year + 1, 3, 19, 0, 0, 0).getTime();
      distance = nextYearStart - now;
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
    <GlassCard className="px-4 py-2 h-9 md:h-11 rounded-full">
      <div className="flex items-center justify-center h-full gap-2 whitespace-nowrap">

        <span
          className="
            flex items-center justify-center
            w-4 h-4 md:w-5 md:h-5
            animate-[floatSoft_3s_ease-in-out_infinite]
          "
        >
          {isBirthday ? (
            <Cake
              className="
                block w-full h-full text-[#efa0b0]
                animate-[glowPulseCake_2.2s_ease-in-out_infinite]
              "
            />
          ) : (
            <Timer
              className="
                block w-full h-full text-[#a78bf4]
                animate-[glowPulseTimer_2.4s_ease-in-out_infinite]
              "
            />
          )}
        </span>

        <span
          className={`
            text-sm md:text-lg
            font-semibold tracking-wide
            tabular-nums
            bg-clip-text text-transparent
            ${isBirthday
              ? "bg-gradient-to-r from-[#F1D999] via-[#EFA0B0] to-[#C4A1FF]"
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

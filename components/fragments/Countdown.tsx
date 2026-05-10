"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function Countdown() {
  const [timeText, setTimeText] = useState("");
  const [isBirthday, setIsBirthday] = useState(false);

  function updateCountdown() {
    const nowDate = new Date();
    const now = nowDate.getTime();

    const year = nowDate.getFullYear();

    const birthdayStart = new Date(year, 3, 19, 0, 0, 0).getTime();
    const birthdayEnd = new Date(year, 3, 20, 0, 0, 0).getTime();

    const isToday = now >= birthdayStart && now < birthdayEnd;

    setIsBirthday(isToday);

    let distance = birthdayStart - now;

    if (distance < 0) {
      distance = new Date(year + 1, 3, 19).getTime() - now;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    setTimeText(
      isToday
        ? "니니밍 생일축하해!"
        : `${days}d ${hours
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
    <div className="flex items-center gap-3 min-w-0">
      {/* Glow dot */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-5 h-5 rounded-full bg-[var(--primary)]/30 blur-lg" />

        <div
          className="
            relative
            w-2 h-2
            rounded-full
            bg-[var(--primary)]
            shadow-[0_0_12px_var(--primary)]
          "
        />
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-[var(--text-muted)]
          "
        >
          Birthday Countdown
        </span>

        <span
          className="
            text-sm md:text-[15px]
            font-semibold
            tracking-wide
            tabular-nums

            bg-gradient-to-r
            from-[var(--primary-soft)]
            via-[var(--primary)]
            to-[var(--primary-strong)]

            bg-clip-text
            text-transparent
          "
        >
          {timeText}
        </span>
      </div>

      {isBirthday && (
        <Sparkles
          className="
            w-4 h-4
            text-[var(--primary)]
            animate-pulse
          "
        />
      )}
    </div>
  );
}
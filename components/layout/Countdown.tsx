"use client";

import { Cake, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export default function Countdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();

      if (now.getMonth() === 3 && now.getDate() === 19) {
        setIsBirthday(true);
        return;
      }

      setIsBirthday(false);

      const year = now.getFullYear();
      const birthday = new Date(year, 3, 19, 0, 0, 0);

      if (now > birthday) {
        birthday.setFullYear(year + 1);
      }

      const diff = birthday.getTime() - now.getTime();

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isBirthday) {
    return (
      <div
        className="
          flex
          items-center
          justify-center
          gap-2

          font-semibold

          text-medium
          lg:text-lg

          text-[var(--primary)]
        "
      >
        <Cake className="w-5 h-5" />
        <span>생일 축하해!</span>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-2

        font-mono
        font-semibold

        text-medium
        lg:text-lg

        text-[var(--primary)]
      "
    >
      <Calendar className="w-5 h-5"/>
      <span className="flex gap-1">
        <span>{time.days}</span>
        <span>:</span>
        <span>{String(time.hours).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(time.minutes).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(time.seconds).padStart(2, "0")}</span>
      </span>
    </div>
  );
}
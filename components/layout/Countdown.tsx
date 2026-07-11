"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();

      const year = now.getFullYear();

      const birthday = new Date(year, 3, 19, 0, 0, 0);

      if (now > birthday) {
        birthday.setFullYear(year + 1);
      }

      const diff = birthday.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (diff / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (diff / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (diff / 1000) % 60
      );

      setTime({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    update();

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-1

        font-mono
        font-semibold

        text-medium
        lg:text-lg

        text-[var(--primary)]
      "
    >
      <span>{time.days}</span>

      <span>:</span>

      <span>
        {String(time.hours).padStart(2, "0")}
      </span>

      <span>:</span>

      <span>
        {String(time.minutes).padStart(2, "0")}
      </span>

      <span>:</span>

      <span>
        {String(time.seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
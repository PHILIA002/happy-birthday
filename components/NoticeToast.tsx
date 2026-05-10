"use client";

import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";

interface NoticeToastProps {
  message: string;
  duration?: number;
}

export default function NoticeToast({
  message,
  duration = 10000,
}: NoticeToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(true);
    }, 300);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) return;

    const t = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(t);
  }, [show, duration]);

  if (!show) return null;

  return (
    <div
      className="
        fixed top-20 left-1/2 -translate-x-1/2
        z-[999]

        w-[92%] max-w-md

        animate-[toastUp_.35s_ease]
      "
    >
      <div
        className="
          relative

          flex items-center gap-3

          px-4 py-3

          rounded-2xl

          bg-[var(--bg-sub)]

          border border-[var(--glass-border)]

          shadow-[0_10px_30px_rgba(0,0,0,0.22)]
        "
      >
        {/* left accent */}
        <div
          className="
            absolute left-0 top-0 bottom-0
            w-1 rounded-l-2xl
            bg-[var(--primary)]
          "
        />

        {/* icon */}
        <div
          className="
            flex items-center justify-center

            w-9 h-9
            rounded-xl

            bg-[var(--primary)]/12
            text-[var(--primary-soft)]

            shrink-0
          "
        >
          <Info className="w-4 h-4" />
        </div>

        {/* text */}
        <p
          className="
            flex-1

            text-sm md:text-[15px]
            font-medium

            text-[var(--text-main)]

            leading-relaxed
          "
        >
          {message}
        </p>

        {/* close */}
        <button
          onClick={() => setShow(false)}
          className="
            flex items-center justify-center

            w-8 h-8
            rounded-lg

            text-[var(--text-sub)]

            hover:bg-white/5
            hover:text-[var(--text-main)]

            transition-all duration-200

            cursor-pointer
          "
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
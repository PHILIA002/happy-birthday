"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

interface NoticeToastProps {
  duration?: number;
}

export default function NoticeToast({
  duration = 5000,
}: NoticeToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("notice-toast");

    if (shown) return;

    const t = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("notice-toast", "true");
    }, 300);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) return;

    const t = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(t);
  }, [show, duration]);

  if (!show) return null;

  return (
    <div
      className="
        fixed
        top-10
        left-1/2
        -translate-x-1/2
        z-[999]

        w-[92%]
        max-w-md
      "
    >
      <div
        className="
          relative

          overflow-hidden

          rounded-2xl
          border
          border-[var(--border)]

          bg-[var(--surface)]

          shadow-[0_12px_40px_rgba(124,58,237,0.15)]
        "
      >
        <div
          className="
            absolute
            inset-x-0
            top-0

            h-1

            bg-gradient-to-r
            from-[var(--primary-soft)]
            via-[var(--primary)]
            to-[var(--primary-strong)]
          "
        />

        <div className="flex items-center gap-4 px-5 py-4">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-xl

              bg-[var(--primary)]/10
              text-[var(--primary)]
            "
          >
            <Bell size={20} />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="
                text-sm
                font-semibold

                text-[var(--primary)]
              "
            >
              공지사항
            </p>

            <p
              className="
                mt-1

                break-words

                text-sm
                leading-6

                text-[var(--text-main)]
              "
            >
              니니밍 팬사이트 v2
            </p>
          </div>

          <button
            onClick={() => setShow(false)}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-lg

              text-[var(--text-sub)]

              transition-colors

              hover:bg-[var(--bg-sub)]
              hover:text-[var(--primary)]

              cursor-pointer
            "
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
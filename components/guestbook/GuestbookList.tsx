"use client";

import { useEffect, useRef } from "react";
import type { GuestbookMessage } from "@/hooks/useGuestbook";

type Props = {
  messages: GuestbookMessage[];
};

export default function GuestbookList({
  messages,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="
        h-full
        overflow-y-auto
        hide-scrollbar

        px-3
        py-2
      "
    >
      {messages
        .slice(0, 100)
        .reverse()
        .map((item) => (
          <div
            key={item.id}
            className="
              flex
              gap-8

              text-sm
              leading-7
            "
          >
            <span
              className="
                w-24
                shrink-0

                truncate

                font-semibold
                text-[var(--primary)]
              "
            >
              {item.name}
            </span>

            <span
              className="
                flex-1
                break-words
              "
            >
              {item.message}
            </span>
          </div>
        ))}
    </div>
  );
}
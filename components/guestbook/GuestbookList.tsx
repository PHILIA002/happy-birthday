"use client";

import { useEffect, useRef } from "react";
import type { GuestbookMessage } from "@/hooks/useGuestbook";

type Props = {
  messages: GuestbookMessage[];
};

const NAME_COLORS = [
  "text-red-400",
  "text-orange-400",
  "text-yellow-400",
  "text-lime-400",
  "text-cyan-400",
];

export const getNameColor = (name: string) => {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }

  return NAME_COLORS[hash % NAME_COLORS.length];
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

        px-4
        py-2
      "
    >
      {messages
        .slice(0, 30)
        .reverse()
        .map((item) => (
          <div
            key={item.id}
            className="
              flex
              gap-4

              text-sm
              leading-7
            "
          >
            <span
              className={`
                w-24
                shrink-0

                truncate

                font-semibold
                ${getNameColor(item.name)}
              `}
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
"use client";

import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import type { GuestbookMessage } from "@/hooks/useGuestbook";
import { getNameColor } from "@/components/guestbook/GuestbookList";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  messages: GuestbookMessage[];
};

export default function GuestbookModal({
  open,
  onClose,
  messages,
}: Props) {
  const [current, setCurrent] = useState(0);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[999]

        bg-black/60

        flex
        items-center
        justify-center

        p-0
        sm:p-6
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          h-full

          sm:max-w-3xl
          sm:h-[80vh]

          bg-[var(--surface)]

          sm:rounded-xl

          flex
          flex-col

          overflow-hidden
        "
      >
        {/* Header */}
        <div
          className="
            h-14
            shrink-0

            px-5

            flex
            items-center
            justify-between

            border-b
            border-[var(--border)]
          "
        >
          <h2 className="font-semibold">
            방명록
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9
              h-9

              flex
              items-center
              justify-center

              rounded-md

              text-[var(--text-sub)]

              hover:bg-[var(--surface-soft)]
              hover:text-[var(--primary)]

              transition-colors
              cursor-pointer
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0">
          {messages.length === 0 ? (
            <div
              className="
                h-full

                flex
                items-center
                justify-center

                text-sm
                text-[var(--text-sub)]
              "
            >
              방명록이 없습니다.
            </div>
          ) : (
            <>
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                className="h-full"
                onSlideChange={(swiper) => setCurrent(swiper.activeIndex)}
              >
                {messages.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div
                      className="
                        h-full

                        flex
                        flex-col

                        p-5
                      "
                    >
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span
                          className="font-semibold"
                          style={{
                            color: getNameColor(item.name),
                          }}
                        >
                          {item.name}
                        </span>

                        <span
                          className="
                            shrink-0

                            text-xs
                            text-[var(--text-sub)]
                          "
                        >
                          {new Date(item.created_at).toLocaleString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div
                        className="
                          flex-1

                          overflow-y-auto

                          whitespace-pre-wrap
                          break-words

                          text-sm
                          leading-7
                        "
                      >
                        {item.message}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Pagination */}
              <div
                className="
                  h-12
                  shrink-0

                  border-t
                  border-[var(--border)]

                  flex
                  items-center
                  justify-center

                  text-sm
                  font-medium
                  text-[var(--text-sub)]
                "
              >
                {current + 1} / {messages.length}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
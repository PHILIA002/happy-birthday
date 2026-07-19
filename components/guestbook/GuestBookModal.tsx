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
          max-w-2xl
          h-[60vh]

          bg-[var(--surface)]

          rounded-2xl

          flex
          flex-col

          overflow-hidden
        "
      >

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
                className="h-full"
                onSlideChange={(swiper) =>
                  setCurrent(swiper.realIndex)
                }
              >
                {messages.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div
                      className="
                        h-full

                        flex
                        items-center
                        justify-center

                        p-6
                      "
                    >
                      <div
                        className="
                          w-full
                          h-full

                          px-6
                          py-5

                          flex
                          flex-col
                        "
                      >
                        <div>
                          <p
                            className={`
                              text-lg
                              font-bold
                              ${getNameColor(item.name)}
                            `}
                          >
                            {item.name}
                          </p>

                          <p className="mt-1 text-sm text-[var(--text-sub)]">
                            {new Date(item.created_at).toLocaleString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        <div
                          className="
                            flex-1

                            flex
                            items-center
                            justify-center

                            whitespace-pre-wrap
                            break-words

                            text-center

                            text-base
                            leading-8

                            text-[var(--text-main)]
                          "
                        >
                          {item.message}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div
                className="
                  h-14

                  border-t
                  border-[var(--border)]

                  flex
                  items-center
                  justify-center
                  gap-4
                "
              >
                <div className="flex gap-2">
                  {messages.map((_, index) => (
                    <div
                      key={index}
                      className={`
                        h-2
                        rounded-full
                        transition-all
                        duration-300

                        ${
                          current === index
                            ? "w-6 bg-[var(--primary)]"
                            : "w-2 bg-[var(--border)]"
                        }
                      `}
                    />
                  ))}
                </div>

                <span className="text-sm text-[var(--text-sub)]">
                  {current + 1} / {messages.length}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
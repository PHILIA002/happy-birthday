"use client";

import { X } from "lucide-react";
import type { GuestbookMessage } from "@/hooks/useGuestbook";

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

        {/* List */}
        <div
          className="
            flex-1
            overflow-y-auto
          "
        >
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
            messages.map((item) => (
              <div
                key={item.id}
                className="
                  px-5
                  py-4

                  border-b
                  border-[var(--border-soft)]
                "
              >
                <div className="flex items-center justify-between mb-2 gap-4">
                  <span
                    className="
                      font-semibold
                      text-[var(--primary)]
                    "
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

                <p
                  className="
                    whitespace-pre-wrap
                    break-words

                    text-sm
                    leading-6
                  "
                >
                  {item.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Expand } from "lucide-react";

import GuestbookList from "./GuestbookList";
import GuestbookForm from "./GuestbookForm";
import GuestbookModal from "./GuestBookModal";

import useGuestbook from "@/hooks/useGuestbook";

export default function ChatBoard() {
  const [open, setOpen] = useState(false);

  const messages = useGuestbook();

  return (
    <>
      <section
        className="
          flex
          flex-col

          h-[60vh]
          min-h-[350px]
          max-h-[600px]

          lg:h-full
          lg:min-h-0
          lg:max-h-none

          bg-[var(--bg-sub)]
        "
      >
        <div
          className="
            hidden
            lg:flex

            h-14
            shrink-0

            items-center
            justify-between

            px-4

            border-b
            border-[var(--border)]
          "
        >
          <span className="text-sm font-semibold">
            방명록
          </span>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              w-8
              h-8

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
            <Expand size={18} />
          </button>
        </div>

        <div
          className="
            flex-1
            min-h-0
            overflow-hidden
          "
        >
          <GuestbookList messages={messages} />
        </div>

        <div className="shrink-0">
          <GuestbookForm />
        </div>
      </section>

      <GuestbookModal
        open={open}
        onClose={() => setOpen(false)}
        messages={messages}
      />
    </>
  );
}
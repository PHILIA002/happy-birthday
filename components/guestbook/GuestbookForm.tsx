"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function GuestbookForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!message.trim()) return;

    await supabase.from("guestbook").insert({
      name: name.trim() || "익명",
      message,
    });

    setName("");
    setMessage("");
  };

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50

        lg:static

        border-t border-[var(--border)]

        bg-[var(--surface)]

        p-3

        pb-[calc(env(safe-area-inset-bottom)+12px)]
      "
    >
      <div className="flex items-center gap-2">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="닉네임"
          maxLength={20}
          className="
            w-20

            h-10

            px-3

            rounded-lg

            bg-[var(--bg-main)]

            text-[var(--text-main)]
            placeholder:text-[var(--text-sub)]

            outline-none
            text-xs
          "
          autoFocus
        />

        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="메시지 입력"
          maxLength={300}
          className="
            flex-1
            min-w-0

            h-10

            px-3

            rounded-lg

            bg-[var(--bg-main)]

            text-[var(--text-main)]
            placeholder:text-[var(--text-sub)]

            outline-none
            text-xs
          "
        />

        <button
          onClick={submit}
          className="
            shrink-0

            h-10

            px-3

            rounded-lg

            bg-[var(--primary)]
            text-white

            text-xs

            hover:opacity-90
            transition
            cursor-pointer
          "
        >
          전송
        </button>
      </div>
    </div>
  );
}
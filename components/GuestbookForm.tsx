"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import GlassCard from "./GlassCard";
import Toast from "./Toast";

export default function GuestbookForm({ onConfirmAdd, onRollback }: any) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info" as "success" | "error" | "info",
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (!message.trim()) {
      showToast("메시지를 입력해주세요!", "error");
      textareaRef.current?.focus();
      return;
    }

    setLoading(true);

    const tempId = crypto.randomUUID();

    const optimistic = {
      id: tempId,
      name: name || "익명",
      message,
      created_at: new Date().toISOString(),
      optimistic: true,
    };

    onConfirmAdd?.(optimistic);

    const { data, error } = await supabase
      .from("guestbook")
      .insert({
        name: optimistic.name,
        message: optimistic.message,
      })
      .select()
      .single();

    if (error || !data) {
      onRollback?.(tempId);
      showToast("등록 실패. 다시 시도해주세요.", "error");
    } else {
      onConfirmAdd?.(data, tempId);
      showToast("등록 완료! 반영이 늦으면 새로고침 해주세요.", "success");
    }

    setMessage("");
    setName("");
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 막기
      handleSubmit();
    }
  };

  return (
    <section
      className="
        pt-8 md:pt-16
        w-full
        max-w-[820px] md:max-w-[900px]
        mx-auto
        px-4 md:px-6
      "
    >
      <GlassCard
        className="
          p-7 md:p-8
          backdrop-blur-xl
          border border-white/40
          shadow-[0_20px_60px_rgba(170,150,255,0.25)]
          space-y-5
        "
      >
        <h2
          className="text-lg md:text-xl font-semibold tracking-wide"
          style={{ color: "#4F3F6B" }}
        >
          방명록 남기기
        </h2>

        {/* 닉네임 */}
        <input
          autoFocus
          placeholder="닉네임 (미입력 시 '익명'으로 표기됩니다.)"
          value={name}
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full px-4 py-2 my-2 rounded-xl
            bg-white/20
            text-[#4F3F6B]

            text-sm md:text-base
            placeholder:text-sm md:placeholder:text-base
            placeholder-[#7C66B4]/70

            outline-none
            focus:bg-white/30
            transition
          "
        />

        {/* 메시지 */}
        <textarea
          ref={textareaRef}
          placeholder="축하 메시지를 남겨주세요."
          value={message}
          maxLength={300}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            w-full px-4 py-3 rounded-xl
            bg-white/20
            text-[#4F3F6B]
            
            text-sm md:text-base
            placeholder:text-sm md:placeholder:text-base
            placeholder-[#7C66B4]/70
            
            outline-none
            focus:bg-white/30
            transition
            resize-none min-h-[120px] md:min-h-[130px]
          "
        />

        {/* 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            w-full py-3 rounded-xl
            bg-gradient-to-r
            from-[#C8B8FF]
            via-[#B8A4FF]
            to-[#A78BFA]
            hover:from-[#B8A4FF]
            hover:to-[#8B6FE8]
            text-white font-base
            transition duration-300
            disabled:opacity-50 cursor-pointer
          "
        >
          {loading ? "등록 중..." : "등록하기"}
        </button>
      </GlassCard>

      {/* ✅ 토스트 */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </section>
  );
}

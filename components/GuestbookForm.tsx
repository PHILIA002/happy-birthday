"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import GlassCard from "./GlassCard";

export default function GuestbookForm({ onConfirmAdd, onRollback }: any) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || loading) return;

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

    if (error || !data) onRollback?.(tempId);
    else onConfirmAdd?.(data, tempId);

    setMessage("");
    setName("");
    setLoading(false);
  };

  return (
    <GlassCard
      className="
        mt-12 md:mt-24
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
        placeholder="닉네임 (미입력 시 '익명'으로 표시됩니다.)"
        value={name}
        maxLength={20}
        onChange={(e) => setName(e.target.value)}
        className="
          w-full px-4 py-2 my-2 rounded-xl
          bg-white/20
          text-[#4F3F6B]
          placeholder-[#7C66B4]/70
          outline-none
          focus:bg-white/30
          transition
        "
      />

      {/* 메시지 */}
      <textarea
        placeholder="메시지를 남겨주세요."
        value={message}
        maxLength={300}
        onChange={(e) => setMessage(e.target.value)}
        className="
          w-full px-4 py-3 rounded-xl
          bg-white/20
          text-[#4F3F6B]
          placeholder-[#7C66B4]/70
          outline-none
          focus:bg-white/30
          transition
          resize-none min-h-[130px]
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
          shadow-[0_10px_30px_rgba(160,130,255,0.35)]
          transition duration-300
          disabled:opacity-50 cursor-pointer
        "
      >
        {loading ? "등록 중..." : "등록하기"}
      </button>
    </GlassCard>
  );
}

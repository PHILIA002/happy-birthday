"use client";

import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";

interface NoticeToastProps {
  message: string;
  duration?: number;
}

export default function NoticeToast({
  message,
  duration = 10000,
}: NoticeToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 약간 딜레이 주면 UX 좋음
    const t = setTimeout(() => {
      setShow(true);
    }, 500);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(t);
  }, [show, duration]);

  if (!show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] w-[92%] max-w-md animate-slideIn">
      <div
        className="
          relative
          px-5 py-3
          rounded-2xl
          backdrop-blur-xl
          border border-white/40
          shadow-[0_20px_60px_rgba(120,90,255,0.25)]
          bg-gradient-to-br from-[#EDE9FE]/60 to-[#DDD6FE]/30
          flex items-center gap-3
        "
      >
        <Info className="w-5 h-5 text-[#7C66B4]" />

        <p className="text-medium text-[#4F3F6B] font-medium flex-1">
          {message}
        </p>

        <button
          onClick={() => setShow(false)}
          className="text-[#7C66B4]/60 hover:text-[#7C66B4]"
        >
          <X className="w-4 h-4 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
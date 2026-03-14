"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  show: boolean;
  onClose: () => void;
  type?: "success" | "error" | "info";
};

export default function Toast({
  message,
  show,
  onClose,
  type = "info",
}: Props) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [show, onClose]);

  if (!show) return null;

  const color =
    type === "success"
      ? "bg-emerald-500/90"
      : type === "error"
      ? "bg-red-500/90"
      : "bg-gradient-to-br from-[#A78BFA]/90 to-[#8B5CF6]/85";

  return (
    <div className="fixed top-16 md:top-12 lg:top-8 left-1/2 -translate-x-1/2">
      <div
        className={`
          px-5 py-3
          rounded-xl
          text-white
          text-sm md:text-base
          font-medium
          shadow-xl
          backdrop-blur-xl
          border border-white/40
          ${color}
          animate-[toastUp_.35s_ease]
        `}
      >
        {message}
      </div>

      <style jsx>{`
        @keyframes toastUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

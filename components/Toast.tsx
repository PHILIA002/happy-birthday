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
      : "bg-[#A78BFA]/90";

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2">
      <div
        className={`
          px-5 py-3
          rounded-xl
          text-white
          text-sm md:text-base
          font-medium
          shadow-xl
          backdrop-blur-xl
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

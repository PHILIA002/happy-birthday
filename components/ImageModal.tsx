"use client";

import { useEffect } from "react";

interface Props {
  src: string;
  onClose: () => void;
}

export default function ImageModal({
  src,
  onClose,
}: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50

        bg-black/80
        backdrop-blur-sm

        flex items-center justify-center

        p-4
        animate-in fade-in duration-200
      "
    >
      <div
        className="
          absolute
          top-4
          right-4

          px-2 py-1

          rounded-lg
          bg-white/10

          text-xs
          text-white/70

          select-none
          pointer-events-none
        "
      >
        <span className="text-white/40">닫기</span>
        <span className="ml-1 font-mono text-white/80">
          ESC
        </span>
      </div>

      <img
        src={src}
        alt="팬아트"
        onClick={(e) => e.stopPropagation()}
        className="
          max-w-[95vw]
          max-h-[90vh]

          w-auto
          h-auto

          rounded-2xl
          object-contain

          shadow-2xl
        "
      />
    </div>
  );
}
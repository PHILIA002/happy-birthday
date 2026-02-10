"use client";

import Image from "next/image";

interface Props {
  src: string;
  onClose: () => void;
}

export default function ImageModal({ src, onClose }: Props) {
  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        bg-black/80
        flex items-center justify-center
        backdrop-blur-sm
      "
    >
      <Image
        src={src}
        alt=""
        width={900}
        height={900}
        className="max-h-[85vh] w-auto rounded-2xl"
      />
    </div>
  );
}

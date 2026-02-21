"use client";

import { usePathname } from "next/navigation";
import MusicPlayer from "./MusicPlayer";
import clsx from "clsx";

export default function PlayerShell() {
  const pathname = usePathname();
  const hide = pathname.startsWith("/guestbook");

  return (
    <div
      className={clsx(
        "fixed left-0 right-0 bottom-0 z-40 flex justify-center",
        "px-4 pb-[env(safe-area-inset-bottom)]",
        hide && "pointer-events-none opacity-0"
      )}
    >
      <div className="w-full max-w-4xl">
        <MusicPlayer />
      </div>
    </div>
  );
}
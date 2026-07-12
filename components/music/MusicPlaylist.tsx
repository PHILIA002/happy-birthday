"use client";

import { MUSIC_LIST } from "@/data/music";
import { usePlayer } from "./MusicPlayerProvider";

export default function MusicPlaylist() {
  const {
    currentIndex,
    setCurrentIndex,
    imageSwiper,
    infoSwiper,
  } = usePlayer();

  return (
    <div className="hidden lg:flex gap-3 overflow-x-auto pb-2">
      {MUSIC_LIST.map((music, index) => (
        <button
          key={music.url}
          onClick={() => {
            setCurrentIndex(index);
            imageSwiper?.slideToLoop(index);
            infoSwiper?.slideToLoop(index);
          }}
          className={`
            flex-shrink-0

            flex
            items-center
            gap-3

            px-3
            py-2

            rounded-2xl
            border

            transition-all
            duration-200

            ${
              currentIndex === index
                ? "border-[var(--primary)] bg-[var(--primary)]/10"
                : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40"
            }
          `}
        >
          <img
            src={music.thumbnail}
            alt={music.title}
            className="w-12 h-12 rounded-lg object-cover"
          />

          <div className="text-left">
            <p
              className={`
                font-semibold whitespace-nowrap
                ${
                  currentIndex === index
                    ? "text-[var(--primary)]"
                    : "text-[var(--text-main)]"
                }
              `}
            >
              {music.title}
            </p>

            <p className="text-xs text-[var(--text-sub)]">
              니밍플리 {index + 1}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
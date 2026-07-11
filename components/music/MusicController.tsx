"use client";

import {
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";

type Props = {
  title: string;
  track: number;

  opened: boolean;

  onOpen: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function MusicController({
  title,
  track,

  opened,

  onOpen,
  onPrev,
  onNext,
}: Props) {
  return (
    <section
      className="
        hidden
        lg:block

        px-4
        py-2
      "
    >
      <div className="mb-4">
        <h2 className="text-lg font-bold leading-tight">
          {title}
        </h2>

        <p className="text-xs text-[var(--text-sub)]">
          Track {track}
        </p>
      </div>
    </section>
  );
}
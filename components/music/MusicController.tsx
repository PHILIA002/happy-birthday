"use client";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

type Props = {
  title: string;
  track: number;

  playing: boolean;

  currentTime: number;
  duration: number;
  volume: number;

  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;

  onSeek: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  onVolume: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  onMute: () => void;
};

export default function MusicController({
  title,
  track,

  playing,
  currentTime,
  duration,
  volume,

  onPlayPause,
  onPrev,
  onNext,

  onSeek,
  onVolume,
  onMute,
}: Props) {
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);

    return `${m}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <section
      className="
        hidden lg:block
        px-4

      "
    >
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <p className="mt-1 text-sm text-[var(--text-sub)]">
            Track {track}
          </p>
        </div>
      </div>
      
      {/* 진행바 */}
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={onSeek}
        className="
          w-full
          accent-[var(--primary)]
        "
      />

      <div
        className="
          mt-2

          flex
          justify-between

          text-xs
          text-[var(--text-sub)]
        "
      >
        <span>{formatTime(currentTime)}</span>

        <span>{formatTime(duration)}</span>
      </div>

      {/* 컨트롤 */}
      <div
        className="
          mt-6

          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-5
          "
        >
          <button
            onClick={onPrev}
            className="cursor-pointer"
          >
            <SkipBack size={24} />
          </button>

          <button
            onClick={onPlayPause}
            className="
              w-14
              h-14

              rounded-full

              bg-[var(--primary)]
              text-white

              flex
              items-center
              justify-center

              cursor-pointer
            "
          >
            {playing ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </button>

          <button
            onClick={onNext}
            className="cursor-pointer"
          >
            <SkipForward size={24} />
          </button>
        </div>

        {/* 볼륨 */}
        <div
          className="
            flex
            items-center
            gap-3

            w-44
          "
        >
          <button
            onClick={onMute}
            className="cursor-pointer"
          >
            {volume === 0 ? (
              <VolumeX size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>

          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={onVolume}
            className="
              flex-1
              accent-[var(--primary)]
            "
          />
        </div>
      </div>
    </section>
  );
}
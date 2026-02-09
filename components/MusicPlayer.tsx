"use client";

import { useState, useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Repeat1,
  ListMusic,
} from "lucide-react";
import { MUSIC_LIST } from "@/data/music";
import GlassCard from "./GlassCard";

type RepeatMode = "all" | "one";

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("all");
  const [showList, setShowList] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);

  /* marquee refs */
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const current = MUSIC_LIST[currentIndex];

  const controlBtn =
    "w-9 h-9 rounded-full bg-white/25 backdrop-blur flex items-center justify-center cursor-pointer transition active:scale-95";

  /* ================= Marquee ================= */

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || !textRef.current) return;

      setIsOverflowing(
        textRef.current.scrollWidth > containerRef.current.clientWidth
      );
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [current.title]);

  /* ================= YouTube ================= */

  useEffect(() => {
    setPlayerReady(false);
  }, [currentIndex]);

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);

    setDuration(event.target.getDuration());
    setCurrentTime(0);
    setPlayerReady(true);

    if (playing) event.target.playVideo();
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 1) setPlaying(true);
    if (event.data === 2) setPlaying(false);

    if (event.data === 0) {
      if (repeatMode === "one") {
        playerRef.current?.seekTo(0, true);
        playerRef.current?.playVideo();
      } else {
        nextTrack();
      }
    }
  };

  /* ================= Controls ================= */

  const togglePlay = () => {
    if (!playerRef.current) return;
    playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % MUSIC_LIST.length);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + MUSIC_LIST.length) % MUSIC_LIST.length
    );
    setCurrentTime(0);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev === "all" ? "one" : "all"));
  };

  /* ================= Progress ================= */

  useEffect(() => {
    const timer = setInterval(() => {
      if (playerRef.current && playing && playerReady) {
        setCurrentTime(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }
    }, 500);

    return () => clearInterval(timer);
  }, [playing, playerReady]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    playerRef.current?.seekTo(time, true);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    playerRef.current?.setVolume(vol);
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ================= Render ================= */

  return (
    <>
      {/* Hidden Player */}
      <div className="hidden">
        <YouTube
          key={current.videoId}
          videoId={current.videoId}
          opts={{
            width: "0",
            height: "0",
            playerVars: {
              autoplay: 0,
              controls: 0,
            },
          }}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* Player UI */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[85%] md:w-[94%] max-w-4xl">
        <GlassCard
          className="
            px-2 py-[4px]
            rounded-full
            md:px-5 md:py-2
            md:rounded-3xl
            space-y-2
          "
        >
          {/* ===== Mobile Layout ===== */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full flex items-center justify-center shadow cursor-pointer active:scale-95"
              style={{
                background: "linear-gradient(135deg,#A78BFA,#8B6FE8)",
                color: "white",
              }}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <p className="text-xs font-semibold text-[#4F3F6B] truncate flex-1">
              {current.title}
            </p>
          </div>

          {/* ===== Desktop Layout ===== */}
          <div className="hidden md:flex items-center gap-6">
            {/* LEFT */}
            <div className="flex items-center gap-3 w-[28%] min-w-0">
              <img
                src={`https://img.youtube.com/vi/${current.videoId}/default.jpg`}
                className="w-11 h-11 rounded-xl shadow"
              />

              <div className="min-w-0">
                <div
                  ref={containerRef}
                  className="overflow-hidden w-full [mask-image:linear-gradient(to_right,black_10%,black_90%)]"
                >
                  <div
                    className={`whitespace-nowrap flex gap-10 ${
                      isOverflowing ? "marquee" : ""
                    }`}
                  >
                    <span
                      ref={textRef}
                      className="text-sm font-semibold text-[#4F3F6B]"
                    >
                      {current.title}
                    </span>

                    {isOverflowing && (
                      <span className="text-sm font-semibold text-[#4F3F6B]">
                        {current.title}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#6E5A8A]">니니밍 플레이리스트</p>
              </div>
            </div>

            {/* CENTER */}
            <div className="flex-1 flex flex-col items-center">
              {/* Progress */}
              <div className="w-full px-2">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="
                    w-full
                    h-[2px]
                    appearance-none
                    bg-white/30
                    rounded-full
                    accent-[#8B6FE8]
                    cursor-pointer

                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-2
                    [&::-webkit-slider-thumb]:w-2
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-[#8B6FE8]

                    [&::-moz-range-thumb]:h-2
                    [&::-moz-range-thumb]:w-2
                    [&::-moz-range-thumb]:border-none
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-[#8B6FE8]
                  "
                />
              </div>

              {/* Time */}
              <div className="w-full flex justify-between text-[11px] text-[#6E5A8A] px-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowList((v) => !v)}
                  className={controlBtn}
                >
                  <ListMusic size={16} color="#7C66B4" />
                </button>

                <button onClick={prevTrack} className={controlBtn}>
                  <SkipBack size={18} color="#7C66B4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow cursor-pointer active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#A78BFA,#8B6FE8)",
                    color: "white",
                  }}
                >
                  {playing ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <button onClick={nextTrack} className={controlBtn}>
                  <SkipForward size={18} color="#7C66B4" />
                </button>

                <button onClick={toggleRepeat} className={controlBtn}>
                  {repeatMode === "one" ? (
                    <Repeat1 size={16} color="#8B6FE8" />
                  ) : (
                    <Repeat size={16} color="#7C66B4" />
                  )}
                </button>
              </div>
            </div>

            {/* RIGHT - Volume */}
            <div className="hidden md:flex items-center gap-2 w-[18%] justify-end">
              <Volume2 size={15} color="#7C66B4" />

              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolume}
                className="
                  w-20
                  h-[2px]
                  appearance-none
                  bg-white/30
                  rounded-full
                  accent-[#8B6FE8]
                  cursor-pointer

                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:h-2
                  [&::-webkit-slider-thumb]:w-2
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-[#8B6FE8]

                  [&::-moz-range-thumb]:h-2
                  [&::-moz-range-thumb]:w-2
                  [&::-moz-range-thumb]:border-none
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-[#8B6FE8]
                "
              />
            </div>
          </div>

          {/* PLAYLIST */}
          {showList && (
            <div className="max-h-56 overflow-y-auto border-t border-white/30 pt-3">
              {MUSIC_LIST.map((item, idx) => (
                <button
                  key={item.videoId}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowList(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm cursor-pointer transition
                  ${
                    idx === currentIndex
                      ? "bg-white/40 text-[#4F3F6B]"
                      : "hover:bg-white/25 text-[#6E5A8A]"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </GlassCard>
      </footer>
    </>
  );
}

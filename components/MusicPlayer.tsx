"use client";

import { useState, useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Repeat1,
  ListMusic,
} from "lucide-react";

import GlassCard from "./GlassCard";
import { MUSIC_LIST } from "@/data/music";
import { usePlayer } from "./MusicPlayerProvider";
import { usePathname } from "next/navigation";

type RepeatMode = "all" | "one";

const STORAGE_KEY = "music_player_state_v1";

export default function MusicPlayer() {
  const { playerRef } = usePlayer();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("all");
  const [showList, setShowList] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const current = MUSIC_LIST[currentIndex];
  const pathname = usePathname();
  const hideUI = pathname.startsWith("/guestbook");

  const controlBtn =
    "w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer";

  /* marquee refs */
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  /* overflow detect */
  useEffect(() => {
    const el = containerRef.current;
    const text = textRef.current;
    if (!el || !text) return;

    const check = () => {
      setIsOverflowing(text.scrollWidth > el.clientWidth);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [currentIndex]);

  /* repeat toggle */
  const toggleRepeat = () => {
    setRepeatMode((m) => (m === "all" ? "one" : "all"));
  };

  /* volume */
  const handleVolume = (e: any) => {
    const v = Number(e.target.value);
    setVolume(v);
    playerRef.current?.setVolume(v);
  };

  /* time formatter */
  const formatTime = (t: number) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ================= Restore ================= */

  const restore = (player: any) => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const s = JSON.parse(raw);

      setCurrentIndex(s.currentIndex ?? 0);
      setVolume(s.volume ?? 70);
      setRepeatMode(s.repeatMode ?? "all");

      player.loadVideoById(MUSIC_LIST[s.currentIndex ?? 0].videoId);

      setTimeout(() => {
        player.seekTo(s.currentTime ?? 0, true);
        player.setVolume(s.volume ?? 70);
        player.pauseVideo();

        setCurrentTime(s.currentTime ?? 0);
        setDuration(player.getDuration() || 0);
      }, 300);
    } catch { }
  };

  /* ================= YouTube ================= */

  const onReady: YouTubeProps["onReady"] = (e) => {
    const player = e.target;
    playerRef.current = player;

    restore(player);
    setPlayerReady(true);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (e) => {
    if (e.data === 1) setPlaying(true);
    if (e.data === 2) setPlaying(false);

    if (e.data === 0) {
      if (repeatMode === "one") {
        playerRef.current?.seekTo(0, true);
        playerRef.current?.playVideo();
      } else nextTrack();
    }
  };

  /* ================= Controls ================= */

  const togglePlay = () => {
    if (!playerRef.current) return;

    const state = playerRef.current.getPlayerState();
    if (state === 1) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const nextTrack = () => {
    const next = (currentIndex + 1) % MUSIC_LIST.length;
    playerRef.current?.loadVideoById(MUSIC_LIST[next].videoId, 0);
    setCurrentIndex(next);
  };

  const prevTrack = () => {
    const prev =
      (currentIndex - 1 + MUSIC_LIST.length) % MUSIC_LIST.length;
    playerRef.current?.loadVideoById(MUSIC_LIST[prev].videoId, 0);
    setCurrentIndex(prev);
  };

  const toggleMute = () => {
    const v = volume === 0 ? 70 : 0;
    setVolume(v);
    playerRef.current?.setVolume(v);
  };

  /* ================= Progress ================= */

  useEffect(() => {
    const t = setInterval(() => {
      if (!playerRef.current || !playerReady) return;
      setCurrentTime(playerRef.current.getCurrentTime());
      setDuration(playerRef.current.getDuration());
    }, 500);
    return () => clearInterval(t);
  }, [playerReady]);

  const handleSeek = (e: any) => {
    const t = Number(e.target.value);
    setCurrentTime(t);
    playerRef.current?.seekTo(t, true);
  };

  /* ================= Persist ================= */

  const save = () => {
    if (!playerRef.current) return;

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentIndex,
        currentTime: playerRef.current.getCurrentTime(),
        volume,
        repeatMode,
      })
    );
  };

  useEffect(() => {
    if (!playerReady) return;
    const i = setInterval(save, 1000);
    return () => clearInterval(i);
  }, [currentIndex, volume, repeatMode, playerReady]);

  /* ================= Render ================= */

  return (
    <>
      {/* Hidden Player */}
      <div className="hidden">
        <YouTube
          videoId={MUSIC_LIST[0].videoId}
          opts={{
            width: "0",
            height: "0",
            playerVars: {
              autoplay: 0,
              controls: 0,
              playsinline: 1,
              rel: 0,
              modestbranding: 1
            },
          }}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* ===== 📱 Mobile Floating Play Button ===== */}
      {!hideUI && (
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <button
            onClick={togglePlay}
            className="
              w-11 h-11
              rounded-full
              flex items-center justify-center
              shadow-[0_15px_40px_rgba(120,90,255,0.45)]
              active:scale-95
              transition
            "
            style={{
              background: "linear-gradient(135deg,#A78BFA,#8B6FE8)",
              color: "white",
            }}
          >
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>
      )}

      {/* Player UI */}
      {!hideUI && (
        <footer className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl px-4 md:px-8">
          <GlassCard className="px-4 py-1.5 rounded-3xl space-y-1">
            <div className="flex items-center gap-6">
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
                      className={`whitespace-nowrap flex gap-10 ${isOverflowing ? "marquee" : ""
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
                    style={{
                      background: `linear-gradient(
                        to right,
                        #A78BFA 0%,
                        #8B6FE8 ${(currentTime / (duration || 1)) * 100}%,
                        rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%,
                        rgba(255,255,255,0.2) 100%
                      )`,
                    }}
                    className="
                      w-full
                      h-[6px]
                      appearance-none
                      rounded-full
                      cursor-pointer
                      transition

                      [&::-webkit-slider-runnable-track]:h-[6px]
                      [&::-webkit-slider-runnable-track]:rounded-full
                      [&::-webkit-slider-runnable-track]:bg-transparent

                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:h-4
                      [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-white
                      [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(139,111,232,0.8)]
                      [&::-webkit-slider-thumb]:-mt-[4.5px]
                      [&::-webkit-slider-thumb]:transition
                      [&::-webkit-slider-thumb]:hover:scale-110

                      [&::-moz-range-track]:h-[6px]
                      [&::-moz-range-track]:rounded-full
                      [&::-moz-range-track]:bg-transparent

                      [&::-moz-range-thumb]:h-4
                      [&::-moz-range-thumb]:w-4
                      [&::-moz-range-thumb]:border-none
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-white
                      [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(139,111,232,0.8)]
                    "
                  />
                </div>

                {/* Time */}
                <div className="w-full flex justify-between text-[11px] text-[#6E5A8A] px-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                {/* Controls Row */}
                <div className="flex items-center w-full">

                  {/* LEFT */}
                  <div className="flex items-center justify-end flex-1">
                    <button onClick={prevTrack} className={controlBtn}>
                      <SkipBack size={18} color="#7C66B4" />
                    </button>
                  </div>

                  {/* ⭐ CENTER (항상 가운데) */}
                  <div className="flex items-center justify-center px-4">
                    <button
                      onClick={togglePlay}
                      className="
                        w-10 h-10
                        rounded-full
                        flex items-center justify-center
                        shadow-lg
                        cursor-pointer
                        active:scale-95
                        transition
                      "
                      style={{
                        background: "linear-gradient(135deg,#A78BFA,#8B6FE8)",
                        color: "white",
                      }}
                    >
                      {playing ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3 flex-1">

                    <button onClick={nextTrack} className={controlBtn}>
                      <SkipForward size={18} color="#7C66B4" />
                    </button>

                    {/* 구분선 */}
                    <div className="
                      mx-2
                      w-[1px] h-5
                      bg-gradient-to-b
                      from-transparent
                      via-[#7C66B4]
                      to-transparent
                      opacity-70
                    " />

                    {/* 반복 */}
                    <button
                      onClick={toggleRepeat}
                      className={`
                        w-8 h-8 rounded-full
                        flex items-center justify-center
                        transition cursor-pointer
                        ${repeatMode === "one" ? "bg-white/40" : "bg-white/10 hover:bg-white/20"}
                      `}
                    >
                      {repeatMode === "one" ? (
                        <Repeat1 size={14} color="#A78BFA" />
                      ) : (
                        <Repeat size={14} color="#7C66B4" />
                      )}
                    </button>

                    <button
                      onClick={() => setShowList((v) => !v)}
                      className={`
                        w-8 h-8 rounded-full
                        flex items-center justify-center
                        transition cursor-pointer
                        ${showList ? "bg-white/40" : "bg-white/10 hover:bg-white/20"}
                      `}
                    >
                      <ListMusic size={14} color={showList ? "#A78BFA" : "#7C66B4"} />
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT - Volume */}
              <div className="hidden md:flex items-center gap-2 w-[18%] justify-end">
                <button onClick={toggleMute} className="cursor-pointer">
                  {volume === 0 ? (
                    <VolumeX size={15} color="#A78BFA" />
                  ) : (
                    <Volume2 size={15} color="#7C66B4" />
                  )}
                </button>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={handleVolume}
                  style={{
                    background: `linear-gradient(
                      to right,
                      #A78BFA 0%,
                      #8B6FE8 ${volume}%,
                      rgba(255,255,255,0.2) ${volume}%,
                      rgba(255,255,255,0.2) 100%
                    )`,
                  }}
                  className="
                    w-20
                    h-[5px]
                    appearance-none
                    rounded-full
                    cursor-pointer
                    transition

                    [&::-webkit-slider-runnable-track]:h-[6px]
                    [&::-webkit-slider-runnable-track]:rounded-full
                    [&::-webkit-slider-runnable-track]:bg-transparent

                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:w-3.5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(139,111,232,0.8)]
                    [&::-webkit-slider-thumb]:-mt-[4px]
                    [&::-webkit-slider-thumb]:transition
                    [&::-webkit-slider-thumb]:hover:scale-110

                    [&::-moz-range-track]:h-[6px]
                    [&::-moz-range-track]:rounded-full
                    [&::-moz-range-track]:bg-transparent

                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:border-none
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-white
                    [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(139,111,232,0.8)]
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
                      playerRef.current?.loadVideoById(MUSIC_LIST[idx].videoId, 0);
                      setCurrentIndex(idx);
                      setPlaying(true);
                      setShowList(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm cursor-pointer transition
                    ${idx === currentIndex
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
      )}
    </>
  );
}
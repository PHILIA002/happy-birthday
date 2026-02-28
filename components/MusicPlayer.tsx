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
  ChevronDown,
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
  const [lastVolume, setLastVolume] = useState(70);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("all");
  const [showList, setShowList] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const current = MUSIC_LIST[currentIndex];
  const pathname = usePathname();
  const hideUI = pathname.startsWith("/guestbook");

  const controlBtn =
    "w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer";

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

      player.cueVideoById({
        videoId: MUSIC_LIST[s.currentIndex ?? 0].videoId,
        startSeconds: s.currentTime ?? 0,
      });
      player.setVolume(s.volume ?? 70);
      setCurrentTime(s.currentTime ?? 0);
      setDuration(player.getDuration() || 0);
      setPlaying(false);
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
    setCurrentIndex(next);

    if (playing) {
      playerRef.current?.loadVideoById(MUSIC_LIST[next].videoId, 0);
    } else {
      playerRef.current?.cueVideoById(MUSIC_LIST[next].videoId, 0);
    }
  };

  const prevTrack = () => {
    const prev =
      (currentIndex - 1 + MUSIC_LIST.length) % MUSIC_LIST.length;

    setCurrentIndex(prev);

    if (playing) {
      playerRef.current?.loadVideoById(MUSIC_LIST[prev].videoId, 0);
    } else {
      playerRef.current?.cueVideoById(MUSIC_LIST[prev].videoId, 0);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    const currentVol = playerRef.current.getVolume();

    if (currentVol === 0) {
      const restoreVolume = lastVolume > 0 ? lastVolume : 70;
      playerRef.current.setVolume(restoreVolume);
      setVolume(restoreVolume);
      setToast("음소거 해제");
    } else {
      setLastVolume(currentVol);
      playerRef.current.setVolume(0);
      setVolume(0);
      setToast("음소거");
    }
  };

  const toggleRepeat = () => {
    setRepeatMode((m) => {
      const next = m === "all" ? "one" : "all";
      setToast(next === "one" ? "한 곡 반복" : "전체 반복");
      return next;
    });
  };

  const handleVolume = (e: any) => {
    const v = Number(e.target.value);
    setVolume(v);
    playerRef.current?.setVolume(v);
  };

  const adjustVolume = (delta: number) => {
    if (!playerRef.current) return;

    const currentVol = playerRef.current.getVolume();
    let nextVol = currentVol + delta;

    nextVol = Math.max(0, Math.min(100, nextVol));

    playerRef.current.setVolume(nextVol);
    setVolume(nextVol);

    if (nextVol === 0) {
      setToast("음소거");
    } else {
      setToast(`볼륨 ${nextVol}%`);
    }
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

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 800);
    return () => clearTimeout(t);
  }, [toast]);

  /* ================= Keyboard Control ================= */

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerReady) return;

      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;

        case "KeyM":
          e.preventDefault();
          toggleMute();
          break;

        case "ArrowUp":
          e.preventDefault();
          adjustVolume(5);
          break;

        case "ArrowDown":
          e.preventDefault();
          adjustVolume(-5);
          break;

        case "KeyR":
          e.preventDefault();
          toggleRepeat();
          break;

        case "KeyL":
          e.preventDefault();
          setShowList((prev) => {
            const next = !prev;
            setToast(next ? "플레이리스트 열림" : "플레이리스트 닫힘");
            return next;
          });
          break;

        case "ArrowLeft":
          e.preventDefault();
          prevTrack();
          break;

        case "ArrowRight":
          e.preventDefault();
          nextTrack();
          break;

        case "KeyP":
          e.preventDefault();
          setCollapsed((prev) => {
            const next = !prev;
            setToast(next ? "플레이어 닫힘" : "플레이어 열림");
            return next;
          });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerReady, currentIndex, playing, repeatMode, volume]);

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
            {playing ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      )}

      {/* ===== HANDLE (항상 표시) ===== */}
      {!hideUI && (
        <div
          className={`md:fixed left-1/2 -translate-x-1/2 z-50 transition
            ${collapsed ? "bottom-8" : "bottom-28"}
          `}
        >
          <button
            onClick={() => setCollapsed(v => !v)}
            className="
              text-white/90
              drop-shadow
              transition
              hover:scale-110
              active:scale-95
              cursor-pointer
              animate-[float_3s_ease-in-out_infinite]
            "
          >
            <ChevronDown
              size={40}
              className={`transition ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}

      {/* Player UI */}
      {!hideUI && !collapsed && (
        <footer className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl md:px-8 group">
          <div
            className="
              w-2xl
              absolute
              -top-9
              left-1/2 -translate-x-1/2

              text-[11px]
              px-4 py-1.5
              rounded-full
              backdrop-blur-md
              bg-white/30
              border border-white/40
              text-[#5F4C84]
              flex justify-center gap-5

              opacity-0
              translate-y-2
              pointer-events-none

              transition-all duration-300 ease-out

              group-hover:opacity-100
              group-hover:translate-y-0
            "
          >
            <span><span className="px-1.5 py-0.5 rounded bg-white/40 text-[10px] font-medium">Space</span> ▶︎/⏸</span>
            <span><span className="px-1.5 py-0.5 rounded bg-white/40 text-[10px] font-medium">←</span> 이전</span>
            <span><span className="px-1.5 py-0.5 rounded bg-white/40 text-[10px] font-medium">→</span> 다음</span>
            <span><span className="px-1.5 py-0.5 rounded bg-white/40 text-[10px] font-medium">↑ , ↓</span> 볼륨</span>
            <span><span className="px-1.5 py-0.5 rounded bg-white/40 text-[10px] font-medium">M</span> 음소거</span>
            <span><span className="px-1.5 py-0.5 rounded bg-white/40 text-[10px] font-medium">R</span> 반복</span>
            <span><span className="px-1.5 py-0.5 rounded bg-white/40 text-[10px] font-medium">L</span> 목록</span>
            <span><span className="px-1.5 py-0.5 rounded bg-white/40 text-[10px] font-medium">P</span> 열기/닫기</span>
          </div>

          <GlassCard className="
            px-5
            py-2
            rounded-2xl
            space-y-2
            border border-white/40
            shadow-[0_20px_60px_rgba(120,90,255,0.18)]
          ">
            <div className="flex items-center gap-6">
              {/* LEFT */}
              <div className="flex items-center gap-3 w-[28%] min-w-0">
                <img
                  src={`https://img.youtube.com/vi/${current.videoId}/default.jpg`}
                  className="w-12 rounded-xl shadow-md"
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
                        className="text-[13px] font-semibold text-[#463A63]"
                      >
                        {current.title}
                      </span>

                      {isOverflowing && (
                        <span className="text-[13px] font-semibold text-[#463A63]">
                          {current.title}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-[#8B7AA8]">니니밍 플레이리스트</p>
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
                      h-[4px]
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
                      [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(139,111,232,0.6)]
                      [&::-webkit-slider-thumb]:-mt-[5px]
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

                {/* Controls */}
                <div className="flex items-center justify-between gap-16">
                  {/* left */}
                  <div className="flex items-center gap-3">
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
                        <Repeat1 size={14} color="#8B6FE8" />
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
                      <ListMusic size={14} color={showList ? "#8B6FE8" : "#7C66B4"} />
                    </button>
                  </div>

                  {/* Center */}
                  <div className="relative flex flex-1 items-center justify-center">
                    <div className="flex items-center justify-between w-36">
                      <button onClick={prevTrack} className={controlBtn}>
                        <SkipBack size={18} color="#7C66B4" />
                      </button>

                      <button onClick={nextTrack} className={controlBtn}>
                        <SkipForward size={18} color="#7C66B4" />
                      </button>
                    </div>

                    <button
                      onClick={togglePlay}
                      className="
                        absolute
                        w-11 h-11
                        rounded-full
                        flex items-center justify-center
                        shadow-[0_10px_30px_rgba(139,111,232,0.45)]
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

                  {/* RIGHT - Volume */}
                  <div className="flex items-center gap-3 w-[20%] justify-end">
                    <button onClick={toggleMute} className="cursor-pointer">
                      {volume === 0 ? (
                        <VolumeX size={14} color="#8B6FE8" />
                      ) : (
                        <Volume2 size={14} color="#7C66B4" />
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
                        w-16
                        h-[4px]
                        appearance-none
                        rounded-full
                        cursor-pointer
                        transition

                        [&::-webkit-slider-runnable-track]:h-[6px]
                        [&::-webkit-slider-runnable-track]:rounded-full
                        [&::-webkit-slider-runnable-track]:bg-transparent

                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:h-3
                        [&::-webkit-slider-thumb]:w-3
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(139,111,232,0.6)]
                        [&::-webkit-slider-thumb]:-mt-[3.5px]
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
              </div>
            </div>

            {/* PLAYLIST */}
            {showList && (
              <div className="mt-2 max-h-56 overflow-y-auto border-t border-white/30 p-2">
                {MUSIC_LIST.map((item, idx) => (
                  <button
                    key={item.videoId}
                    onClick={() => {
                      playerRef.current?.cueVideoById(MUSIC_LIST[idx].videoId, 0);
                      setCurrentIndex(idx);
                      setPlaying(true);
                      setShowList(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm cursor-pointer transition
                    ${idx === currentIndex
                        ? "bg-white/50 shadow-sm text-[#4F3F6B]"
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
      {toast && (
        <div
          className={`
            fixed left-1/2 -translate-x-1/2
            px-4 py-2
            text-xs
            rounded-full
            backdrop-blur-md
            bg-white/30
            border border-white/40
            shadow-md
            text-[#4F3F6B]
            transition-all duration-300 ease-out
            ${collapsed
              ? "bottom-16"
              : showList
                ? "bottom-76"
                : "bottom-36"
            }
          `}
        >
          {toast}
        </div>
      )}
    </>
  );
}
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
import { MUSIC_LIST } from "@/data/music";
import GlassCard from "./GlassCard";
import { usePathname } from "next/navigation";

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
  const [prevVolume, setPrevVolume] = useState(70);

  const playerRef = useRef<any>(null);

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

  const onReady: YouTubeProps["onReady"] = (event) => {
    const player = event.target;
    playerRef.current = player;

    let restored: any = null;

    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) restored = JSON.parse(raw);
    } catch { }

    if (restored) {
      const index = restored.currentIndex ?? 0;
      const time = restored.currentTime ?? 0;
      const vol = restored.volume ?? 70;

      setCurrentIndex(index);
      setVolume(vol);
      setRepeatMode(restored.repeatMode ?? "all");
      setPlaying(false);

      player.loadVideoById(MUSIC_LIST[index].videoId);

      setTimeout(() => {
        player.seekTo(time, true);
        player.pauseVideo();
        player.setVolume(vol);

        setCurrentTime(time);
        setDuration(player.getDuration() || 0);
      }, 300);

    } else {
      player.setVolume(volume);
    }

    setPlayerReady(true);
  };

  useEffect(() => {
    const handleBeforeUnload = () => saveState();
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    const state = event.data;

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!playerReady || !playerRef.current) return;

      const target = e.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) return;

      switch (e.code) {

        case "Space":
          e.preventDefault();
          togglePlay();
          break;

        case "KeyM":
          toggleMute();
          break;

        case "ArrowLeft":
          prevTrack();
          break;

        case "ArrowRight":
          nextTrack();
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);

  }, [playerReady, currentIndex, volume]);

  const togglePlay = () => {
    if (!playerRef.current || !playerReady) return;

    const state = playerRef.current.getPlayerState();

    if (state === 1) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const nextTrack = () => {
    if (!playerRef.current) return;

    const wasPlaying = playing;

    const nextIndex = (currentIndex + 1) % MUSIC_LIST.length;

    playerRef.current.loadVideoById(
      MUSIC_LIST[nextIndex].videoId,
      0
    );

    setCurrentIndex(nextIndex);
    setCurrentTime(0);

    // ⭐ 여기 핵심
    if (wasPlaying) {
      playerRef.current.playVideo();
      setPlaying(true);
    } else {
      playerRef.current.pauseVideo();
      setPlaying(false);
    }

    setTimeout(saveState, 300);
  };

  const prevTrack = () => {
    if (!playerRef.current) return;

    const wasPlaying = playing;

    const prevIndex =
      (currentIndex - 1 + MUSIC_LIST.length) % MUSIC_LIST.length;

    playerRef.current.loadVideoById(
      MUSIC_LIST[prevIndex].videoId,
      0
    );

    setCurrentIndex(prevIndex);
    setCurrentTime(0);

    // ⭐ 동일 로직
    if (wasPlaying) {
      playerRef.current.playVideo();
      setPlaying(true);
    } else {
      playerRef.current.pauseVideo();
      setPlaying(false);
    }

    setTimeout(saveState, 300);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev === "all" ? "one" : "all"));
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (volume === 0) {
      const restore = prevVolume || 50;
      setVolume(restore);
      playerRef.current.setVolume(restore);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      playerRef.current.setVolume(0);
    }
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
    if (vol > 0) setPrevVolume(vol);
    setVolume(vol);
    playerRef.current?.setVolume(vol);
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ================= Mobile Scroll Hide ================= */

  const [mobileVisible, setMobileVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY.current && current > 80) {
        setMobileVisible(false); // scroll down
      } else {
        setMobileVisible(true); // scroll up
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const hideUI = pathname.startsWith("/guestbook");

  const STORAGE_KEY = "music_player_state_v1";

  const saveState = () => {
    if (!playerRef.current || !playerReady) return;

    const data = {
      currentIndex,
      currentTime: playerRef.current.getCurrentTime() || 0,
      volume,
      playing: false, // ⭐ 항상 false 저장
      repeatMode,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  useEffect(() => {
    if (!playerReady) return;

    const interval = setInterval(saveState, 1000);
    return () => clearInterval(interval);
  }, [currentIndex, volume, playing, repeatMode, playerReady]);

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
        <div className="md:hidden fixed bottom-6 right-4 z-50">
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
        <footer className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl">
          <GlassCard className="px-5 py-2 rounded-3xl space-y-2">
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
                        w-11 h-11
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
                      className="
                        w-8 h-8 rounded-full
                        bg-white/10 hover:bg-white/20
                        flex items-center justify-center
                        transition cursor-pointer
                      "
                    >
                      {repeatMode === "one" ? (
                        <Repeat1 size={14} color="#8B6FE8" />
                      ) : (
                        <Repeat size={14} color="#7C66B4" />
                      )}
                    </button>

                    <button
                      onClick={() => setShowList((v) => !v)}
                      className="
                        w-8 h-8 rounded-full
                        bg-white/10 hover:bg-white/20
                        flex items-center justify-center
                        transition cursor-pointer
                      "
                    >
                      <ListMusic size={14} color="#7C66B4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT - Volume */}
              <div className="hidden md:flex items-center gap-2 w-[18%] justify-end">
                <button onClick={toggleMute} className="cursor-pointer">
                  {volume === 0 ? (
                    <VolumeX size={15} color="#7C66B4" />
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

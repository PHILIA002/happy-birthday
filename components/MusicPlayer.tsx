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

  const playerRef = useRef<any>(null);
  const current = MUSIC_LIST[currentIndex];

  /* ================= YouTube ================= */

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
    setDuration(event.target.getDuration());
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 1) setPlaying(true);
    if (event.data === 2) setPlaying(false);

    // ended
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
      if (playerRef.current && playing) {
        setCurrentTime(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }
    }, 500);
    return () => clearInterval(timer);
  }, [playing]);

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
              autoplay: 1,
              controls: 0
            },
          }}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* Player UI */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
        <GlassCard className="px-5 py-4 md:px-8 md:py-5 space-y-4">

          <div className="flex items-center gap-6">

            {/* ================= LEFT : TITLE ================= */}
            <div className="hidden md:flex items-center gap-3 w-[28%] min-w-0">

              <img
                src={`https://img.youtube.com/vi/${current.videoId}/default.jpg`}
                className="w-12 h-12 rounded-xl shadow-md"
              />

              <div className="min-w-0">
                <p className="text-sm font-semibold truncate text-[#4F3F6B]">
                  {current.title}
                </p>
                <p className="text-xs text-[#6E5A8A]">
                  니니밍 플레이리스트
                </p>
              </div>
            </div>

            {/* ================= CENTER : CONTROLS ================= */}
            <div className="flex-1 flex flex-col items-center gap-3">

              {/* === BUTTON ROW === */}
              <div className="flex items-center gap-5">

                {/* Playlist */}
                <button
                  onClick={() => setShowList(v => !v)}
                  className="w-10 h-10 rounded-full bg-white/25 backdrop-blur flex items-center justify-center"
                >
                  <ListMusic size={18} color="#7C66B4" />
                </button>

                <SkipBack
                  onClick={prevTrack}
                  size={24}
                  className="cursor-pointer"
                  color="#7C66B4"
                />

                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg,#A78BFA,#8B6FE8)",
                    color: "white"
                  }}
                >
                  {playing ? <Pause size={22} /> : <Play size={22} />}
                </button>

                <SkipForward
                  onClick={nextTrack}
                  size={24}
                  className="cursor-pointer"
                  color="#7C66B4"
                />

                {/* Repeat */}
                <button
                  onClick={toggleRepeat}
                  className="w-10 h-10 rounded-full bg-white/25 backdrop-blur flex items-center justify-center"
                >
                  {repeatMode === "one"
                    ? <Repeat1 size={18} color="#8B6FE8" />
                    : <Repeat size={18} color="#7C66B4" />}
                </button>

              </div>

              {/* === TIMELINE === */}
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full accent-[#8B6FE8]"
              />

            </div>

            {/* ================= RIGHT : VOLUME ================= */}
            <div className="hidden md:flex items-center gap-3 w-[22%] justify-end">

              <Volume2 size={18} color="#7C66B4" />

              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolume}
                className="w-28 accent-[#8B6FE8]"
              />

            </div>

          </div>

          {/* ================= PLAYLIST ================= */}
          {showList && (
            <div className="max-h-56 overflow-y-auto border-t border-white/30 pt-3">
              {MUSIC_LIST.map((item, idx) => (
                <button
                  key={item.videoId}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowList(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition
                  ${idx === currentIndex
                      ? "bg-white/40 text-[#4F3F6B]"
                      : "hover:bg-white/25 text-[#6E5A8A]"}`}
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

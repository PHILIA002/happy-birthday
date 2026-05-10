"use client";

import { useState, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import GlassCard from "./GlassCard";
import { MUSIC_LIST } from "@/data/music";
import { usePlayer } from "./MusicPlayerProvider";

export default function MusicPlayer() {
  const { playerRef } = usePlayer();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [collapsed, setCollapsed] = useState(false);

  const current = MUSIC_LIST[currentIndex];

  /* ================= YOUTUBE ================= */

  const onReady: YouTubeProps["onReady"] = (e) => {
    playerRef.current = e.target;
  };

  const onStateChange: YouTubeProps["onStateChange"] = (e) => {
    if (e.data === 1) setPlaying(true);
    if (e.data === 2) setPlaying(false);
  };

  /* ================= CONTROL ================= */

  const togglePlay = () => {
    if (!playerRef.current) return;
    const state = playerRef.current.getPlayerState();
    state === 1
      ? playerRef.current.pauseVideo()
      : playerRef.current.playVideo();
  };

  const nextTrack = () => {
    const next = (currentIndex + 1) % MUSIC_LIST.length;
    setCurrentIndex(next);
    playerRef.current?.loadVideoById(MUSIC_LIST[next].videoId, 0);
  };

  const prevTrack = () => {
    const prev =
      (currentIndex - 1 + MUSIC_LIST.length) % MUSIC_LIST.length;
    setCurrentIndex(prev);
    playerRef.current?.loadVideoById(MUSIC_LIST[prev].videoId, 0);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    const v = playerRef.current.getVolume();

    if (v === 0) {
      playerRef.current.setVolume(70);
      setVolume(70);
    } else {
      playerRef.current.setVolume(0);
      setVolume(0);
    }
  };

  const handleVolume = (e: any) => {
    const v = Number(e.target.value);
    setVolume(v);
    playerRef.current?.setVolume(v);
  };

  const handleSeek = (e: any) => {
    const t = Number(e.target.value);
    setCurrentTime(t);
    playerRef.current?.seekTo(t, true);
  };

  /* ================= PROGRESS ================= */

  useEffect(() => {
    const t = setInterval(() => {
      if (!playerRef.current) return;
      setCurrentTime(playerRef.current.getCurrentTime());
      setDuration(playerRef.current.getDuration());
    }, 500);

    return () => clearInterval(t);
  }, []);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ================= UI ================= */

  return (
    <>
      {/* Hidden Player */}
      <div className="hidden">
        <YouTube
          videoId={current.videoId}
          opts={{ width: "0", height: "0" }}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* ===== SIDE PLAYER ===== */}
      <div
        className={`
          hidden md:block
          fixed top-0 right-0 h-full z-50
          transition-all duration-300
          ${collapsed ? "w-14" : "w-[300px]"}
        `}
      >
        <GlassCard className="h-full flex flex-col p-3 relative">

          {/* 접기 버튼 */}
          <button
            onClick={() => setCollapsed(v => !v)}
            className="
              absolute -left-3 top-6
              w-6 h-6 rounded-full
              bg-[var(--primary)]
              text-white
              flex items-center justify-center
              shadow
              hover:scale-105 transition
            "
          >
            {collapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>

          {!collapsed && (
            <>
              {/* 썸네일 */}
              <img
                src={`https://img.youtube.com/vi/${current.videoId}/hqdefault.jpg`}
                className="w-full rounded-xl mb-3"
              />

              {/* 제목 */}
              <p className="text-sm font-semibold truncate mb-3">
                {current.title}
              </p>

              {/* 컨트롤 */}
              <div className="flex items-center justify-center gap-5 mb-4">
                <button onClick={prevTrack}><SkipBack size={20} /></button>

                <button
                  onClick={togglePlay}
                  className="
                    w-12 h-12 rounded-full
                    flex items-center justify-center
                    bg-[var(--primary)]
                    text-white
                  "
                >
                  {playing ? <Pause size={22} /> : <Play size={22} />}
                </button>

                <button onClick={nextTrack}><SkipForward size={20} /></button>
              </div>

              {/* 진행바 */}
              <div className="space-y-1 mb-4">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full accent-[var(--primary)]"
                />
                <div className="flex justify-between text-xs text-[var(--text-sub)]">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* 볼륨 */}
              <div className="flex items-center gap-2">
                <button onClick={toggleMute}>
                  {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={handleVolume}
                  className="flex-1 accent-[var(--primary)]"
                />
              </div>
            </>
          )}
        </GlassCard>
      </div>
    </>
  );
}
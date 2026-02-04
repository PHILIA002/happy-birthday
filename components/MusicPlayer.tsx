"use client";

import { useState, useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { MUSIC_LIST } from "@/data/music";
import GlassCard from "./GlassCard";

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  const playerRef = useRef<any>(null);
  const current = MUSIC_LIST[currentIndex];

  // --- YouTube Ready ---
  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
    setDuration(event.target.getDuration());
  };

  // --- Player State Sync ---
  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 1) setPlaying(true);   // playing
    if (event.data === 2) setPlaying(false);  // paused
    if (event.data === 0) nextTrack();        // ended → next
  };

  // --- Controls ---
  const togglePlay = () => {
    if (!playerRef.current) return;
    playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % MUSIC_LIST.length);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentIndex((prev) => (prev - 1 + MUSIC_LIST.length) % MUSIC_LIST.length);
    setCurrentTime(0);
  };

  // --- Progress Timer ---
  useEffect(() => {
    const timer = setInterval(() => {
      if (playerRef.current && playing) {
        setCurrentTime(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }
    }, 500);
    return () => clearInterval(timer);
  }, [playing]);

  // --- Seek ---
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    playerRef.current?.seekTo(time, true);
  };

  // --- Volume ---
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    playerRef.current?.setVolume(vol);
  };

  return (
    <>
      {/* Hidden YouTube Player */}
      <div className="hidden">
        <YouTube
          key={current.videoId} // ⭐ 트랙 변경 시 플레이어 갱신
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
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl">
        <GlassCard className="px-4 py-3 md:px-6 md:py-4">

          <div className="flex items-center gap-4 md:gap-6">

            {/* Track Info */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={`https://img.youtube.com/vi/${current.videoId}/default.jpg`}
                className="w-11 h-11 rounded-lg shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm text-nini-text font-medium truncate">
                  {current.title}
                </p>
                <p className="text-xs text-nini-text">
                  니니밍 플레이리스트
                </p>
              </div>
            </div>

            {/* Controls + Progress */}
            <div className="flex-1 flex flex-col items-center gap-1">

              <div className="flex items-center gap-5">
                <SkipBack
                  onClick={prevTrack}
                  className="text-white/70 hover:text-white cursor-pointer"
                  size={22}
                />

                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  {playing ? <Pause size={20}/> : <Play size={20} className="ml-0.5"/>}
                </button>

                <SkipForward
                  onClick={nextTrack}
                  className="text-white/70 hover:text-white cursor-pointer"
                  size={22}
                />
              </div>

              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full accent-purple-400"
              />
            </div>

            {/* Volume (desktop only) */}
            <div className="hidden md:flex items-center gap-2 w-28">
              <Volume2 size={18} className="text-white/70" />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolume}
                className="w-full accent-purple-400"
              />
            </div>

          </div>
        </GlassCard>
      </footer>
    </>
  );
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { MUSIC_LIST } from "@/data/music";

type RepeatMode = "all" | "one";

type MusicContextType = {
  currentIndex: number;
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  repeatMode: RepeatMode;

  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (t: number) => void;
  setVolumeValue: (v: number) => void;
  toggleRepeat: () => void;
  loadTrack: (index: number) => void;
};

const MusicContext = createContext<MusicContextType | null>(null);
export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("MusicProvider 없음");
  return ctx;
};

const STORAGE_KEY = "music_player_state_v1";

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const playerRef = useRef<any>(null);
  const retryRef = useRef<number | null>(null);

  const [playerReady, setPlayerReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("all");

  /* ===== restore ===== */

  const restoreState = () => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  /* ===== save ===== */

  const saveState = () => {
    if (!playerRef.current) return;

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentIndex,
        currentTime: playerRef.current.getCurrentTime() || 0,
        volume,
        playing,
        repeatMode,
      })
    );
  };

  /* ===== autoplay killer ===== */

  const forceAutoPlay = (player: any, vol: number, shouldPlay: boolean) => {
    if (!shouldPlay) return;

    let tries = 0;

    retryRef.current = window.setInterval(() => {
      try {
        const state = player.getPlayerState();

        if (state === 1) {
          clearInterval(retryRef.current!);
          player.setVolume(vol);
          player.unMute();
          return;
        }

        player.playVideo();

        tries++;
        if (tries > 12) clearInterval(retryRef.current!);
      } catch {}
    }, 400);
  };

  /* ===== YouTube ===== */

  const onReady: YouTubeProps["onReady"] = (e) => {
    const player = e.target;
    playerRef.current = player;

    const restored = restoreState();

    player.mute();

    if (restored) {
      setCurrentIndex(restored.currentIndex ?? 0);
      setVolume(restored.volume ?? 70);
      setPlaying(restored.playing ?? true);
      setRepeatMode(restored.repeatMode ?? "all");

      player.loadVideoById(
        MUSIC_LIST[restored.currentIndex ?? 0].videoId,
        restored.currentTime ?? 0
      );

      setTimeout(() => {
        forceAutoPlay(player, restored.volume ?? 70, restored.playing ?? true);
      }, 500);
    }

    setPlayerReady(true);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (e) => {
    if (e.data === 1) setPlaying(true);
    if (e.data === 2) setPlaying(false);

    if (e.data === 0) {
      if (repeatMode === "one") {
        playerRef.current?.seekTo(0, true);
        playerRef.current?.playVideo();
      } else {
        nextTrack();
      }
    }
  };

  /* ===== controls ===== */

  const togglePlay = () => {
    if (!playerRef.current) return;
    const state = playerRef.current.getPlayerState();
    state === 1
      ? playerRef.current.pauseVideo()
      : playerRef.current.playVideo();
  };

  const loadTrack = (index: number) => {
    if (!playerRef.current) return;
    playerRef.current.loadVideoById(MUSIC_LIST[index].videoId, 0);
    setCurrentIndex(index);
    setPlaying(true);
  };

  const nextTrack = () => {
    const next = (currentIndex + 1) % MUSIC_LIST.length;
    loadTrack(next);
  };

  const prevTrack = () => {
    const prev = (currentIndex - 1 + MUSIC_LIST.length) % MUSIC_LIST.length;
    loadTrack(prev);
  };

  const seekTo = (t: number) => {
    setCurrentTime(t);
    playerRef.current?.seekTo(t, true);
  };

  const setVolumeValue = (v: number) => {
    setVolume(v);
    playerRef.current?.setVolume(v);
  };

  const toggleRepeat = () => {
    setRepeatMode((p) => (p === "all" ? "one" : "all"));
  };

  /* ===== time sync ===== */

  useEffect(() => {
    const timer = setInterval(() => {
      if (!playerRef.current || !playerReady) return;

      setCurrentTime(playerRef.current.getCurrentTime());
      setDuration(playerRef.current.getDuration());
    }, 500);

    return () => clearInterval(timer);
  }, [playerReady]);

  /* ===== auto save ===== */

  useEffect(() => {
    if (!playerReady) return;
    const timer = setInterval(saveState, 1000);
    return () => clearInterval(timer);
  }, [playerReady, currentIndex, volume, playing, repeatMode]);

  /* ===== render ===== */

  return (
    <MusicContext.Provider
      value={{
        currentIndex,
        playing,
        currentTime,
        duration,
        volume,
        repeatMode,
        togglePlay,
        nextTrack,
        prevTrack,
        seekTo,
        setVolumeValue,
        toggleRepeat,
        loadTrack,
      }}
    >
      {children}

      <div className="hidden">
        <YouTube
          videoId={MUSIC_LIST[0].videoId}
          opts={{ width: "0", height: "0", playerVars: { autoplay: 1 } }}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>
    </MusicContext.Provider>
  );
}

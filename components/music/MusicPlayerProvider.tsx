"use client";

import { createContext, useContext, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import type { YouTubePlayer } from "react-youtube";
import { MUSIC_LIST } from "@/data/music";

type Context = {
  // Playlist
  currentIndex: number;
  setCurrentIndex: React.Dispatch<
    React.SetStateAction<number>
  >;

  // Player
  playing: boolean;
  setPlaying: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  currentTime: number;
  setCurrentTime: React.Dispatch<
    React.SetStateAction<number>
  >;

  duration: number;
  setDuration: React.Dispatch<
    React.SetStateAction<number>
  >;

  volume: number;
  setVolume: React.Dispatch<
    React.SetStateAction<number>
  >;

  muted: boolean;
  setMuted: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  repeat: boolean;
  setRepeat: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  shuffle: boolean;
  setShuffle: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  // Swiper
  imageSwiper: SwiperType | null;
  setImageSwiper: React.Dispatch<
    React.SetStateAction<SwiperType | null>
  >;

  infoSwiper: SwiperType | null;
  setInfoSwiper: React.Dispatch<
    React.SetStateAction<SwiperType | null>
  >;

  // YouTube Player
  playerRef: React.MutableRefObject<YouTubePlayer | null>;

  // Controls
  play: () => void;
  pause: () => void;
  togglePlay: () => void;

  next: () => void;
  prev: () => void;

  seek: (time: number) => void;

  changeVolume: (value: number) => void;
  toggleMute: () => void;
};

const PlayerContext =
  createContext<Context | null>(null);

export function MusicPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // =========================
  // Playlist
  // =========================

  const [currentIndex, setCurrentIndex] =
    useState(0);

  // =========================
  // Player
  // =========================

  const [playing, setPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [volume, setVolume] = useState(50);

  const [muted, setMuted] = useState(false);

  const [repeat, setRepeat] =
    useState(false);

  const [shuffle, setShuffle] =
    useState(false);

  // =========================
  // Swiper
  // =========================

  const [imageSwiper, setImageSwiper] =
    useState<SwiperType | null>(null);

  const [infoSwiper, setInfoSwiper] =
    useState<SwiperType | null>(null);

  // =========================
  // YouTube
  // =========================

  const playerRef =
    useRef<YouTubePlayer | null>(null);

  // =========================
  // Controls
  // =========================

  const play = () => {
    playerRef.current?.playVideo();
    setPlaying(true);
  };

  const pause = () => {
    playerRef.current?.pauseVideo();
    setPlaying(false);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }

    setPlaying((prev) => !prev);
  };

  const next = () => {
    const index = (currentIndex + 1) % MUSIC_LIST.length;

    setCurrentIndex(index);

    imageSwiper?.slideToLoop(index);
    infoSwiper?.slideToLoop(index);
  };

  const prev = () => {
    const index =
      (currentIndex - 1 + MUSIC_LIST.length) %
      MUSIC_LIST.length;

    setCurrentIndex(index);

    imageSwiper?.slideToLoop(index);
    infoSwiper?.slideToLoop(index);
  };

  const seek = (time: number) => {
    playerRef.current?.seekTo(time, true);
    setCurrentTime(time);
  };

  const changeVolume = (value: number) => {
    playerRef.current?.setVolume(value);
    setVolume(value);

    if (value === 0) {
      setMuted(true);
      playerRef.current?.mute();
    } else {
      setMuted(false);
      playerRef.current?.unMute();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (muted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);

      setMuted(false);
    } else {
      playerRef.current.mute();
      setMuted(true);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        // Playlist
        currentIndex,
        setCurrentIndex,

        // Player
        playing,
        setPlaying,

        currentTime,
        setCurrentTime,

        duration,
        setDuration,

        volume,
        setVolume,

        muted,
        setMuted,

        repeat,
        setRepeat,

        shuffle,
        setShuffle,

        // Swiper
        imageSwiper,
        setImageSwiper,

        infoSwiper,
        setInfoSwiper,

        // YouTube
        playerRef,

        // Controls
        play,
        pause,
        togglePlay,

        next,
        prev,

        seek,

        changeVolume,
        toggleMute,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error(
      "usePlayer must be used within MusicPlayerProvider"
    );
  }

  return context;
}
"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import type { Swiper as SwiperType } from "swiper";

type Context = {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<
    React.SetStateAction<number>
  >;

  imageSwiper: SwiperType | null;
  setImageSwiper: React.Dispatch<
    React.SetStateAction<SwiperType | null>
  >;

  infoSwiper: SwiperType | null;
  setInfoSwiper: React.Dispatch<
    React.SetStateAction<SwiperType | null>
  >;

  playerRef: React.MutableRefObject<any>;
};

const PlayerContext =
  createContext<Context | null>(null);

export function MusicPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [imageSwiper, setImageSwiper] =
    useState<SwiperType | null>(null);

  const [infoSwiper, setInfoSwiper] =
    useState<SwiperType | null>(null);

  const playerRef = useRef<any>(null);

  return (
    <PlayerContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,

        imageSwiper,
        setImageSwiper,

        infoSwiper,
        setInfoSwiper,

        playerRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);

  if (!ctx) {
    throw new Error(
      "usePlayer must be used within MusicPlayerProvider"
    );
  }

  return ctx;
}
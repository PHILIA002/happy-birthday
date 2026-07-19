"use client";

import { createContext, useContext, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import {
  MUSIC_LIST,
  type MusicItem,
} from "@/data/music";

type Context = {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<
    React.SetStateAction<number>
  >;

  currentMusic: MusicItem;

  opened: boolean;
  setOpened: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  imageSwiper: SwiperType | null;
  setImageSwiper: React.Dispatch<
    React.SetStateAction<SwiperType | null>
  >;

  infoSwiper: SwiperType | null;
  setInfoSwiper: React.Dispatch<
    React.SetStateAction<SwiperType | null>
  >;

  next: () => void;
  prev: () => void;
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

  const currentMusic =
    MUSIC_LIST[currentIndex];

  const [opened, setOpened] =
    useState(false);

  const [imageSwiper, setImageSwiper] =
    useState<SwiperType | null>(null);

  const [infoSwiper, setInfoSwiper] =
    useState<SwiperType | null>(null);

  const next = () => {
    imageSwiper?.slideNext();
    infoSwiper?.slideNext();

    setOpened(false);

    setCurrentIndex(
      (v) => (v + 1) % MUSIC_LIST.length
    );
  };

  const prev = () => {
    imageSwiper?.slidePrev();
    infoSwiper?.slidePrev();

    setOpened(false);

    setCurrentIndex(
      (v) =>
        (v - 1 + MUSIC_LIST.length) %
        MUSIC_LIST.length
    );
  };

  return (
    <PlayerContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,

        currentMusic,

        opened,
        setOpened,

        imageSwiper,
        setImageSwiper,

        infoSwiper,
        setInfoSwiper,

        next,
        prev,
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
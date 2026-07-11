"use client";

import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";

import "swiper/css";

import {
  SkipBack,
  SkipForward,
} from "lucide-react";

import { MUSIC_LIST } from "@/data/music";
import { usePlayer } from "./MusicPlayerProvider";

export default function MusicHero() {
  const {
    currentIndex,

    imageSwiper,
    setImageSwiper,

    infoSwiper,

    opened,
    setOpened,

    prev,
    next,
  } = usePlayer();

  const [showControls, setShowControls] =
    useState(false);

  const hideTimer =
    useRef<NodeJS.Timeout | null>(null);

  const showOverlay = () => {
    setShowControls(true);
    setOpened(true);

    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }

    hideTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    imageSwiper?.slideToLoop(currentIndex);
    infoSwiper?.slideToLoop(currentIndex);

    // 곡이 바뀌면 다시 썸네일
    setOpened(false);
  }, [
    currentIndex,
    imageSwiper,
    infoSwiper,
    setOpened,
  ]);

  useEffect(() => {
    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      <Swiper
        modules={[Controller]}
        loop
        allowTouchMove={false}
        controller={{
          control: infoSwiper ?? undefined,
        }}
        onSwiper={setImageSwiper}
        initialSlide={currentIndex}
        className="w-full h-full"
      >
        {MUSIC_LIST.map((music, index) => (
          <SwiperSlide key={music.url}>
            <div className="relative w-full h-full min-h-[40dvh] overflow-hidden rounded-2xl">

              {/* Blur Background */}
              <img
                src={music.thumbnail}
                alt=""
                className="
                  absolute
                  inset-0

                  w-full
                  h-full

                  object-cover

                  blur-2xl
                  scale-110
                  opacity-40
                "
              />

              {/* Album / Player */}
              <div
                className="
                  absolute
                  inset-0

                  flex
                  items-center
                  justify-center
                "
              >
                {opened && index === currentIndex ? (
                  <iframe
                    key={music.url}
                    src={music.url}
                    className="w-full h-full"
                    allow="autoplay; clipboard-write; web-share"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={music.thumbnail}
                    alt={music.title}
                    onClick={showOverlay}
                    className="
                      max-w-[85%]
                      max-h-[85%]

                      object-contain

                      rounded-2xl
                      shadow-2xl

                      cursor-pointer

                      transition-transform
                      duration-300

                      hover:scale-[1.03]
                    "
                  />
                )}
              </div>

              {/* Gradient */}
              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent

                  pointer-events-none
                "
              />

              {/* Mobile Controls */}
              <div
                className={`
                  absolute
                  inset-0
                  z-30

                  flex
                  lg:hidden

                  items-center
                  justify-center
                  gap-16

                  transition-all
                  duration-300

                  ${
                    showControls
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }
                `}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="
                    w-14
                    h-14

                    rounded-full

                    bg-black/45
                    backdrop-blur

                    flex
                    items-center
                    justify-center

                    text-white
                  "
                >
                  <SkipBack size={28} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="
                    w-14
                    h-14

                    rounded-full

                    bg-black/45
                    backdrop-blur

                    flex
                    items-center
                    justify-center

                    text-white
                  "
                >
                  <SkipForward size={28} />
                </button>
              </div>

              {/* Mobile Info */}
              <div
                className="
                  absolute
                  left-6
                  bottom-6
                  z-40

                  lg:hidden
                "
              >
                <h2 className="text-2xl font-bold text-white">
                  {music.title}
                </h2>

                <p className="mt-2 text-sm text-white/75">
                  Track {index + 1}
                </p>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";

import "swiper/css";

import { MUSIC_LIST } from "@/data/music";
import { usePlayer } from "./MusicPlayerProvider";

export default function MusicHero() {
  const {
    currentIndex,
    setCurrentIndex,

    imageSwiper,
    setImageSwiper,

    infoSwiper,

    opened,
    setOpened,
  } = usePlayer();

  const [showControls, setShowControls] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  const hideTimer =
    useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    update();

    window.addEventListener("resize", update);

    return () =>
      window.removeEventListener("resize", update);
  }, []);

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
        allowTouchMove={isMobile}
        controller={{
          control: infoSwiper ?? undefined,
        }}
        onSwiper={setImageSwiper}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex);
        }}
        initialSlide={currentIndex}
        className="w-full h-full"
      >
        {MUSIC_LIST.map((music, index) => (
          <SwiperSlide key={music.url}>
            <div className="relative w-full h-full min-h-[40dvh] overflow-hidden">
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

              <div
                className="
                  absolute
                  inset-0

                  pointer-events-none
                "
              />

              <div
                className="
                  absolute
                  left-6
                  bottom-4
                  z-40

                  lg:hidden
                "
              >
                <h2 className="text-xl font-bold text-white">
                  {music.title}
                </h2>

                <p className="mt-2 text-sm text-white/70">
                  누나밍 {index + 1}
                </p>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
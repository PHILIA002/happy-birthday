"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";

import "swiper/css";

import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";

import { MUSIC_LIST } from "@/data/music";
import { usePlayer } from "./MusicPlayerProvider";

export default function MusicHero() {
  const {
    currentIndex,
    setCurrentIndex,

    imageSwiper,
    setImageSwiper,

    infoSwiper,

    playing,
    play,
    pause,
    prev,
    next,
  } = usePlayer();

  const [showControls, setShowControls] =
    useState(false);

  const hideTimer =
    useRef<NodeJS.Timeout | null>(null);

  const showOverlay = () => {
    setShowControls(true);

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
  }, [
    currentIndex,
    imageSwiper,
    infoSwiper,
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
        controller={{
          control: infoSwiper ?? undefined,
        }}
        onSwiper={setImageSwiper}
        onSlideChange={(swiper) =>
          setCurrentIndex(swiper.realIndex)
        }
        initialSlide={currentIndex}
        className="w-full h-full"
      >
        {MUSIC_LIST.map((music, index) => (
          <SwiperSlide key={music.videoId}>
            <div className="relative w-full h-full min-h-[40dvh]">

              {/* Blur */}
              <img
                src={`https://img.youtube.com/vi/${music.videoId}/maxresdefault.jpg`}
                alt=""
                className="
                  absolute inset-0
                  w-full h-full
                  object-cover
                  blur-2xl
                  scale-110
                  opacity-40
                "
              />

              {/* Album */}
              <div
                onClick={showOverlay}
                className="
                  absolute
                  inset-0

                  flex
                  items-center
                  justify-center

                  cursor-pointer
                "
              >
                <img
                  src={`https://img.youtube.com/vi/${music.videoId}/maxresdefault.jpg`}
                  alt={music.title}
                  className="
                    max-w-[90%]
                    max-h-[85%]

                    object-contain

                    rounded-2xl
                    shadow-2xl
                  "
                />
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
                  gap-8

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
                    showOverlay();
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
                    showOverlay();

                    playing
                      ? pause()
                      : play();
                  }}
                  className="
                    w-16
                    h-16

                    rounded-full

                    bg-white
                    text-black

                    flex
                    items-center
                    justify-center

                    shadow-xl
                  "
                >
                  {playing ? (
                    <Pause size={34} />
                  ) : (
                    <Play size={34} />
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showOverlay();
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
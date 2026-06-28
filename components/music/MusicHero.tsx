"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";

import "swiper/css";

import { MUSIC_LIST } from "@/data/music";
import { usePlayer } from "./MusicPlayerProvider";

export default function MusicHero() {
  const {
    currentIndex,
    setCurrentIndex,
    infoSwiper,
    setImageSwiper,
  } = usePlayer();

  return (
    <div
      className="
        w-full
        h-full
        min-h-0

        flex
        flex-col
      "
    >
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
            <div
              className="
                relative
                w-full
                h-full
                min-h-[400px]
              "
            >
              {/* 블러 배경 */}
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

              {/* 썸네일 */}
              <div
                className="
                  absolute inset-0

                  flex
                  items-center
                  justify-center
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

              {/* 오버레이 */}
              <div
                className="
                  absolute inset-0

                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent
                "
              />

              {/* 모바일 */}
              <div
                className="
                  absolute
                  left-6
                  bottom-6
                  z-10

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
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";

import "swiper/css";

import { MUSIC_LIST } from "@/data/music";
import { usePlayer } from "./MusicPlayerProvider";

export default function MusicInfo() {
  const {
    imageSwiper,
    setInfoSwiper,
  } = usePlayer();

  return (
    <Swiper
      modules={[Controller]}
      controller={{
        control: imageSwiper ?? undefined,
      }}
      onSwiper={setInfoSwiper}
      allowTouchMove={false}
      autoHeight
      className="hidden lg:block w-full"
    >
      {MUSIC_LIST.map((music, index) => (
        <SwiperSlide key={music.videoId}>
          <div
            className="
              py-4
            "
          >
            <h2
              className="
                text-3xl
                font-bold

                text-[var(--text-main)]
              "
            >
              {music.title}
            </h2>

            <p
              className="
                mt-2

                text-sm
                text-[var(--text-sub)]
              "
            >
              Track {index + 1}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
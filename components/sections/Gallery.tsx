"use client";

import { useState } from "react";
import { GALLERY } from "@/data/gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  return (
    <section id="gallery" className="pt-24 md:pt-32 pb-20 overflow-hidden">
      <div className="max-w-full mx-auto">

        <Swiper
          modules={[Autoplay]}
          centeredSlides
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          speed={1100}
          slidesPerView={2.1}
          spaceBetween={18}
          breakpoints={{
            0: { slidesPerView: 1.3, spaceBetween: 10 },
            640: { slidesPerView: 1.7, spaceBetween: 14 },
            1024: { slidesPerView: 2.1, spaceBetween: 18 },
          }}
          onSwiper={setSwiperRef}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          className="overflow-visible"
        >
          {GALLERY.map((img, idx) => (
            <SwiperSlide key={img.src}>
              <div className="flex justify-center py-6">
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`
                    rounded-3xl
                    border border-white/50
                    ring-1 ring-violet-200/40
                    transition-all duration-700 ease-out
                    ${
                      activeIndex === idx
                        ? "scale-100 opacity-100 shadow-[0_12px_24px_rgba(120,80,200,0.35)]"
                        : "scale-[0.86] opacity-60 blur-[0.3px]"
                    }
                  `}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 하단 썸네일 */}
        <div className="mt-6 hidden md:flex justify-center gap-3">
          {GALLERY.map((img, idx) => (
            <button
              key={img.src}
              onClick={() => swiperRef?.slideToLoop(idx)}
              className={`
                w-12 h-12
                rounded-lg
                border
                cursor-pointer
                flex items-center justify-center
                transition-all duration-300 ease-out
                ${
                  activeIndex === idx
                    ? "border-[#8b6cff] scale-105 shadow-[0_0_8px_rgba(139,108,255,0.45)]"
                    : "border-[#cfc7e6] opacity-70 hover:opacity-100"
                }
              `}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

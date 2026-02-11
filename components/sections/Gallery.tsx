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
  const [modal, setModal] = useState<string | null>(null);

  return (
    <section className="pt-12 md:pt-24 pb-28 overflow-visible">
      <div className="max-w-full mx-auto overflow-visible">

        <Swiper
          modules={[Autoplay]}
          centeredSlides
          loop
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          speed={1000}
          slidesPerView={2.2}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 8 },
            480: { slidesPerView: 1.5, spaceBetween: 10 },
            768: { slidesPerView: 2.2, spaceBetween: 14 },
            1024: { slidesPerView: 3.2, spaceBetween: 18 },
            1400: { slidesPerView: 4.2, spaceBetween: 22 },
          }}
          onSwiper={setSwiperRef}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          className="overflow-visible py-8 md:py-6"
        >
          {GALLERY.map((img, idx) => (
            <SwiperSlide key={img.src} className="overflow-visible">
              <div className="flex justify-center py-12 md:py-10 px-4 md:px-2 overflow-visible">
                <img
                  src={img.src}
                  alt={img.alt}
                  onClick={() => setModal(img.src)}
                  className={`
                    w-[72vw] sm:w-[50vw] md:w-[36vw] lg:w-[28vw] xl:w-[22vw]
                    max-w-[460px]

                    rounded-3xl
                    border border-white/40
                    ring-1 ring-violet-200/30
                    transition-all duration-700 ease-out
                    cursor-zoom-in

                    ${
                      activeIndex === idx
                        ? `
                          scale-100 opacity-100
                          shadow-[0_16px_30px_rgba(120,80,200,0.32)]
                          md:shadow-[0_20px_42px_rgba(120,80,200,0.38)]
                        `
                        : `
                          scale-[0.84] md:scale-[0.80] lg:scale-[0.76]
                          opacity-45 blur-[0.6px]
                        `
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

      {/* ✅ MODAL (추가된 부분) */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          className="
            fixed inset-0 z-[999]
            bg-black/85 backdrop-blur-sm
            flex items-center justify-center
            p-6
            cursor-zoom-out
          "
        >
          <img
            src={modal}
            alt=""
            className="
              max-h-[90vh]
              w-auto
              rounded-2xl
              shadow-2xl
            "
          />
        </div>
      )}

    </section>
  );
}

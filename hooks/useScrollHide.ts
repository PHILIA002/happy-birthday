"use client";

import { useEffect, useState } from "react";

export function useScrollHide() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      if (y > lastY && y > 120) {
        // 아래로 스크롤
        setHidden(true);
      } else {
        // 위로 스크롤
        setHidden(false);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}
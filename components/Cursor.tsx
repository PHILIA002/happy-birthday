"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    let x = 0;
    let y = 0;

    const speed = 0.3;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const loop = () => {
      if (ref.current) {
        // lerp
        x += (mouseX - x) * speed;
        y += (mouseY - y) * speed;

        const offsetX = 2;
        const offsetY = -2;

        ref.current.style.transform =
          `translate3d(${x + offsetX}px, ${y + offsetY}px, 0)`;
      }

      requestAnimationFrame(loop);
    };

    loop();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div ref={ref} className="cursor-companion">
      <img src="/cursor.gif" />
    </div>
  );
}
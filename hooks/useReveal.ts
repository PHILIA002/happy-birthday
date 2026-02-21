// hooks/useReveal.ts
import { useEffect, useRef, useState } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -140px 0px", // cinematic late
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, show };
}
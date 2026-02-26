"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  start?: boolean;
};

export default function useHandwriting(
  text: string,
  speed = 40,
  options?: Options
) {
  const start = options?.start ?? true;

  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  const indexRef = useRef(0);

  useEffect(() => {
    if (!start) return;

    setDisplay("");
    setDone(false);
    indexRef.current = 0;

    const id = setInterval(() => {
      indexRef.current++;

      setDisplay(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed, start]);

  return { display, done };
}
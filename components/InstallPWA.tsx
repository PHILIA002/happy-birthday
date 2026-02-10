"use client";

import { useEffect, useState } from "react";

export default function InstallPWA() {
  const [promptEvent, setPromptEvent] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setPromptEvent(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!promptEvent) return null;

  return (
    <button
      onClick={() => promptEvent.prompt()}
      className="fixed bottom-6 right-6 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg"
    >
      홈 화면에 추가 🎂
    </button>
  );
}

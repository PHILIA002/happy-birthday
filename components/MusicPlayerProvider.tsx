"use client";

import { createContext, useContext, useRef } from "react";

type Ctx = {
  playerRef: React.MutableRefObject<any>;
};

const PlayerContext = createContext<Ctx | null>(null);

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const playerRef = useRef<any>(null);

  return (
    <PlayerContext.Provider value={{ playerRef }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be inside provider");
  return ctx;
}
"use client";

import MusicController from "./MusicController";
import { usePlayer } from "./MusicPlayerProvider";

export default function MusicPlayer() {
  const {
    currentIndex,
    currentMusic,

    opened,
    setOpened,

    prev,
    next,
  } = usePlayer();

  return (
    <MusicController
      title={currentMusic.title}
      track={currentIndex + 1}
      opened={opened}
      onOpen={() => setOpened(true)}
      onPrev={prev}
      onNext={next}
    />
  );
}
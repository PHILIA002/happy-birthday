"use client";

import { useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

import MusicController from "./MusicController";

import { MUSIC_LIST } from "@/data/music";
import { usePlayer } from "./MusicPlayerProvider";

export default function MusicPlayer() {
  const {
    playerRef,

    currentIndex,
    setCurrentIndex,

    playing,
    setPlaying,

    currentTime,
    setCurrentTime,

    duration,
    setDuration,

    volume,

    play,
    pause,
    next,
    prev,
    seek,

    changeVolume,
    toggleMute,
  } = usePlayer();

  const current = MUSIC_LIST[currentIndex];

  const onReady: YouTubeProps["onReady"] = (e) => {
    playerRef.current = e.target;
    playerRef.current.setVolume(volume);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (e) => {
    switch (e.data) {
      case 1:
        setPlaying(true);
        break;

      case 2:
        setPlaying(false);
        break;

      case 0:
        next();
        break;
    }
  };

  useEffect(() => {
    const player = playerRef.current;

    if (!player) return;

    try {
      player.cueVideoById(current.videoId);
      player.pauseVideo();

      setPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    } catch {}
  }, [currentIndex]);

  useEffect(() => {
    const id = setInterval(() => {
      const player = playerRef.current;

      if (!player) return;

      try {
        setCurrentTime(player.getCurrentTime());
        setDuration(player.getDuration());
      } catch {}
    }, 250);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      try {
        playerRef.current?.stopVideo();
      } catch {}

      playerRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="hidden">
        <YouTube
          videoId={current.videoId}
          onReady={onReady}
          onStateChange={onStateChange}
          opts={{
            width: "0",
            height: "0",
            playerVars: {
              autoplay: 0,
            },
          }}
        />
      </div>

      <MusicController
        title={current.title}
        track={currentIndex + 1}
        playing={playing}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onPlayPause={() => {
          playing ? pause() : play();
        }}
        onPrev={prev}
        onNext={next}
        onSeek={(e) =>
          seek(Number(e.target.value))
        }
        onVolume={(e) =>
          changeVolume(Number(e.target.value))
        }
        onMute={toggleMute}
      />
    </>
  );
}
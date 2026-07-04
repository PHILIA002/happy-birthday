"use client";

import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

import MusicController from "./MusicController";

import { MUSIC_LIST } from "@/data/music";
import { usePlayer } from "./MusicPlayerProvider";

export default function MusicPlayer() {
  const {
    playerRef,
    currentIndex,
    setCurrentIndex,
  } = usePlayer();

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  const current = MUSIC_LIST[currentIndex];

  const onReady: YouTubeProps["onReady"] = (e) => {
    playerRef.current = e.target;
    playerRef.current.setVolume(volume);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (e) => {
    if (e.data === 1) setPlaying(true);
    if (e.data === 2) setPlaying(false);

    if (e.data === 0) {
      nextTrack();
    }
  };

  useEffect(() => {
    try {
      playerRef.current?.loadVideoById(
        MUSIC_LIST[currentIndex].videoId
      );
    } catch {}
  }, [currentIndex, playerRef]);

  const togglePlay = () => {
    try {
      const player = playerRef.current;
      if (!player) return;

      player.getPlayerState() === 1
        ? player.pauseVideo()
        : player.playVideo();
    } catch {}
  };

  const nextTrack = () => {
    setCurrentIndex(
      (currentIndex + 1) % MUSIC_LIST.length
    );
  };

  const prevTrack = () => {
    setCurrentIndex(
      (currentIndex - 1 + MUSIC_LIST.length) %
        MUSIC_LIST.length
    );
  };

  const handleSeek = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const t = Number(e.target.value);

    setCurrentTime(t);

    try {
      playerRef.current?.seekTo(t, true);
    } catch {}
  };

  const handleVolume = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const v = Number(e.target.value);

    setVolume(v);

    try {
      playerRef.current?.setVolume(v);
    } catch {}
  };

  const toggleMute = () => {
    try {
      const player = playerRef.current;
      if (!player) return;

      if (volume === 0) {
        setVolume(70);
        player.setVolume(70);
      } else {
        setVolume(0);
        player.setVolume(0);
      }
    } catch {}
  };

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const player = playerRef.current;

        if (!player) return;

        setCurrentTime(player.getCurrentTime());
        setDuration(player.getDuration());
      } catch {}
    }, 500);

    return () => clearInterval(interval);
  }, [playerRef]);

  // ⭐ 가장 중요
  useEffect(() => {
    return () => {
      try {
        playerRef.current?.stopVideo();
      } catch {}

      playerRef.current = null;
    };
  }, [playerRef]);

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
        onPlayPause={togglePlay}
        onPrev={prevTrack}
        onNext={nextTrack}
        onSeek={handleSeek}
        onVolume={handleVolume}
        onMute={toggleMute}
      />
    </>
  );
}
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
    e.target.setVolume(volume);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (e) => {
    if (e.data === 1) setPlaying(true);
    if (e.data === 2) setPlaying(false);

    if (e.data === 0) {
      nextTrack();
    }
  };

  useEffect(() => {
    if (!playerRef.current) return;

    playerRef.current.loadVideoById(
      MUSIC_LIST[currentIndex].videoId
    );
  }, [currentIndex]);

  const togglePlay = () => {
    if (!playerRef.current) return;

    playerRef.current.getPlayerState() === 1
      ? playerRef.current.pauseVideo()
      : playerRef.current.playVideo();
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
    playerRef.current?.seekTo(t, true);
  };

  const handleVolume = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const v = Number(e.target.value);

    setVolume(v);
    playerRef.current?.setVolume(v);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (volume === 0) {
      setVolume(70);
      playerRef.current.setVolume(70);
    } else {
      setVolume(0);
      playerRef.current.setVolume(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!playerRef.current) return;

      setCurrentTime(
        playerRef.current.getCurrentTime()
      );

      setDuration(
        playerRef.current.getDuration()
      );
    }, 500);

    return () => clearInterval(interval);
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
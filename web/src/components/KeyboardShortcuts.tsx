"use client";

import { useEffect } from "react";
import { usePlayer } from "@/context/PlayerContext";

/**
 * Global keyboard shortcuts for the music player.
 * Mount this once inside PlayerProvider.
 *
 * Space        – play / pause
 * ArrowRight   – next track
 * ArrowLeft    – previous track
 * ArrowUp      – volume +5%
 * ArrowDown    – volume −5%
 * M            – mute / unmute
 * L            – like / unlike current song
 * S            – toggle shuffle
 * R            – cycle repeat mode
 * F            – open / close fullscreen player
 */
export function KeyboardShortcuts() {
  const {
    togglePlay,
    next,
    prev,
    volume,
    setVolume,
    toggleMuted,
    currentSong,
    toggleLike,
    toggleShuffle,
    toggleRepeat,
    isFullscreenOpen,
    openFullscreen,
    closeFullscreen,
  } = usePlayer();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Skip if focus is inside an input, textarea, or contenteditable
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          if (!e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            next();
          }
          break;
        case "ArrowLeft":
          if (!e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            prev();
          }
          break;
        case "ArrowUp":
          if (!e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            setVolume(Math.min(1, volume + 0.05));
          }
          break;
        case "ArrowDown":
          if (!e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            setVolume(Math.max(0, volume - 0.05));
          }
          break;
        case "m":
        case "M":
          toggleMuted();
          break;
        case "l":
        case "L":
          if (currentSong) toggleLike(currentSong.id);
          break;
        case "s":
        case "S":
          toggleShuffle();
          break;
        case "r":
        case "R":
          toggleRepeat();
          break;
        case "f":
        case "F":
          if (isFullscreenOpen) closeFullscreen();
          else openFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    togglePlay, next, prev, volume, setVolume, toggleMuted,
    currentSong, toggleLike, toggleShuffle, toggleRepeat,
    isFullscreenOpen, openFullscreen, closeFullscreen,
  ]);

  return null;
}

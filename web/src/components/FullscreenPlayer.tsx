"use client";

import { useEffect } from "react";
import { usePlayer } from "@/context/PlayerContext";

const REPEAT_ALL_PATH = (
  <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75z" />
);

const REPEAT_ONE_PATH = (
  <>
    <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75zM12.25 2.5a2.25 2.25 0 0 1 2.25 2.25v5A2.25 2.25 0 0 1 12.25 12H9.81l1.018-1.018a.75.75 0 0 0-1.06-1.06L6.939 12.75l2.829 2.828a.75.75 0 1 0 1.06-1.06L9.811 13.5h2.439A3.75 3.75 0 0 0 16 9.75v-5A3.75 3.75 0 0 0 12.25 1h-.75v1.5z" />
    <path d="m8 1.85.77.694H6.095V1.488q1.046-.077 1.507-.385.474-.308.583-.913h1.32V8H8z" />
    <path d="M8.77 2.544 8 1.85v.693z" />
  </>
);

export function FullscreenPlayer() {
  const {
    isFullscreenOpen,
    closeFullscreen,
    currentSong,
    isPlaying,
    togglePlay,
    next,
    prev,
    toggleRepeat,
    toggleShuffle,
    repeatMode,
    shuffle,
    volume,
    isMuted,
    setVolume,
    toggleMuted,
    formattedCurrentTime,
    formattedDuration,
    progressPercent,
    seek,
  } = usePlayer();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreenOpen) closeFullscreen();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isFullscreenOpen, closeFullscreen]);

  if (!isFullscreenOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-black overflow-hidden transition-opacity duration-350 ease-out opacity-100"
      style={{ transitionDuration: "350ms" }}
    >
      
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 transition-[background-image] duration-[0.6s] ease-[ease]"
        style={{
          filter: "blur(60px) brightness(0.35) saturate(1.4)",
          backgroundImage: currentSong?.cover ? `url('${currentSong.cover}')` : undefined,
        }}
      />
      
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
        }}
      />

      
      <div className="relative z-10 flex justify-end p-5 pt-6">
        <button
          type="button"
          onClick={closeFullscreen}
          title="Thu nhỏ"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 btn-tactile flex items-center justify-center"
        >
          <svg viewBox="0 0 16 16" width={18} height={18} fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.125 1.25H1.75V2.75H4.375V5.17857H5.875V2C5.875 1.58579 5.53921 1.25 5.125 1.25ZM10.125 1.25H13.5V2.75H10.875V5.17857H9.375V2C9.375 1.58579 9.71079 1.25 10.125 1.25ZM4.375 13.25H1.75V11.75H4.375V14.1786C4.375 14.5928 4.03921 14.9286 3.625 14.9286H1.75V13.25H3C3.13807 13.25 3.25 13.1381 3.25 13V11.8214H4.375V13.25ZM10.875 13.25H13.5V11.75H10.875V14.1786C10.875 14.5928 11.2108 14.9286 11.625 14.9286H13.5V13.25H12.25C12.1119 13.25 12 13.1381 12 13V11.8214H10.875V13.25Z"
            />
          </svg>
        </button>
      </div>

      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 px-6">
        <img
          src={currentSong?.cover ?? ""}
          alt="Cover"
          className="w-[320px] max-w-[55vw] h-[320px] max-h-[55vw] rounded-xl object-cover shadow-2xl"
        />
        <div className="text-center">
          <div className="text-white text-2xl font-bold mb-1.5">
            {currentSong?.title ?? "—"}
          </div>
          <div className="text-white/65 text-base font-normal">
            {currentSong?.artist ?? "—"}
          </div>
        </div>
      </div>

      
      <div className="relative z-10 px-[10%] pb-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-white/60 text-xs min-w-9 text-right select-none">
            {formattedCurrentTime}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={progressPercent}
            onChange={(e) => seek(Number(e.target.value))}
            className="progress-range flex-1 cursor-pointer"
            style={{ ["--progress" as string]: `${progressPercent}%` }}
          />
          <span className="text-white/60 text-xs min-w-9 select-none">
            {formattedDuration}
          </span>
        </div>

        <div className="flex items-center justify-center gap-7">
          <button
            type="button"
            onClick={toggleShuffle}
            title="Shuffle"
            className="p-1.5 rounded-full btn-tactile"
          >
            <svg
              viewBox="0 0 16 16"
              width={20}
              height={20}
              className={`transition-colors ${shuffle ? "text-[var(--accent)]" : "text-[#ccc]"}`}
              fill="currentColor"
            >
              <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75z" />
              <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={prev}
            className="p-1.5 rounded-full text-[#ccc] hover:text-white btn-tactile"
          >
            <svg viewBox="0 0 16 16" width={22} height={22} fill="currentColor">
              <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white hover:bg-[#e5e5e5] btn-tactile flex items-center justify-center"
          >
            {isPlaying ? (
              <svg viewBox="0 0 16 16" width={26} height={26} fill="black" className="translate-x-px">
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width={26} height={26} fill="black" className="translate-x-px">
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={next}
            className="p-1.5 rounded-full text-[#ccc] hover:text-white btn-tactile"
          >
            <svg viewBox="0 0 16 16" width={22} height={22} fill="currentColor">
              <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={toggleRepeat}
            title="Repeat"
            className="p-1.5 rounded-full btn-tactile"
          >
            <svg
              viewBox="0 0 16 16"
              width={20}
              height={20}
              className={`transition-colors ${repeatMode !== "off" ? "text-[var(--accent)]" : "text-[#ccc]"}`}
              fill="currentColor"
            >
              {repeatMode === "one" ? REPEAT_ONE_PATH : REPEAT_ALL_PATH}
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2.5 mt-1">
          <button
            type="button"
            onClick={toggleMuted}
            className="p-1 btn-tactile text-[#ccc] hover:text-white"
          >
            <svg viewBox="0 0 16 16" width={18} height={18} fill="currentColor">
              <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88" />
              <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127z" />
            </svg>
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={isMuted ? 0 : volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="volume-slider w-[120px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

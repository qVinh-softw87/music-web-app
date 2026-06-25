"use client";

import { useEffect, useRef } from "react";
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

export function FullscreenLyrics() {
  const {
    isLyricsOpen,
    closeLyrics,
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
    currentTime,
    seek,
  } = usePlayer();

  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLyricsOpen) closeLyrics();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isLyricsOpen, closeLyrics]);

  const activeLineIndex = currentSong?.lyrics
    ? currentSong.lyrics.findIndex(
        (l, i, arr) => currentTime >= l.time && (i === arr.length - 1 || currentTime < arr[i + 1].time)
      )
    : -1;

  useEffect(() => {
    if (isLyricsOpen && activeLineIndex !== -1 && lyricsContainerRef.current) {
      const activeEl = lyricsContainerRef.current.children[activeLineIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeLineIndex, isLyricsOpen]);

  if (!isLyricsOpen) return null;

  const hasLyrics = currentSong?.lyrics && currentSong.lyrics.length > 0;

  return (
    <div
      className="fixed inset-0 md:inset-0 top-auto md:top-0 h-[92vh] md:h-auto md:bottom-0 z-[9999] flex flex-col overflow-hidden transition-all duration-350 ease-out opacity-100 rounded-t-3xl md:rounded-none"
      style={{
        transitionDuration: "350ms",
        backgroundColor: currentSong?.cover ? "transparent" : "#603A40",
      }}
    >
      {currentSong?.cover && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              filter: "blur(40px) brightness(0.6) saturate(1.2)",
              backgroundImage: `url('${currentSong.cover}')`,
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      {/* Drag handle for mobile */}
      <div className="md:hidden w-full flex justify-center pt-3 pb-1 shrink-0 absolute top-0 z-20" onClick={closeLyrics}>
        <div className="w-12 h-1.5 bg-white/20 rounded-full" />
      </div>

      <div className="relative z-10 flex items-center justify-end p-5 pt-8 md:pt-6">
        <button
          type="button"
          onClick={closeLyrics}
          title="Thu nhỏ"
          className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 btn-tactile flex items-center justify-center transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 overflow-hidden">
        {hasLyrics ? (
          <div
            ref={lyricsContainerRef}
            className="w-full max-w-3xl h-full overflow-y-auto custom-scrollbar flex flex-col gap-8 py-[30vh] text-center"
          >
            {currentSong.lyrics!.map((line, idx) => {
              const isActive = idx === activeLineIndex;
              const isPassed = idx < activeLineIndex;
              return (
                <p
                  key={idx}
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-300 cursor-pointer hover:text-white ${
                    isActive
                      ? "text-white scale-105 drop-shadow-xl"
                      : isPassed
                      ? "text-white/50"
                      : "text-white/20"
                  }`}
                  onClick={() => seek((line.time / (currentSong.duration || 1)) * 100)}
                >
                  {line.text}
                </p>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <svg viewBox="0 0 24 24" className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-2xl font-bold text-white/50">Không có lời bài hát</p>
          </div>
        )}
      </div>

      <div className="relative z-10 px-[10%] pb-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-white/60 text-xs min-w-9 text-right select-none">{formattedCurrentTime}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progressPercent}
            onChange={(e) => seek(Number(e.target.value))}
            className="progress-range flex-1 cursor-pointer"
            style={{ ["--progress" as string]: `${progressPercent}%` }}
          />
          <span className="text-white/60 text-xs min-w-9 select-none">{formattedDuration}</span>
        </div>

        <div className="flex items-center justify-center gap-7">
          <button type="button" onClick={toggleShuffle} className="p-1.5 rounded-full btn-tactile">
            <svg viewBox="0 0 16 16" width={20} height={20} className={`transition-colors ${shuffle ? "text-[var(--accent)]" : "text-white/60"}`} fill="currentColor">
              <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75z" />
              <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z" />
            </svg>
          </button>
          <button type="button" onClick={prev} className="p-1.5 rounded-full text-white/80 hover:text-white btn-tactile">
            <svg viewBox="0 0 16 16" width={22} height={22} fill="currentColor"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z" /></svg>
          </button>
          <button type="button" onClick={togglePlay} className="w-16 h-16 rounded-full bg-white hover:bg-[#e5e5e5] btn-tactile flex items-center justify-center">
            {isPlaying ? (
              <svg viewBox="0 0 16 16" width={26} height={26} fill="black" className="translate-x-px"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" width={26} height={26} fill="black" className="translate-x-px"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" /></svg>
            )}
          </button>
          <button type="button" onClick={next} className="p-1.5 rounded-full text-white/80 hover:text-white btn-tactile">
            <svg viewBox="0 0 16 16" width={22} height={22} fill="currentColor"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" /></svg>
          </button>
          <button type="button" onClick={toggleRepeat} className="p-1.5 rounded-full btn-tactile">
            <svg viewBox="0 0 16 16" width={20} height={20} className={`transition-colors ${repeatMode !== "off" ? "text-[var(--accent)]" : "text-white/60"}`} fill="currentColor">
              {repeatMode === "one" ? REPEAT_ONE_PATH : REPEAT_ALL_PATH}
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

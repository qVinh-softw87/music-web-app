"use client";

import { usePlayer } from "@/context/PlayerContext";
import { Tooltip } from "@/components/Tooltip";
import { VolumeControl } from "@/components/VolumeControl";

const IconShuffle = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 16 16" className={`w-4 h-4 transition-colors ${active ? "text-[var(--accent)]" : "text-[#ccc]"}`} fill="currentColor">
    <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75z" />
    <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z" />
  </svg>
);

const IconPrev = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
    <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z" />
  </svg>
);

const IconNext = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
    <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
  </svg>
);

const IconPlay = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="black">
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
  </svg>
);

const IconPause = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="black">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
  </svg>
);

const IconRepeatAll = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
    <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75z" />
  </svg>
);

const IconRepeatOne = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
    <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75zM12.25 2.5a2.25 2.25 0 0 1 2.25 2.25v5A2.25 2.25 0 0 1 12.25 12H9.81l1.018-1.018a.75.75 0 0 0-1.06-1.06L6.939 12.75l2.829 2.828a.75.75 0 1 0 1.06-1.06L9.811 13.5h2.439A3.75 3.75 0 0 0 16 9.75v-5A3.75 3.75 0 0 0 12.25 1h-.75v1.5z" />
    <path d="m8 1.85.77.694H6.095V1.488q1.046-.077 1.507-.385.474-.308.583-.913h1.32V8H8z" />
  </svg>
);

const IconHeart = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill={filled ? "var(--accent)" : "none"} stroke={filled ? "var(--accent)" : "currentColor"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconQueue = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 16 16" className={`w-4 h-4 transition-colors ${active ? "text-[var(--accent)]" : "text-[#ccc]"}`} fill="currentColor">
    <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5z" />
  </svg>
);

export const IconVolume = ({ volume, muted }: { volume: number; muted: boolean }) => {
  const isOff = muted || volume === 0;
  const isLow = !isOff && volume <= 0.5;

  if (isOff) {
    return (
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
        <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.27 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 1 0 1.06-1.06L13.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z" />
        <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8z" />
      </svg>
    );
  }

  if (isLow) {
    return (
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
        <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88" />
      <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127z" />
    </svg>
  );
};

const IconFullscreen = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M0.25 3C0.25 2.0335 1.0335 1.25 2 1.25H5.375V2.75H2C1.86193 2.75 1.75 2.86193 1.75 3V5.42857H0.25V3ZM14 2.75H10.625V1.25H14C14.9665 1.25 15.75 2.0335 15.75 3V5.42857H14.25V3C14.25 2.86193 14.1381 2.75 14 2.75ZM1.75 10.5714V13C1.75 13.1381 1.86193 13.25 2 13.25H5.375V14.75H2C1.0335 14.75 0.25 13.9665 0.25 13V10.5714H1.75ZM14.25 13V10.5714H15.75V13C15.75 13.9665 14.9665 14.75 14 14.75H10.625V13.25H14C14.1381 13.25 14.25 13.1381 14.25 13Z" />
  </svg>
);

const IconMic = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-colors ${active ? "text-[var(--accent)]" : "text-[#ccc]"}`} fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v4m-3 0h6" />
  </svg>
);

export function PlayerBar() {
  const {
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
    openFullscreen,
    queueMode,
    toggleQueuePin,
    handleQueueHover,
    toggleLike,
    isLiked,
    isLyricsOpen,
    openLyrics,
  } = usePlayer();

  const liked = currentSong ? isLiked(currentSong.id) : false;

  return (
    <footer className="fixed bottom-[64px] left-2 right-2 h-[56px] bg-[#222] md:bg-black rounded-lg md:rounded-none md:border-t md:border-white/5 flex items-center shrink-0 px-3 md:px-4 z-50 md:relative md:bottom-auto md:left-auto md:right-auto md:h-[72px] md:w-full md:mx-0 shadow-2xl md:shadow-none">

      
      <div className="md:hidden absolute bottom-0 left-2 right-2 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-white" style={{ width: `${progressPercent}%` }} />
      </div>

      
      <div 
        className="flex items-center gap-3 flex-1 md:flex-[3_1_0%] min-w-0 cursor-pointer md:cursor-default h-full"
        onClick={() => {
          if (window.innerWidth < 768) openFullscreen();
        }}
      >
        
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden bg-[var(--bg-highlight)] shrink-0 shadow-lg">
          {currentSong?.cover && (
            <img src={currentSong.cover} alt="Cover" className="w-full h-full object-cover" />
          )}
        </div>

        
        <div className="flex flex-col min-w-0">
          <span className="text-white text-sm font-medium truncate hover:underline cursor-pointer">
            {currentSong?.title ?? "—"}
          </span>
          <span className="text-[var(--text-secondary)] text-xs truncate hover:text-white cursor-pointer transition">
            {currentSong?.artist ?? "—"}
          </span>
        </div>

        
        <div className="hidden md:block">
          {currentSong && (
            <Tooltip content={liked ? "Bỏ thích" : "Thêm vào yêu thích"}>
              <button
                onClick={(e) => { e.stopPropagation(); toggleLike(currentSong.id); }}
                className={`shrink-0 btn-tactile ${
                  liked ? "text-[var(--accent)]" : "text-[#ccc] hover:text-white"
                }`}
              >
                <IconHeart filled={liked} />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      
      <div className="flex md:hidden items-center gap-4 shrink-0 pr-1">
        {currentSong && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleLike(currentSong.id); }}
            className={`shrink-0 transition ${
              liked ? "text-[var(--accent)]" : "text-[#ccc]"
            }`}
          >
            <IconHeart filled={liked} />
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="text-white flex items-center justify-center transition"
        >
          {isPlaying ? (
             <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
               <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
             </svg>
          ) : (
             <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
               <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
             </svg>
          )}
        </button>
      </div>

      
      <div className="hidden md:flex flex-col items-center justify-center flex-[4_1_0%] min-w-0 px-4 gap-1">
        
        <div className="flex items-center gap-4">
          <Tooltip content={shuffle ? "Tắt ngẫu nhiên" : "Bật ngẫu nhiên"}>
            <button
              onClick={toggleShuffle}
              className="relative btn-tactile"
            >
              <IconShuffle active={shuffle} />
              {shuffle && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          </Tooltip>

          <Tooltip content="Quay lại">
            <button
              onClick={prev}
              className="text-[#ccc] hover:text-white btn-tactile"
            >
              <IconPrev />
            </button>
          </Tooltip>

          <Tooltip content={isPlaying ? "Tạm dừng" : "Phát"}>
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white hover:bg-[#e5e5e5] btn-tactile flex items-center justify-center shadow-md text-black"
            >
              {isPlaying ? <IconPause /> : <IconPlay />}
            </button>
          </Tooltip>

          <Tooltip content="Tiếp theo">
            <button
              onClick={next}
              className="text-[#ccc] hover:text-white btn-tactile"
            >
              <IconNext />
            </button>
          </Tooltip>

          <Tooltip
            content={
              repeatMode === "off" ? "Bật lặp tất cả"
              : repeatMode === "all" ? "Lặp một bài"
              : "Tắt lặp"
            }
          >
            <button
              onClick={toggleRepeat}
              className="relative btn-tactile"
            >
              <span className={`block transition-colors ${repeatMode !== "off" ? "text-[var(--accent)]" : "text-[#ccc]"}`}>
                {repeatMode === "one" ? <IconRepeatOne /> : <IconRepeatAll />}
              </span>
              {repeatMode !== "off" && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          </Tooltip>
        </div>

        
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-[var(--text-secondary)] w-9 text-right tabular-nums select-none">
            {formattedCurrentTime}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={progressPercent}
            onChange={(e) => seek(Number(e.target.value))}
            className="progress-range flex-1"
            style={{ ["--progress" as string]: `${progressPercent}%` }}
            aria-label="Vị trí phát"
          />
          <span className="text-xs text-[var(--text-secondary)] w-9 tabular-nums select-none">
            {formattedDuration}
          </span>
        </div>
      </div>

      
      <div className="hidden md:flex items-center justify-end flex-[3_1_0%] gap-3 min-w-0">
        
        <Tooltip content="Lời bài hát">
          <button
            onClick={isLyricsOpen ? () => {} : openLyrics}
            className="btn-tactile"
          >
            <IconMic active={isLyricsOpen} />
          </button>
        </Tooltip>

        <Tooltip content="Hàng đợi phát">
          <button
            onClick={toggleQueuePin}
            onMouseEnter={() => handleQueueHover(true)}
            onMouseLeave={() => handleQueueHover(false)}
            className="btn-tactile relative"
          >
            <IconQueue active={queueMode !== "closed"} />
            {queueMode === "pinned" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)]" />
            )}
          </button>
        </Tooltip>

        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          setVolume={setVolume}
          toggleMuted={toggleMuted}
        />

        
        <Tooltip content="Mở rộng player">
          <button
            onClick={openFullscreen}
            className="text-[#ccc] hover:text-white btn-tactile"
          >
            <IconFullscreen />
          </button>
        </Tooltip>
      </div>
    </footer>
  );
}

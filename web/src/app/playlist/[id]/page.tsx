"use client";

import { usePlayer } from "@/context/PlayerContext";
import type { Track } from "@/types/player";
import { formatTime } from "@/utils/formatTime";
import { TrackContextMenu } from "@/components/TrackContextMenu";
import { LazyImage } from "@/components/LazyImage";
import { useZingPlaylist } from "@/hooks/useZing";

function TrackRow({
  track,
  index,
  songs,
}: {
  track: Track;
  index: number;
  songs: Track[];
}) {
  const { loadSong, currentSong, isPlaying, togglePlay, toggleLike, isLiked, addToQueue, customPlaylists, addTrackToPlaylist } = usePlayer();
  const isCurrent = currentSong?.id === track.id;
  const liked     = isLiked(track.id);

  return (
    <TrackContextMenu track={track}>
      <div
        className={`track-row group grid items-center gap-3 px-4 py-2.5 cursor-pointer rounded-lg hover:bg-white/5 transition-colors ${isCurrent ? "active-track" : ""}`}
        style={{ gridTemplateColumns: "2rem 1fr 4rem 3rem" }}
        onClick={() => isCurrent ? togglePlay() : loadSong(index, songs)}
      >
      
      <div className="flex items-center justify-center">
        {isCurrent && isPlaying ? (
          <span className="flex items-end gap-[2px]">
            <span className="w-[2px] h-2 bg-[var(--accent)] rounded eq-bar-1" />
            <span className="w-[2px] h-3.5 bg-[var(--accent)] rounded eq-bar-2" />
            <span className="w-[2px] h-1.5 bg-[var(--accent)] rounded eq-bar-3" />
          </span>
        ) : (
          <>
            <span className={`text-sm tabular-nums block group-hover:hidden ${isCurrent ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}>
              {index + 1}
            </span>
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white hidden group-hover:block" fill="currentColor">
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
            </svg>
          </>
        )}
      </div>

      <div className="min-w-0 flex flex-col">
        <p className={`text-sm font-medium truncate ${isCurrent ? "text-[var(--accent)]" : "text-white"}`}>
          {track.title}
        </p>
        <p className="text-xs text-[var(--text-secondary)] truncate">{track.artist}</p>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
          className={`w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition ${liked ? "text-[var(--accent)] !opacity-100" : "text-[var(--text-secondary)] hover:text-white"}`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); addToQueue(track); }}
          className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5z" />
          </svg>
        </button>
      </div>

      <span className="text-xs text-[var(--text-secondary)] text-right tabular-nums">
        {track.duration ? formatTime(track.duration) : "—"}
      </span>
    </div>
    </TrackContextMenu>
  );
}

export default function AlbumPage({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useZingPlaylist(params.id);
  const { loadSong, currentSong, isPlaying, togglePlay } = usePlayer();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !data?.data) {
    return <div className="p-8 text-center text-red-500">Lỗi khi tải dữ liệu Album từ Zing MP3</div>;
  }

  const albumData = data.data;
  
  // Transform Zing songs to Track type
  const songs: Track[] = (albumData.song?.items || []).map((track: any) => ({
    id: track.encodeId,
    title: track.title,
    artist: track.artistsNames,
    cover: track.thumbnailM,
    duration: track.duration,
  }));

  const totalDuration = songs.reduce((s, t) => s + (t.duration ?? 0), 0);
  const totalMin = Math.floor(totalDuration / 60);

  // Check if current playing song is in this album
  const isPlayingThis = isPlaying && songs.some((s) => s.id === currentSong?.id);

  const handleMainPlay = () => {
    if (songs.length === 0) return;
    if (isPlayingThis) {
      togglePlay();
    } else {
      loadSong(0, songs, albumData.title);
    }
  };

  return (
    <div className="main-scroll custom-scrollbar h-full bg-gradient-to-b from-[#2a2a2a] to-[#121212]">
      <div className="page-enter">
        <div className="px-6 pt-8 pb-6 flex flex-col md:flex-row items-end gap-6 relative z-10">
          <div className="w-[232px] h-[232px] shrink-0 shadow-2xl rounded-sm overflow-hidden">
            <LazyImage src={albumData.thumbnailM} alt={albumData.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col gap-3 min-w-0 flex-1">
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Playlist
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-tight truncate">
              {albumData.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-[var(--text-secondary)] font-medium">
              {albumData.artistsNames && (
                <>
                  <span className="text-white hover:underline cursor-pointer">{albumData.artistsNames}</span>
                  <span>•</span>
                </>
              )}
              <span>{albumData.releaseDate || "Cập nhật mới nhất"}</span>
              <span>•</span>
              <span>{songs.length} bài hát</span>
              {totalMin > 0 && (
                <>
                  <span>•</span>
                  <span>{totalMin} phút</span>
                </>
              )}
            </div>
            {albumData.sortDescription && (
               <p className="text-sm text-white/70 line-clamp-2 mt-1">{albumData.sortDescription}</p>
            )}
          </div>
        </div>

        <div className="px-6 py-4 flex items-center gap-6 relative z-10">
          <button
            className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center text-black hover:scale-105 hover:bg-[#1ed760] transition-all shadow-xl"
            onClick={handleMainPlay}
          >
            {isPlayingThis ? (
              <svg viewBox="0 0 16 16" className="w-6 h-6" fill="black">
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" className="w-6 h-6 ml-1" fill="black">
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
              </svg>
            )}
          </button>
        </div>

        <div className="px-6 pb-20 relative z-10">
          <div className="grid items-center gap-3 px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider border-b border-white/10 mb-4" style={{ gridTemplateColumns: "2rem 1fr 4rem 3rem" }}>
            <div className="text-center">#</div>
            <div>Tiêu đề</div>
            <div className="opacity-0">L</div>
            <div className="text-right flex justify-end">
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {songs.map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} songs={songs} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

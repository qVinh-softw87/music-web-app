"use client";

import { notFound } from "next/navigation";
import { tracks as allTracks, albums } from "@/data/tracks";
import { usePlayer } from "@/context/PlayerContext";
import type { Track } from "@/types/player";
import { formatTime } from "@/utils/formatTime";

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
    <div
      className={`track-row group grid items-center gap-3 px-4 py-2.5 cursor-pointer ${isCurrent ? "active-track" : ""}`}
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
        
        
        <div className="relative w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition" onClick={e => e.stopPropagation()}>
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          <select 
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              if (e.target.value) {
                addTrackToPlaylist(Number(e.target.value), track.id);
                e.target.value = "";
              }
            }}
          >
            <option value="">Thêm vào playlist...</option>
            {customPlaylists.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>

      
      <span className="text-xs text-[var(--text-secondary)] text-right tabular-nums">
        {track.duration ? formatTime(track.duration) : "—"}
      </span>
    </div>
  );
}

export default function AlbumPage({ params }: { params: { id: string } }) {
  const album = albums.find((a) => a.id === Number(params.id));
  if (!album) return notFound();

  const songs = allTracks.filter((t) => t.albumId === album.id);

  const totalDuration = songs.reduce((s, t) => s + (t.duration ?? 0), 0);
  const totalMin = Math.floor(totalDuration / 60);

  const { loadSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const isThisPlaying = songs.some((s) => s.id === currentSong?.id) && isPlaying;

  const coverUrl = album.coverUrl ?? songs[0]?.cover ?? "/image/items1.jpg";

  return (
    <div className="main-scroll custom-scrollbar h-full">
      <div className="page-enter">
        
        <div className="relative">
          
          <div
            className="absolute inset-0 h-72"
            style={{
              background: `linear-gradient(to bottom, rgba(80,80,80,0.8) 0%, #121212 100%)`,
            }}
          />
          <div className="relative flex items-end gap-6 px-6 pt-8 pb-6">
            
            <div className="w-48 h-48 rounded-xl overflow-hidden shadow-2xl shrink-0">
              <img src={coverUrl} alt={album.title} className="w-full h-full object-cover" />
            </div>

            
            <div className="flex flex-col gap-2 pb-2">
              <span className="text-xs text-white/60 uppercase font-semibold tracking-widest">{album.type}</span>
              <h1 className="text-4xl font-extrabold text-white leading-none">{album.title}</h1>
              <div className="flex items-center gap-2 text-sm text-white/70 mt-1 flex-wrap">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-white/20">
                    
                    <img src={coverUrl} alt={album.artistName} className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-white">{album.artistName}</span>
                <span>·</span>
                <span>{album.releaseYear}</span>
                <span>·</span>
                <span>{songs.length} bài</span>
                <span>·</span>
                <span>khoảng {totalMin} phút</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="flex items-center gap-4 px-6 py-4">
          <button
            onClick={() => {
              if (isThisPlaying) togglePlay();
              else if (songs.length) loadSong(0, songs, album.title);
            }}
            className="w-14 h-14 rounded-full bg-[var(--accent)] hover:bg-[#1ed760] hover:scale-105 transition-all flex items-center justify-center shadow-xl"
          >
            {isThisPlaying ? (
              <svg viewBox="0 0 16 16" className="w-6 h-6" fill="black">
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" className="w-6 h-6 ml-1" fill="black">
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
              </svg>
            )}
          </button>

          
          <button className="text-[var(--text-secondary)] hover:text-white hover:scale-105 transition">
             <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        
        <div
          className="grid items-center gap-3 px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide border-b border-white/5 mx-4"
          style={{ gridTemplateColumns: "2rem 1fr 4rem 3rem" }}
        >
          <span className="text-center">#</span>
          <span>Tiêu đề</span>
          <span />
          <svg viewBox="0 0 16 16" className="w-4 h-4 ml-auto" fill="currentColor">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
            <path d="M8 3.25a.75.75 0 0 1 .75.75v4.47l2.28 1.28a.75.75 0 0 1-.75 1.3l-2.5-1.4A.75.75 0 0 1 7.25 9V4A.75.75 0 0 1 8 3.25z"/>
          </svg>
        </div>

        
        <div className="flex flex-col gap-0 px-0 pb-16 pt-1">
          {songs.map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} songs={songs} />
          ))}
        </div>
      </div>
    </div>
  );
}

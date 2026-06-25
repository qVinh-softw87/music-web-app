"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useZingSearch } from "@/hooks/useZing";
import { usePlayer } from "@/context/PlayerContext";
import type { Track } from "@/types/player";
import { TrackListSkeleton, CardGridSkeleton } from "@/components/Skeleton";
import { LazyImage } from "@/components/LazyImage";
import { TrackContextMenu } from "@/components/TrackContextMenu";
import { useDebounce } from "@/hooks/useDebounce";

const genres = [
  { name: "Sơn Tùng M-TP", color: "#e13300", img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/5/9/6/9/59696c9dba7a914d587d886049c10df6.jpg" },
  { name: "Vstra", color: "#608108", img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/7/b/b/d/7bbde931c3bf79bb3ce35d460a804a99.jpg" },
  { name: "Hoà Minzy", color: "#1e3264", img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/9/f/d/1/9fd1172f3e8f8ce910e5bd7c653630f9.jpg" },
  { name: "HIEUTHUHAI", color: "#503750", img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/c/7/3/1/c7310328dcf48834ecabdddcbb0674cb.jpg" },
  { name: "Rap Việt", color: "#d84000", img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/6/e/c/2/6ec2cd029ccbc24edda8e11a6f8ec24b.jpg" },
  { name: "US-UK", color: "#148a08", img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/5/2/2/b/522ba54854f98108cdb669ef07ff833b.jpg" },
  { name: "K-Pop", color: "#0d73ec", img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/f/3/f/9/f3f9828eebad0cf2e259e8f4c9c1b694.jpg" },
];

function TrackResult({ track, index, allResults }: { track: Track; index: number; allResults: Track[] }) {
  const { loadSong, currentSong, isPlaying, togglePlay, addToQueue, toggleLike, isLiked, customPlaylists, addTrackToPlaylist } = usePlayer();
  const isCurrent = currentSong?.id === track.id;
  const liked = isLiked(track.id);

  return (
    <TrackContextMenu track={track}>
      <div
        className="track-row group flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-white/5 transition-colors"
        onClick={() => isCurrent ? togglePlay() : loadSong(index, allResults)}
      >
        <div className="w-10 h-10 rounded-md overflow-hidden bg-[var(--bg-highlight)] shrink-0 relative">
          <LazyImage src={track.cover} alt="" className="w-full h-full object-cover" />
          {isCurrent && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            {isPlaying ? (
              <span className="flex items-end gap-[2px]">
                <span className="w-[2px] h-2 bg-[var(--accent)] rounded eq-bar-1" />
                <span className="w-[2px] h-3.5 bg-[var(--accent)] rounded eq-bar-2" />
                <span className="w-[2px] h-1.5 bg-[var(--accent)] rounded eq-bar-3" />
              </span>
            ) : (
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="white">
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
              </svg>
            )}
          </div>
        )}
        </div>

        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${isCurrent ? "text-[var(--accent)]" : "text-white"}`}>
            {track.title}
          </p>
          <p className="text-xs text-[var(--text-secondary)] truncate">{track.artist}</p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
            className={`w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition ${liked ? "text-[var(--accent)]" : "text-[var(--text-secondary)] hover:text-white"}`}
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
      </div>
    </TrackContextMenu>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  
  const { data, isLoading } = useZingSearch(debouncedQuery);

  const hasResults = !!data?.data && (data.data.songs?.length > 0 || data.data.artists?.length > 0 || data.data.playlists?.length > 0);

  return (
    <div className="main-scroll custom-scrollbar h-full">
      <div className="page-enter">
        <div className="header-sticky px-6 py-5">
          <h1 className="text-2xl font-extrabold text-white mb-4">Tìm kiếm</h1>
          <div className="flex items-center gap-3 bg-white/10 hover:bg-white/15 focus-within:bg-white/15 rounded-full px-4 py-3 transition max-w-lg">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Bài hát, nghệ sĩ, album..."
              className="flex-1 bg-transparent outline-none text-white placeholder-white/40 text-sm"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-white/50 hover:text-white transition">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="px-6 pb-16 space-y-8">
            <section>
              <div className="h-5 w-20 bg-white/8 rounded-md animate-pulse mb-3" />
              <TrackListSkeleton count={5} />
            </section>
            <section>
              <div className="h-5 w-24 bg-white/8 rounded-md animate-pulse mb-4" />
              <CardGridSkeleton count={4} />
            </section>
          </div>
        ) : hasResults ? (
          <div className="px-6 pb-16 space-y-8">
            {data.data.songs && data.data.songs.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-white mb-3">Bài hát</h2>
                <div className="flex flex-col gap-0.5">
                  {data.data.songs.map((song: any, i: number) => {
                    const track: Track = {
                      id: song.encodeId,
                      title: song.title,
                      artist: song.artistsNames,
                      cover: song.thumbnailM,
                    };
                    return <TrackResult key={track.id} track={track} index={i} allResults={data.data.songs.map((s:any)=>({id:s.encodeId,title:s.title,artist:s.artistsNames,cover:s.thumbnailM}))} />
                  })}
                </div>
              </section>
            )}

            {data.data.artists && data.data.artists.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-white mb-3">Nghệ sĩ</h2>
                <div className="flex gap-4 flex-wrap">
                  {data.data.artists.map((artist: any) => (
                    <Link
                      key={artist.id}
                      href={`/artist/${artist.id}`}
                      className="flex flex-col items-center gap-2 group w-[130px]"
                    >
                      <div className="w-28 h-28 rounded-full overflow-hidden bg-[var(--bg-highlight)] shadow-lg group-hover:scale-105 transition-transform">
                        <img src={artist.thumbnailM || artist.thumbnail} alt={artist.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-semibold text-white text-center">{artist.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">Nghệ sĩ</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {data.data.playlists && data.data.playlists.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-white mb-3">Album / Playlist</h2>
                <div className="flex gap-4 flex-wrap">
                  {data.data.playlists.map((album: any) => (
                    <Link
                      key={album.encodeId}
                      href={`/album/${album.encodeId}`}
                      className="flex flex-col gap-2 group w-[160px]"
                    >
                      <div className="relative w-[160px] h-[160px] rounded-xl overflow-hidden bg-[var(--bg-card)] shadow-lg group-hover:scale-105 transition-transform">
                        <img src={album.thumbnailM} alt={album.title} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-semibold text-white truncate">{album.title}</p>
                      <p className="text-xs text-[var(--text-secondary)] truncate">{album.artistsNames}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : debouncedQuery ? (
           <div className="flex flex-col items-center justify-center py-20 text-center">
             <p className="text-white font-semibold text-lg">Không tìm thấy kết quả cho "{debouncedQuery}"</p>
             <p className="text-[var(--text-secondary)] text-sm mt-2">Hãy thử từ khóa khác</p>
           </div>
        ) : (
          <div className="px-6 pb-16">
            <h2 className="text-lg font-bold text-white mb-4">Có thể bạn muốn nghe</h2>
            <div className="grid grid-cols-4 gap-3">
              {genres.map((g) => (
                <button
                  key={g.name}
                  onClick={() => setQuery(g.name)}
                  className="genre-card relative h-28 flex items-end p-3 font-bold text-white text-sm shadow-lg text-left overflow-hidden rounded-xl"
                  style={{ backgroundColor: g.color }}
                >
                  <img
                    src={g.img}
                    alt={g.name}
                    className="absolute top-0 right-0 w-16 h-16 object-cover rounded-bl-2xl rotate-[25deg] translate-x-2 -translate-y-1 shadow-xl"
                  />
                  <span className="relative z-10">{g.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

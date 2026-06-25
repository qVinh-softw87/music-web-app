"use client";

import { notFound } from "next/navigation";
import { artists, tracks as allTracks, albums } from "@/data/tracks";
import { usePlayer } from "@/context/PlayerContext";
import { formatPlayCount } from "@/utils/formatTime";
import type { Track } from "@/types/player";
import { formatTime } from "@/utils/formatTime";
import Link from "next/link";

function TrackRow({ track, index, songs }: { track: Track; index: number; songs: Track[] }) {
  const { loadSong, currentSong, isPlaying, togglePlay, toggleLike, isLiked } = usePlayer();
  const isCurrent = currentSong?.id === track.id;
  const liked = isLiked(track.id);

  return (
    <div
      className={`track-row group flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg ${isCurrent ? "active-track" : ""}`}
      onClick={() => isCurrent ? togglePlay() : loadSong(index, songs)}
    >
      <div className="w-6 flex items-center justify-center shrink-0">
        {isCurrent && isPlaying ? (
          <span className="flex items-end gap-[2px]">
            <span className="w-[2px] h-2 bg-[var(--accent)] rounded eq-bar-1" />
            <span className="w-[2px] h-3.5 bg-[var(--accent)] rounded eq-bar-2" />
            <span className="w-[2px] h-1.5 bg-[var(--accent)] rounded eq-bar-3" />
          </span>
        ) : (
          <>
            <span className={`text-sm tabular-nums group-hover:hidden ${isCurrent ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}>{index + 1}</span>
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white hidden group-hover:block" fill="currentColor">
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
            </svg>
          </>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isCurrent ? "text-[var(--accent)]" : "text-white"}`}>{track.title}</p>
        <p className="text-xs text-[var(--text-secondary)] truncate">{track.albumTitle}</p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
        className={`opacity-0 group-hover:opacity-100 ${liked ? "!opacity-100" : ""} w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition ${liked ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span className="text-xs text-[var(--text-secondary)] w-9 text-right tabular-nums shrink-0">
        {track.duration ? formatTime(track.duration) : "—"}
      </span>
    </div>
  );
}

export default function ArtistPage({ params }: { params: { id: string } }) {
  const artist = artists.find((a) => a.id === Number(params.id));
  if (!artist) return notFound();

  const artistTracks = allTracks.filter((t) => t.artistId === artist.id);
  const artistAlbums = albums.filter((a) => a.artistId === artist.id);

  const { loadSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const isArtistPlaying = artistTracks.some((t) => t.id === currentSong?.id) && isPlaying;

  const topTracks = [...artistTracks]
    .sort((a, b) => (b.playCount ?? 0) - (a.playCount ?? 0))
    .slice(0, 5);

  return (
    <div className="main-scroll custom-scrollbar h-full">
      <div className="page-enter">

        
        <div className="relative h-72 overflow-hidden">
          
          <img
            src={artist.headerUrl ?? artist.avatarUrl}
            alt={artist.name}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#121212]" />

          
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-5 h-5 rounded-full bg-[#3d91f4] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              </div>
              <span className="text-xs text-white font-medium">Nghệ sĩ được xác minh</span>
            </div>
            <h1 className="text-5xl font-black text-white drop-shadow-lg">{artist.name}</h1>
            <p className="text-white/70 text-sm mt-2">
              {formatPlayCount(artist.monthlyListeners ?? 0)} người nghe mỗi tháng
            </p>
          </div>
        </div>

        
        <div className="flex items-center gap-4 px-6 py-5">
          <button
            onClick={() => {
              if (isArtistPlaying) togglePlay();
              else if (topTracks.length) loadSong(0, artistTracks, artist.name);
            }}
            className="w-14 h-14 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] hover:scale-105 flex items-center justify-center transition shadow-xl"
          >
            {isArtistPlaying ? (
              <svg viewBox="0 0 16 16" className="w-6 h-6" fill="black">
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" className="w-6 h-6 ml-1" fill="black">
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
              </svg>
            )}
          </button>

          <button className="px-5 py-2 rounded-full border border-white/30 text-sm font-semibold text-white hover:bg-white/10 hover:border-white transition">
            Theo dõi
          </button>
        </div>

        
        <section className="px-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-3">Phổ biến</h2>
          <div className="flex flex-col gap-0.5">
            {topTracks.map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} songs={artistTracks} />
            ))}
          </div>
        </section>

        
        {artistAlbums.length > 0 && (
          <section className="px-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Discography</h2>
            <div className="flex gap-4 flex-wrap">
              {artistAlbums.map((album) => (
                <Link
                  key={album.id}
                  href={`/album/${album.id}`}
                  className="group flex flex-col gap-2 w-[160px]"
                >
                  <div className="w-[160px] h-[160px] rounded-xl overflow-hidden bg-[var(--bg-card)] shadow-lg group-hover:scale-105 transition-transform">
                    <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-semibold text-white truncate">{album.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] capitalize">{album.releaseYear} · {album.type}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        
        {artist.bio && (
          <section className="px-6 pb-16">
            <h2 className="text-xl font-bold text-white mb-3">Giới thiệu</h2>
            <div
              className="relative h-56 rounded-2xl overflow-hidden flex items-end p-5"
              style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
            >
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${artist.avatarUrl})` }}
              />
              <div className="relative">
                <p className="text-white/90 text-sm leading-relaxed line-clamp-4">{artist.bio}</p>
                <p className="text-white/50 text-xs mt-2">
                  {formatPlayCount(artist.monthlyListeners ?? 0)} người nghe mỗi tháng
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

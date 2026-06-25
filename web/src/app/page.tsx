"use client";

import Link from "next/link";
import { usePlayer } from "@/context/PlayerContext";
import { tracks as allTracks, playlists as allPlaylists, albums as allAlbums, artists as allArtists } from "@/data/tracks";
import type { Track, Playlist } from "@/types/player";
import { formatPlayCount, formatTime } from "@/utils/formatTime";

interface MediaCardProps {
  id: number;
  type: "playlist" | "album" | "artist";
  coverUrl: string;
  title: string;
  subtitle?: string;
  rounded?: boolean;
  tracks?: Track[];
}

function MediaCard({ id, type, coverUrl, title, subtitle, rounded, tracks: cardTracks }: MediaCardProps) {
  const { loadSong } = usePlayer();

  const href =
    type === "playlist" ? `/playlist/${id}` :
    type === "album"    ? `/album/${id}`    :
    `/artist/${id}`;

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cardTracks && cardTracks.length > 0) {
      loadSong(0, cardTracks, title);
    }
  };

  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 p-3 rounded-2xl bg-[var(--bg-card)] hover:bg-[var(--bg-highlight)] transition-colors cursor-pointer w-[160px] shrink-0 media-card relative"
    >
      <div className="relative w-full aspect-square shadow-lg">
        <div className={`absolute inset-0 overflow-hidden bg-[var(--bg-highlight)] ${rounded ? "rounded-full" : "rounded-2xl"}`}>
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {cardTracks && cardTracks.length > 0 && (
          <button
            onClick={handlePlay}
            className="play-overlay absolute bottom-2 right-2 w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-xl hover:scale-105 hover:bg-[#1ed760] transition-all duration-200 text-black z-10"
            aria-label={`Phát ${title}`}
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4 ml-0.5" fill="black">
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
            </svg>
          </button>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white truncate">{title}</p>
        {subtitle && <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">{subtitle}</p>}
      </div>
    </Link>
  );
}

function TrackRow({ track, index, songs }: { track: Track; index: number; songs: Track[] }) {
  const { loadSong, currentSong, isPlaying, togglePlay, toggleLike, isLiked, addToQueue } = usePlayer();
  const isCurrent = currentSong?.id === track.id;
  const liked     = isLiked(track.id);

  return (
    <div
      className={`track-row group flex items-center gap-3 px-3 py-2 cursor-pointer ${isCurrent ? "active-track" : ""}`}
      onClick={() => isCurrent ? togglePlay() : loadSong(index, songs)}
    >
      <div className="w-7 shrink-0 flex items-center justify-center">
        {isCurrent && isPlaying ? (
          <span className="flex items-end gap-[2px]">
            <span className="w-[3px] bg-[var(--accent)] rounded-full eq-bar-1" style={{ height: 8 }} />
            <span className="w-[3px] bg-[var(--accent)] rounded-full eq-bar-2" style={{ height: 14 }} />
            <span className="w-[3px] bg-[var(--accent)] rounded-full eq-bar-3" style={{ height: 6 }} />
          </span>
        ) : (
          <>
            <span className={`text-sm tabular-nums block group-hover:hidden ${isCurrent ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}>{index + 1}</span>
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white hidden group-hover:block" fill="currentColor">
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
            </svg>
          </>
        )}
      </div>
      <div className="w-10 h-10 rounded-md overflow-hidden bg-[var(--bg-highlight)] shrink-0">
        <img src={track.cover} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isCurrent ? "text-[var(--accent)]" : "text-white"}`}>{track.title}</p>
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
      <span className="text-xs text-[var(--text-secondary)] w-9 text-right tabular-nums shrink-0">
        {track.duration ? formatTime(track.duration) : "—"}
      </span>
    </div>
  );
}

function SectionCarousel({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <section className="px-6 mt-8">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {href && (
          <Link href={href} className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition">
            Xem tất cả
          </Link>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4 snap-x">
        {children}
      </div>
    </section>
  );
}

function QuickPlayCard({ playlist, playlistTracks }: { playlist: Playlist; playlistTracks: Track[] }) {
  const { loadSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const isCurrent = playlistTracks.some((t) => t.id === currentSong?.id);

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCurrent) togglePlay();
    else if (playlistTracks.length > 0) loadSong(0, playlistTracks, playlist.title);
  };

  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className="group flex items-center gap-0 bg-white/7 hover:bg-white/12 rounded-md overflow-hidden transition cursor-pointer h-16 pr-4"
    >
      <div className="w-16 h-16 shrink-0 overflow-hidden">
        <img
          src={playlist.coverUrl ?? playlistTracks[0]?.cover ?? ""}
          alt={playlist.title}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm font-semibold text-white flex-1 min-w-0 truncate ml-3">
        {playlist.title}
      </span>
      <button
        onClick={handlePlay}
        className={`play-overlay w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition shrink-0 bg-[var(--accent)] ${
          isCurrent ? "opacity-100" : "opacity-0"
        }`}
      >
        {isCurrent && isPlaying ? (
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="black">
            <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 ml-0.5" fill="black">
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
          </svg>
        )}
      </button>
    </Link>
  );
}

const genres = [
  { name: "Pop",        color: "#e13300", img: "/image/item7.jpg" },
  { name: "Hip-hop",    color: "#608108", img: "/image/items1.jpg" },
  { name: "Indie Pop",  color: "#1e3264", img: "/image/item2.jpg" },
  { name: "Ballad",     color: "#503750", img: "/image/item6.jpg" },
  { name: "R&B",        color: "#d84000", img: "/image/item3.jpg" },
  { name: "Electronic", color: "#148a08", img: "/image/item5.jpg" },
  { name: "Acoustic",   color: "#b02897", img: "/image/item4.jpg" },
  { name: "K-Pop",      color: "#0d73ec", img: "/image/item8.jpg" },
];

export default function HomePage() {
  const { loadSong } = usePlayer();

  const topTracks = [...allTracks]
    .sort((a, b) => (b.playCount ?? 0) - (a.playCount ?? 0))
    .slice(0, 8);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Chào buổi sáng 🌅" :
    hour < 18 ? "Chào buổi chiều ☀️" :
    "Chào buổi tối 🌙";

  return (
    <div className="main-scroll custom-scrollbar h-full">
      <div className="page-enter pb-16">

        
        <div className="header-sticky px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-white">{greeting}</h1>
            <div className="flex gap-2">
              {["Tất cả", "Âm nhạc", "Podcast"].map((label, i) => (
                <button
                  key={label}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    i === 0 ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        
        <section className="px-6 mt-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {allPlaylists.slice(0, 8).map((pl) => {
              const plTracks = pl.trackIds
                .map((id) => allTracks.find((t) => t.id === id))
                .filter(Boolean) as Track[];
              return <QuickPlayCard key={pl.id} playlist={pl} playlistTracks={plTracks} />;
            })}
          </div>
        </section>

        
        <section className="px-6 mt-8">
          <h2 className="text-xl font-bold text-white mb-4">🔥 Trending Hôm Nay</h2>
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4 snap-x">
            {topTracks.map((track, i) => (
              <div key={track.id} className="flex flex-col gap-2 w-[160px] shrink-0 snap-start">
                <div
                  className="group relative w-[160px] h-[160px] cursor-pointer media-card"
                  onClick={() => loadSong(i, topTracks, "Trending")}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden bg-[var(--bg-card)] shadow-lg">
                    <img src={track.cover} alt={track.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <button className="play-overlay absolute bottom-2 right-2 w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-xl hover:scale-105 hover:bg-[#1ed760] transition-all duration-200 text-black z-10">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 ml-0.5" fill="black">
                      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
                    </svg>
                  </button>
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{i + 1}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white truncate">{track.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{track.artist}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{formatPlayCount(track.playCount ?? 0)} lượt nghe</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        
        <section className="px-6 mt-10">
          <h2 className="text-xl font-bold text-white mb-3">Top bài hát tuần này</h2>
          <div className="flex flex-col gap-0.5">
            {topTracks.slice(0, 6).map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} songs={topTracks} />
            ))}
          </div>
        </section>

        
        <SectionCarousel title="Playlist Nổi Bật" href="/library">
          {allPlaylists.map((pl) => {
            const plTracks = pl.trackIds.map((id) => allTracks.find((t) => t.id === id)).filter(Boolean) as Track[];
            return (
              <MediaCard
                key={pl.id}
                id={pl.id}
                type="playlist"
                coverUrl={pl.coverUrl ?? plTracks[0]?.cover ?? "/image/items1.jpg"}
                title={pl.title}
                subtitle={pl.description}
                tracks={plTracks}
              />
            );
          })}
        </SectionCarousel>

        
        <SectionCarousel title="Album & Single Mới" href="/search">
          {allAlbums.map((album) => {
            const albumTracks = allTracks.filter((t) => t.albumId === album.id);
            return (
              <MediaCard
                key={album.id}
                id={album.id}
                type="album"
                coverUrl={album.coverUrl}
                title={album.title}
                subtitle={`${album.artistName} · ${album.releaseYear}`}
                tracks={albumTracks}
              />
            );
          })}
        </SectionCarousel>

        
        <SectionCarousel title="Nghệ Sĩ Nổi Bật" href="/search">
          {allArtists.map((artist) => (
            <MediaCard
              key={artist.id}
              id={artist.id}
              type="artist"
              coverUrl={artist.avatarUrl}
              title={artist.name}
              subtitle={`${formatPlayCount(artist.monthlyListeners ?? 0)} người nghe / tháng`}
              rounded
            />
          ))}
        </SectionCarousel>

        
        <section className="px-6 mt-12 mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Duyệt theo thể loại</h2>
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4 snap-x">
            {genres.map((g) => (
              <Link
                key={g.name}
                href={`/search?genre=${encodeURIComponent(g.name)}`}
                className="genre-card relative h-28 w-48 shrink-0 flex items-end p-3 font-bold text-white text-base shadow-lg rounded-2xl snap-start"
                style={{ backgroundColor: g.color }}
              >
                <img
                  src={g.img}
                  alt={g.name}
                  className="absolute top-0 right-0 w-16 h-16 object-cover rounded-bl-2xl rotate-[25deg] translate-x-2 -translate-y-1 shadow-xl"
                />
                <span className="relative z-10">{g.name}</span>
              </Link>
            ))}
          </div>
        </section>

        
        <footer className="mt-20 px-6 pb-6 text-sm text-[var(--text-muted)]">
          <div className="border-t border-white/5 mb-8" />
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Pháp lý", "Quyền riêng tư", "Chính sách bảo mật", "Cookie", "Trợ năng"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition">{item}</a>
            ))}
          </div>
          <p className="mt-4 text-xs">© 2026 SoundWave. Tất cả quyền được bảo lưu.</p>
        </footer>

      </div>
    </div>
  );
}

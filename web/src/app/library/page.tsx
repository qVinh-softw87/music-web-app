"use client";

import Link from "next/link";
import { useState } from "react";
import { tracks, playlists, albums, artists } from "@/data/tracks";
import { usePlayer } from "@/context/PlayerContext";
import type { Track } from "@/types/player";

type FilterType = "all" | "playlist" | "album" | "artist";
type SortType   = "recent" | "name";

type LibraryItem =
  | { kind: "playlist"; id: number; title: string; coverUrl: string; subtitle: string; tracks: Track[] }
  | { kind: "album";    id: number; title: string; coverUrl: string; subtitle: string; tracks: Track[] }
  | { kind: "artist";   id: number; title: string; coverUrl: string; subtitle: string; tracks: Track[] };

export default function LibraryPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort]     = useState<SortType>("recent");
  const { loadSong }        = usePlayer();

  const items: LibraryItem[] = [
    ...playlists.map((pl) => ({
      kind: "playlist" as const,
      id: pl.id,
      title: pl.title,
      coverUrl: pl.coverUrl ?? "/image/items1.jpg",
      subtitle: `Playlist · ${pl.ownerName} · ${pl.trackIds.length} bài`,
      tracks: pl.trackIds.map((id) => tracks.find((t) => t.id === id)).filter(Boolean) as Track[],
    })),
    ...albums.map((al) => ({
      kind: "album" as const,
      id: al.id,
      title: al.title,
      coverUrl: al.coverUrl,
      subtitle: `Album · ${al.artistName} · ${al.releaseYear}`,
      tracks: tracks.filter((t) => t.albumId === al.id),
    })),
    ...artists.map((ar) => ({
      kind: "artist" as const,
      id: ar.id,
      title: ar.name,
      coverUrl: ar.avatarUrl,
      subtitle: `Nghệ sĩ`,
      tracks: tracks.filter((t) => t.artistId === ar.id),
    })),
  ];

  const filtered = items
    .filter((item) => filter === "all" || item.kind === filter)
    .sort((a, b) => sort === "name" ? a.title.localeCompare(b.title) : 0);

  const filterLabels: { key: FilterType; label: string }[] = [
    { key: "all",      label: "Tất cả" },
    { key: "playlist", label: "Playlist" },
    { key: "album",    label: "Album" },
    { key: "artist",   label: "Nghệ sĩ" },
  ];

  const getHref = (item: LibraryItem) =>
    item.kind === "playlist" ? `/playlist/${item.id}` :
    item.kind === "album"    ? `/album/${item.id}` :
    `/artist/${item.id}`;

  return (
    <div className="main-scroll custom-scrollbar h-full">
      <div className="page-enter">
        
        <div className="header-sticky px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-extrabold text-white">Thư viện</h1>
            <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2 flex-wrap">
              {filterLabels.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    filter === key
                      ? "bg-white text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="bg-transparent text-[var(--text-secondary)] text-sm border border-white/10 rounded-md px-2 py-1 hover:text-white cursor-pointer outline-none"
            >
              <option value="recent" className="bg-[#121212]">Gần đây</option>
              <option value="name"   className="bg-[#121212]">A–Z</option>
            </select>
          </div>
        </div>

        
        <div className="px-4 pb-16">
          <div className="flex flex-col gap-0.5">
            {filtered.map((item, i) => (
              <Link
                key={`${item.kind}-${item.id}`}
                href={getHref(item)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/7 group transition"
              >
                
                <div className={`w-12 h-12 shrink-0 overflow-hidden bg-[var(--bg-highlight)] shadow-md ${item.kind === "artist" ? "rounded-full" : "rounded-md"}`}>
                  <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>

                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{item.subtitle}</p>
                </div>

                
                {item.tracks.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      loadSong(0, item.tracks, item.title);
                    }}
                    className="play-overlay w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-lg btn-tactile text-black shrink-0"
                  >
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 ml-0.5" fill="black">
                      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
                    </svg>
                  </button>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

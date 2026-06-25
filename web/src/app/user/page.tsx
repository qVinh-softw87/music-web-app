"use client";

import { usePlayer } from "@/context/PlayerContext";
import Link from "next/link";
import { formatTime } from "@/utils/formatTime";

export default function UserProfilePage() {
  const { recentlyPlayed, customPlaylists } = usePlayer();

  return (
    <div className="main-scroll custom-scrollbar h-full">
      <div className="page-enter">
        <div className="relative">
          <div
            className="absolute inset-0 h-72"
            style={{
              background: `linear-gradient(to bottom, rgba(30, 50, 100, 0.8) 0%, #121212 100%)`,
            }}
          />
          <div className="relative flex items-end gap-6 px-6 pt-16 pb-6">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl shrink-0 bg-[#282828] border-4 border-[#121212] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-20 h-20 text-[var(--text-secondary)]" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            <div className="flex flex-col gap-2 pb-2">
              <span className="text-xs text-white/60 uppercase font-semibold tracking-widest">Hồ sơ</span>
              <h1 className="text-5xl font-black text-white leading-none">Bạn</h1>
              <div className="flex items-center gap-2 text-sm text-white/70 mt-1">
                <span>{customPlaylists.length} Playlist công khai</span>
                <span>·</span>
                <span>12 Người theo dõi</span>
                <span>·</span>
                <span>Đang theo dõi 5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 px-6 mt-4 mb-8">
          <button className="px-5 py-2 rounded-full border border-white/30 text-sm font-semibold text-white hover:bg-white/10 hover:border-white transition">
            Chỉnh sửa hồ sơ
          </button>
        </div>

        {recentlyPlayed.length > 0 && (
          <section className="px-6 mb-10">
            <h2 className="text-xl font-bold text-white mb-4">Top bài hát của bạn</h2>
            <div className="flex flex-col gap-0.5 max-w-4xl">
              {recentlyPlayed.slice(0, 5).map((track, i) => (
                <div key={track.id} className="group flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition">
                  <div className="w-6 text-center text-sm tabular-nums text-[var(--text-secondary)]">
                    {i + 1}
                  </div>
                  <div className="w-10 h-10 rounded overflow-hidden shrink-0">
                    <img src={track.cover} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{track.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{track.artist}</p>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition pr-4">
                    {track.duration ? formatTime(track.duration) : "—"}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="px-6 mb-16">
          <h2 className="text-xl font-bold text-white mb-4">Playlist công khai</h2>
          {customPlaylists.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {customPlaylists.map((pl) => (
                <Link
                  key={pl.id}
                  href={`/playlist/${pl.id}`}
                  className="group flex flex-col gap-3 p-3 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-highlight)] transition-colors cursor-pointer media-card"
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg bg-[#282828] flex items-center justify-center">
                    {pl.coverUrl ? (
                      <img src={pl.coverUrl} alt={pl.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-12 h-12 text-[var(--text-secondary)]" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 18V5l12-2v13M9 9l12-2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{pl.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">Bạn</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[var(--text-secondary)] text-sm italic">Bạn chưa tạo playlist công khai nào.</p>
          )}
        </section>
      </div>
    </div>
  );
}

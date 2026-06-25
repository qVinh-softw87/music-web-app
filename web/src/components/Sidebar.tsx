"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlayer } from "@/context/PlayerContext";

function IconHome({ active }: { active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSearch({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" strokeLinecap="round" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLibrary({ active }: { active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path fillRule="evenodd" d="M3 22V2h2v20H3zm4-14v14h2V8H7zm4 6v8h2v-8h-2zm4-10v18h2V4h-2z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" opacity={0.7}>
      <path fillRule="evenodd" d="M3 22V2h2v20H3zm4-14v14h2V8H7zm4 6v8h2v-8h-2zm4-10v18h2V4h-2z" clipRule="evenodd" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function IconMusicNote() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9z" />
    </svg>
  );
}

function EqBars() {
  return (
    <span className="flex items-end gap-[2px] h-4">
      <span className="w-[3px] bg-[var(--accent)] rounded-full eq-bar-1" style={{ height: 8 }} />
      <span className="w-[3px] bg-[var(--accent)] rounded-full eq-bar-2" style={{ height: 14 }} />
      <span className="w-[3px] bg-[var(--accent)] rounded-full eq-bar-3" style={{ height: 6 }} />
    </span>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { currentSong, isPlaying, loadSong, customPlaylists, createPlaylist, contextTitle } = usePlayer();

  const handleCreatePlaylist = () => {
    const name = window.prompt("Nhập tên playlist mới:");
    if (name && name.trim()) {
      createPlaylist(name.trim());
    }
  };

  const navItems = [
    { href: "/",        label: "Home",      Icon: IconHome },
    { href: "/search",  label: "Tìm kiếm",  Icon: IconSearch },
    { href: "/library", label: "Thư viện",  Icon: IconLibrary },
  ];

  return (
    <aside className="w-full h-full flex flex-col bg-[#121212] rounded-lg overflow-hidden">
      
      <div className="px-6 pt-6 pb-2 shrink-0">
        <Link href="/" className="flex items-center gap-2 btn-tactile">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-lg text-black">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
              <path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zm4.13 12.99c-.18.3-.56.38-.86.2-2.36-1.44-5.33-1.77-8.82-.97-.34.08-.67-.13-.75-.47-.08-.34.13-.67.47-.75 3.82-.87 7.1-.5 9.76 1.13.3.18.38.56.2.86zm1.1-2.45c-.22.36-.68.47-1.04.25-2.7-1.66-6.82-2.14-10.02-1.17-.41.12-.85-.11-.97-.52-.12-.41.11-.85.52-.97 3.66-1.11 8.21-.57 11.27 1.37.36.22.47.68.24 1.04zm.09-2.54c-3.24-1.92-8.59-2.1-11.68-1.16-.49.15-1.01-.13-1.16-.62-.15-.49.13-1.01.62-1.16 3.55-1.08 9.45-.87 13.18 1.35.44.26.59.83.33 1.27-.26.44-.83.59-1.29.32z"/>
            </svg>
          </div>
          <span className="text-white font-extrabold text-xl tracking-tight">SoundWave</span>
        </Link>
      </div>

      
      <nav className="px-3 pb-2 shrink-0">
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`nav-item flex items-center gap-4 px-3 py-3 text-sm font-semibold ${
                active ? "text-white" : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              <Icon active={active} />
              {label}
            </Link>
          );
        })}
      </nav>

      
      <div className="flex-1 min-h-0 flex flex-col bg-[#121212] rounded-2xl mx-0 mt-2">
        
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition text-sm font-semibold">
            <IconLibrary />
            Thư viện
          </button>
          <button
            onClick={handleCreatePlaylist}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-white btn-tactile"
            title="Tạo playlist mới"
          >
            <IconPlus />
          </button>
        </div>

        
        <div className="flex gap-2 px-4 pb-3 shrink-0">
          <button className="px-3 py-1 rounded-full bg-white/10 text-xs text-white hover:bg-white/20 btn-tactile">Playlist</button>
          <button className="px-3 py-1 rounded-full bg-white/10 text-xs text-[var(--text-secondary)] hover:bg-white/20 hover:text-white btn-tactile">Album</button>
        </div>

        
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-2 pb-2">
          {customPlaylists.map((pl) => {
            const isPlaying_ =
              currentSong &&
              contextTitle === pl.title &&
              isPlaying;

            return (
              <Link
                key={pl.id}
                href={`/playlist/${pl.id}`}
                className={`flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/7 transition group ${
                  pathname === `/playlist/${pl.id}` ? "bg-white/10" : ""
                }`}
              >
                
                <div className="w-11 h-11 rounded-md overflow-hidden bg-[var(--bg-highlight)] shrink-0 relative">
                  {pl.coverUrl ? (
                    <img src={pl.coverUrl} alt={pl.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                      <IconMusicNote />
                    </div>
                  )}
                </div>

                
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium truncate ${
                    isPlaying_ ? "text-[var(--accent)]" : "text-white"
                  }`}>
                    {pl.title}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">
                    Playlist · {pl.ownerName}
                  </p>
                </div>

                
                {isPlaying_ && (
                  <div className="shrink-0">
                    <EqBars />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

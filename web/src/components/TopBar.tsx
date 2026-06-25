"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/context/PlayerContext";

export function TopBar() {
  const router = useRouter();
  const { currentSong } = usePlayer();

  return (
    <header className="h-16 bg-black flex items-center px-4 gap-3 shrink-0 z-40">
      
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 btn-tactile"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
          </svg>
        </button>
        <button
          onClick={() => router.forward()}
          className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 btn-tactile"
          aria-label="Forward"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </button>
      </div>

      
      {currentSong && (
        <span className="text-sm text-white/50 hidden md:block truncate max-w-[180px]">
          {currentSong.albumTitle ?? ""}
        </span>
      )}

      
      <div className="flex-1" />

      
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="#"
          className="px-4 py-1.5 rounded-full border border-white/20 text-sm font-semibold text-white hover:bg-white/10 btn-tactile hidden sm:block"
        >
          Explore Premium
        </Link>

        
        <button className="w-8 h-8 rounded-full overflow-hidden bg-[#333] hover:ring-2 hover:ring-white/30 transition">
          <img
            src="/image/pexels-alyona-nagel-1468385055-35224893.jpg"
            alt="User"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}

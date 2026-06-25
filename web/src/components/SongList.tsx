"use client";

import { usePlayer } from "@/context/PlayerContext";
import type { Track } from "@/types/player";
import { LazyImage } from "./LazyImage";

function SongCard({ song, index }: { song: Track; index: number }) {
  const { loadSong, currentIndex } = usePlayer();
  const isActive = currentIndex === index;

  return (
    <button
      type="button"
      onClick={() => loadSong(index)}
      className={`song-card group flex items-center h-[72px] rounded-md overflow-hidden bg-white/10 hover:bg-white/15 transition w-full text-left ${
        isActive ? "active" : ""
      }`}
    >
      <LazyImage
        src={song.cover}
        alt=""
        className="w-full h-full object-cover"
        containerClassName="w-[72px] h-[72px] shrink-0"
      />
      <span className="px-4 text-white font-semibold truncate">{song.title}</span>
    </button>
  );
}

export function SongList() {
  const { songs } = usePlayer();
  if (!songs.length) return null;
  return (
    <section className="px-10 pt-4">
      <div className="grid grid-cols-4 gap-3">
        {songs.map((song, index) => (
          <SongCard key={song.id} song={song} index={index} />
        ))}
      </div>
    </section>
  );
}

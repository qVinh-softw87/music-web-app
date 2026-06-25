"use client";

import Link from "next/link";
import { usePlayer } from "@/context/PlayerContext";
import { useZingHome } from "@/hooks/useZing";
import type { Track } from "@/types/player";
import { TrackContextMenu } from "@/components/TrackContextMenu";

interface MediaCardProps {
  id: string;
  type: "playlist" | "album" | "artist";
  coverUrl: string;
  title: string;
  subtitle?: string;
  rounded?: boolean;
}

function MediaCard({ id, type, coverUrl, title, subtitle, rounded }: MediaCardProps) {
  const href =
    type === "playlist" ? `/album/${id}` :
    type === "album"    ? `/album/${id}`    :
    `/artist/${id}`; // Zing MP3 uses album detail for playlists too

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
      className={`track-row group flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg hover:bg-[var(--bg-highlight)] transition-colors ${isCurrent ? "active-track" : ""}`}
      onClick={() => isCurrent ? togglePlay() : loadSong(index, songs)}
    >
      <div className="w-10 h-10 rounded-md overflow-hidden bg-[var(--bg-highlight)] shrink-0">
        <img src={track.cover} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isCurrent ? "text-[var(--accent)]" : "text-white"}`}>{track.title}</p>
        <p className="text-xs text-[var(--text-secondary)] truncate">{track.artist}</p>
      </div>
      <TrackContextMenu track={track}>
        <button className="opacity-0 group-hover:opacity-100 p-2 text-[#a7a7a7] hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
          •••
        </button>
      </TrackContextMenu>
    </div>
  );
}

export default function HomePage() {
  const { data, isLoading, error } = useZingHome();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !data?.data?.items) {
    return <div className="p-8 text-center text-red-500">Lỗi khi tải dữ liệu từ Zing MP3</div>;
  }

  const sections = data.data.items;

  return (
    <div className="main-scroll custom-scrollbar h-full">
      <div className="page-enter flex flex-col gap-10 pb-10 pt-4">
        {sections.map((section: any, idx: number) => {
        // Render Banners
        if (section.sectionType === "banner") {
          return (
            <div key={idx} className="px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.items?.slice(0, 3).map((item: any) => (
                <Link href={`/album/${item.encodeId}`} key={item.encodeId} className="block overflow-hidden rounded-2xl aspect-[2.5/1]">
                  <img src={item.banner} className="w-full h-full object-cover hover:scale-105 transition-transform" alt="" />
                </Link>
              ))}
            </div>
          );
        }

        // Render Playlists
        if (section.sectionType === "playlist" || section.sectionType === "quickPlay") {
          return (
            <section key={idx}>
              {section.title && <h2 className="text-2xl font-bold text-white mb-4 px-6">{section.title}</h2>}
              <div className="flex overflow-x-auto gap-4 px-6 pb-4 no-scrollbar">
                {section.items?.map((item: any) => (
                  <MediaCard
                    key={item.encodeId || item.id}
                    id={item.encodeId || item.id}
                    type="playlist"
                    coverUrl={item.thumbnailM || item.thumbnail}
                    title={item.title}
                    subtitle={item.artistsNames || item.sortDescription}
                  />
                ))}
              </div>
            </section>
          );
        }

        // Render New Release Tracks
        if (section.sectionType === "new-release" && section.items?.all) {
          const songs = section.items.all.map((track: any) => ({
            id: track.encodeId,
            title: track.title,
            artist: track.artistsNames,
            cover: track.thumbnailM,
          }));

          return (
            <section key={idx} className="px-6">
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
                {songs.slice(0, 12).map((t: Track, i: number) => (
                   <TrackRow key={t.id} track={t} index={i} songs={songs} />
                ))}
              </div>
            </section>
          );
        }

        return null;
      })}
      </div>
    </div>
  );
}

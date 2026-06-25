"use client";

import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Play, ListPlus, PlusCircle, User, Share2 } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { Track } from "@/types/player";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TrackContextMenuProps {
  track: Track;
  children: React.ReactNode;
}

export function TrackContextMenu({ track, children }: TrackContextMenuProps) {
  const { loadSong, addToQueue, customPlaylists, addTrackToPlaylist, songs } = usePlayer();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handlePlay = () => {
    // Nếu có danh sách bài hát hiện tại chứa bài này, tìm index.
    const idx = songs.findIndex(s => s.id === track.id);
    if (idx !== -1) {
      loadSong(idx);
    } else {
      loadSong(0, [track]);
    }
  };

  const handleCopyLink = () => {
    // Giả lập copy link
    navigator.clipboard.writeText(`${window.location.origin}/album/${track.albumId || ''}`);
    toast.success("Đã sao chép liên kết vào khay nhớ tạm");
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-[#282828] rounded-md p-1 shadow-2xl z-50 text-sm text-[#e5e5e5] border border-white/10 origin-top-right animate-in fade-in zoom-in-95"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={handlePlay}
            className="flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer outline-none hover:bg-white/10 focus:bg-white/10 transition-colors"
          >
            <Play size={16} />
            <span>Phát bài hát</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => addToQueue(track)}
            className="flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer outline-none hover:bg-white/10 focus:bg-white/10 transition-colors"
          >
            <ListPlus size={16} />
            <span>Thêm vào danh sách chờ</span>
          </DropdownMenu.Item>

          {/* Sub menu cho Playlists */}
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer outline-none hover:bg-white/10 focus:bg-white/10 transition-colors data-[state=open]:bg-white/10">
              <PlusCircle size={16} />
              <span className="flex-1">Thêm vào playlist</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="min-w-[200px] bg-[#282828] rounded-md p-1 shadow-2xl z-50 text-sm text-[#e5e5e5] border border-white/10 animate-in fade-in zoom-in-95"
                sideOffset={2}
                alignOffset={-5}
              >
                {customPlaylists.length === 0 ? (
                  <div className="px-3 py-2 text-gray-400 italic">Chưa có playlist nào</div>
                ) : (
                  customPlaylists.map(pl => (
                    <DropdownMenu.Item
                      key={pl.id}
                      onClick={() => addTrackToPlaylist(pl.id, track.id)}
                      className="px-3 py-2 rounded-sm cursor-pointer outline-none hover:bg-white/10 focus:bg-white/10 transition-colors"
                    >
                      {pl.title}
                    </DropdownMenu.Item>
                  ))
                )}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className="h-px bg-white/10 my-1" />

          {track.artistId && (
            <DropdownMenu.Item
              onClick={() => router.push(`/artist/${track.artistId}`)}
              className="flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer outline-none hover:bg-white/10 focus:bg-white/10 transition-colors"
            >
              <User size={16} />
              <span>Đi đến nghệ sĩ</span>
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Item
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer outline-none hover:bg-white/10 focus:bg-white/10 transition-colors"
          >
            <Share2 size={16} />
            <span>Chia sẻ</span>
          </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

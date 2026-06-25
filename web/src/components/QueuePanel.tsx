"use client";

import { usePlayer } from "@/context/PlayerContext";
import { formatTime } from "@/utils/formatTime";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import React, { useState, useEffect } from "react";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { QueueItem } from "@/types/player";

function SortableQueueItem({
  item,
  playFromQueue,
  removeFromQueue,
}: {
  item: QueueItem;
  playFromQueue: (id: string) => void;
  removeFromQueue: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.queueId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : "auto",
    position: isDragging ? ("relative" as const) : ("static" as const),
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/7 group transition bg-[#121212] cursor-grab active:cursor-grabbing"
    >
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => playFromQueue(item.queueId)}
        className="w-9 h-9 rounded-md overflow-hidden shrink-0 relative"
      >
        <img src={item.cover} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="white">
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
          </svg>
        </div>
      </button>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white truncate">{item.title}</p>
        <p className="text-xs text-[var(--text-secondary)] truncate">{item.artist}</p>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
        {item.duration && (
          <span className="text-xs text-[var(--text-secondary)]">{formatTime(item.duration)}</span>
        )}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => removeFromQueue(item.queueId)}
          className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center text-[var(--text-secondary)] hover:text-white btn-tactile"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export function QueuePanel() {
  const {
    queueMode,
    handleQueueHover,
    closeQueue,
    queue,
    currentSong,
    songs,
    currentIndex,
    removeFromQueue,
    playFromQueue,
    clearQueue,
    reorderQueue,
    isPlaying,
    togglePlay,
    loadSong,
  } = usePlayer();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextInList = songs.slice(currentIndex + 1);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = queue.findIndex((q) => q.queueId === active.id);
      const newIndex = queue.findIndex((q) => q.queueId === over.id);
      reorderQueue(oldIndex, newIndex);
    }
  };


  const sharedContent = (
    <>
      <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
        <h2 className="text-white font-bold text-base">Hàng đợi</h2>
        <button
          onClick={closeQueue}
          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-[#ccc] hover:text-white btn-tactile"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-3 pb-4">
        {currentSong && (
          <section className="mb-5">
            <p className="text-xs text-[var(--text-secondary)] font-semibold mb-2 px-2 uppercase tracking-wider">Đang phát</p>
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/7">
              <div className="w-10 h-10 rounded-md overflow-hidden shrink-0">
                <img src={currentSong.cover} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--accent)] truncate">{currentSong.title}</p>
                <p className="text-xs text-[var(--text-secondary)] truncate">{currentSong.artist}</p>
              </div>
              <button
                onClick={togglePlay}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center btn-tactile shrink-0"
              >
                {isPlaying ? (
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="white">
                    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="white">
                    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
                  </svg>
                )}
              </button>
            </div>
          </section>
        )}

        {queue.length > 0 && (
          <section className="mb-5">
            <div className="flex items-center justify-between mb-2 px-2">
              <p className="text-xs text-[var(--text-secondary)] font-semibold uppercase tracking-wider">Tiếp theo trong hàng đợi</p>
              <button onClick={clearQueue} className="text-xs text-[var(--text-secondary)] hover:text-white btn-tactile">
                Xóa hết
              </button>
            </div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={queue.map((q) => q.queueId)} strategy={verticalListSortingStrategy}>
                <ul className="space-y-0.5">
                  {queue.map((item) => (
                    <SortableQueueItem
                      key={item.queueId}
                      item={item}
                      playFromQueue={playFromQueue}
                      removeFromQueue={removeFromQueue}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </section>
        )}

        {nextInList.length > 0 && (
          <section>
            <p className="text-xs text-[var(--text-secondary)] font-semibold mb-2 px-2 uppercase tracking-wider">Tiếp theo</p>
            <ul className="space-y-0.5">
              {nextInList.slice(0, 10).map((track, i) => (
                <li
                  key={`next-${track.id}-${i}`}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/7 group transition cursor-pointer"
                  onClick={() => loadSong(currentIndex + 1 + i)}
                >
                  <div className="w-9 h-9 rounded-md overflow-hidden shrink-0 relative">
                    <img src={track.cover} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <svg viewBox="0 0 16 16" className="w-3 h-3" fill="white">
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white truncate">{track.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{track.artist}</p>
                  </div>
                  {track.duration && (
                    <span className="text-xs text-[var(--text-secondary)] shrink-0">{formatTime(track.duration)}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {queue.length === 0 && nextInList.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-center px-4">
            <p className="text-[var(--text-secondary)] text-sm">Hàng đợi trống</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Thêm bài hát để nghe tiếp theo</p>
          </div>
        )}
      </div>
    </>
  );

  const isPinned = queueMode === "pinned";
  const isPeek = queueMode === "peek";
  const isVisibleMobile = queueMode === "pinned" || queueMode === "peek";

  if (isMobile) {
    return (
      <div
        className="fixed inset-x-0 bottom-0 bg-[#121212] z-[300] rounded-t-2xl shadow-2xl flex flex-col transition-transform duration-300 ease-out border-t border-white/10"
        style={{
          height: "85vh",
          transform: isVisibleMobile ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div className="w-full flex justify-center py-3 shrink-0" onClick={closeQueue}>
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>
        {sharedContent}
      </div>
    );
  }

  return (
    <>
      {/* ── Desktop Floating peek modal ── */}
      <aside
        onMouseEnter={() => handleQueueHover(true)}
        onMouseLeave={() => handleQueueHover(false)}
        className="fixed bottom-[80px] right-4 w-[300px] bg-[#1a1a1a] border border-white/10 rounded-xl flex flex-col shadow-2xl z-[201]"
        style={{
          maxHeight: "min(580px, 72vh)",
          opacity: isPeek ? 1 : 0,
          transform: isPeek ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
          pointerEvents: isPeek ? "auto" : "none",
          transition: "opacity 140ms ease, transform 140ms ease",
        }}
      >
        {sharedContent}
      </aside>

      {/* ── Desktop Column content ── */}
      <aside
        className="w-full h-full bg-[#121212] flex flex-col rounded-lg overflow-hidden"
        style={{ display: isPinned ? "flex" : "none" }}
      >
        {sharedContent}
      </aside>
    </>
  );
}

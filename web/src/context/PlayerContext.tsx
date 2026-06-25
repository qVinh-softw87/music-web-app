"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { PlayerState, QueueItem, RepeatMode, Track, Playlist } from "@/types/player";
import { formatTime } from "@/utils/formatTime";
import { toast } from "sonner";

const REPEAT_MODES: RepeatMode[] = ["off", "all", "one"];
const STORAGE_KEY_VOLUME = "sw_volume";
const STORAGE_KEY_REPEAT = "sw_repeat";
const STORAGE_KEY_LIKED  = "sw_liked";
const STORAGE_KEY_PLAYLISTS = "sw_playlists";
const STORAGE_KEY_RECENT = "sw_recent";

function toQueueItem(track: Track, idx: number): QueueItem {
  return { ...track, queueId: `q-${track.id}-${idx}-${Date.now()}` };
}

function readLiked(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIKED);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as number[]);
  } catch {
    return new Set();
  }
}

function saveLiked(ids: Set<number>) {
  try {
    localStorage.setItem(STORAGE_KEY_LIKED, JSON.stringify(Array.from(ids)));
  } catch {}
}

function readPlaylists(): Playlist[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PLAYLISTS);
    if (!raw) return [];
    return JSON.parse(raw) as Playlist[];
  } catch {
    return [];
  }
}

function savePlaylists(playlists: Playlist[]) {
  try {
    localStorage.setItem(STORAGE_KEY_PLAYLISTS, JSON.stringify(playlists));
  } catch {}
}

function readRecent(): Track[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECENT);
    if (!raw) return [];
    return JSON.parse(raw) as Track[];
  } catch {
    return [];
  }
}

function saveRecent(tracks: Track[]) {
  try {
    localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(tracks));
  } catch {}
}

interface PlayerContextValue extends PlayerState {

  currentTime: number;
  duration: number;
  formattedCurrentTime: string;
  formattedDuration: string;
  progressPercent: number;
  currentSong: Track | null;
  isFullscreenOpen: boolean;
  queueMode: "closed" | "peek" | "pinned";
  isLyricsOpen: boolean;

  loadSong: (index: number, songList?: Track[], contextTitle?: string) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (percent: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  setVolume: (value: number) => void;
  toggleMuted: () => void;

  toggleLike: (trackId: number) => void;
  isLiked: (trackId: number) => boolean;

  addToQueue: (track: Track) => void;
  removeFromQueue: (queueId: string) => void;
  clearQueue: () => void;
  playFromQueue: (queueId: string) => void;
  reorderQueue: (startIndex: number, endIndex: number) => void;

  openFullscreen: () => void;
  closeFullscreen: () => void;
  toggleQueuePin: () => void;
  handleQueueHover: (isHovering: boolean) => void;
  closeQueue: () => void;
  openLyrics: () => void;
  closeLyrics: () => void;

  createPlaylist: (title: string) => void;
  deletePlaylist: (id: number) => void;
  renamePlaylist: (id: number, newTitle: string) => void;
  addTrackToPlaylist: (playlistId: number, trackId: number) => void;
  removeTrackFromPlaylist: (playlistId: number, trackId: number) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}

interface PlayerProviderProps {
  children: React.ReactNode;
  initialSongs: Track[];
}

export function PlayerProvider({ children, initialSongs }: PlayerProviderProps) {
  const [state, setState] = useState<PlayerState>({
    songs: initialSongs,
    queue: [],
    recentlyPlayed: [],
    currentIndex: 0,
    isPlaying: false,
    repeatMode: "off",
    shuffle: false,
    volume: 1,
    isMuted: false,
    likedTrackIds: new Set<number>(),
    customPlaylists: [],
    contextTitle: undefined,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let volume = 1;
    let repeatMode: RepeatMode = "off";
    volume = parseFloat(localStorage.getItem(STORAGE_KEY_VOLUME) ?? "1") || 1;
    const storedRepeat = localStorage.getItem(STORAGE_KEY_REPEAT);
    if (storedRepeat === "all" || storedRepeat === "one" || storedRepeat === "off") {
      repeatMode = storedRepeat;
    }
    const likedTrackIds = readLiked();
    const customPlaylists = readPlaylists();
    const recentlyPlayed = readRecent();

    setState((s) => ({
      ...s,
      volume,
      repeatMode,
      likedTrackIds,
      customPlaylists,
      recentlyPlayed,
    }));
    setIsMounted(true);
  }, []);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [queueMode, setQueueMode]               = useState<"closed" | "peek" | "pinned">("pinned");
  const [isLyricsOpen, setIsLyricsOpen]         = useState(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const lastSrcRef  = useRef<string | null>(null);
  const lastAddedRecentRef = useRef<number | null>(null);

  const getAudio = useCallback(() => {
    if (!audioRef.current && typeof Audio !== "undefined") {
      audioRef.current = new Audio();
    }
    return audioRef.current;
  }, []);

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;

    const song = state.songs[state.currentIndex];
    if (!song) return;

    if (song.id !== lastSrcRef.current) {
      lastSrcRef.current = song.id;
      setCurrentTime(0);
      
      if (song.src) {
        audio.src = song.src;
        if (state.isPlaying) audio.play().catch(() => {});
      } else {
        // Dynamic fetch from Zing MP3
        fetch(`/api/zing/song/${song.id}`)
          .then((res) => res.json())
          .then((data) => {
            const streamUrl = data?.streaming?.data?.['128'];
            if (streamUrl && streamUrl !== 'VIP') {
              audio.src = streamUrl;
              setState((prev) => {
                const newSongs = [...prev.songs];
                if (newSongs[prev.currentIndex]) {
                  newSongs[prev.currentIndex] = { ...newSongs[prev.currentIndex], src: streamUrl };
                }
                return { ...prev, songs: newSongs };
              });
              if (state.isPlaying) audio.play().catch(() => {});
            } else {
              toast.error("Bài hát yêu cầu VIP hoặc bị lỗi bản quyền trên Zing.");
              setState((s) => ({ ...s, isPlaying: false }));
            }
          })
          .catch(() => {
            toast.error("Lỗi khi tải luồng âm thanh.");
            setState((s) => ({ ...s, isPlaying: false }));
          });
      }
    } else if (song.src && audio.src !== song.src && audio.src === "") {
        audio.src = song.src;
    }

    audio.volume = state.isMuted ? 0 : state.volume;
    audio.muted  = state.isMuted;

    if (state.isPlaying && audio.src && audio.src !== "") {
      audio.play().catch(() => {});
    } else if (!state.isPlaying) {
      audio.pause();
    }
  }, [
    state.currentIndex,
    state.isPlaying,
    state.volume,
    state.isMuted,
    state.songs,
    getAudio,
  ]);

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;

    const onTimeUpdate    = () => setCurrentTime(audio.currentTime);
    const onLoadedMeta    = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setState((s) => {
        const { repeatMode, currentIndex, songs, queue } = s;

        if (repeatMode === "one") {
          audio.currentTime = 0;
          audio.play().catch(() => {});
          return s;
        }

        if (queue.length > 0) {
          const [next, ...rest] = queue;
          return {
            ...s,
            songs: [next, ...songs.slice(currentIndex + 1)],
            currentIndex: 0,
            queue: rest,
            isPlaying: true,
          };
        }

        if (repeatMode === "all") {
          return { ...s, currentIndex: (currentIndex + 1) % songs.length, isPlaying: true };
        }

        if (currentIndex < songs.length - 1) {
          return { ...s, currentIndex: currentIndex + 1, isPlaying: true };
        }
        return { ...s, isPlaying: false };
      });
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, [getAudio]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_VOLUME, String(state.volume));
    }
  }, [state.volume]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_REPEAT, state.repeatMode);
    }
  }, [state.repeatMode]);

  useEffect(() => {
    if (currentTime > 30) {
      const song = state.songs[state.currentIndex];
      if (song && lastAddedRecentRef.current !== song.id) {
        lastAddedRecentRef.current = song.id;
        setState((prev) => {
          const filtered = prev.recentlyPlayed.filter(t => t.id !== song.id);
          const newRecent = [song, ...filtered].slice(0, 20);
          saveRecent(newRecent);
          return { ...prev, recentlyPlayed: newRecent };
        });
      }
    } else if (currentTime < 5) {
      lastAddedRecentRef.current = null;
    }
  }, [currentTime, state.songs, state.currentIndex]);

  const loadSong = useCallback(
    (index: number, songList?: Track[], contextTitle?: string) => {
      setState((s) => ({
        ...s,
        songs: songList ?? s.songs,
        currentIndex: index,
        isPlaying: true,
        contextTitle: contextTitle ?? s.contextTitle,
      }));
    },
    []
  );

  const togglePlay = useCallback(() => {
    setState((s) => ({ ...s, isPlaying: !s.isPlaying }));
  }, []);

  const next = useCallback(() => {
    setState((s) => {
      if (!s.songs.length) return s;

      if (s.queue.length > 0) {
        const [nextQ, ...rest] = s.queue;
        return {
          ...s,
          songs: [nextQ, ...s.songs.slice(s.currentIndex + 1)],
          currentIndex: 0,
          queue: rest,
          isPlaying: true,
        };
      }
      const nextIndex = s.shuffle
        ? Math.floor(Math.random() * s.songs.length)
        : (s.currentIndex + 1) % s.songs.length;
      return { ...s, currentIndex: nextIndex, isPlaying: true };
    });
  }, []);

  const prev = useCallback(() => {
    setState((s) => {
      if (!s.songs.length) return s;

      const audio = audioRef.current;
      if (audio && audio.currentTime > 3) {
        audio.currentTime = 0;
        return { ...s, isPlaying: true };
      }
      const prevIndex = (s.currentIndex - 1 + s.songs.length) % s.songs.length;
      return { ...s, currentIndex: prevIndex, isPlaying: true };
    });
  }, []);

  const toggleRepeat = useCallback(() => {
    setState((s) => {
      const i = REPEAT_MODES.indexOf(s.repeatMode);
      return { ...s, repeatMode: REPEAT_MODES[(i + 1) % REPEAT_MODES.length] };
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setState((s) => ({ ...s, shuffle: !s.shuffle }));
  }, []);

  const setVolume = useCallback((value: number) => {
    setState((s) => ({ ...s, volume: Math.max(0, Math.min(1, value)), isMuted: false }));
  }, []);

  const toggleMuted = useCallback(() => {
    setState((s) => ({ ...s, isMuted: !s.isMuted }));
  }, []);

  const seek = useCallback((percent: number) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(audio.duration)) return;
    audio.currentTime = (percent / 100) * audio.duration;
    setCurrentTime(audio.currentTime);
  }, []);

  const toggleLike = useCallback((trackId: number) => {
    setState((s) => {
      const newSet = new Set(s.likedTrackIds);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
        toast.success("Đã xóa khỏi Bài hát đã thích");
      } else {
        newSet.add(trackId);
        toast.success("Đã thêm vào Bài hát đã thích");
      }
      saveLiked(newSet);
      return { ...s, likedTrackIds: newSet };
    });
  }, []);

  const isLiked = useCallback(
    (trackId: number) => state.likedTrackIds.has(trackId),
    [state.likedTrackIds]
  );

  const addToQueue = useCallback((track: Track) => {
    setState((s) => {
      toast.success(`Đã thêm "${track.title}" vào hàng đợi`);
      return {
        ...s,
        queue: [...s.queue, toQueueItem(track, s.queue.length)],
      };
    });
  }, []);

  const removeFromQueue = useCallback((queueId: string) => {
    setState((s) => ({ ...s, queue: s.queue.filter((q) => q.queueId !== queueId) }));
  }, []);

  const clearQueue = useCallback(() => {
    setState((s) => ({ ...s, queue: [] }));
  }, []);

  const playFromQueue = useCallback((queueId: string) => {
    setState((s) => {
      const idx = s.queue.findIndex((q) => q.queueId === queueId);
      if (idx === -1) return s;
      const item = s.queue[idx];
      const newQueue = s.queue.filter((_, i) => i !== idx);
      return {
        ...s,
        songs: [item, ...s.songs.slice(s.currentIndex + 1)],
        currentIndex: 0,
        queue: newQueue,
        isPlaying: true,
      };
    });
  }, []);

  const reorderQueue = useCallback((startIndex: number, endIndex: number) => {
    setState((s) => {
      const result = Array.from(s.queue);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...s, queue: result };
    });
  }, []);

  const createPlaylist = useCallback((title: string) => {
    setState((prev) => {
      const newPlaylist: Playlist = {
        id: Date.now(),
        title,
        ownerName: "Bạn",
        isPublic: false,
        trackIds: [],
        createdAt: new Date().toISOString(),
      };
      const updated = [...prev.customPlaylists, newPlaylist];
      savePlaylists(updated);
      toast.success(`Đã tạo playlist "${title}"`);
      return { ...prev, customPlaylists: updated };
    });
  }, []);

  const deletePlaylist = useCallback((id: number) => {
    setState((prev) => {
      const updated = prev.customPlaylists.filter((p) => p.id !== id);
      savePlaylists(updated);
      toast.success("Đã xóa playlist");
      return { ...prev, customPlaylists: updated };
    });
  }, []);

  const renamePlaylist = useCallback((id: number, newTitle: string) => {
    setState((prev) => {
      const updated = prev.customPlaylists.map((p) =>
        p.id === id ? { ...p, title: newTitle } : p
      );
      savePlaylists(updated);
      toast.success(`Đã đổi tên thành "${newTitle}"`);
      return { ...prev, customPlaylists: updated };
    });
  }, []);

  const addTrackToPlaylist = useCallback((playlistId: number, trackId: number) => {
    setState((prev) => {
      const updated = prev.customPlaylists.map((p) => {
        if (p.id === playlistId && !p.trackIds.includes(trackId)) {
          toast.success(`Đã thêm vào playlist "${p.title}"`);
          return { ...p, trackIds: [...p.trackIds, trackId] };
        }
        return p;
      });
      savePlaylists(updated);
      return { ...prev, customPlaylists: updated };
    });
  }, []);

  const removeTrackFromPlaylist = useCallback((playlistId: number, trackId: number) => {
    setState((prev) => {
      const updated = prev.customPlaylists.map((p) => {
        if (p.id === playlistId) {
          toast.success(`Đã xóa khỏi playlist "${p.title}"`);
          return { ...p, trackIds: p.trackIds.filter((id) => id !== trackId) };
        }
        return p;
      });
      savePlaylists(updated);
      return { ...prev, customPlaylists: updated };
    });
  }, []);

  const openFullscreen  = useCallback(() => setIsFullscreenOpen(true),  []);
  const closeFullscreen = useCallback(() => setIsFullscreenOpen(false), []);
  const openLyrics      = useCallback(() => setIsLyricsOpen(true),      []);
  const closeLyrics     = useCallback(() => setIsLyricsOpen(false),     []);

  const closeQueue = useCallback(() => setQueueMode("closed"), []);

  const toggleQueuePin = useCallback(() => {
    setQueueMode((prev) => (prev === "pinned" ? "closed" : "pinned"));
  }, []);

  const handleQueueHover = useCallback((isHovering: boolean) => {
    if (isHovering) {
      clearTimeout(hoverTimeoutRef.current);
      setQueueMode((prev) => (prev === "pinned" ? "pinned" : "peek"));
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setQueueMode((prev) => (prev === "pinned" ? "pinned" : "closed"));
      }, 120);
    }
  }, []);

  const currentSong     = state.songs[state.currentIndex] ?? null;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const value: PlayerContextValue = {
    ...state,
    currentTime,
    duration,
    formattedCurrentTime: formatTime(currentTime),
    formattedDuration:    formatTime(duration),
    progressPercent,
    currentSong,
    isFullscreenOpen,
    queueMode,
    isLyricsOpen,
    loadSong,
    togglePlay,
    next,
    prev,
    seek,
    toggleRepeat,
    toggleShuffle,
    setVolume,
    toggleMuted,
    toggleLike,
    isLiked,
    addToQueue,
    removeFromQueue,
    clearQueue,
    playFromQueue,
    reorderQueue,
    openFullscreen,
    closeFullscreen,
    toggleQueuePin,
    handleQueueHover,
    closeQueue,
    openLyrics,
    closeLyrics,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

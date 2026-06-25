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

const REPEAT_MODES: RepeatMode[] = ["off", "all", "one"];
const STORAGE_KEY_VOLUME = "sw_volume";
const STORAGE_KEY_REPEAT = "sw_repeat";
const STORAGE_KEY_LIKED  = "sw_liked";
const STORAGE_KEY_PLAYLISTS = "sw_playlists";

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

interface PlayerContextValue extends PlayerState {

  currentTime: number;
  duration: number;
  formattedCurrentTime: string;
  formattedDuration: string;
  progressPercent: number;
  currentSong: Track | null;
  isFullscreenOpen: boolean;
  isQueueOpen: boolean;

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

  openFullscreen: () => void;
  closeFullscreen: () => void;
  openQueue: () => void;
  closeQueue: () => void;

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
  const [state, setState] = useState<PlayerState>(() => {

    let volume = 1;
    let repeatMode: RepeatMode = "off";
    let likedTrackIds = new Set<number>();
    let customPlaylists: Playlist[] = [];
    if (typeof window !== "undefined") {
      volume = parseFloat(localStorage.getItem(STORAGE_KEY_VOLUME) ?? "1") || 1;
      const storedRepeat = localStorage.getItem(STORAGE_KEY_REPEAT);
      if (storedRepeat === "all" || storedRepeat === "one" || storedRepeat === "off") {
        repeatMode = storedRepeat;
      }
      likedTrackIds = readLiked();
    }
    return {
      songs: initialSongs,
      queue: [],
      currentIndex: 0,
      isPlaying: false,
      repeatMode,
      shuffle: false,
      volume,
      isMuted: false,
      likedTrackIds,
      customPlaylists,
      contextTitle: undefined,
    };
  });

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen]           = useState(false);

  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const lastSrcRef  = useRef<string | null>(null);

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

    if (song.src !== lastSrcRef.current) {
      audio.src = song.src;
      lastSrcRef.current = song.src;
      setCurrentTime(0);
    }

    audio.volume = state.isMuted ? 0 : state.volume;
    audio.muted  = state.isMuted;

    if (state.isPlaying) {
      audio.play().catch(() => {

      });
    } else {
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
      if (newSet.has(trackId)) newSet.delete(trackId);
      else newSet.add(trackId);
      saveLiked(newSet);
      return { ...s, likedTrackIds: newSet };
    });
  }, []);

  const isLiked = useCallback(
    (trackId: number) => state.likedTrackIds.has(trackId),
    [state.likedTrackIds]
  );

  const addToQueue = useCallback((track: Track) => {
    setState((s) => ({
      ...s,
      queue: [...s.queue, toQueueItem(track, s.queue.length)],
    }));
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
      return { ...prev, customPlaylists: updated };
    });
  }, []);

  const deletePlaylist = useCallback((id: number) => {
    setState((prev) => {
      const updated = prev.customPlaylists.filter((p) => p.id !== id);
      savePlaylists(updated);
      return { ...prev, customPlaylists: updated };
    });
  }, []);

  const renamePlaylist = useCallback((id: number, newTitle: string) => {
    setState((prev) => {
      const updated = prev.customPlaylists.map((p) =>
        p.id === id ? { ...p, title: newTitle } : p
      );
      savePlaylists(updated);
      return { ...prev, customPlaylists: updated };
    });
  }, []);

  const addTrackToPlaylist = useCallback((playlistId: number, trackId: number) => {
    setState((prev) => {
      const updated = prev.customPlaylists.map((p) => {
        if (p.id === playlistId && !p.trackIds.includes(trackId)) {
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
  const openQueue       = useCallback(() => setIsQueueOpen(true),       []);
  const closeQueue      = useCallback(() => setIsQueueOpen(false),      []);

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
    isQueueOpen,
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
    openFullscreen,
    closeFullscreen,
    openQueue,
    closeQueue,
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

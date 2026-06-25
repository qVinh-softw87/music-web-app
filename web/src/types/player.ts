

export type RepeatMode = "off" | "all" | "one";

export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  albumId?: string;
  albumTitle?: string;
  cover: string;
  src?: string;
  duration?: number;
  genre?: string;
  playCount?: number;
  addedAt?: string;
  lyrics?: { time: number; text: string }[];
  _originIndex?: number;
}

export interface Artist {
  id: string;
  name: string;
  bio?: string;
  avatarUrl: string;
  headerUrl?: string;
  monthlyListeners?: number;
  isFollowing?: boolean;
  topTrackIds?: string[];
  albumIds?: string[];
}

export interface Album {
  id: string;
  title: string;
  coverUrl: string;
  artistId?: string;
  artistName?: string;
  releaseYear?: number;
  type?: "album" | "ep" | "single";
  trackIds?: string[];
}

export interface Playlist {
  id: string;
  title: string;
  coverUrl?: string;
  description?: string;
  ownerName: string;
  isPublic: boolean;
  trackIds: string[];
  createdAt?: string;
}

export interface QueueItem extends Track {
  queueId: string;
}

export interface PlayerState {
  songs: Track[];
  queue: QueueItem[];
  recentlyPlayed: Track[];
  currentIndex: number;
  isPlaying: boolean;
  repeatMode: RepeatMode;
  shuffle: boolean;
  volume: number;
  isMuted: boolean;
  likedTrackIds: Set<number>;
  customPlaylists: Playlist[];
  contextTitle?: string;
}

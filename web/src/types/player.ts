

export type RepeatMode = "off" | "all" | "one";

export interface Track {
  id: number;
  title: string;
  artist: string;
  artistId?: number;
  albumId?: number;
  albumTitle?: string;
  cover: string;
  src: string;
  duration?: number;
  genre?: string;
  playCount?: number;
  addedAt?: string;
  _originIndex?: number;
}

export interface Artist {
  id: number;
  name: string;
  bio?: string;
  avatarUrl: string;
  headerUrl?: string;
  monthlyListeners?: number;
  isFollowing?: boolean;
  topTrackIds?: number[];
  albumIds?: number[];
}

export interface Album {
  id: number;
  title: string;
  coverUrl: string;
  artistId: number;
  artistName: string;
  releaseYear: number;
  type: "album" | "ep" | "single";
  trackIds?: number[];
}

export interface Playlist {
  id: number;
  title: string;
  coverUrl?: string;
  description?: string;
  ownerName: string;
  isPublic: boolean;
  trackIds: number[];
  createdAt?: string;
}

export interface QueueItem extends Track {
  queueId: string;
}

export interface PlayerState {
  songs: Track[];
  queue: QueueItem[];
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

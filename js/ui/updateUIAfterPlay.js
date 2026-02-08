import { getIsPlaying, getCurrentSong } from "../logic/player.js";
import { renderSongInfo } from "./renderSongInfo.js";
import { highlightActiveSong } from "./highlightActiveSong.js";

export function updateUIAfterPlay() {
  const isPlaying = getIsPlaying();
  const song = getCurrentSong();

  // 1. Update play / pause icon
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");

  if (isPlaying) {
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  } else {
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
  }

  // 2. Update song info
  renderSongInfo(song);

  // 3. Highlight active song
  highlightActiveSong(song.index);
}

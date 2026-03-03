import { getCurrentSong } from "../logic/player.js";

export function renderSongInfo() {
  const song = getCurrentSong();
  if (!song) return;

  document.getElementById("music-name").textContent = song.title;
  document.getElementById("artist-name").textContent = song.artist;
  document.getElementById("cover").src = song.cover;
}

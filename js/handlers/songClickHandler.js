import { loadSong, play } from "../logic/player.js";
import { applyState } from "../logic/applyState.js";

export function handleSongClick(e) {
  const card = e.target.closest(".song-card");
  if (!card) return;

  const index = Number(card.dataset.index);

  loadSong(index);
  play();

  applyState();
}
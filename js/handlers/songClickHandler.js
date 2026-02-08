import { getLoadSong, getPlay } from "../logic/player.js";
import { updateUIAfterPlay } from "../ui/updateUIAfterPlay.js";

export function handleSongClick(e) {
  const card = e.target.closest(".song-card");
  if (!card) return;

  e.preventDefault(); //

  const index = Number(card.dataset.index);
  if (Number.isNaN(index)) return;

  getLoadSong(index);
  getPlay();
  updateUIAfterPlay();
}

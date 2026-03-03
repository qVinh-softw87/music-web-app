import { getCurrentSong } from "../logic/player.js";

export function highlightActiveSong() {
  const cards = document.querySelectorAll(".song-card");
  const currentSong = getCurrentSong();
  if (!currentSong) return;

  // clear active
  cards.forEach((card) => card.classList.remove("active"));

  // find card equal state
  const activeCard = [...cards].find(
    (card) => Number(card.dataset.index) === currentSong.index,
  );

  if (activeCard) activeCard.classList.add("active");
}

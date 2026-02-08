import { getCurrentSong } from "../logic/player.js";

export function highlightActiveSong(activeIndex) {
  const cards = document.querySelectorAll(".song-card");

  // Delete all active for song-card elements
  cards.forEach((card) => card.classList.remove("active"));
  // get current song
  const currentSong = getCurrentSong();
  if (!currentSong) return;
  // if existed, only add active for current song
  const activeCard = [...cards].find(
    (card) => Number(card.dataset.index) === activeIndex,
  );

  if (activeCard) activeCard.classList.add("active");
}

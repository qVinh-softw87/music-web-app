import { getIsPlaying } from "../logic/player.js";
import { renderSongInfo } from "./renderSongInfo.js";
import { highlightActiveSong } from "./highlightActiveSong.js";
import { playerState } from "../state/playerState.js";

const REPEAT_ALL_PATH = `
<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75z"></path>
`;

const REPEAT_ONE_PATH = `
<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75zM12.25 2.5a2.25 2.25 0 0 1 2.25 2.25v5A2.25 2.25 0 0 1 12.25 12H9.81l1.018-1.018a.75.75 0 0 0-1.06-1.06L6.939 12.75l2.829 2.828a.75.75 0 1 0 1.06-1.06L9.811 13.5h2.439A3.75 3.75 0 0 0 16 9.75v-5A3.75 3.75 0 0 0 12.25 1h-.75v1.5z"></path>
<path d="m8 1.85.77.694H6.095V1.488q1.046-.077 1.507-.385.474-.308.583-.913h1.32V8H8z"></path>
<path d="M8.77 2.544 8 1.85v.693z"></path>
`;

export function updateUIAfterPlay() {
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");

  if (getIsPlaying()) {
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  } else {
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
  }

  renderSongInfo();
  highlightActiveSong();
  // Handling repeat mode
  const repeatIcon = document.getElementById("repeat-icon");
  const repeatTooltip = document.getElementById("repeat-tooltip");

  if (!repeatIcon || !repeatTooltip) return;

  switch (playerState.repeatMode) {
    case "off":
      repeatIcon.innerHTML = REPEAT_ALL_PATH;
      repeatIcon.style.color = "#ccc";
      repeatTooltip.textContent = "Enable repeat all";
      break;

    case "all":
      repeatIcon.innerHTML = REPEAT_ALL_PATH;
      repeatIcon.style.color = "#22c55e";
      repeatTooltip.textContent = "Enable repeat one";
      break;

    case "one":
      repeatIcon.innerHTML = REPEAT_ONE_PATH;
      repeatIcon.style.color = "#22c55e";
      repeatTooltip.textContent = "Disable repeat";
      break;
  }
  // Handling shuffle mode
  const shuffleIcon = document.getElementById("shuffle-icon");
  const shuffleTooltip = document.getElementById("shuffle-tooltip");

  if (shuffleIcon && shuffleTooltip) {
    if (playerState.shuffle) {
      shuffleIcon.style.color = "#22c55e";
      shuffleTooltip.textContent = "Disable shuffle";
    } else {
      shuffleIcon.style.color = "#ccc";
      shuffleTooltip.textContent = "Enable shuffle";
    }
  }
  // Handling volume
  const volumeSlider = document.getElementById("volumeRange");
  if (volumeSlider) {
    volumeSlider.value = playerState.isMuted ? 0 : playerState.volume * 100;
  }
  const volumeIconBtn = document.getElementById("data-volume");

}

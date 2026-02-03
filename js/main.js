import { togglePlay, next, prev, getIsPlaying } from "./player.js";

// assign JS variables to HTML element by id 
const playBtn = document.getElementById("play-button");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("previous-btn");

// Change icon when play or pause
function updatePlayIcon(isPlaying) {
  if (isPlaying) {
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  } else {
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
  }
}

// Listen for user events and handle them using addEventListener
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
// use arrow function to handle lots of task (not 1 task)
playBtn.addEventListener("click", () => {
  togglePlay();
  updatePlayIcon(getIsPlaying());
});

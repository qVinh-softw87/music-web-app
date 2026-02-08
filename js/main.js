import {
  togglePlay,
  next,
  prev,
  getAudio,
} from "./logic/player.js";

import { songs } from "./data/data.js";
import { formatTime } from "./utils/formattime.js";
import { getRandomItems } from "./utils/random.js";
import { renderSongs } from "./ui/renderSongs.js";
import { updateUIAfterPlay } from "./ui/updateUIAfterPlay.js";
import { handleSongClick } from "./handlers/songClickHandler.js";

// Button
const playBtn = document.getElementById("play-button");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("previous-btn");

// Progress bar elements
const progress = document.querySelector("[data-progress]");
const currentTimeEl = document.querySelector("[data-current-time]");
const durationTimeEl = document.querySelector("[data-duration]");

// Get HTML element whose is a skeleton of 8 items
const songList = document.getElementById("song-list");

// limit 8 songs when render in 8 items at head
const randomSongs = getRandomItems(
  songs.map((song, index) => ({
    ...song,
    _originIndex: index,
  })),
  8
);

// Get audio()
const audio = getAudio();

// Init app
renderSongs({ songs: randomSongs, container: songList });
updateUIAfterPlay();

// Render play and pause icon
playBtn.addEventListener("click", () => {
  togglePlay();
  updateUIAfterPlay();
});

// Handling when click UI for playing song
songList.addEventListener("click", handleSongClick);

// Render when click next and previous button
nextBtn.addEventListener("click", () => {
  next();
  updateUIAfterPlay();
});
prevBtn.addEventListener("click", () => {
  prev();
  updateUIAfterPlay();
});

// ******Audio <-> UI******
// After loaded song, render total time
audio.onloadedmetadata = () => {
  durationTimeEl.textContent = formatTime(audio.duration);
};

// Browser triggers ontimeupdate to update current time, progress bar
audio.ontimeupdate = () => {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;

  progress.value = percent;
  progress.style.setProperty("--progress", `${percent}%`);

  currentTimeEl.textContent = formatTime(audio.currentTime);
};

// Handling the seek bar interaction
progress.addEventListener("input", () => {
  const newTime = (progress.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

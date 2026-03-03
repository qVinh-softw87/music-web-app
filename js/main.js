import {
  togglePlay,
  next,
  prev,
  getAudio,
  toggleRepeat,
  toggleShuffle,
} from "./logic/player.js";
import { songs } from "./data/data.js";
import { formatTime } from "./utils/formattime.js";
import { getRandomItems } from "./utils/random.js";
import { renderSongs } from "./ui/renderSongs.js";
import { handleSongClick } from "./handlers/songClickHandler.js";
import { applyState } from "./logic/applyState.js";
import { playerState } from "./state/playerState.js";
import { openFullscreen } from "./ui/fullscreen.js";
/* ======================
   DOM ELEMENTS
====================== */

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

/* ======================
   DATA PREPARE
====================== */

// limit 8 songs when render in 8 items at head
const songsWithIndex = songs.map((song, index) => ({
  ...song,
  _originIndex: index,
}));

const randomSongs = getRandomItems(songsWithIndex, 8);

// Get audio()
const audio = getAudio();

/* ======================
   INIT APP
====================== */

playerState.songs = randomSongs;

renderSongs({
  songs: playerState.songs,
  container: songList,
});

applyState();

/* ======================
   EVENTS
====================== */

// Render play and pause icon
playBtn.addEventListener("click", () => {
  togglePlay();
  applyState();
});

// Handling when click UI for playing song
songList.addEventListener("click", handleSongClick);

// Render when click next and previous button
nextBtn.addEventListener("click", () => {
  next();
  applyState();
});

prevBtn.addEventListener("click", () => {
  prev();
  applyState();
});

/* ======================
   AUDIO <-> UI
====================== */

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
// Handling when click repeat mode
const repeatBtn = document.getElementById("repeat-btn");

repeatBtn.addEventListener("click", () => {
  toggleRepeat();
  applyState();
});
// Handling when ended for repeat
audio.addEventListener("ended", () => {
  const { repeatMode, currentIndex, songs } = playerState;

  if (repeatMode === "one") {
    audio.currentTime = 0;
    audio.play();
    return;
  }

  if (repeatMode === "all") {
    next();
    applyState();
    return;
  }

  if (currentIndex < songs.length - 1) {
    next();
    applyState();
  } else {
    playerState.isPlaying = false;
    applyState();
  }
});
// Handling shuffle
const shuffleBtn = document.getElementById("shuffle-btn");
shuffleBtn.addEventListener("click", () => {
  toggleShuffle();
  applyState();
});
// Handling volume
const volumeSlider = document.getElementById("volumeRange");
volumeSlider.addEventListener("input", (e) => {
  playerState.volume = Number(e.target.value) / 100;
  playerState.isMuted = false;
  applyState();
});

const volumeIconBtn = document.getElementById("data-volume");
volumeIconBtn.addEventListener("click", () => {
  playerState.isMuted = !playerState.isMuted;
  applyState();
});
// Handling fullscreen
const fullscreenBtn = document.getElementById("full-screen");
fullscreenBtn.addEventListener("click", () => {
  openFullscreen();
});
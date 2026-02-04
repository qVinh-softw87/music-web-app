import {
  togglePlay,
  next,
  prev,
  getIsPlaying,
  getCurrentSong,
  getAudio,
  getLoadSong,
  getPlay,
} from "./player.js";

// Button
const playBtn = document.getElementById("play-button");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("previous-btn");

// Song info
const musicName = document.getElementById("music-name");
const artistName = document.getElementById("artist-name");

// Progress bar elements
const progress = document.querySelector("[data-progress]");
const currentTimeEl = document.querySelector("[data-current-time]");
const durationTimeEl = document.querySelector("[data-duration]");

// Interaction UI for play song element
const songCards = document.querySelectorAll(".song-card");

// Get audio()
const audio = getAudio();
//******RENDER FUNCTION******
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

// Render information of current song
function renderSongInfo() {
  const song = getCurrentSong();
  musicName.textContent = song.title;
  artistName.textContent = song.artist;
}

// Format second -> mm:ss
function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

// Render the first song when app init
renderSongInfo();
updatePlayIcon(getIsPlaying());

// Render play and pause icon
playBtn.addEventListener("click", () => {
  togglePlay();
  updatePlayIcon(getIsPlaying());
});

// Render when click next and previous button
nextBtn.addEventListener("click", () => {
  next();
  renderSongInfo();
  updatePlayIcon(true);
});
prevBtn.addEventListener("click", () => {
  prev();
  renderSongInfo();
  updatePlayIcon(true);
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

// Handling when click UI for playing song
songCards.forEach((card) => {
  card.addEventListener("click", () => {
    const index = Number(card.dataset.index);

    getLoadSong(index);
    getPlay();
    renderSongInfo();
    updatePlayIcon(true);
  });
});

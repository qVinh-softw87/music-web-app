import { playerState } from "../state/playerState.js";

const audio = new Audio();

/* ======================
   AUDIO
====================== */

export function getAudio() {
  return audio;
}

/* ======================
   STATE ACTIONS
====================== */

export function loadSong(index) {
  playerState.currentIndex = index;
}

export function play() {
  playerState.isPlaying = true;
}

export function pause() {
  playerState.isPlaying = false;
}

export function togglePlay() {
  playerState.isPlaying ? pause() : play();
}

export function next() {
  if (!playerState.songs.length) return;

  if (playerState.shuffle) {
    const randomIndex = Math.floor(Math.random() * playerState.songs.length);

    playerState.currentIndex = randomIndex;
  } else {
    playerState.currentIndex =
      (playerState.currentIndex + 1) % playerState.songs.length;
  }

  playerState.isPlaying = true;
}

export function prev() {
  if (!playerState.songs.length) return;
  playerState.currentIndex =
    (playerState.currentIndex - 1 + playerState.songs.length) %
    playerState.songs.length;
  playerState.isPlaying = true;
}

/* ======================
   SELECTORS
====================== */

export function getCurrentSong() {
  const song = playerState.songs[playerState.currentIndex];
  if (!song) return null;

  return {
    ...song,
    index: playerState.currentIndex,
  };
}

export function getIsPlaying() {
  return playerState.isPlaying;
}
// Handling repeat toggle
export function toggleRepeat() {
  const modes = ["off", "all", "one"];
  const currentIndex = modes.indexOf(playerState.repeatMode);
  const nextIndex = (currentIndex + 1) % modes.length;
  playerState.repeatMode = modes[nextIndex];
}
// Handling shuffle toggle
export function toggleShuffle() {
  playerState.shuffle = !playerState.shuffle;
}

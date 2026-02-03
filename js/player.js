import { songs } from "./data.js";

const audio = new Audio(); // use Audio object to use function of this object

let currentIndex = 0; // current index
let isPlaying = false; // set up state for play button

// loadSong: pick the song for player
export function loadSong(index) { 
    currentIndex = index;
    audio.src = songs[currentIndex].src;
}

// play function
export function play() {
    audio.play();
    isPlaying = true;
}

// pause function
export function pause() {
    audio.pause();
    isPlaying = false;
}

// togglePlay function like switch
export function togglePlay() {
    isPlaying ? pause() : play();
}

// next function for choosing the next song
export function next() {
    currentIndex = (currentIndex + 1) % songs.length; 
    loadSong(currentIndex);
    play();
}

// prev function for choosing the previous song
export function prev() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    play();
}

// export isPlaying for using in main.js
export function getIsPlaying() {
    return isPlaying;
}

// starting with the first song when the app is setting
loadSong(0); 








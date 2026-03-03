import { getAudio } from "../logic/player.js";
import { playerState } from "../state/playerState.js";

let lastIndex = null;

export function syncAudioWithState() {
  const audio = getAudio();
  const { currentIndex, songs, isPlaying } = playerState;

  const song = songs[currentIndex];
  if (!song) return;

  if (currentIndex !== lastIndex) {
    audio.src = song.src;
    lastIndex = currentIndex;
  }

  if (isPlaying) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }

  audio.volume = playerState.volume;
  audio.muted = playerState.isMuted;
}

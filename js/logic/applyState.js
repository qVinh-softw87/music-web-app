import { syncAudioWithState } from "../audio/audioController.js"
import { updateUIAfterPlay } from "../ui/updateUIAfterPlay.js";

export function applyState() {
  syncAudioWithState();
  updateUIAfterPlay();
}


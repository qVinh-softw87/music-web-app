import {
  togglePlay,
  next,
  prev,
  toggleRepeat,
  toggleShuffle,
  getAudio,
} from "../logic/player.js";
import { applyState } from "../logic/applyState.js";
import { playerState } from "../state/playerState.js";
import { formatTime } from "../utils/formattime.js";

/* ============================================================
   FULLSCREEN OVERLAY — inject once into DOM
============================================================ */

const REPEAT_ALL_PATH = `<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75z"></path>`;
const REPEAT_ONE_PATH = `<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75zM12.25 2.5a2.25 2.25 0 0 1 2.25 2.25v5A2.25 2.25 0 0 1 12.25 12H9.81l1.018-1.018a.75.75 0 0 0-1.06-1.06L6.939 12.75l2.829 2.828a.75.75 0 1 0 1.06-1.06L9.811 13.5h2.439A3.75 3.75 0 0 0 16 9.75v-5A3.75 3.75 0 0 0 12.25 1h-.75v1.5z"></path><path d="m8 1.85.77.694H6.095V1.488q1.046-.077 1.507-.385.474-.308.583-.913h1.32V8H8z"></path><path d="M8.77 2.544 8 1.85v.693z"></path>`;

function createOverlay() {
  const el = document.createElement("div");
  el.id = "fs-overlay";
  el.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    display: none; flex-direction: column;
    background: #000; overflow: hidden;
    transition: opacity 0.35s ease;
    opacity: 0;
  `;

  el.innerHTML = `
    <!-- Blurred bg -->
    <div id="fs-bg" style="
      position:absolute;inset:0;
      background-size:cover;background-position:center;
      filter:blur(60px) brightness(0.35) saturate(1.4);
      transform:scale(1.1);
      transition: background-image 0.6s ease;
    "></div>

    <!-- Gradient overlay -->
    <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%);pointer-events:none;"></div>

    <!-- Top bar: minimize button -->
    <div style="position:relative;z-index:1;display:flex;justify-content:flex-end;padding:20px 24px;">
      <button id="fs-minimize" title="Thu nhỏ" style="
        background:rgba(255,255,255,0.12);border:none;border-radius:50%;
        width:40px;height:40px;cursor:pointer;display:flex;align-items:center;justify-content:center;
        transition:background 0.15s,transform 0.15s;
      "
        onmouseover="this.style.background='rgba(255,255,255,0.22)';this.style.transform='scale(1.1)'"
        onmouseout="this.style.background='rgba(255,255,255,0.12)';this.style.transform='scale(1)'"
      >
        <!-- Minimize / compress icon -->
        <svg viewBox="0 0 16 16" width="18" height="18" fill="white">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5.125 1.25H1.75V2.75H4.375V5.17857H5.875V2C5.875 1.58579 5.53921 1.25 5.125 1.25ZM10.125 1.25H13.5V2.75H10.875V5.17857H9.375V2C9.375 1.58579 9.71079 1.25 10.125 1.25ZM4.375 13.25H1.75V11.75H4.375V14.1786C4.375 14.5928 4.03921 14.9286 3.625 14.9286H1.75V13.25H3C3.13807 13.25 3.25 13.1381 3.25 13V11.8214H4.375V13.25ZM10.875 13.25H13.5V11.75H10.875V14.1786C10.875 14.5928 11.2108 14.9286 11.625 14.9286H13.5V13.25H12.25C12.1119 13.25 12 13.1381 12 13V11.8214H10.875V13.25Z"/>
        </svg>
      </button>
    </div>

    <!-- Center: album art + info -->
    <div style="
      position:relative;z-index:1;flex:1;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      gap:24px;padding:0 24px;
    ">
      <img id="fs-cover" src="" alt="cover" style="
        width:min(320px,55vw);height:min(320px,55vw);
        border-radius:12px;object-fit:cover;
        box-shadow:0 24px 80px rgba(0,0,0,0.7);
        transition: src 0.4s ease;
      "/>
      <div style="text-align:center;">
        <div id="fs-title" style="color:#fff;font-size:1.5rem;font-weight:700;margin-bottom:6px;"></div>
        <div id="fs-artist" style="color:rgba(255,255,255,0.65);font-size:1rem;font-weight:400;"></div>
      </div>
    </div>

    <!-- Bottom controls -->
    <div style="position:relative;z-index:1;padding:0 10% 40px;display:flex;flex-direction:column;gap:16px;">
      <!-- Progress bar row -->
      <div style="display:flex;align-items:center;gap:12px;">
        <span id="fs-current-time" style="color:rgba(255,255,255,0.6);font-size:0.75rem;min-width:36px;text-align:right;user-select:none;">0:00</span>
        <input id="fs-progress" type="range" min="0" max="100" value="0"
          class="progress-range" style="flex:1;cursor:pointer;--progress:0%;"
        />
        <span id="fs-duration" style="color:rgba(255,255,255,0.6);font-size:0.75rem;min-width:36px;user-select:none;">0:00</span>
      </div>

      <!-- Buttons row -->
      <div style="display:flex;align-items:center;justify-content:center;gap:28px;">
        <!-- Shuffle -->
        <button id="fs-shuffle-btn" title="Shuffle" style="background:none;border:none;cursor:pointer;padding:6px;border-radius:50%;transition:transform 0.15s;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
          <svg id="fs-shuffle-icon" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" style="color:#ccc;transition:color 0.15s;">
            <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75z"></path>
            <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path>
          </svg>
        </button>

        <!-- Previous -->
        <button id="fs-prev-btn" style="background:none;border:none;cursor:pointer;padding:6px;border-radius:50%;transition:transform 0.15s;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
          <svg viewBox="0 0 16 16" width="22" height="22" fill="#ccc"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z"></path></svg>
        </button>

        <!-- Play/Pause -->
        <button id="fs-play-btn" style="
          width:64px;height:64px;border-radius:50%;background:#fff;border:none;
          display:flex;align-items:center;justify-content:center;cursor:pointer;
          transition:background 0.15s,transform 0.15s;
        " onmouseover="this.style.background='#e5e5e5';this.style.transform='scale(1.06)'" onmouseout="this.style.background='#fff';this.style.transform='scale(1)'">
          <svg id="fs-play-icon" viewBox="0 0 16 16" width="26" height="26" fill="black" style="transform:translateX(1px)">
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
          </svg>
          <svg id="fs-pause-icon" viewBox="0 0 16 16" width="26" height="26" fill="black" style="display:none;">
            <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path>
          </svg>
        </button>

        <!-- Next -->
        <button id="fs-next-btn" style="background:none;border:none;cursor:pointer;padding:6px;border-radius:50%;transition:transform 0.15s;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
          <svg viewBox="0 0 16 16" width="22" height="22" fill="#ccc"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path></svg>
        </button>

        <!-- Repeat -->
        <button id="fs-repeat-btn" title="Repeat" style="background:none;border:none;cursor:pointer;padding:6px;border-radius:50%;transition:transform 0.15s;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
          <svg id="fs-repeat-icon" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" style="color:#ccc;transition:color 0.15s;">
            ${REPEAT_ALL_PATH}
          </svg>
        </button>
      </div>

      <!-- Volume row -->
      <div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-top:4px;">
        <button id="fs-volume-btn" style="background:none;border:none;cursor:pointer;padding:4px;transition:transform 0.15s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          <svg viewBox="0 0 16 16" width="18" height="18" fill="#ccc">
            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88"/>
            <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127z"/>
          </svg>
        </button>
        <input id="fs-volume" type="range" min="0" max="100" value="50"
          class="volume-slider" style="width:120px;cursor:pointer;"
        />
      </div>
    </div>
  `;

  document.body.appendChild(el);
  return el;
}

/* ============================================================
   MODULE STATE
============================================================ */
let overlay = null;
let isFullscreen = false;

/* ============================================================
   OPEN / CLOSE
============================================================ */
export function openFullscreen() {
  if (!overlay) overlay = createOverlay();

  isFullscreen = true;
  overlay.style.display = "flex";
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });

  syncFullscreenUI();
  bindFullscreenEvents();
}

export function closeFullscreen() {
  if (!overlay) return;
  isFullscreen = false;
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 350);
}

export function getIsFullscreen() {
  return isFullscreen;
}

/* ============================================================
   SYNC FULLSCREEN UI FROM playerState
============================================================ */
export function syncFullscreenUI() {
  if (!overlay || !isFullscreen) return;

  const song = playerState.songs[playerState.currentIndex];
  if (!song) return;

  // Background + cover
  const bg = document.getElementById("fs-bg");
  const cover = document.getElementById("fs-cover");
  if (bg) bg.style.backgroundImage = `url('${song.cover}')`;
  if (cover) cover.src = song.cover;

  // Title / artist
  const title = document.getElementById("fs-title");
  const artist = document.getElementById("fs-artist");
  if (title) title.textContent = song.title;
  if (artist) artist.textContent = song.artist;

  // Play / Pause icons
  const fsPlay = document.getElementById("fs-play-icon");
  const fsPause = document.getElementById("fs-pause-icon");
  if (fsPlay && fsPause) {
    if (playerState.isPlaying) {
      fsPlay.style.display = "none";
      fsPause.style.display = "block";
    } else {
      fsPlay.style.display = "block";
      fsPause.style.display = "none";
    }
  }

  // Repeat
  const repeatIcon = document.getElementById("fs-repeat-icon");
  if (repeatIcon) {
    switch (playerState.repeatMode) {
      case "off":
        repeatIcon.innerHTML = REPEAT_ALL_PATH;
        repeatIcon.style.color = "#ccc";
        break;
      case "all":
        repeatIcon.innerHTML = REPEAT_ALL_PATH;
        repeatIcon.style.color = "#22c55e";
        break;
      case "one":
        repeatIcon.innerHTML = REPEAT_ONE_PATH;
        repeatIcon.style.color = "#22c55e";
        break;
    }
  }

  // Shuffle
  const shuffleIcon = document.getElementById("fs-shuffle-icon");
  if (shuffleIcon) {
    shuffleIcon.style.color = playerState.shuffle ? "#22c55e" : "#ccc";
  }

  // Volume
  const fsVolume = document.getElementById("fs-volume");
  if (fsVolume) {
    fsVolume.value = playerState.isMuted ? 0 : playerState.volume * 100;
  }

  // Progress / time — synced via audio
  const audio = getAudio();
  const fsProg = document.getElementById("fs-progress");
  const fsCurrent = document.getElementById("fs-current-time");
  const fsDuration = document.getElementById("fs-duration");

  if (fsProg && audio.duration) {
    const pct = (audio.currentTime / audio.duration) * 100 || 0;
    fsProg.value = pct;
    fsProg.style.setProperty("--progress", `${pct}%`);
  }
  if (fsCurrent) fsCurrent.textContent = formatTime(audio.currentTime || 0);
  if (fsDuration) fsDuration.textContent = formatTime(audio.duration || 0);
}

/* ============================================================
   BIND EVENTS (called once per open — guard with flag)
============================================================ */
let eventsBound = false;

function bindFullscreenEvents() {
  if (eventsBound) return;
  eventsBound = true;

  const audio = getAudio();

  // Minimize
  document
    .getElementById("fs-minimize")
    .addEventListener("click", closeFullscreen);

  // Play / Pause
  document.getElementById("fs-play-btn").addEventListener("click", () => {
    togglePlay();
    applyState();
  });

  // Next / Prev
  document.getElementById("fs-next-btn").addEventListener("click", () => {
    next();
    applyState();
  });
  document.getElementById("fs-prev-btn").addEventListener("click", () => {
    prev();
    applyState();
  });

  // Repeat
  document.getElementById("fs-repeat-btn").addEventListener("click", () => {
    toggleRepeat();
    applyState();
  });

  // Shuffle
  document.getElementById("fs-shuffle-btn").addEventListener("click", () => {
    toggleShuffle();
    applyState();
  });

  // Volume slider
  document.getElementById("fs-volume").addEventListener("input", (e) => {
    playerState.volume = Number(e.target.value) / 100;
    playerState.isMuted = false;
    applyState();
  });

  // Volume icon mute toggle
  document.getElementById("fs-volume-btn").addEventListener("click", () => {
    playerState.isMuted = !playerState.isMuted;
    applyState();
  });

  // Progress seek
  const fsProg = document.getElementById("fs-progress");
  fsProg.addEventListener("input", () => {
    const newTime = (fsProg.value / 100) * audio.duration;
    audio.currentTime = newTime;
  });

  // Keep fullscreen progress in sync with audio timeupdate
  audio.addEventListener("timeupdate", () => {
    if (!isFullscreen) return;
    const pct = (audio.currentTime / audio.duration) * 100 || 0;
    fsProg.value = pct;
    fsProg.style.setProperty("--progress", `${pct}%`);

    const fsCurrent = document.getElementById("fs-current-time");
    if (fsCurrent) fsCurrent.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("loadedmetadata", () => {
    if (!isFullscreen) return;
    const fsDuration = document.getElementById("fs-duration");
    if (fsDuration) fsDuration.textContent = formatTime(audio.duration);
  });

  // Keyboard: Escape to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isFullscreen) closeFullscreen();
  });
}

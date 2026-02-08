export function renderSongs({ container, songs }) {
  container.innerHTML = "";

  songs.forEach((song) => {
    const card = document.createElement("a");
    card.href = "#!";
    card.dataset.index = song._originIndex;

    card.className =
      "song-card group flex items-center h-[72px] rounded-md overflow-hidden bg-white/10 hover:bg-white/15 transition";
    card.innerHTML = `
  <img
    src="${song.cover}"
    class="w-[72px] h-[72px] object-cover shrink-0"
  />
  <span class="px-4 text-white font-semibold truncate">
    ${song.title}
  </span>
`;

    container.appendChild(card);
  });
}

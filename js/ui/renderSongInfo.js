export function renderSongInfo(song) {
  const musicName = document.getElementById("music-name");
  const artistName = document.getElementById("artist-name");
  const coverImg = document.getElementById("cover");

  if(!song) return;
      
  musicName.textContent = song.title;
  artistName.textContent = song.artist;
  coverImg.src = song.cover;
}

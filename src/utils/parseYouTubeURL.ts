export function parseYouTubeURL(url: string) {
  // Normalize: convert HTML-encoded &amp; into &
  const input = String(url).trim().replace(/&amp;/g, "&");

  // --- PLAYLIST ID ---
  const playlistRegex = /[?&]list=([A-Za-z0-9_-]+)/;
  const playlistMatch = input.match(playlistRegex);
  const playlistId = playlistMatch ? playlistMatch[1] : null;

  // --- Special case: embed/videoseries (playlist embed) ---
  const isEmbedVideoseries = /\/embed\/videoseries\b/.test(input);

  // --- VIDEO ID ---
  const videoRegex =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/;

  const videoMatch = input.match(videoRegex);

  const videoId =
    videoMatch && !(isEmbedVideoseries && videoMatch[1] === "videoseries")
      ? videoMatch[1]
      : null;

  return {
    videoId,
    playlistId,
  };
}

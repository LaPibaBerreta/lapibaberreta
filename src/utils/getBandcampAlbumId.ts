export function getBandcampAlbumId(embed: string) {
  const regex = /(?:bandcamp\.com\/EmbeddedPlayer\/(?:[^/]+\/)*album=(\d+))/;
  const match = embed.match(regex);

  return {
    albumId: match ? match[1] : null,
  };
}

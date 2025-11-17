import { getBandcampAlbumId } from "../utils/getBandcampAlbumId";

export default function BandcampPlayer({ embedData }: { embedData: string }) {
  const embedId = getBandcampAlbumId(embedData).albumId;

  const embedUrl = `https://bandcamp.com/EmbeddedPlayer/album=${embedId}/size=large/bgcol=333333/linkcol=ffffff/artwork=false/transparent=true/tracklist=true`;

  return (
    <>
      <iframe
        // bandcamp tiene 700px como maximo
        width={600}
        height={600}
        src={embedUrl}
        seamless
      ></iframe>
    </>
  );
}

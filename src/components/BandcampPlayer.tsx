import { getBandcampAlbumId } from "../utils/getBandcampAlbumId";
import useIsMobile from "../hooks/useIsMobile";

export default function BandcampPlayer({ embedData }: { embedData: string }) {
  const embedId = getBandcampAlbumId(embedData).albumId;
  const { isMobile } = useIsMobile();

  const embedUrl = `https://bandcamp.com/EmbeddedPlayer/album=${embedId}/size=large/bgcol=333333/linkcol=ff3300/artwork=false/transparent=true/tracklist=true`;

  return (
    <>
      <iframe
        // bandcamp tiene 700px como maximo
        width={!isMobile ? 350 : 700}
        height={300}
        src={embedUrl}
        seamless
        className="sm:rounded-t-sm"
      ></iframe>
    </>
  );
}

import { parseYouTubeURL } from "../utils/parseYouTubeURL";

export default function VideoPlayer({ embedData }: { embedData: string }) {
  const { videoId, playlistId } = parseYouTubeURL(embedData);

  if (!videoId && !playlistId) {
    // TODO: agregar mensaje de error
    return <div className="text-red-500">¯\_(ツ)_/¯</div>;
  }

  if (!videoId && playlistId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
        allowFullScreen
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        className="h-full w-full rounded-2xl bg-black"
      />
    );
  }

  return (
    <>
      <iframe
        src={`https://youtube.com/embed/${videoId}`}
        allowFullScreen
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        className="h-full w-full rounded-2xl bg-black"
      />
    </>
  );
}

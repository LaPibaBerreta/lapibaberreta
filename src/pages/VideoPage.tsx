import { useParams } from "react-router";
import { useVideo } from "../hooks/useVideo";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import VideoPlayer from "../components/VideoPlayer";
import useLanguage from "../hooks/useLanguage";

export default function VideoPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: video, isLoading, error } = useVideo(slug!);
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {video?.embed && <VideoPlayer embedData={video?.embed} />}
      {video?.text?.es && (
        <div className="mt-2">
          <PortableText value={video.text[language] || video.text.es} />
        </div>
      )}
    </>
  );
}

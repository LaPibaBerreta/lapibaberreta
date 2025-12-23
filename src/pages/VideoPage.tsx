import { useParams } from "react-router";
import type { InitialDataQueryResult } from "@/lib/types";
import { useVideo } from "../hooks/useVideo";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../lib/sanityImageUrl";
import VideoPlayer from "../components/VideoPlayer";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function VideoPage({ section }: { section: Section }) {
  const { slug } = useParams<{ slug: string }>();
  const { data: video, isLoading, error } = useVideo(slug!);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  console.log("Location:", location);
  console.log("Slug from useParams:", slug);
  console.log("Section:", section);

  return (
    <>
      <h1 className="text-xl">{video?.title?.es}</h1>
      <p>{video?.date}</p>

      {video?.image && (
        <img
          src={urlFor(video.image).format("webp").width(600).url() + "&fit=max"}
        />
      )}

      {video?.embed && <VideoPlayer embedData={video?.embed} />}
      {video?.text?.es && <PortableText value={video.text?.es} />}
    </>
  );
}

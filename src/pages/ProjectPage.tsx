import { useParams } from "react-router";
import type { InitialDataQueryResult } from "@/lib/types";
import { useProject } from "../hooks/useProject";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../lib/sanityImageUrl";
import BandcampPlayer from "../components/BandcampPlayer";
import VideoPlayer from "../components/VideoPlayer";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function ProjectPage({ section }: { section: Section }) {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useProject(slug!);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  console.log("Location:", location);
  console.log("Slug from useParams:", slug);
  console.log("Section:", section);

  console.log("useProhect", data);
  return (
    <>
      <h1 className="text-xl">{data?.title?.es}</h1>
      {data?.mainImage && (
        <img
          src={
            urlFor(data.mainImage).format("webp").width(600).url() + "&fit=max"
          }
        />
      )}
      {data?.embed && (
        <div className="my-2 w-full sm:w-1/2">
          <BandcampPlayer embedData={data.embed} />
        </div>
      )}

      {data?.text?.es && <PortableText value={data.text.es} />}
      {data?.links?.length &&
        data.links.map((link) => (
          <a
            key={link._key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {link.title?.es}
          </a>
        ))}
      {data?.videos?.length &&
        data.videos.map((video) => (
          <div key={video._id} className="bg-violet-400">
            {video?.title?.es}
            {video?.embed && <VideoPlayer embedData={video.embed} />}
          </div>
        ))}
    </>
  );
}

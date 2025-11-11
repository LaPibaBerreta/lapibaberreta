import { useParams } from "react-router";
import type { InitialDataQueryResult } from "@/lib/types";
import { useProject } from "../hooks/useProject";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../lib/sanityImageUrl";

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
      {data?.text?.es && <PortableText value={data.text.es} />}
      {data?.videos?.length &&
        data.videos.map((video) => (
          <div key={video._id} className="bg-violet-400">
            {video?.title?.es}
          </div>
        ))}
    </>
  );
}

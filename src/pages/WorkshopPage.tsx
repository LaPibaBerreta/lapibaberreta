import { useParams } from "react-router";
import type { InitialDataQueryResult } from "@/lib/types";
import { useWorkshop } from "../hooks/useWorkshop";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../lib/sanityImageUrl";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function WorkshopPage({ section }: { section: Section }) {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useWorkshop(slug!);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  console.log("Location:", location);
  console.log("Slug from useParams:", slug);
  console.log("Section:", section);

  return (
    <>
      <h1 className="text-xl">{data?.title?.es}</h1>
      <p>{data?.date}</p>

      {data?.image && (
        <img
          src={urlFor(data.image).format("webp").width(600).url() + "&fit=max"}
        />
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
    </>
  );
}

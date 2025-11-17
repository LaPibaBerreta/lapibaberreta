import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { useShows } from "../hooks/useShows";
import { urlFor } from "../lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Shows({ section }: { section: Section }) {
  const { data, isLoading, error } = useShows();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <section>
      {section.title && <h1 className="text-xl">{section.title.es}</h1>}
      {data &&
        data.map((show) => (
          <div key={show._id}>
            {show.title?.es && <h2>{show.title.es}</h2>}
            {show.date && <p>{show.date}</p>}

            {show.image && (
              <img
                src={
                  urlFor(show.image).format("webp").width(600).url() +
                  "&fit=max"
                }
              />
            )}
            {show.text?.es && <PortableText value={show.text?.es} />}

            {show.links?.length &&
              show.links.map((link) => (
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

            <hr className="my-6 w-full" />
          </div>
        ))}
    </section>
  );
}

import Loading from "../components/Loading";
import type { InitialDataQueryResult } from "@/lib/types";
import { useShows } from "../hooks/useShows";
import { useInfo } from "../hooks/useInfo";
import { urlFor } from "../lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Shows({ section }: { section: Section }) {
  const { data, isLoading, error } = useShows();
  const {
    data: infoData,
    isLoading: isInfoLoading,
    error: infoError,
  } = useInfo();
  const { language } = useLanguage();

  if (isLoading || isInfoLoading) return <Loading />;
  if (error || infoError)
    return <div>{error?.message || infoError?.message}</div>;

  return (
    <section>
      {section.title?.es && (
        <h1 className="text-xl">
          {section.title[language] || section.title.es}
        </h1>
      )}
      {infoData?.bookingInfo?.es && (
        <PortableText
          value={infoData.bookingInfo[language] || infoData.bookingInfo.es}
        />
      )}
      {data &&
        data.map((show) => (
          <div key={show._id}>
            {show.title?.es && <h2>{show.title[language] || show.title.es}</h2>}
            {show.date && <p>{show.date}</p>}

            {show.image && (
              <img
                src={
                  urlFor(show.image).format("webp").width(600).url() +
                  "&fit=max"
                }
              />
            )}
            {show.text?.es && (
              <PortableText value={show.text[language] || show.text.es} />
            )}

            {show.links?.length &&
              show.links.map((link) => (
                <a
                  key={link._key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {link.title?.es && (link.title[language] || link.title.es)}
                </a>
              ))}

            <hr className="my-6 w-full" />
          </div>
        ))}
    </section>
  );
}

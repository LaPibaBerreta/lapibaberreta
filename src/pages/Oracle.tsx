import type { InitialDataQueryResult } from "@/lib/types";
import { useOraculo } from "../hooks/useOraculo";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../lib/sanityImageUrl";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

export default function Oracle({ section }: { section: Section }) {
  const { data, isLoading, error } = useOraculo();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  return (
    <>
      {section.title && <h1 className="text-xl">{section.title.es}</h1>}
      {data?.text?.es && <PortableText value={data.text.es} />}
      <div className="my-6 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {data?.cards?.length &&
          data.cards.map((card) => (
            <div key={card._key} className="border-2">
              {card.title?.es && <h2>{card.title.es}</h2>}
              {card.text?.es && <PortableText value={card.text.es} />}
              {card.image && (
                <img
                  src={
                    urlFor(card.image).format("webp").width(400).url() +
                    "&fit=max"
                  }
                />
              )}
            </div>
          ))}
      </div>
    </>
  );
}

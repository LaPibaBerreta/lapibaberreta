import { useState } from "react";
import type { InitialDataQueryResult, OraculoQueryResult } from "@/lib/types";
import { useOraculo } from "../hooks/useOraculo";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../lib/sanityImageUrl";
import useLanguage from "../hooks/useLanguage";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

type OracleCard = NonNullable<NonNullable<OraculoQueryResult>["cards"]>[number];

export default function Oracle({ section }: { section: Section }) {
  const { data, isLoading, error } = useOraculo();
  const [currentCard, setCurrentCard] = useState<OracleCard | null>(null);
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  const handleGetCard = () => {
    if (!data?.cards?.length) return;
    setCurrentCard(
      data?.cards?.[Math.floor(Math.random() * data?.cards?.length)],
    );
  };

  return (
    <>
      {section.title && (
        <h1 className="text-xl">
          {section.title.es && (section.title[language] || section.title.es)}
        </h1>
      )}
      {data?.text?.es && (
        <PortableText value={data.text[language] || data.text.es} />
      )}

      <button className="my-2 border px-2" onClick={handleGetCard}>
        {language === "es" ? "Pedir Carta" : "Ask a Card"}
      </button>

      {currentCard && (
        <div key={currentCard._key} className="border-2">
          {currentCard.title?.es && (
            <h2>{currentCard.title[language] || currentCard.title.es}</h2>
          )}
          {currentCard.text?.es && (
            <PortableText
              value={currentCard.text[language] || currentCard.text.es}
            />
          )}
          {currentCard.image && (
            <img
              src={
                urlFor(currentCard.image).format("webp").width(400).url() +
                "&fit=max"
              }
            />
          )}
        </div>
      )}
    </>
  );
}

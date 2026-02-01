import { useState } from "react";
import type { InitialDataQueryResult, OraculoQueryResult } from "@/lib/types";
import { useOraculo } from "../hooks/useOraculo";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../lib/sanityImageUrl";
import useLanguage from "../hooks/useLanguage";
import TiltedCard from "../components/TiltedCard";
import SectionTitle from "../components/SectionTitle";

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
    <div className="_justify-center flex h-full flex-col items-center gap-2">
      {section?.title?.es && (
        <SectionTitle>
          {section.title[language] || section.title.es}
        </SectionTitle>
      )}
      {currentCard ? (
        <div
          key={currentCard._key}
          className="flex flex-col items-center gap-2"
        >
          {currentCard.image && currentCard.title?.es && (
            <TiltedCard
              imageSrc={
                urlFor(currentCard.image).format("webp").width(400).url() +
                "&fit=max"
              }
              altText={currentCard.title[language] || currentCard.title.es}
              captionText={currentCard.title[language] || currentCard.title.es}
              containerHeight="350px"
              containerWidth="350px"
              imageHeight="350px"
              imageWidth="350px"
              rotateAmplitude={19}
              scaleOnHover={1.25}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
              overlayContent={
                <p className="tilted-card-demo-text">
                  {currentCard.title[language] || currentCard.title.es}
                </p>
              }
            />
          )}

          {currentCard.title?.es && (
            <h2>{currentCard.title[language] || currentCard.title.es}</h2>
          )}
          {currentCard.text?.es && (
            <div className="max-w-prose">
              <PortableText
                value={currentCard.text[language] || currentCard.text.es}
              />
            </div>
          )}
        </div>
      ) : (
        data?.text?.es && (
          <div className="max-w-prose text-center">
            <PortableText value={data.text[language] || data.text.es} />
          </div>
        )
      )}

      <button className="my-2 border px-2 text-2xl" onClick={handleGetCard}>
        {language === "es" ? "Pedir Carta" : "Ask a Card"}
      </button>
    </div>
  );
}

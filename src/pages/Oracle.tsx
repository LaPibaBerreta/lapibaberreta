import { useState, useRef } from "react";
import type { InitialDataQueryResult, OraculoQueryResult } from "@/lib/types";
import { useOraculo } from "../hooks/useOraculo";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../lib/sanityImageUrl";
import useLanguage from "../hooks/useLanguage";
import TiltedCard from "../components/TiltedCard";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";

type Section = NonNullable<
  NonNullable<InitialDataQueryResult>["sections"]
>[number];

type OracleCard = NonNullable<NonNullable<OraculoQueryResult>["cards"]>[number];

export default function Oracle({ section }: { section: Section }) {
  const { data, isLoading, error } = useOraculo();
  const [currentCard, setCurrentCard] = useState<OracleCard | null>(null);
  const { language } = useLanguage();
  const topRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (isLoading) return <Loading />;
  if (error) return <div>error.message</div>;

  const handleGetCard = () => {
    if (!data?.cards?.length) return;
    setCurrentCard(
      data?.cards?.[Math.floor(Math.random() * data?.cards?.length)],
    );
  };

  const title = currentCard?.title?.es
    ? currentCard.title[language] || currentCard.title.es
    : section?.title?.es && (section.title[language] || section.title.es);

  return (
    <div
      ref={topRef}
      className="mb-16 flex scroll-m-16 flex-col items-center gap-6"
    >
      {title && (
        <h1 className="font-secondary mb-3 text-6xl capitalize">
          {title.toLowerCase()}
        </h1>
      )}

      {currentCard ? (
        <div
          key={currentCard._key}
          className="flex flex-col items-center gap-6"
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

          {currentCard.text?.es && (
            <div className="max-w-xl text-center text-xl">
              <PortableText
                value={currentCard.text[language] || currentCard.text.es}
              />
            </div>
          )}

          <Button
            motion="pop"
            className="my-2 flex items-center gap-1 px-2 text-2xl underline"
            onClick={() => {
              setCurrentCard(null);
              scrollToTop();
            }}
          >
            <ArrowLeft size={24} />
            {language === "es" ? "Volver al Oráculo" : "Back to Oracle"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <Button
            motion="pop"
            className="bg-blue my-2 h-16 w-64 rounded-full px-3 font-mono text-2xl text-white"
            onClick={handleGetCard}
          >
            {language === "es" ? "Pedir Carta" : "Ask a Card"}
          </Button>
          {data?.text?.es && (
            <div className="flex max-w-2xl flex-col gap-4 text-center text-xl">
              <PortableText value={data.text[language] || data.text.es} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

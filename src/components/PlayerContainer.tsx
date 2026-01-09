import BandcampPlayer from "./BandcampPlayer";
import usePlayer from "../hooks/usePlayer";
import useLanguage from "../hooks/useLanguage";

export default function PlayerContainer() {
  const { currentEmbed, isExpanded, setIsExpanded } = usePlayer();
  const { language } = useLanguage();

  const buttonText = {
    show: {
      es: "mostrar reproductor",
      en: "show player",
    },
    hide: {
      es: "esconder reproductor",
      en: "hide player",
    },
  };
  return (
    <section className="_items-center _justify-start _bg-green-200 pointer-events-none fixed bottom-0 left-5 z-150 flex w-full">
      <div
        className={`flex flex-col items-start justify-center transition-all duration-500 ease-in-out ${isExpanded ? "translate-y-0" : "translate-y-100"} pointer-events-none`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="pointer-events-auto mb-4 flex cursor-pointer items-center justify-center border bg-white px-2 py-1 select-none"
        >
          {"♪ "}
          {isExpanded ? buttonText.hide[language] : buttonText.show[language]}
        </button>
        <div className="_my-2 _sm:w-1/2 pointer-events-auto w-full">
          {currentEmbed && <BandcampPlayer embedData={currentEmbed} />}
        </div>
      </div>
    </section>
  );
}

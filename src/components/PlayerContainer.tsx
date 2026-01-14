import { useState, useEffect } from "react";
import BandcampPlayer from "./BandcampPlayer";
import usePlayer from "../hooks/usePlayer";
import useLanguage from "../hooks/useLanguage";
import { Turntable, Music4 } from "lucide-react";
import { motion } from "motion/react";

export default function PlayerContainer() {
  const { currentEmbed, isExpanded, setIsExpanded } = usePlayer();
  const { language } = useLanguage();
  const [explainer, setExplainer] = useState(true);

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

  useEffect(() => {
    setTimeout(() => {
      setExplainer(false);
    }, 6000);
  }, []);

  return (
    <section className="_items-center _justify-start _bg-green-200 pointer-events-none fixed bottom-0 left-5 z-150 flex w-full">
      <div
        className={`flex flex-col items-start justify-center transition-all duration-500 ease-in-out ${isExpanded ? "translate-y-0" : "translate-y-100"} pointer-events-none`}
      >
        <div className="mb-4 flex items-center gap-2">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="_mb-4 pointer-events-auto flex cursor-pointer items-center justify-center rounded-sm border bg-white/90 px-2 py-1 select-none"
          >
            <Turntable strokeWidth={1} />
            <Music4 size={18} strokeWidth={1} />
          </motion.button>
          {explainer && (
            <div className="rounded-sm bg-white/20 px-1 text-xs">
              {isExpanded
                ? buttonText.hide[language]
                : buttonText.show[language]}
            </div>
          )}
        </div>
        <div className="pointer-events-auto w-full rounded-t-sm bg-black">
          {currentEmbed && <BandcampPlayer embedData={currentEmbed} />}
        </div>
      </div>
    </section>
  );
}

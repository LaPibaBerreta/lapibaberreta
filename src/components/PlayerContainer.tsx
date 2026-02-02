import { useEffect } from "react";
import BandcampPlayer from "./BandcampPlayer";
import usePlayer from "../hooks/usePlayer";
import { Music4 } from "lucide-react";
import { motion } from "motion/react";
import { useInitialData } from "../hooks/useInitialData";

export default function PlayerContainer() {
  const { setCurrentEmbed, currentEmbed, isExpanded, setIsExpanded } =
    usePlayer();
  const { data } = useInitialData();

  useEffect(() => {
    if (!currentEmbed && data?.embed) {
      setCurrentEmbed(data.embed);
    }
  }, [data?.embed, currentEmbed, setCurrentEmbed]);

  return (
    <section className="pointer-events-none fixed bottom-0 left-0 z-100 flex w-full sm:left-4">
      <div
        className={`flex flex-col items-start justify-center transition-all duration-500 ease-in-out ${isExpanded ? "translate-y-0" : "translate-y-100"} pointer-events-none`}
      >
        <div className="mb-4 ml-5 flex items-center gap-2 sm:ml-0">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="pointer-events-auto flex size-12 cursor-pointer items-center justify-center rounded-full bg-black px-2 py-1 text-white select-none"
          >
            <Music4 size={20} strokeWidth={1.25} />
          </motion.button>
        </div>
        <div className="pointer-events-auto w-full rounded-t-sm bg-black">
          {currentEmbed && <BandcampPlayer embedData={currentEmbed} />}
        </div>
      </div>
    </section>
  );
}

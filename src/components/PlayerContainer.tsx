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
    <section className="pointer-events-none fixed bottom-0 left-0 z-100 flex w-full sm:left-4 lg:z-160">
      <div
        className={`flex w-full flex-col items-start justify-center transition-all duration-500 ease-in-out ${isExpanded ? "translate-y-0" : "translate-y-75"} pointer-events-none`}
      >
        <div className="mb-2 ml-2 flex items-center gap-2 sm:mb-4 sm:ml-0">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="pointer-events-auto flex size-12 cursor-pointer items-center justify-center rounded-full bg-black text-white select-none"
          >
            <Music4 size={20} strokeWidth={1.25} />
          </motion.button>
        </div>
        <div className="pointer-events-auto flex w-full justify-center bg-[#333] sm:w-auto sm:rounded-t-sm">
          {currentEmbed && <BandcampPlayer embedData={currentEmbed} />}
        </div>
      </div>
    </section>
  );
}

import usePlayer from "../hooks/usePlayer";
import { Play } from "lucide-react";
import { motion } from "motion/react";

export default function LoadToPlayerButton({ data }: { data: string }) {
  const { setCurrentEmbed, setIsExpanded } = usePlayer();

  const handleClick = () => {
    setCurrentEmbed(data);
    setIsExpanded(true);
  };
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex size-12 cursor-pointer items-center justify-center rounded-full border bg-green-400 px-2 py-1 text-3xl lowercase"
      onClick={handleClick}
    >
      <Play strokeWidth={1} fill="white" />
    </motion.button>
  );
}

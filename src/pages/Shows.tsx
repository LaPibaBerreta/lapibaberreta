import SongkickWidget from "../components/SongkickWidget";
import HomeButton from "../components/HomeButton";
import { motion } from "motion/react";

export default function Shows() {
  return (
    <motion.section className="flex h-screen w-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
        className="border-accent/20 pointer-events-auto relative min-h-117 rounded-2xl border bg-black shadow-md md:max-h-[80vh]"
      >
        <div className="w-full rounded-2xl sm:w-150 xl:w-200">
          <SongkickWidget />
        </div>
        <HomeButton variantX={true} className="absolute -top-6 -right-6" />
      </motion.div>
    </motion.section>
  );
}

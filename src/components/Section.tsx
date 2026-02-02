import type { ReactElement } from "react";
import HomeButton from "./HomeButton";
import { motion } from "motion/react";
import BackButton from "../components/ui/BackButton";

type Props = {
  children: ReactElement;
};

export default function Section({ children }: Props) {
  return (
    <motion.section
      //      initial={{ opacity: 0 }}
      //     animate={{ opacity: 1 }}
      //    exit={{ opacity: 0 }}
      className="flex w-full items-center justify-center sm:pt-8"
    >
      <motion.div
        initial={{ opacity: 0, scaleY: 0.75 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0.75 }}
        className="pointer-events-auto relative w-full min-w-1/2 border-black/20 bg-white/20 shadow-xl backdrop-blur-md sm:w-3/4 sm:rounded-2xl sm:border sm:px-3 sm:pt-0 md:max-h-[calc(100vh-12rem)]"
      >
        <div className="h-screen overflow-y-auto border-2 border-transparent pt-24 pb-24 sm:h-[calc(100vh-12rem)] sm:p-6">
          {children}
        </div>

        <div className="absolute right-16 bottom-2 flex h-12 items-start gap-2 sm:-top-6 sm:-right-6">
          <BackButton />
          <HomeButton />
        </div>
      </motion.div>
    </motion.section>
  );
}

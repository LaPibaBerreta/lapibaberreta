import type { ReactElement } from "react";
import HomeButton from "./HomeButton";
import { motion } from "motion/react";

type Props = {
  children: ReactElement;
};

export default function Section({ children }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen w-full items-center justify-center bg-violet-200/20 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scaleY: 0.75 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0.75 }}
        className="border-accent/20 _bg-violet-200/20 pointer-events-auto relative h-screen min-h-1/3 w-full min-w-1/2 rounded-2xl border bg-white/50 shadow-md sm:w-3/4 sm:px-3 md:max-h-[80vh]"
      >
        <div className="h-screen overflow-y-auto sm:h-[79.8vh] sm:p-6">
          {children}
        </div>
        <HomeButton className="absolute -top-6 -right-6" />
      </motion.div>
    </motion.section>
  );
}

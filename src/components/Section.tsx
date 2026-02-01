import type { ReactElement } from "react";
import HomeButton from "./HomeButton";
import { motion } from "motion/react";

type Props = {
  children: ReactElement;
};

export default function Section({ children }: Props) {
  return (
    <motion.section
      //      initial={{ opacity: 0 }}
      //     animate={{ opacity: 1 }}
      //    exit={{ opacity: 0 }}
      className="_bg-violet-200/20 flex h-screen w-full items-center justify-center sm:pt-8"
    >
      <motion.div
        initial={{ opacity: 0, scaleY: 0.75 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0.75 }}
        className="_border-accent/20 _bg-violet-200/20 _border pointer-events-auto relative h-screen min-h-1/3 w-full min-w-1/2 rounded-2xl bg-white/20 shadow-xl backdrop-blur-md sm:w-3/4 sm:px-3 md:max-h-[calc(100vh-12rem)]"
      >
        <div className="h-screen overflow-y-auto sm:h-[calc(100vh-12rem)] sm:p-6">
          {children}
        </div>
        <HomeButton className="absolute -top-6 -right-6" />
      </motion.div>
    </motion.section>
  );
}

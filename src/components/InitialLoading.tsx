import { motion } from "motion/react";

export default function InitialLoading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-accent fixed z-800 flex h-screen w-full items-center justify-center bg-black font-mono text-3xl"
    >
      LOADING...
    </motion.div>
  );
}

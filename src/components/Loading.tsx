import { motion } from "motion/react";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="flex h-full w-full items-center justify-center p-4"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white" />
    </motion.div>
  );
}

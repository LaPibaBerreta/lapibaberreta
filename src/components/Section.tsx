import type { ReactElement } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";

type Props = {
  children: ReactElement;
};

export default function Section({ children }: Props) {
  return (
    <motion.section
      drag
      dragMomentum={false}
      className="bg-violet-200/00 pointer-events-auto max-h-[90vh] min-w-1/2 overflow-y-auto rounded-2xl p-12 shadow-md backdrop-blur-lg md:max-h-[70vh] md:max-w-[70vw]"
    >
      <Link to="/" className="text-4xl">
        x
      </Link>
      {children}
    </motion.section>
  );
}

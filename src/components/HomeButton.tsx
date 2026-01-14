import { Link, useLocation } from "react-router";
import { X } from "lucide-react";
import { motion } from "motion/react";

export default function HomeButton() {
  const location = useLocation();

  return (
    <div className="fixed top-25 right-35 z-100">
      {location.pathname !== "/" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            key="home"
            to="/"
            className={`hover:bg-accent _text-4xl _shadow-lg pointer-events-auto flex size-12 cursor-pointer items-center justify-center gap-1 rounded-full border bg-white/40 shadow-yellow-300/80 transition-colors hover:text-white`}
          >
            <X size={48} strokeWidth={1} />
          </Link>
        </motion.button>
      )}
    </div>
  );
}

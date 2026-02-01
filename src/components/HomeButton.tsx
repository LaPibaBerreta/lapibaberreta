import { Link, useLocation } from "react-router";
import { X } from "lucide-react";
import { motion } from "motion/react";

export default function HomeButton({ className }: { className: string }) {
  const location = useLocation();

  return (
    <div className={className}>
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
            className="hover:bg-accent pointer-events-auto flex size-12 cursor-pointer items-center justify-center gap-1 rounded-full border bg-white transition-colors hover:text-white"
          >
            <X size={48} strokeWidth={1} />
          </Link>
        </motion.button>
      )}
    </div>
  );
}

import { Link, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import useIsMobile from "../../hooks/useIsMobile";

export default function BackButton({ className }: { className?: string }) {
  const location = useLocation();
  const { isMobile } = useIsMobile();

  const parentPath =
    location.pathname.split("/").length === 3
      ? location.pathname.split("/")[1]
      : null;

  if (!parentPath) return null;

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
            to={"/" + parentPath}
            className="hover:bg-accent pointer-events-auto flex size-12 cursor-pointer items-center justify-center gap-1 rounded-full bg-black text-white transition-colors hover:text-white"
          >
            <ArrowLeft size={isMobile ? "36" : "48"} strokeWidth={1} />
          </Link>
        </motion.button>
      )}
    </div>
  );
}

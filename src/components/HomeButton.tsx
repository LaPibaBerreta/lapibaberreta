import { Link, useLocation } from "react-router";
import { X, HouseHeart } from "lucide-react";
import { motion } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";

export default function HomeButton({
  className,
  variantX = false,
}: {
  className: string;
  variantX?: boolean;
}) {
  const location = useLocation();
  const { isMobile } = useIsMobile();

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
            className="hover:bg-accent pointer-events-auto flex size-12 cursor-pointer items-center justify-center gap-1 rounded-full bg-black text-white transition-colors hover:text-white"
          >
            {variantX ? (
              <X size={48} strokeWidth={1} />
            ) : !isMobile ? (
              <X size={48} strokeWidth={1} />
            ) : (
              <HouseHeart size={36} strokeWidth={0.75} />
            )}
          </Link>
        </motion.button>
      )}
    </div>
  );
}

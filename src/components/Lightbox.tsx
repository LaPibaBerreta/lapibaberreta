import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useLightbox from "../hooks/useLightbox";

export default function Lightbox() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isLightboxOpen, setIsLightboxOpen, currentImage } = useLightbox();

  return (
    <>
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="no-doc-scroll fixed inset-0 z-500 flex h-screen w-screen cursor-zoom-out items-center justify-center backdrop-brightness-20 backdrop-grayscale-100"
            onClick={() => setIsLightboxOpen(false)}
          >
            {currentImage && (
              <img
                src={currentImage}
                alt=""
                className={`max-h-[95vh] max-w-full rounded-sm object-contain transition-opacity duration-300 ${!imageLoaded ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import type { PublicationQueryResult } from "@/lib/types";
import { urlFor } from "../lib/sanityImageUrl";
import { motion } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";
import useLightbox from "../hooks/useLightbox";

type PublicationImages = NonNullable<
  NonNullable<PublicationQueryResult>["imageGallery"]
>;

interface ImageGalleryProps {
  data: PublicationImages;
}

export default function ImageGallery({ data }: ImageGalleryProps) {
  const { setIsLightboxOpen, setCurrentImage } = useLightbox();
  const { isMobile } = useIsMobile();

  if (!data) return null;

  return (
    <div className="grid items-center gap-1 sm:grid-cols-5">
      {data.map((image) => (
        <div key={image._key}>
          {isMobile ? (
            <motion.img
              src={urlFor(image).format("webp").width(400).url() + "&fit=max"}
              className="pointer-events-auto cursor-pointer rounded-2xl"
            />
          ) : (
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!isMobile) {
                  setCurrentImage(
                    urlFor(image).format("webp").height(800).url(),
                  );
                  setIsLightboxOpen(true);
                }
              }}
              src={urlFor(image).format("webp").width(400).url() + "&fit=max"}
              className="pointer-events-auto cursor-pointer rounded-2xl"
            />
          )}
        </div>
      ))}
    </div>
  );
}

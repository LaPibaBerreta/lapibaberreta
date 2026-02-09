import { urlFor } from "../lib/sanityImageUrl";
import type { PublicationQueryResult } from "../lib/types";
import { motion } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";
import useLightbox from "../hooks/useLightbox";
import Image from "./Image";

type MainImage = NonNullable<PublicationQueryResult>["mainImage"];

export default function PublicationMainImage({ image }: { image: MainImage }) {
  const { setIsLightboxOpen, setCurrentImage } = useLightbox();
  const { isMobile } = useIsMobile();

  if (!image) return null;

  return (
    <div>
      {isMobile ? (
        <Image imageData={image} width={800} />
      ) : (
        <motion.div
          className="cursor-pointer"
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (!isMobile) {
              setCurrentImage(urlFor(image).format("webp").height(1000).url());
              setIsLightboxOpen(true);
            }
          }}
        >
          <Image imageData={image} width={800} />
        </motion.div>
      )}
    </div>
  );
}

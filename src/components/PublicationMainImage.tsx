import { urlFor } from "../lib/sanityImageUrl";
import type { PublicationQueryResult } from "../lib/types";
import { motion } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";
import useLightbox from "../hooks/useLightbox";

type MainImage = NonNullable<PublicationQueryResult>["mainImage"];

export default function PublicationMainImage({ image }: { image: MainImage }) {
  const { setIsLightboxOpen, setCurrentImage } = useLightbox();
  const { isMobile } = useIsMobile();

  if (!image) return null;

  return (
    <>
      {isMobile ? (
        <motion.img
          src={urlFor(image).format("webp").width(400).url() + "&fit=max"}
          className="pointer-events-auto cursor-pointer rounded-2xl"
        />
      ) : (
        <motion.img
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (!isMobile) {
              setCurrentImage(urlFor(image).format("webp").height(800).url());
              setIsLightboxOpen(true);
            }
          }}
          src={urlFor(image).format("webp").width(600).url() + "&fit=max"}
          className="pointer-events-auto cursor-pointer rounded-2xl"
        />
      )}
    </>
  );
}

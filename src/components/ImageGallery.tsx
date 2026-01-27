import type { PublicationQueryResult } from "@/lib/types";
import { urlFor } from "../lib/sanityImageUrl";
import { motion } from "motion/react";

type PublicationImages = NonNullable<
  NonNullable<PublicationQueryResult>["imageGallery"]
>;

interface ImageGalleryProps {
  data: PublicationImages;
}

export default function ImageGallery({ data }: ImageGalleryProps) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-5">
      {data.map((image) => (
        <motion.img
          drag
          key={image._key}
          src={urlFor(image).format("webp").width(400).url() + "&fit=max"}
          className="pointer-events-auto rounded-2xl"
        />
      ))}
    </div>
  );
}

import type { PublicationQueryResult } from "@/lib/types";
import { urlFor } from "../lib/sanityImageUrl";

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
        <img
          key={image._key}
          src={urlFor(image).format("webp").width(400).url() + "&fit=max"}
        />
      ))}
    </div>
  );
}

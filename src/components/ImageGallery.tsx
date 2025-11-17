import type { ProjectQueryResult } from "@/lib/types";
import { urlFor } from "../lib/sanityImageUrl";

type ProjectImages = NonNullable<
  NonNullable<ProjectQueryResult>["imageGallery"]
>;

interface ImageGalleryProps {
  data: ProjectImages;
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

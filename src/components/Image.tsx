import { urlFor } from "../lib/sanityImageUrl";
import type { SanityImage } from "@/lib/SanityImageType";

export default function Image({
  imageData,
  aspectRatio,
  width = 800,
}: {
  imageData: SanityImage;
  aspectRatio?: string;
  width?: number;
}) {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: aspectRatio ?? imageData?.aspectRatio ?? "1 / 1" }}
    >
      <img
        className="absolute inset-0 h-full w-full rounded-2xl object-cover"
        src={
          urlFor(imageData).format("webp").width(80).blur(90).url() + "&fit=max"
        }
      />

      <img
        className="absolute inset-0 h-full w-full rounded-2xl object-cover opacity-0 transition-opacity duration-300"
        onLoad={(e) => {
          e.currentTarget.classList.remove("opacity-0");
          e.currentTarget.classList.add("opacity-100");
        }}
        src={urlFor(imageData).width(width).format("webp").url() + "&fit=max"}
      />
    </div>
  );
}

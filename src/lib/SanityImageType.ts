import type { SanityImageCrop, SanityImageHotspot } from "@/lib/types";

export type SanityImage = {
  _type?: "image";
  asset?: {
    _ref: string;
    _type: "reference";
  };
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  aspectRatio?: number | null;
};

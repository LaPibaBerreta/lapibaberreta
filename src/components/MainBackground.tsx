import { urlFor } from "../lib/sanityImageUrl";
import type { SiteConfig } from "../lib/types";

type MainBackgroundProps = {
  image?: SiteConfig["backgroundImage"];
};

export default function MainBackground({ image }: MainBackgroundProps) {
  if (!image?.asset) return null;

  return (
    <div className="fixed inset-0 -z-10 h-screen w-full brightness-20 invert dark:invert-0">
      <img src={urlFor(image).url()} className="w-full" />
    </div>
  );
}

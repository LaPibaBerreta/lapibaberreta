import { client } from "./sanityClient";
import { defineQuery } from "groq";

const workshopQuery = defineQuery(
  `*[_type == "workshop" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  date,
  section,
  image{
    ...,
    "aspectRatio": asset->metadata.dimensions.aspectRatio,
  },
  text{
    es[]{
    ...,
    _type == "image" => {
        ...,
        'url': asset->url,
      }
    },
    en[]{
    ...,
    _type == "image" => {
        ...,
        'url': asset->url,
      }
    },
  },
  links,
}`,
);

export async function getWorkshop(slug: string) {
  return client.fetch(workshopQuery, { slug });
}

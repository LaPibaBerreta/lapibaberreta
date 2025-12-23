import { client } from "./sanityClient";
import { defineQuery } from "groq";

const videoQuery = defineQuery(
  `*[_type == "video" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  date,
  image,
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
  embed,
}`,
);

export async function getVideo(slug: string) {
  return client.fetch(videoQuery, { slug });
}

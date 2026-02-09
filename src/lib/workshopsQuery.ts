import { client } from "./sanityClient";
import { defineQuery } from "groq";

const workshopsQuery = defineQuery(`*[_type == "workshop"] | order(date desc){
  _id,
  title,
  slug,
  date,
  project->{_id},
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
}`);

export async function getWorkshops() {
  return client.fetch(workshopsQuery);
}

import { client } from "./sanityClient";
import { defineQuery } from "groq";

const publicationsQuery =
  defineQuery(`*[_type == "publication"] | order(date desc){
  _id,
  title,
  slug,
  date,
  category->{_id, name},
  section,
  project->{_id, color},
  mainImage{
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
  embed,
  imageGallery,
  videos,
  links,
  additionalDocument,
}`);

export async function getPublications() {
  return client.fetch(publicationsQuery);
}

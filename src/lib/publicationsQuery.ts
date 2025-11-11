import { client } from "./sanityClient";
import { defineQuery } from "groq";

// TODO: borrar lo que no se vaya a usar
const publicationsQuery = defineQuery(`*[_type == "project"] | order(date desc){
  _id,
  title,
  slug,
  date,
  category->{name},
  section,
  mainImage,
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

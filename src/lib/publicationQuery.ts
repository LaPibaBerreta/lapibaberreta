import { client } from "./sanityClient";
import { defineQuery } from "groq";

const publicationQuery = defineQuery(
  `*[_type == "publication" && slug.current == $slug][0]{
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
  tracklist,
  imageGallery,
  videos[]->{
    _id,
    title,
    embed
  },
  links,
  additionalDocument->{
    _id,
    title,
    slug
  },
}`,
);

export async function getPublication(slug: string) {
  return client.fetch(publicationQuery, { slug });
}

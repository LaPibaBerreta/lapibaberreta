import { client } from "./sanityClient";
import { defineQuery } from "groq";

const projectQuery = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
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

export async function getProject(slug: string) {
  return client.fetch(projectQuery, { slug });
}

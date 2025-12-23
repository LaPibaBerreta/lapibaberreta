import { client } from "./sanityClient";
import { defineQuery } from "groq";

const projectsQuery =
  defineQuery(`*[_type == "project"] | order(_createdAt asc){
  _id,
  title,
  slug,
  section,
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
  links,
}`);

export async function getProjects() {
  return client.fetch(projectsQuery);
}

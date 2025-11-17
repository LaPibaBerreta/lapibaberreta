import { client } from "./sanityClient";
import { defineQuery } from "groq";

const showsQuery = defineQuery(`*[_type == "show"] | order(date desc){
  _id,
  title,
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
  links,
}`);

export async function getShows() {
  return client.fetch(showsQuery);
}

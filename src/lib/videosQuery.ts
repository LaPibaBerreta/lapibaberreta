import { client } from "./sanityClient";
import { defineQuery } from "groq";

//TODO: volar lo que no se necesita
const videosQuery = defineQuery(`*[_type == "video"] | order(date desc){
  _id,
  title,
  slug,
  date,
  category->{_id, name},
  section,
  project->{_id},
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
}`);

export async function getVideos() {
  return client.fetch(videosQuery);
}

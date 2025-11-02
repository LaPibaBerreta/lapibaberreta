import { client } from "./sanityClient";
import { defineQuery } from "groq";

const blogPostsQuery = defineQuery(`*[_type == "blogPost"] | order(date desc){
  _id,
  title,
  date,
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
}`);

export async function getBlogPosts() {
  return client.fetch(blogPostsQuery);
}

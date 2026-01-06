import { client } from "./sanityClient";
import { defineQuery } from "groq";

const photosQuery = defineQuery(`*[_type == "photos"][0]{
  title,
  slug,
  imageGallery
}`);

export async function getPhotos() {
  return client.fetch(photosQuery);
}

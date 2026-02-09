import { client } from "./sanityClient";
import { defineQuery } from "groq";

const photosQuery = defineQuery(`*[_type == "photos"][0]{
  title,
  slug,
  imageGallery[]{
    ...,
    "aspectRatio": asset->metadata.dimensions.aspectRatio,
  }
}`);

export async function getPhotos() {
  return client.fetch(photosQuery);
}

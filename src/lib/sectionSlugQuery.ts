import { client } from "./sanityClient";
import { defineQuery } from "groq";

// TODO: ver de combinar a este wacho con initialData
const sectionSlugQuery = defineQuery(`*[_type == "section"]{
  _id,
  slug,
}`);

export async function getSectionSlug() {
  return client.fetch(sectionSlugQuery);
}

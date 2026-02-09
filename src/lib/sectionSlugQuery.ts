import { client } from "./sanityClient";
import { defineQuery } from "groq";

const sectionSlugQuery = defineQuery(`*[_type == "section"]{
  _id,
  slug,
}`);

export async function getSectionSlug() {
  return client.fetch(sectionSlugQuery);
}

import { client } from "./sanityClient";
import { defineQuery } from "groq";

const initialDataQuery = defineQuery(`*[_type == "siteConfig"][0]{

  title,
  backgroundImage,
  sections[]{
    title,
    isHighlighted,
    url,
    icon,
    reference->{
      _id,
      _type,
      title,
      "slug": slug.current
    }
  },
}`);

export async function getInitialData() {
  return client.fetch(initialDataQuery);
}

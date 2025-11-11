import { client } from "./sanityClient";
import { defineQuery } from "groq";

const oraculoQuery = defineQuery(`*[_type == "oraculo"][0]{
  title,
  image,
  text,
  cards
}`);

export async function getOraculo() {
  return client.fetch(oraculoQuery);
}

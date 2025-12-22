import { client } from "./sanityClient";
import { defineQuery } from "groq";

const infoQuery = defineQuery(`*[_type == "info"][0]{
  name,
  bio,
  email,
  links,
  pressLinks,
  bookingInfo
}`);

export async function getInfo() {
  return client.fetch(infoQuery);
}

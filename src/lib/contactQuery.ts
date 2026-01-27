import { client } from "./sanityClient";
import { defineQuery } from "groq";

const contactQuery = defineQuery(`*[_type == "contact"][0]{
  email,
  links,
  bookingInfo,
  bookingContact
}`);

export async function getContact() {
  return client.fetch(contactQuery);
}

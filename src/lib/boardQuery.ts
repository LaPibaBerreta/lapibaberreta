import { client } from "./sanityClient";
import { defineQuery } from "groq";

const boardQuery = defineQuery(`*[_type == "board"][0]{
  title,
  text,
  embed
}`);

export async function getBoard() {
  return client.fetch(boardQuery);
}

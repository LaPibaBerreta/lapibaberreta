import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "i7n76bif",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-11-02",
});

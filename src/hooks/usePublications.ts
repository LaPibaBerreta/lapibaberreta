import { useQuery } from "@tanstack/react-query";
import { getPublications } from "../lib/publicationsQuery";

export function usePublications() {
  return useQuery({
    queryKey: ["publications"],
    queryFn: getPublications,
  });
}

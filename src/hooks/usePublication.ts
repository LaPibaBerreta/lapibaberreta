import { useQuery } from "@tanstack/react-query";
import { getPublication } from "../lib/publicationQuery";

export function usePublication(slug: string) {
  return useQuery({
    queryKey: ["publication", slug],
    queryFn: () => getPublication(slug),
    enabled: !!slug,
  });
}

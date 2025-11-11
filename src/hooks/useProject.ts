import { useQuery } from "@tanstack/react-query";
import { getProject } from "../lib/projectQuery";

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProject(slug),
    enabled: !!slug,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getSectionSlug } from "../lib/sectionSlugQuery";

export function useSectionSlug() {
  return useQuery({
    queryKey: ["sectionSlug"],
    queryFn: getSectionSlug,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getWorkshop } from "../lib/workshopQuery";

export function useWorkshop(slug: string) {
  return useQuery({
    queryKey: ["workshop", slug],
    queryFn: () => getWorkshop(slug),
    enabled: !!slug,
  });
}

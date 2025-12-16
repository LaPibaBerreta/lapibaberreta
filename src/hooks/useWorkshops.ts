import { useQuery } from "@tanstack/react-query";
import { getWorkshops } from "../lib/workshopsQuery";

export function useWorkshops() {
  return useQuery({
    queryKey: ["workshops"],
    queryFn: getWorkshops,
  });
}

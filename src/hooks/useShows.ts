import { useQuery } from "@tanstack/react-query";
import { getShows } from "../lib/showsQuery";

export function useShows() {
  return useQuery({
    queryKey: ["shows"],
    queryFn: getShows,
  });
}

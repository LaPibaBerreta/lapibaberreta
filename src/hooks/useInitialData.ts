import { useQuery } from "@tanstack/react-query";
import { getInitialData } from "../lib/initialDataQuery";

export function useInitialData() {
  return useQuery({
    queryKey: ["initialData"],
    queryFn: getInitialData,
  });
}

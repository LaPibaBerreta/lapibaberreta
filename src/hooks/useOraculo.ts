import { useQuery } from "@tanstack/react-query";
import { getOraculo } from "../lib/oraculoQuery";

export function useOraculo() {
  return useQuery({
    queryKey: ["oraculo"],
    queryFn: getOraculo,
  });
}

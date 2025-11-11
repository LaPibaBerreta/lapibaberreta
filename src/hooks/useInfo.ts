import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../lib/infoQuery";

export function useInfo() {
  return useQuery({
    queryKey: ["info"],
    queryFn: getInfo,
  });
}

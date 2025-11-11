import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../lib/boardQuery";

export function useBoard() {
  return useQuery({
    queryKey: ["board"],
    queryFn: getBoard,
  });
}

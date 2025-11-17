import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../lib/videosQuery";

export function useVideos() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });
}

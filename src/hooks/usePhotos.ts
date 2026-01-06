import { useQuery } from "@tanstack/react-query";
import { getPhotos } from "../lib/photosQuery";

export function usePhotos() {
  return useQuery({
    queryKey: ["photos"],
    queryFn: getPhotos,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getVideo } from "../lib/videoQuery";

export function useVideo(slug: string) {
  return useQuery({
    queryKey: ["video", slug],
    queryFn: () => getVideo(slug),
    enabled: !!slug,
  });
}

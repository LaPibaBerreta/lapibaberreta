import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "../lib/blogPostsQuery";

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
  });
}

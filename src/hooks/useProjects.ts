import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../lib/projectsQuery";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}

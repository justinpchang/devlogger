import { getProjects } from "@/requests/project.requests";
import { useQuery } from "react-query";

export function useGetProjects(username?: string) {
  return useQuery(["projects", username], () => getProjects(username!), {
    enabled: !!username,
  });
}

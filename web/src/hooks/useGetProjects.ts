import { getProjects } from "@/requests/project.requests";
import { useQuery } from "react-query";

export function useGetProjects(userId: string) {
  return useQuery(["projects", userId], () => getProjects(userId));
}

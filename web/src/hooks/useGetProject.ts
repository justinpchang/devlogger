import { getProject } from "@/requests/project.requests";
import { useQuery } from "react-query";

function useGetProject(slug?: string) {
  return useQuery(["project", slug], () => getProject(slug!), {
    enabled: !!slug,
  });
}

export { useGetProject };

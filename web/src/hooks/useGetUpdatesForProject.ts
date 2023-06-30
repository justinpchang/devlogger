import { getProjectUpdates } from "@/requests/update.requests";
import { useQuery } from "react-query";

function useGetUpdatesForProject(slug: string | undefined) {
  return useQuery(["updates", slug], () => getProjectUpdates(slug!), {
    enabled: !!slug,
  });
}

export { useGetUpdatesForProject };

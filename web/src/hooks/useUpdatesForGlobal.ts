import { getGlobalUpdates } from "@/requests/update.requests";
import { useQuery } from "react-query";

export function useUpdatesForGlobal() {
  return useQuery(["updates", "global"], () => getGlobalUpdates());
}

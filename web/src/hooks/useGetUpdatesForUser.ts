import { getUserUpdates } from "@/requests/update.requests";
import { useQuery } from "react-query";

export function useGetUpdatesForUser(username: string) {
  return useQuery(["updates", username], () => getUserUpdates(username));
}

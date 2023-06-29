import { getUser } from "@/requests/user.requests";
import { useQuery } from "react-query";

export function useGetUser(username?: string) {
  return useQuery(["user", username], () => getUser(username!), {
    enabled: !!username,
  });
}

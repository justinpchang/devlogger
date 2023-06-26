import { getCurrentUser } from "@/requests/user.reqeusts";
import { apiService } from "@/services/ApiService";
import { useQuery } from "react-query";

export const CURRENT_USER_QUERY_KEY = "currentUser";

export function useCurrentUser() {
  return useQuery(CURRENT_USER_QUERY_KEY, () => getCurrentUser(), {
    enabled: !!apiService.getJWT(),
  });
}

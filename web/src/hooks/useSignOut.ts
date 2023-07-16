import { authService } from "@/services/AuthService";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";

function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation(() => authService.logout(), {
    onSuccess: () => {
      toast.success("Signed out successfully");
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);
      window.location.href = "/";
    },
    onError: () => {
      window.location.href = "/";
    },
  });
}

export { useSignOut };

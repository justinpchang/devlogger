import { uploadAvatar } from "@/requests/user.requests";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation((file: File) => uploadAvatar(file), {
    onSuccess: (user) => {
      toast.success("Avatar uploaded successfully");
      // TODO: Consolidate to use single query key
      queryClient.setQueryData([CURRENT_USER_QUERY_KEY], user);
      queryClient.setQueryData(["user", user.username], user);
    },
    onError: () => {
      toast.error("Error uploading avatar. Please try again.");
    },
  });
}

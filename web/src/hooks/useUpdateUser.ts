import { updateUser } from "@/requests/user.requests";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";
import { useRouter } from "next/router";
import { User } from "@/types/user.types";

export function useUpdateUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation((data: Pick<User, "name" | "about" | "website">) => updateUser(data), {
    onSuccess: (user) => {
      toast.success("Profile updated successfully");
      // TODO: Consolidate to use single query key
      queryClient.setQueryData([CURRENT_USER_QUERY_KEY], user);
      queryClient.setQueryData(["user", user.username], user);
      router.push(`/${user.username}`);
    },
    onError: () => {
      toast.error("Error updating profile. Please try again.");
    },
  });
}

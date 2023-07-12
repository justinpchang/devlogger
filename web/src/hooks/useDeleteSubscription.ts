import {
  deleteProjectSubscription,
  deleteUserSubscription,
} from "@/requests/subscription.requests";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

function useDeleteSubscription(
  options: { slug: string; username?: never } | { slug?: never; username: string }
) {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      if (options.slug) return deleteProjectSubscription(options.slug!);
      return deleteUserSubscription(options.username!);
    },
    {
      onSuccess: () => {
        if (options.slug) {
          queryClient.setQueryData(["project", options.slug], (project: any) => ({
            ...project,
            subscribed: false,
          }));
        } else {
          queryClient.setQueryData(["user", options.username], (user: any) => ({
            ...user,
            subscribed: false,
          }));
        }
      },
      onError: () => {
        toast.error("Error unsubscribing. Please try again.");
      },
    }
  );
}

export { useDeleteSubscription };

import {
  createProjectSubscription,
  createUserSubscription,
} from "@/requests/subscription.requests";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

function useCreateSubscription(
  options: { slug: string; username?: never } | { slug?: never; username: string }
) {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      if (options.slug) return createProjectSubscription(options.slug!);
      return createUserSubscription(options.username!);
    },
    {
      onSuccess: () => {
        if (options.slug) {
          queryClient.setQueryData(["project", options.slug], (project: any) => ({
            ...project,
            subscribed: true,
          }));
        } else {
          queryClient.setQueryData(["user", options.username], (user: any) => ({
            ...user,
            subscribed: true,
          }));
        }
      },
      onError: () => {
        toast.error("Error subscribing. Please try again.");
      },
    }
  );
}

export { useCreateSubscription };

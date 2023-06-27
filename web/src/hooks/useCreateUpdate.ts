import { createUpdate } from "@/requests/update.requests";
import { Update } from "@/types/update.types";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export function useCreateUpdate() {
  const router = useRouter();

  return useMutation(
    (data: Pick<Update, "project_id" | "title" | "description">) => createUpdate(data),
    {
      onSuccess: (update: Update) => {
        toast.success("Update posted successfully");
        router.reload();
      },
      onError: () => {
        toast.error("Error posting update. Please try again.");
      },
    }
  );
}

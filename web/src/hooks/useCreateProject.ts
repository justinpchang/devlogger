import { createProject } from "@/requests/project.requests";
import { Project } from "@/types/project.types";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useCurrentUser } from "./useCurrentUser";

export function useCreateProject() {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation(
    (data: Pick<Project, "name" | "slug" | "homepage" | "description">) => createProject(data),
    {
      onSuccess: (project: Project) => {
        toast.success("Project created successfully");
        queryClient.setQueryData(["project", project.slug], project);
        router.push(`/${currentUser!.username}/${project.slug}`);
      },
      onError: () => {
        toast.error("Error creating project. Please try again.");
      },
    }
  );
}

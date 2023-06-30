import { updateProject } from "@/requests/project.requests";
import { Project } from "@/types/project.types";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

function useUpdateProject() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(
    (data: Pick<Project, "name" | "slug" | "homepage" | "description">) => updateProject(data),
    {
      onSuccess: (project: Project) => {
        toast.success("Project created successfully");
        router.push(`/project/${project.slug}`);
      },
      onError: () => {
        toast.error("Error updating project. Please try again.");
      },
    }
  );
}

export { useUpdateProject };

import { createProject } from "@/requests/project.requests";
import { Project } from "@/types/project.types";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

export function useCreateProject() {
  const router = useRouter();

  return useMutation(
    (data: Pick<Project, "name" | "slug" | "homepage" | "description">) => createProject(data),
    {
      onSuccess: (project: Project) => {
        toast.success("Project created successfully");
        router.push(`/projects/${project.slug}`);
      },
      onError: () => {
        toast.error("Error creating project. Please try again.");
      },
    }
  );
}

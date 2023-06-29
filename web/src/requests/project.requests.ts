import { apiService } from "@/services/ApiService";
import { Project } from "@/types/project.types";

export const getProjects = async (username: string): Promise<Project[]> => {
  const response = await apiService.instance.get(`/users/${username}/projects`);
  return response.data.projects;
};

export const createProject = async (
  data: Pick<Project, "name" | "slug" | "homepage" | "description">
): Promise<Project> => {
  const response = await apiService.instance.post("/projects", data);
  return response.data.project;
};

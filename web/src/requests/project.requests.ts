import { apiService } from "@/services/ApiService";
import { Project, ProjectWithUser } from "@/types/project.types";

export const getProjects = async (username: string): Promise<Project[]> => {
  const response = await apiService.instance.get(`/users/${username}/projects`);
  return response.data;
};

export const getProject = async (slug: string): Promise<ProjectWithUser> => {
  const response = await apiService.instance.get(`/projects/${slug}`);
  return response.data;
};

export const createProject = async (
  data: Pick<Project, "name" | "slug" | "homepage" | "description">
): Promise<Project> => {
  const response = await apiService.instance.post("/projects", data);
  return response.data.project;
};

export const updateProject = async (
  data: Pick<Project, "name" | "slug" | "homepage" | "description">
): Promise<ProjectWithUser> => {
  const response = await apiService.instance.patch(`/projects/${data.slug}`, data);
  return response.data;
};

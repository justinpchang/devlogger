import { apiService } from "@/services/ApiService";
import { Update, UpdateForFeed } from "@/types/update.types";

export const createUpdate = async (
  data: Pick<Update, "project_id" | "title" | "description">
): Promise<Update> => {
  const response = await apiService.instance.post(`/projects/${data.project_id}/updates`, data);
  return response.data.update;
};

export const getGlobalUpdates = async (): Promise<UpdateForFeed[]> => {
  const response = await apiService.instance.get("/updates");
  return response.data;
};

export const getUserUpdates = async (username: string): Promise<UpdateForFeed[]> => {
  const response = await apiService.instance.get(`/users/${username}/updates`);
  return response.data;
};

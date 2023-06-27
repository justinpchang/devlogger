import { apiService } from "@/services/ApiService";
import { Update } from "@/types/update.types";

export const createUpdate = async (
  data: Pick<Update, "project_id" | "title" | "description">
): Promise<Update> => {
  const response = await apiService.instance.post(`/projects/${data.project_id}/updates`, data);
  return response.data.update;
};

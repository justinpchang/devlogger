import { apiService } from "@/services/ApiService";

export const createUpvote = async (update_id: number): Promise<void> => {
  await apiService.instance.post(`/updates/${update_id}/upvotes`);
};

export const deleteUpvote = async (update_id: number): Promise<void> => {
  await apiService.instance.delete(`/updates/${update_id}/upvotes`);
};

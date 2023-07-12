import { apiService } from "@/services/ApiService";

export const createProjectSubscription = async (slug: string): Promise<void> => {
  await apiService.instance.post(`/projects/${slug}/subscriptions`);
};

export const deleteProjectSubscription = async (slug: string): Promise<void> => {
  await apiService.instance.delete(`/projects/${slug}/subscriptions`);
};

export const createUserSubscription = async (username: string): Promise<void> => {
  await apiService.instance.post(`/users/${username}/subscriptions`);
};

export const deleteUserSubscription = async (username: string): Promise<void> => {
  await apiService.instance.delete(`/users/${username}/subscriptions`);
};

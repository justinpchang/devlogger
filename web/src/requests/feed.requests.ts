import { apiService } from "@/services/ApiService";

export const getLink = (
  type: "rss" | "atom",
  data: { slug: string } | { username: string } | null
) => {
  if (!data) return `${apiService.instance.defaults.baseURL}/updates.${type}`;
  if ("slug" in data)
    return `${apiService.instance.defaults.baseURL}/projects/${data.slug}/updates.${type}`;
  if ("username" in data)
    return `${apiService.instance.defaults.baseURL}/users/${data.username}/updates.${type}`;
};

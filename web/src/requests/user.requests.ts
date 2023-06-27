import { apiService } from "@/services/ApiService";
import { User } from "@/types/user.types";

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiService.instance.get("/users/me");
  return response.data.user;
};

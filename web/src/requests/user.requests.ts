import { apiService } from "@/services/ApiService";
import { User } from "@/types/user.types";

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiService.instance.get("/users/me");
  return response.data;
};

export const getUser = async (username: string): Promise<User> => {
  const response = await apiService.instance.get(`/users/${username}`);
  return response.data;
};

export const updateUser = async (data: Pick<User, "name" | "about" | "website">): Promise<User> => {
  const response = await apiService.instance.patch("/users/me", { user: data });
  return response.data;
};

export const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("avatar", file);
  const response = await apiService.instance.post("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

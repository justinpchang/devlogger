import { Project } from "./project.types";
import { User } from "./user.types";

export interface Update {
  id: number;
  project_id: number;
  title: string;
  description: string;
  updated_at: string;
  created_at: string;
}

export interface UpdateForFeed extends Update {
  project: Project;
  user: User;
}

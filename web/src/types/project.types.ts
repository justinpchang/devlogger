export interface Project {
  id: number;
  user_id: number;
  name: string;
  slug: string;
  homepage: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  last_update_posted_at: string | null;
}

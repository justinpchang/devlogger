export interface User {
  id: number;
  username: string | null;
  about: string | null;
  email: string;
  created_at: string;
  updated_at: string;
  avatar: {
    url: string;
    thumbnail_url: string;
  };
}

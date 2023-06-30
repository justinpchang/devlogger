export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  about: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
  avatar: {
    url: string;
    thumbnail_url: string;
  };
}

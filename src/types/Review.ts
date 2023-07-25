export interface Review {
  author?: string;
  author_details: {
    avatar_path: string | null;
    name: string;
    rating?: number;
    username: string;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
export interface PostCardProps {
  post: {
    id: string;
    title: string;
    image: string;
    createdBy: string;
    photoURL?: string;
    tagsArray: string[];
    body?: string;
    description?: string;
    createdAt?: unknown;
    likes?: string[];
  };
}

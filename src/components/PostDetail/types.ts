import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  image: string;
  createdBy: string;
  tagsArray: string[];
  createdAt?: Timestamp | null | undefined;
  description?: string;
}

export interface PostDetailProps {
  post: Post;
}

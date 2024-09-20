import { Timestamp } from "firebase/firestore";

export interface Post {
  body: string;
  createdAt: Timestamp;
  description: string;
  createdBy: string;
  id: string;
  image: string;
  likeCount: number;
  likes: string[];
  tagsArray: string[];
  title: string;
  uid: string;
}

export interface PostDetailProps {
  post: Post;
}

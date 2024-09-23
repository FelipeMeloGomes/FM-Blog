import { Post } from "../PostDetail/types";

export interface PostItemProps {
  post: Post;
  handleDelete: (postId: string) => void;
  createdBy: string;
  userId?: string;
}

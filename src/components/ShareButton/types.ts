import { Post } from "../../utils/ShareContent/types";

export interface ShareButtonProps {
  post: Post;
  onShare: (post: Post) => Promise<void>;
}

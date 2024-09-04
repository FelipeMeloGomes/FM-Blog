export interface LikeButtonProps {
  postId: string;
  userId?: string;
  onNotLoggedIn?: () => void;
}

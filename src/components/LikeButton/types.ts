export interface LikeButtonProps {
  postId: string;
  userId: string | undefined;
  onNotLoggedIn?: () => void;
}

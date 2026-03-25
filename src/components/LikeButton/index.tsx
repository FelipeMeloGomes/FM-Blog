import { memo } from "react";
import { FiHeart } from "react-icons/fi";
import { useLikeButton } from "../../hooks/useLikeButton";
import type { LikeButtonProps } from "./types";

const LikeButtonComponent = ({ postId, userId }: LikeButtonProps) => {
  const { likeCount, liked, loading, handleLikeClick } = useLikeButton({
    postId,
    userId,
  });

  return (
    <button
      type="button"
      onClick={handleLikeClick}
      disabled={!postId || loading}
      className={`flex items-center gap-2 px-3 py-1 rounded-md border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        liked ? "bg-red-50 border-red-200 hover:bg-red-100" : "border-border hover:bg-secondary"
      }`}
    >
      <FiHeart
        size={16}
        className={liked ? "text-red-500 fill-current" : "text-muted-foreground"}
      />
      <span className={`text-sm font-medium ${liked ? "text-red-500" : "text-muted-foreground"}`}>
        {likeCount}
      </span>
    </button>
  );
};

const LikeButton = memo(LikeButtonComponent);
LikeButton.displayName = "LikeButton";

export { LikeButton };

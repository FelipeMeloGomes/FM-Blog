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
      className={`group flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${
        liked
          ? "bg-red-500/10 border-red-500/30 hover:bg-red-500/20"
          : "border-input bg-background hover:bg-secondary/50 hover:border-primary/30"
      }`}
    >
      <FiHeart
        size={18}
        className={`transition-all duration-300 ${
          liked
            ? "text-red-500 fill-red-500 scale-110"
            : "text-muted-foreground group-hover:text-red-400"
        }`}
      />
      <span
        className={`text-sm font-semibold tabular-nums transition-colors ${
          liked ? "text-red-500" : "text-muted-foreground group-hover:text-foreground"
        }`}
      >
        {likeCount}
      </span>
    </button>
  );
};

const LikeButton = memo(LikeButtonComponent);
LikeButton.displayName = "LikeButton";

export { LikeButton };

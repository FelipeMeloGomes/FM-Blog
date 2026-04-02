import { memo } from "react";
import { FiShare2 } from "react-icons/fi";
import type { ShareButtonProps } from "./types";

const ShareButtonComponent = ({ post, onShare }: ShareButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onShare(post)}
      className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-input bg-background hover:bg-secondary/50 hover:border-primary/30 transition-all duration-200 active:scale-95"
    >
      <FiShare2
        size={16}
        className="text-muted-foreground group-hover:text-primary transition-colors"
      />
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        Compartilhar
      </span>
    </button>
  );
};

const ShareButton = memo(ShareButtonComponent);
ShareButton.displayName = "ShareButton";

export { ShareButton };

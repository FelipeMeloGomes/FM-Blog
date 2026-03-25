import { memo } from "react";
import { FiShare2 } from "react-icons/fi";
import type { ShareButtonProps } from "./types";

const ShareButtonComponent = ({ post, onShare }: ShareButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onShare(post)}
      className="flex items-center gap-2 px-3 py-1 rounded-md border border-border bg-transparent hover:bg-secondary transition-all duration-200"
    >
      <FiShare2 size={16} className="text-muted-foreground" />
      <span className="text-sm font-medium text-muted-foreground">Compartilhar</span>
    </button>
  );
};

const ShareButton = memo(ShareButtonComponent);
ShareButton.displayName = "ShareButton";

export { ShareButton };

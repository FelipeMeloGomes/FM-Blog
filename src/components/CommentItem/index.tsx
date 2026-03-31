import { memo } from "react";
import { FiHeart, FiMessageCircle, FiTrash2 } from "react-icons/fi";
import type { Comment } from "../../hooks/useComments";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface CommentItemProps {
  comment: Comment;
  currentUserId?: string;
  onDelete: (commentId: string, userId: string) => void;
  onLike: (commentId: string, userId: string) => void;
  onReply: (parentId: string) => void;
}

const formatDate = (timestamp: { seconds: number; nanoseconds: number } | null): string => {
  if (!timestamp || !timestamp.seconds) return "Agora mesmo";

  const date = new Date(timestamp.seconds * 1000);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "agora";
  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
};

const CommentItemComponent = ({
  comment,
  currentUserId,
  onDelete,
  onLike,
  onReply,
}: CommentItemProps) => {
  const isOwner = currentUserId === comment.userId;
  const isLiked = currentUserId && comment.likes?.includes(currentUserId);

  const handleDelete = () => {
    if (confirm("Deseja deletar este comentário?")) {
      onDelete(comment.id, comment.userId);
    }
  };

  return (
    <div className="flex gap-3">
      <Avatar size="sm" className="flex-shrink-0">
        <AvatarImage src={comment.userAvatar || undefined} />
        <AvatarFallback>{comment.userName?.charAt(0) ?? "?"}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-foreground">
            {comment.userName || "Usuário"}
          </span>
          <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
        </div>

        <p className="text-sm text-foreground/90 whitespace-pre-wrap">{comment.content}</p>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => currentUserId && onLike(comment.id, currentUserId)}
            disabled={!currentUserId}
            className={`flex items-center gap-1 text-xs transition-colors ${
              isLiked
                ? "text-red-500"
                : currentUserId
                  ? "text-muted-foreground hover:text-red-500"
                  : "text-muted-foreground cursor-not-allowed"
            }`}
          >
            <FiHeart size={14} className={isLiked ? "fill-current" : ""} />
            <span>{comment.likeCount || 0}</span>
          </button>

          {currentUserId && !isOwner && (
            <button
              type="button"
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <FiMessageCircle size={14} />
              <span>Responder</span>
            </button>
          )}

          {isOwner && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors"
            >
              <FiTrash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentItem = memo(CommentItemComponent);
CommentItem.displayName = "CommentItem";

export { CommentItem };

interface ReplyFormProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ReplyForm = ({ onSubmit, onCancel, loading }: ReplyFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("reply-content") as string;
    if (content.trim()) {
      onSubmit(content);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 ml-10">
      <Textarea
        name="reply-content"
        placeholder="Escreva uma resposta..."
        className="min-h-[80px] resize-none"
        required
      />
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Enviando..." : "Responder"}
        </Button>
      </div>
    </form>
  );
};

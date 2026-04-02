import { memo, useState } from "react";
import { FiEdit2, FiHeart, FiMessageCircle, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "sonner";
import type { Comment } from "../../hooks/useComments";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface CommentItemProps {
  comment: Comment;
  currentUserId?: string;
  onDelete: (commentId: string, userId: string) => void;
  onLike: (commentId: string, commentUserId: string) => void;
  onReply: (parentId: string) => void;
  onEdit: (commentId: string, content: string, userId: string) => Promise<void>;
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
  onEdit,
}: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = currentUserId === comment.userId;
  const isLiked = currentUserId && comment.likes?.includes(currentUserId);

  const handleDelete = () => {
    toast("Deletar comentário?", {
      position: "top-center",
      action: {
        label: "Deletar",
        onClick: () => onDelete(comment.id, comment.userId),
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {},
      },
    });
  };

  const handleEdit = async () => {
    if (!editContent.trim()) {
      toast.error("Comentário não pode estar vazio");
      return;
    }

    if (editContent === comment.content) {
      setIsEditing(false);
      return;
    }

    setIsSubmitting(true);
    try {
      await onEdit(comment.id, editContent, comment.userId);
      setIsEditing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 animate-in fade-in duration-200">
        <Avatar size="sm" className="flex-shrink-0 mt-1">
          <AvatarImage src={comment.userAvatar || undefined} />
          <AvatarFallback className="text-xs">{comment.userName?.charAt(0) ?? "?"}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{comment.userName || "Usuário"}</span>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              Editando...
            </span>
          </div>

          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[80px] resize-none text-sm rounded-lg"
            autoFocus
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancelEdit}
              disabled={isSubmitting}
            >
              <FiX className="h-4 w-4 mr-1" />
              Cancelar
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleEdit}
              disabled={isSubmitting || !editContent.trim()}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 p-4 rounded-xl hover:bg-secondary/30 transition-colors duration-200 group">
      <Avatar size="sm" className="flex-shrink-0 mt-0.5">
        <AvatarImage src={comment.userAvatar || undefined} />
        <AvatarFallback className="text-xs">{comment.userName?.charAt(0) ?? "?"}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{comment.userName || "Usuário"}</span>
          <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
        </div>

        <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
          {comment.content}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => currentUserId && onLike(comment.id, comment.userId)}
            disabled={!currentUserId}
            className={`group/like flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-all duration-200 ${
              isLiked
                ? "text-red-500 bg-red-500/10"
                : currentUserId
                  ? "text-muted-foreground hover:text-red-500 hover:bg-red-500/5"
                  : "text-muted-foreground/50 cursor-not-allowed"
            }`}
          >
            <FiHeart size={14} className={isLiked ? "fill-current" : ""} />
            <span>{comment.likeCount || 0}</span>
          </button>

          {currentUserId && !isOwner && (
            <button
              type="button"
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
            >
              <FiMessageCircle size={14} />
              <span>Responder</span>
            </button>
          )}

          {isOwner && (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
              >
                <FiEdit2 size={14} />
                <span>Editar</span>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-all duration-200"
              >
                <FiTrash2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentItem = memo(CommentItemComponent);
CommentItem.displayName = "CommentItem";

export { CommentItem };

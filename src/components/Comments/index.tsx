import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useComments } from "../../hooks/useComments";
import { CommentItem, ReplyForm } from "../CommentItem";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface CommentsProps {
  postId: string;
  userId?: string;
  userName?: string;
  userAvatar?: string | null;
}

const Comments = ({ postId, userId, userName, userAvatar }: CommentsProps) => {
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyLoading, setReplyLoading] = useState(false);
  const [newCommentLoading, setNewCommentLoading] = useState(false);

  const { comments, loading, error, addComment, deleteComment, toggleLike, getCommentCount } =
    useComments({
      postId,
      userId,
      userName,
      userAvatar,
    });

  const mainComments = comments.filter((c) => !c.parentId);
  const replies = comments.filter((c) => c.parentId);

  const handleNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("comment-content") as string;
    if (content.trim()) {
      setNewCommentLoading(true);
      await addComment(content);
      setNewCommentLoading(false);
      e.currentTarget.reset();
    }
  };

  const handleReply = (parentId: string) => {
    setReplyTo(parentId);
  };

  const handleSubmitReply = async (content: string) => {
    if (replyTo) {
      setReplyLoading(true);
      await addComment(content, replyTo);
      setReplyLoading(false);
      setReplyTo(null);
    }
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const getRepliesForComment = (commentId: string) => {
    return replies.filter((r) => r.parentId === commentId);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 border-t pt-6">
      <div className="flex items-center gap-2">
        <FiMessageCircle className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Comentários ({getCommentCount()})</h2>
      </div>

      {userId ? (
        <form onSubmit={handleNewComment} className="space-y-3">
          <Textarea
            name="comment-content"
            placeholder="Escreva um comentário..."
            className="min-h-[100px] resize-none"
            required
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={newCommentLoading}>
              {newCommentLoading ? "Enviando..." : "Comentar"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-secondary/50 rounded-lg p-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Faça login para comentar</p>
          <div className="flex gap-2 justify-center">
            <Button asChild size="sm">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/register">Cadastrar</Link>
            </Button>
          </div>
        </div>
      )}

      {mainComments.length > 0 ? (
        <div className="space-y-4">
          {mainComments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <CommentItem
                comment={comment}
                currentUserId={userId}
                onDelete={deleteComment}
                onLike={toggleLike}
                onReply={handleReply}
              />
              {replyTo === comment.id && (
                <ReplyForm
                  onSubmit={handleSubmitReply}
                  onCancel={handleCancelReply}
                  loading={replyLoading}
                />
              )}
              {getRepliesForComment(comment.id).length > 0 && (
                <div className="ml-10 space-y-3">
                  {getRepliesForComment(comment.id).map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      currentUserId={userId}
                      onDelete={deleteComment}
                      onLike={toggleLike}
                      onReply={handleReply}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-4">
          Nenhum comentário ainda. Seja o primeiro!
        </p>
      )}
    </div>
  );
};

export { Comments };

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useComments } from "../../hooks/useComments";
import { type CommentFormData, commentSchema } from "../../schemas";
import { CommentItem } from "../CommentItem";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface CommentsProps {
  postId: string;
  userId?: string;
  userName?: string;
  userAvatar?: string | null;
}

const MAX_CHARS = 500;

const Comments = ({ postId, userId, userName, userAvatar }: CommentsProps) => {
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const {
    register: registerReply,
    handleSubmit: handleSubmitReply,
    reset: resetReplyForm,
    watch: watchReply,
    formState: { errors: replyErrors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const {
    register: registerComment,
    handleSubmit: handleSubmitComment,
    reset: resetCommentForm,
    watch: watchComment,
    formState: { errors: commentErrors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const replyContent = watchReply("content");
  const commentContent = watchComment("content");

  const {
    comments,
    loading,
    loadingMore,
    error,
    hasMore,
    addComment,
    deleteComment,
    toggleLike,
    getCommentCount,
    loadMore,
  } = useComments({
    postId,
    userId,
    userName,
    userAvatar,
  });

  const mainComments = comments.filter((c) => !c.parentId);
  const replies = comments.filter((c) => c.parentId);

  const onSubmitComment = async (data: CommentFormData) => {
    await addComment(data.content);
    resetCommentForm();
  };

  const onSubmitReply = async (data: CommentFormData) => {
    if (replyTo) {
      await addComment(data.content, replyTo);
      resetReplyForm();
      setReplyTo(null);
    }
  };

  const handleCancelReply = () => {
    setReplyTo(null);
    resetReplyForm();
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
        <form onSubmit={handleSubmitComment(onSubmitComment)} className="space-y-3">
          <Textarea
            {...registerComment("content")}
            placeholder="Escreva um comentário..."
            className="min-h-[100px] resize-none"
            autoFocus
          />
          {commentErrors.content && (
            <p className="text-sm text-red-500">{commentErrors.content.message}</p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {commentContent?.length || 0}/{MAX_CHARS}
            </span>
            <Button
              type="submit"
              disabled={isSubmitting || (commentContent?.length || 0) > MAX_CHARS}
            >
              {isSubmitting ? "Enviando..." : "Comentar"}
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
                onReply={setReplyTo}
              />
              {replyTo === comment.id && (
                <form onSubmit={handleSubmitReply(onSubmitReply)} className="ml-10 space-y-2">
                  <Textarea
                    {...registerReply("content")}
                    placeholder="Escreva uma resposta..."
                    className="min-h-[80px] resize-none"
                    autoFocus
                  />
                  {replyErrors.content && (
                    <p className="text-sm text-red-500">{replyErrors.content.message}</p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {replyContent?.length || 0}/{MAX_CHARS}
                    </span>
                    <div className="flex gap-2">
                      <Button type="button" variant="ghost" size="sm" onClick={handleCancelReply}>
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={(replyContent?.length || 0) > MAX_CHARS}
                      >
                        Responder
                      </Button>
                    </div>
                  </div>
                </form>
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
                      onReply={setReplyTo}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? "Carregando..." : "Carregar mais comentários"}
              </Button>
            </div>
          )}
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

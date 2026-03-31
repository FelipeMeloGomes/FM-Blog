import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { db } from "../firebase/config";

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string | null;
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
  parentId: string | null;
  likes: string[];
  likeCount: number;
}

export interface UseCommentsResult {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  addComment: (content: string, parentId?: string | null) => Promise<void>;
  deleteComment: (commentId: string, userId: string) => Promise<void>;
  toggleLike: (commentId: string, userId: string) => Promise<void>;
  getCommentCount: () => number;
}

interface UseCommentsProps {
  postId: string;
  userId?: string;
  userName?: string;
  userAvatar?: string | null;
}

export const useComments = ({
  postId,
  userId,
  userName,
  userAvatar,
}: UseCommentsProps): UseCommentsResult => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("postId", "==", postId), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const commentsData: Comment[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];
        setComments(commentsData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching comments:", err);
        setError("Erro ao carregar comentários");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [postId]);

  const addComment = useCallback(
    async (content: string, parentId: string | null = null) => {
      if (!userId || !userName) {
        toast.error("Você precisa estar logado para comentar");
        return;
      }

      if (!content.trim()) {
        toast.error("Comentário não pode estar vazio");
        return;
      }

      try {
        const commentsRef = collection(db, "comments");
        await addDoc(commentsRef, {
          postId,
          userId,
          userName,
          userAvatar: userAvatar || null,
          content: content.trim(),
          createdAt: serverTimestamp(),
          parentId,
          likes: [],
          likeCount: 0,
        });
        toast.success(parentId ? "Resposta adicionada!" : "Comentário adicionado!");
      } catch (err) {
        console.error("Error adding comment:", err);
        toast.error("Erro ao adicionar comentário");
      }
    },
    [postId, userId, userName, userAvatar]
  );

  const deleteComment = useCallback(
    async (commentId: string, commentUserId: string) => {
      if (userId !== commentUserId) {
        toast.error("Você só pode deletar seus próprios comentários");
        return;
      }

      try {
        const commentRef = doc(db, "comments", commentId);
        await deleteDoc(commentRef);
        toast.success("Comentário deletado!");
      } catch (err) {
        console.error("Error deleting comment:", err);
        toast.error("Erro ao deletar comentário");
      }
    },
    [userId]
  );

  const toggleLike = useCallback(
    async (commentId: string, commentUserId: string) => {
      if (!userId) {
        toast.error("Você precisa estar logado para curtir");
        return;
      }

      if (userId === commentUserId) {
        toast.error("Você não pode curtir seu próprio comentário");
        return;
      }

      try {
        const commentRef = doc(db, "comments", commentId);

        await runTransaction(db, async (transaction) => {
          const commentDoc = await transaction.get(commentRef);
          if (!commentDoc.exists()) throw new Error("Comment does not exist");

          const commentData = commentDoc.data() as Comment;
          const hasLiked = commentData.likes?.includes(userId) ?? false;

          transaction.update(commentRef, {
            likes: hasLiked ? arrayRemove(userId) : arrayUnion(userId),
            likeCount: (commentData.likeCount || 0) + (hasLiked ? -1 : 1),
          });
        });
      } catch (err) {
        console.error("Error toggling like:", err);
        toast.error("Erro ao curtir comentário");
      }
    },
    [userId]
  );

  const getCommentCount = useCallback(() => {
    return comments.filter((c) => !c.parentId).length;
  }, [comments]);

  return {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    toggleLike,
    getCommentCount,
  };
};

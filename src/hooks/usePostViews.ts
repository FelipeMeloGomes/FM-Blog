import { useQueryClient } from "@tanstack/react-query";
import { doc, increment, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/config";
import { hasViewedPost, markPostAsViewed } from "../utils/security";

/**
 * Hook para incrementar visualizações de posts.
 * tracking baseado em sessão para evitar contagens duplicadas.
 *
 * @param postId - ID do post a ser rastreado
 *
 * @example
 * ```tsx
 * usePostViews(post.id);
 * ```
 */
export const usePostViews = (postId: string | undefined) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!postId) return;

    if (hasViewedPost(postId)) return;

    markPostAsViewed(postId);

    const postRef = doc(db, "posts", postId);
    updateDoc(postRef, {
      views: increment(1),
    })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["post", postId] });
      })
      .catch(() => {
        // Silently fail if update fails
      });
  }, [postId, queryClient]);
};

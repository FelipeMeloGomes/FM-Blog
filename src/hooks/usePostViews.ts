import {
  collection,
  doc,
  getDocs,
  increment,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCallback, useEffect } from "react";
import { db } from "../firebase/config";

/**
 * Hook para rastrear visualizações de posts no Firestore.
 * Cada usuário só pode visualizar um post uma vez.
 *
 * @param postId - ID do post
 * @param userId - ID do usuário (opcional)
 *
 * @example
 * ```tsx
 * usePostViews(post.id, user.uid);
 * ```
 */
export const usePostViews = (postId: string | undefined, userId?: string) => {
  const checkIfViewed = useCallback(async (): Promise<boolean> => {
    if (!postId || !userId) return false;

    try {
      const viewsRef = collection(db, "postViews");
      const q = query(
        viewsRef,
        where("postId", "==", postId),
        where("userId", "==", userId),
        limit(1)
      );
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch {
      return false;
    }
  }, [postId, userId]);

  const markAsViewed = useCallback(async () => {
    if (!postId || !userId) return;

    try {
      const viewId = `${postId}_${userId}`;
      const viewRef = doc(db, "postViews", viewId);

      await setDoc(viewRef, {
        postId,
        userId,
        createdAt: new Date(),
      });

      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        views: increment(1),
      });
    } catch {
      // Silently fail
    }
  }, [postId, userId]);

  useEffect(() => {
    if (!postId || !userId) return;

    const trackView = async () => {
      try {
        const alreadyViewed = await checkIfViewed();
        if (alreadyViewed) return;

        await markAsViewed();
      } catch {
        // Silently fail
      }
    };

    trackView();
  }, [postId, userId, checkIfViewed, markAsViewed]);
};

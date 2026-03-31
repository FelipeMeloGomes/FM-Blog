import { useCallback, useEffect, useState } from "react";
import type { UseLikeButtonProps, UseLikeButtonResult } from "./types";
import { useHandleNotLoggedIn } from "./useHandleNotLoggedIn";
import { useLike } from "./useLikeResult";

/**
 * Hook para gerenciar estado de likes de um post.
 * Gerencia contagem de likes, estado de like do usuário atual e loading state.
 *
 * @param postId - ID do post
 * @param userId - ID do usuário atual (opcional)
 * @returns Estado e handlers para o botão de like
 *
 * @example
 * ```tsx
 * const { likeCount, liked, loading, handleLikeClick } = useLikeButton({
 *   postId: "post123",
 *   userId: user?.uid
 * });
 * ```
 */
export const useLikeButton = ({ postId, userId }: UseLikeButtonProps): UseLikeButtonResult => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { likePost, getLikeInfo } = useLike();
  const handleNotLoggedIn = useHandleNotLoggedIn();

  const updateLikeState = useCallback(async () => {
    if (!postId) return;

    try {
      const { isLiked, likeCount } = await getLikeInfo(postId, userId || "");
      setLiked(isLiked);
      setLikeCount(likeCount);
    } catch (error) {
      console.error("Error fetching like data:", error);
    }
  }, [postId, userId, getLikeInfo]);

  useEffect(() => {
    const fetchLikeData = async () => {
      setLoading(true);
      await updateLikeState();
      setLoading(false);
    };

    fetchLikeData();
  }, [updateLikeState]);

  const handleLikeClick = async () => {
    if (!userId) {
      handleNotLoggedIn();
      return;
    }

    try {
      await likePost(postId, userId);
      await updateLikeState();
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return { likeCount, liked, loading, handleLikeClick };
};

import { useState, useEffect } from "react";
import { useLike } from "./useLikeResult";
import { UseLikeButtonProps, UseLikeButtonResult } from "./types";
import { useHandleNotLoggedIn } from "./useHandleNotLoggedIn";

export const useLikeButton = ({
  postId,
  userId,
}: UseLikeButtonProps): UseLikeButtonResult => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const { likePost, getLikeInfo } = useLike();
  const [loading, setLoading] = useState<boolean>(true);
  const handleNotLoggedIn = useHandleNotLoggedIn();

  useEffect(() => {
    const fetchLikeData = async () => {
      if (postId) {
        try {
          if (userId) {
            const { isLiked, likeCount } = await getLikeInfo(postId, userId);
            setLiked(isLiked);
            setLikeCount(likeCount);
          } else {
            const { likeCount } = await getLikeInfo(postId, "");
            setLikeCount(likeCount);
          }
        } catch (err) {
          console.error("Error fetching like data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchLikeData();
  }, [postId, userId, getLikeInfo]);

  const handleLikeClick = async () => {
    if (!userId) {
      handleNotLoggedIn();
      return;
    }
    if (postId && userId) {
      try {
        await likePost(postId, userId);
        const { isLiked, likeCount } = await getLikeInfo(postId, userId);
        setLiked(isLiked);
        setLikeCount(likeCount);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { likeCount, liked, loading, handleLikeClick };
};

import { useState } from "react";
import { db } from "../firebase/config";
import {
  doc,
  arrayUnion,
  arrayRemove,
  increment,
  getDoc,
  runTransaction,
} from "firebase/firestore";
import { UseLikeResult } from "./types";

export const useLike = (): UseLikeResult => {
  const [error, setError] = useState<string | null>(null);

  const likePost = async (postId: string, userId: string): Promise<void> => {
    if (!validateInputs(postId, userId)) return;

    try {
      await runTransaction(db, async (transaction) => {
        const postRef = doc(db, "posts", postId);
        const postDoc = await transaction.get(postRef);
        if (!postDoc.exists()) throw new Error("Post does not exist");

        const postData = postDoc.data();
        const hasLiked = postData?.likes?.includes(userId) ?? false;
        const currentLikeCount = postData.likeCount || 0;

        if (hasLiked) {
          if (currentLikeCount > 0) {
            transaction.update(postRef, {
              likes: arrayRemove(userId),
              likeCount: increment(-1),
            });
          }
        } else {
          transaction.update(postRef, {
            likes: arrayUnion(userId),
            likeCount: increment(1),
          });
        }
      });
    } catch (err) {
      handleError("Error updating like. Please try again.", err);
    }
  };

  const isLiked = async (postId: string, userId: string): Promise<boolean> => {
    if (!validateInputs(postId, userId)) return false;

    try {
      const postData = await fetchPostData(postId);
      return postData?.likes?.includes(userId) ?? false;
    } catch (err) {
      handleError("Error checking like status. Please try again.", err);
      return false;
    }
  };

  const getLikeCount = async (postId: string): Promise<number> => {
    if (!validateInputs(postId)) return 0;

    try {
      const postData = await fetchPostData(postId);
      return postData?.likeCount ?? 0;
    } catch (err) {
      handleError("Error fetching like count. Please try again.", err);
      return 0;
    }
  };

  const validateInputs = (postId: string, userId?: string): boolean => {
    if (!postId || (userId !== undefined && !userId)) {
      setError("postId or userId is missing");
      return false;
    }
    return true;
  };

  const fetchPostData = async (postId: string) => {
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    return postDoc.data();
  };

  const handleError = (message: string, err: unknown) => {
    setError(message);
    console.error(message, err);
  };

  return { likePost, isLiked, error, getLikeCount };
};

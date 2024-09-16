import { useState } from "react";
import { db } from "../firebase/config";
import {
  doc,
  updateDoc,
  arrayUnion,
  increment,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { UseLikeResult } from "./types";

export const useLike = (): UseLikeResult => {
  const [error, setError] = useState<string | null>(null);

  const likePost = async (postId: string, userId: string): Promise<void> => {
    if (!validateInputs(postId, userId)) return;

    try {
      const hasLiked = await isLiked(postId, userId);
      await updateLikeCount(postId, userId, hasLiked);
    } catch (err) {
      handleError("Erro ao atualizar o like. Por favor, tente novamente.", err);
    }
  };

  const isLiked = async (postId: string, userId: string): Promise<boolean> => {
    if (!validateInputs(postId, userId)) return false;

    try {
      const postData = await fetchPostData(postId);
      return postData?.likes?.includes(userId) ?? false;
    } catch (err) {
      handleError("Erro ao verificar o like. Por favor, tente novamente.", err);
      return false;
    }
  };

  const getLikeCount = async (postId: string): Promise<number> => {
    if (!validateInputs(postId)) return 0;

    try {
      const postData = await fetchPostData(postId);
      return postData?.likeCount ?? 0;
    } catch (err) {
      handleError(
        "Erro ao obter o número de likes. Por favor, tente novamente.",
        err,
      );
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

  const updateLikeCount = async (
    postId: string,
    userId: string,
    hasLiked: boolean,
  ) => {
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) return;

    const postData = postDoc.data();
    const currentLikeCount = postData.likeCount || 0;

    const updateData = hasLiked
      ? {
          likes: arrayRemove(userId),
          likeCount: increment(-1),
        }
      : {
          likes: arrayUnion(userId),
          likeCount: increment(1),
        };

    if (hasLiked && currentLikeCount <= 0) return;

    await updateDoc(postRef, updateData);
  };

  const handleError = (message: string, err: unknown) => {
    setError(message);
    console.error(message, err);
  };

  return { likePost, isLiked, error, getLikeCount };
};

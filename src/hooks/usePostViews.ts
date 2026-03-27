import { useQueryClient } from "@tanstack/react-query";
import { doc, increment, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/config";

export const usePostViews = (postId: string | undefined) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!postId) return;

    const postRef = doc(db, "posts", postId);
    updateDoc(postRef, {
      views: increment(1),
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    });
  }, [postId, queryClient]);
};

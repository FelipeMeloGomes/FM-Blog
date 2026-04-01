import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

/**
 * Hook para buscar o número de visualizações de um post
 * contando diretamente da collection postViews.
 *
 * @param postId - ID do post
 * @returns Número de visualizações
 *
 * @example
 * ```tsx
 * const viewCount = useViewCount(postId);
 * ```
 */
export const useViewCount = (postId: string | undefined): number => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    if (!postId) {
      setViewCount(0);
      return;
    }

    const fetchViewCount = async () => {
      try {
        const viewsRef = collection(db, "postViews");
        const q = query(viewsRef, where("postId", "==", postId));
        const snapshot = await getCountFromServer(q);
        setViewCount(snapshot.data().count);
      } catch {
        setViewCount(0);
      }
    };

    fetchViewCount();

    const interval = setInterval(fetchViewCount, 30000);
    return () => clearInterval(interval);
  }, [postId]);

  return viewCount;
};

import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

interface UsePostsViewsResult {
  viewsMap: Record<string, number>;
  loading: boolean;
}

export const usePostsViews = (postIds: string[]): UsePostsViewsResult => {
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      if (postIds.length === 0) {
        setViewsMap({});
        setLoading(false);
        return;
      }

      try {
        const viewsRef = collection(db, "postViews");
        const batchSize = 10;
        const allResults: Array<{ postId: string; count: number }> = [];

        for (let i = 0; i < postIds.length; i += batchSize) {
          const batch = postIds.slice(i, i + batchSize);
          const viewsPromises = batch.map(async (postId) => {
            const q = query(viewsRef, where("postId", "==", postId));
            const snapshot = await getCountFromServer(q);
            return { postId, count: snapshot.data().count };
          });

          const results = await Promise.all(viewsPromises);
          allResults.push(...results);
        }

        const map: Record<string, number> = {};
        for (const { postId, count } of allResults) {
          map[postId] = count;
        }

        setViewsMap(map);
      } catch {
        setViewsMap({});
      } finally {
        setLoading(false);
      }
    };

    fetchViews();
  }, [postIds.join(",")]);

  return { viewsMap, loading };
};

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
        const viewsPromises = postIds.slice(0, 10).map(async (postId) => {
          const q = query(viewsRef, where("postId", "==", postId));
          const snapshot = await getCountFromServer(q);
          return { postId, count: snapshot.data().count };
        });

        const results = await Promise.all(viewsPromises);
        const map: Record<string, number> = {};
        for (const { postId, count } of results) {
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

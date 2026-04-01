import { collection, getCountFromServer, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase/config";

interface Metrics {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
}

interface UseMetricsResult {
  metrics: Metrics | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useMetrics = (userId?: string | null): UseMetricsResult => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    if (!userId) {
      setMetrics(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const postsRef = collection(db, "posts");
      const postsQuery = query(postsRef, where("uid", "==", userId));
      const postsSnapshot = await getDocs(postsQuery);

      const totalPosts = postsSnapshot.size;

      let totalLikes = 0;
      const postIds: string[] = [];

      for (const doc of postsSnapshot.docs) {
        const data = doc.data();
        totalLikes += data.likeCount || 0;
        postIds.push(doc.id);
      }

      let totalViews = 0;
      const batchSize = 10;
      for (let i = 0; i < postIds.length; i += batchSize) {
        const batch = postIds.slice(i, i + batchSize);
        const viewsRef = collection(db, "postViews");
        const viewsPromises = batch.map(async (postId) => {
          const viewsQuery = query(viewsRef, where("postId", "==", postId));
          const snapshot = await getCountFromServer(viewsQuery);
          return snapshot.data().count;
        });
        const viewsCounts = await Promise.all(viewsPromises);
        totalViews += viewsCounts.reduce((sum, count) => sum + count, 0);
      }

      let totalComments = 0;
      for (let i = 0; i < postIds.length; i += batchSize) {
        const batch = postIds.slice(i, i + batchSize);
        const commentsRef = collection(db, "comments");
        const commentsQuery = query(commentsRef, where("postId", "in", batch));
        const commentsSnapshot = await getDocs(commentsQuery);
        totalComments += commentsSnapshot.size;
      }

      setMetrics({
        totalPosts,
        totalViews,
        totalLikes,
        totalComments,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao buscar métricas";
      setError(errorMessage);
      console.error("Error fetching metrics:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics,
  };
};

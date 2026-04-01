import { collection, getDocs, query, where } from "firebase/firestore";
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

      let totalViews = 0;
      let totalLikes = 0;
      const postIds: string[] = [];

      for (const doc of postsSnapshot.docs) {
        const data = doc.data();
        totalViews += data.views || 0;
        totalLikes += data.likes?.length || 0;
        postIds.push(doc.id);
      }

      let totalComments = 0;
      if (postIds.length > 0) {
        const commentsRef = collection(db, "comments");
        const commentsQuery = query(commentsRef, where("postId", "in", postIds.slice(0, 10)));
        const commentsSnapshot = await getDocs(commentsQuery);
        totalComments = commentsSnapshot.size;
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

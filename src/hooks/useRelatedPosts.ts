import { collection, getDocs, limit, or, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

interface RelatedPost {
  id: string;
  title: string;
  image: string;
  tagsArray: string[];
  createdBy: string;
  photoURL: string;
  createdAt: unknown;
  body: string;
}

interface UseRelatedPostsResult {
  relatedPosts: RelatedPost[];
  loading: boolean;
  error: string | null;
}

export const useRelatedPosts = (
  currentPostId: string | undefined,
  tags: string[],
  maxResults = 3
): UseRelatedPostsResult => {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!currentPostId || tags.length === 0) {
        setRelatedPosts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const postsRef = collection(db, "posts");
        const conditions = tags
          .slice(0, 10)
          .map((tag) => where("tagsArray", "array-contains", tag));
        const q = query(postsRef, or(...conditions), limit(20));

        const snapshot = await getDocs(q);

        const posts: RelatedPost[] = [];
        for (const doc of snapshot.docs) {
          if (doc.id === currentPostId) continue;
          const data = doc.data() as Omit<RelatedPost, "id">;
          posts.push({ ...data, id: doc.id });
        }

        const postsWithTagCount = posts.map((post) => {
          const matchingTags = post.tagsArray?.filter((tag) => tags.includes(tag)).length || 0;
          return { post, matchingTags };
        });

        postsWithTagCount.sort((a, b) => b.matchingTags - a.matchingTags);

        setRelatedPosts(postsWithTagCount.slice(0, maxResults).map((item) => item.post));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao buscar posts relacionados";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPostId, tags.join(","), maxResults]);

  return { relatedPosts, loading, error };
};

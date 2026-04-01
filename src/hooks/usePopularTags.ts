import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

interface UsePopularTagsResult {
  tags: string[];
  loading: boolean;
  error: string | null;
}

const POPULAR_TAGS_LIMIT = 10;
const POSTS_LIMIT_FOR_TAGS = 50;

/**
 * Hook para buscar as tags mais populares dos posts.
 * Extrai e conta tags dos posts mais recentes.
 *
 * @returns Lista de tags ordenadas por popularidade
 *
 * @example
 * ```tsx
 * const { tags, loading } = usePopularTags();
 *
 * {tags.map(tag => (
 *   <button onClick={() => navigate(`/search?q=${tag}`)}>{tag}</button>
 * ))}
 * ```
 */
export const usePopularTags = (): UsePopularTagsResult => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"), limit(POSTS_LIMIT_FOR_TAGS));

        const snapshot = await getDocs(q);
        const tagCount: Record<string, number> = {};

        for (const doc of snapshot.docs) {
          const data = doc.data();
          const tagsArray = data.tagsArray as string[] | undefined;

          if (tagsArray && Array.isArray(tagsArray)) {
            for (const tag of tagsArray) {
              tagCount[tag] = (tagCount[tag] || 0) + 1;
            }
          }
        }

        const sortedTags = Object.entries(tagCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, POPULAR_TAGS_LIMIT)
          .map(([tag]) => tag);

        setTags(sortedTags);
      } catch (err) {
        console.error("Error fetching popular tags:", err);
        setError("Erro ao buscar tags populares");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTags();
  }, []);

  return { tags, loading, error };
};

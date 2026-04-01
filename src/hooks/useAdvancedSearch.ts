import { useMemo } from "react";
import type { AdvancedFiltersState } from "../components/AdvancedFilters/types";

export type SortOption = "newest" | "oldest" | "mostLiked";

interface Post {
  id: string;
  title: string;
  createdAt?: { seconds?: number } | unknown;
  likes?: string[];
  createdBy?: string;
  [key: string]: unknown;
}

export const useAdvancedSearch = (posts: Post[] | null, filters: AdvancedFiltersState) => {
  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    let result = [...posts];

    if (filters.author.trim()) {
      const authorQuery = filters.author.toLowerCase().trim();
      result = result.filter((post) => post.createdBy?.toLowerCase().includes(authorQuery));
    }

    result.sort((a, b) => {
      const getDate = (p: Post) => {
        if (typeof p.createdAt === "object" && p.createdAt !== null && "seconds" in p.createdAt) {
          return (p.createdAt as { seconds: number }).seconds || 0;
        }
        return 0;
      };

      switch (filters.sortBy) {
        case "oldest":
          return getDate(a) - getDate(b);
        case "mostLiked":
          return (b.likes?.length || 0) - (a.likes?.length || 0);
        default:
          return getDate(b) - getDate(a);
      }
    });

    return result;
  }, [posts, filters]);

  return { filteredPosts };
};

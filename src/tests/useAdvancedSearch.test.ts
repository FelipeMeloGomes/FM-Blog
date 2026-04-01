import { describe, expect, it } from "vitest";

interface Post {
  id: string;
  title: string;
  createdAt?: { seconds?: number } | unknown;
  likes?: string[];
  createdBy?: string;
}

type SortOption = "newest" | "oldest" | "mostLiked";

interface AdvancedFiltersState {
  sortBy: SortOption;
  author: string;
}

const applyFilters = (posts: Post[] | null, filters: AdvancedFiltersState): Post[] => {
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
};

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Post A",
    createdBy: "John",
    createdAt: { seconds: 1000 },
    likes: ["user1", "user2"],
  },
  { id: "2", title: "Post B", createdBy: "Jane", createdAt: { seconds: 2000 }, likes: ["user1"] },
  { id: "3", title: "Post C", createdBy: "John", createdAt: { seconds: 3000 }, likes: [] },
];

describe("useAdvancedSearch - filtering", () => {
  it("should return empty array when posts is null", () => {
    const result = applyFilters(null, { sortBy: "newest", author: "" });
    expect(result).toEqual([]);
  });

  it("should return all posts when no filters applied", () => {
    const result = applyFilters(mockPosts, { sortBy: "newest", author: "" });
    expect(result).toHaveLength(3);
  });

  it("should filter by author name", () => {
    const result = applyFilters(mockPosts, { sortBy: "newest", author: "John" });
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.createdBy === "John")).toBe(true);
  });

  it("should be case insensitive when filtering by author", () => {
    const result = applyFilters(mockPosts, { sortBy: "newest", author: "john" });
    expect(result).toHaveLength(2);
  });

  it("should return empty array when author not found", () => {
    const result = applyFilters(mockPosts, { sortBy: "newest", author: "Unknown" });
    expect(result).toHaveLength(0);
  });

  it("should trim author filter", () => {
    const result = applyFilters(mockPosts, { sortBy: "newest", author: "  Jane  " });
    expect(result).toHaveLength(1);
    expect(result[0].createdBy).toBe("Jane");
  });
});

describe("useAdvancedSearch - sorting", () => {
  it("should sort by newest first (default)", () => {
    const result = applyFilters(mockPosts, { sortBy: "newest", author: "" });
    expect(result[0].id).toBe("3");
    expect(result[1].id).toBe("2");
    expect(result[2].id).toBe("1");
  });

  it("should sort by oldest first", () => {
    const result = applyFilters(mockPosts, { sortBy: "oldest", author: "" });
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("2");
    expect(result[2].id).toBe("3");
  });

  it("should sort by most liked", () => {
    const result = applyFilters(mockPosts, { sortBy: "mostLiked", author: "" });
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("2");
    expect(result[2].id).toBe("3");
  });

  it("should handle posts without createdAt", () => {
    const postsWithMissingDate: Post[] = [
      { id: "1", title: "No date" },
      { id: "2", title: "With date", createdAt: { seconds: 1000 } },
    ];
    const result = applyFilters(postsWithMissingDate, { sortBy: "newest", author: "" });
    expect(result).toHaveLength(2);
  });

  it("should handle posts without likes", () => {
    const postsWithMissingLikes: Post[] = [
      { id: "1", title: "No likes", createdAt: { seconds: 1000 } },
      { id: "2", title: "With likes", createdAt: { seconds: 2000 }, likes: ["user1"] },
    ];
    const result = applyFilters(postsWithMissingLikes, { sortBy: "mostLiked", author: "" });
    expect(result[0].id).toBe("2");
    expect(result[1].id).toBe("1");
  });
});

describe("useAdvancedSearch - combined filtering and sorting", () => {
  it("should filter first then sort", () => {
    const result = applyFilters(mockPosts, { sortBy: "oldest", author: "John" });
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("3");
  });

  it("should handle empty posts array", () => {
    const result = applyFilters([], { sortBy: "newest", author: "John" });
    expect(result).toEqual([]);
  });
});

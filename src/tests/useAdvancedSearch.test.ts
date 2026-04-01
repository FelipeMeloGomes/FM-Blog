import { describe, expect, it } from "vitest";

interface Post {
  id: string;
  title: string;
  createdAt?: { seconds?: number } | unknown;
  likes?: string[];
  createdBy?: string;
  [key: string]: unknown;
}

interface AdvancedFiltersState {
  sortBy: "newest" | "oldest" | "mostLiked";
  author: string;
}

const applyAdvancedFilters = (posts: Post[] | null, filters: AdvancedFiltersState): Post[] => {
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

const createMockPost = (overrides: Partial<Post> = {}): Post => ({
  id: "1",
  title: "Test Post",
  createdBy: "Author",
  createdAt: { seconds: 1000 },
  likes: [],
  ...overrides,
});

describe("applyAdvancedFilters", () => {
  describe("given null posts", () => {
    it("should return empty array", () => {
      const result = applyAdvancedFilters(null, {
        sortBy: "newest",
        author: "",
      });
      expect(result).toEqual([]);
    });
  });

  describe("given empty posts array", () => {
    it("should return empty array", () => {
      const result = applyAdvancedFilters([], {
        sortBy: "newest",
        author: "",
      });
      expect(result).toEqual([]);
    });
  });

  describe("given posts without filters", () => {
    const posts = [
      createMockPost({ id: "1" }),
      createMockPost({ id: "2" }),
      createMockPost({ id: "3" }),
    ];

    it("should return all posts", () => {
      const result = applyAdvancedFilters(posts, {
        sortBy: "newest",
        author: "",
      });
      expect(result).toHaveLength(3);
    });

    it("should not mutate original array", () => {
      const original = [...posts];
      applyAdvancedFilters(posts, { sortBy: "newest", author: "" });
      expect(posts).toEqual(original);
    });
  });

  describe("given author filter", () => {
    const posts = [
      createMockPost({ id: "1", createdBy: "John" }),
      createMockPost({ id: "2", createdBy: "Jane" }),
      createMockPost({ id: "3", createdBy: "John" }),
    ];

    it("should filter by exact author name", () => {
      const result = applyAdvancedFilters(posts, {
        sortBy: "newest",
        author: "John",
      });
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.createdBy === "John")).toBe(true);
    });

    it("should be case insensitive", () => {
      const result = applyAdvancedFilters(posts, {
        sortBy: "newest",
        author: "john",
      });
      expect(result).toHaveLength(2);
    });

    it("should return empty when author not found", () => {
      const result = applyAdvancedFilters(posts, {
        sortBy: "newest",
        author: "Unknown",
      });
      expect(result).toHaveLength(0);
    });

    it("should trim whitespace", () => {
      const result = applyAdvancedFilters(posts, {
        sortBy: "newest",
        author: "  Jane  ",
      });
      expect(result).toHaveLength(1);
      expect(result[0].createdBy).toBe("Jane");
    });
  });

  describe("given sorting options", () => {
    const posts = [
      createMockPost({ id: "1", createdAt: { seconds: 1000 }, likes: ["a", "b"] }),
      createMockPost({ id: "2", createdAt: { seconds: 2000 }, likes: ["a"] }),
      createMockPost({ id: "3", createdAt: { seconds: 3000 }, likes: [] }),
    ];

    it("should sort by newest first (default)", () => {
      const result = applyAdvancedFilters(posts, {
        sortBy: "newest",
        author: "",
      });
      expect(result[0].id).toBe("3");
      expect(result[1].id).toBe("2");
      expect(result[2].id).toBe("1");
    });

    it("should sort by oldest first", () => {
      const result = applyAdvancedFilters(posts, {
        sortBy: "oldest",
        author: "",
      });
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
      expect(result[2].id).toBe("3");
    });

    it("should sort by most liked", () => {
      const result = applyAdvancedFilters(posts, {
        sortBy: "mostLiked",
        author: "",
      });
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
      expect(result[2].id).toBe("3");
    });
  });

  describe("given edge cases", () => {
    it("should handle posts without createdAt", () => {
      const posts = [
        createMockPost({ id: "1", createdAt: undefined }),
        createMockPost({ id: "2", createdAt: { seconds: 1000 } }),
      ];
      const result = applyAdvancedFilters(posts, {
        sortBy: "newest",
        author: "",
      });
      expect(result).toHaveLength(2);
    });

    it("should handle posts without likes", () => {
      const posts = [
        createMockPost({ id: "1", likes: undefined }),
        createMockPost({ id: "2", likes: ["a"] }),
      ];
      const result = applyAdvancedFilters(posts, {
        sortBy: "mostLiked",
        author: "",
      });
      expect(result[0].id).toBe("2");
    });

    it("should filter then sort", () => {
      const posts = [
        createMockPost({ id: "1", createdBy: "John", createdAt: { seconds: 1000 } }),
        createMockPost({ id: "2", createdBy: "Jane", createdAt: { seconds: 2000 } }),
        createMockPost({ id: "3", createdBy: "John", createdAt: { seconds: 3000 } }),
      ];

      const result = applyAdvancedFilters(posts, {
        sortBy: "oldest",
        author: "John",
      });

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("3");
    });
  });
});

import { useQuery } from "@tanstack/react-query";
import { fetchPost, fetchPosts, fetchPostsByTag, fetchUserPosts } from "../api/posts";

export const usePosts = (limitCount = 6) => {
  return useQuery({
    queryKey: ["posts", limitCount],
    queryFn: () => fetchPosts(limitCount),
  });
};

export const usePost = (id: string | undefined) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id as string),
    enabled: !!id,
  });
};

export const usePostsByTag = (tag: string | null, limitCount = 6) => {
  return useQuery({
    queryKey: ["posts", "tag", tag, limitCount],
    queryFn: () => fetchPostsByTag(tag as string, limitCount),
    enabled: !!tag,
  });
};

export const useUserPosts = (uid: string | undefined, limitCount = 6) => {
  return useQuery({
    queryKey: ["posts", "user", uid, limitCount],
    queryFn: () => fetchUserPosts(uid as string, limitCount),
    enabled: !!uid,
  });
};

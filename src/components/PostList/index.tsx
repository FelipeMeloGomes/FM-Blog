import { Stack } from "@chakra-ui/react";
import { PostDetail } from "../PostDetail";
import { ResponsiveSkeletonCard } from "../PostSkeleton";
import { PostListProps } from "./types";

const PostList = ({ posts }: PostListProps) => {
  if (!posts || posts.length === 0) {
    return <ResponsiveSkeletonCard />;
  }

  return (
    <Stack
      direction="row"
      wrap="wrap"
      maxW="90%"
      justify="center"
      align="center"
      gap={10}
    >
      {posts.map((post) => (
        <PostDetail key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export { PostList };

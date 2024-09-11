import { PostDetail } from "../PostDetail";
import { PostListProps } from "./types";
import { ResponsiveSkeletonCard } from "../PostSkeleton";

const PostList = ({ posts }: PostListProps) => {
  if (!posts || posts.length === 0) {
    return <ResponsiveSkeletonCard />;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostDetail key={post.id} post={post} />
      ))}
    </div>
  );
};

export { PostList };

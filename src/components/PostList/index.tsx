import { PostDetail } from "../PostDetail";
import { Spinner } from "../Spinner";
import { PostListProps } from "./types";

const PostList = ({ posts }: PostListProps) => {
  if (!posts || posts.length === 0) {
    return <Spinner />;
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

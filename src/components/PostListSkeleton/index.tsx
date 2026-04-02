import { PostCardSkeleton } from "../PostCardSkeleton";

const PostListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
};

export { PostListSkeleton };

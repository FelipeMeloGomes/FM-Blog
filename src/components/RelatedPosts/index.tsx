import { FiLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PostCard } from "../PostCard";
import { Skeleton } from "../ui/skeleton";

interface RelatedPostsProps {
  posts: Array<{
    id: string;
    title: string;
    image: string;
    tagsArray: string[];
    createdBy: string;
    photoURL: string;
    createdAt: unknown;
    body: string;
  }>;
  loading: boolean;
}

export const RelatedPosts = ({ posts, loading }: RelatedPostsProps) => {
  if (loading) {
    return (
      <div className="border-t pt-8 mt-8">
        <div className="flex items-center gap-2 mb-6">
          <FiLink className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Posts relacionados</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-lg overflow-hidden border">
              <Skeleton className="h-[120px] w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="border-t pt-8 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <FiLink className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Posts relacionados</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Ver todos os posts
        </Link>
      </div>
    </div>
  );
};

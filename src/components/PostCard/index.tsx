import { Link as RouterLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { PostCardProps } from "./types";

const calculateReadTime = (body: string | undefined): number => {
  if (!body) return 1;
  const wordsPerMinute = 200;
  const cleanText = body.replace(/<[^>]*>/g, "");
  const words = cleanText.split(/\s+/).filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

const formatDate = (date: unknown): string => {
  if (!date) return "";
  const timestamp = date as { seconds?: number; toDate?: () => Date };
  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  if (timestamp.toDate && typeof timestamp.toDate === "function") {
    return timestamp.toDate().toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  if (date instanceof Date) {
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return "";
};

const PostCard = ({ post }: PostCardProps) => {
  const readTime = calculateReadTime(post.body);
  const formattedDate = formatDate(post.createdAt);

  return (
    <RouterLink
      to={`/posts/${post.id}`}
      className="block bg-card rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/640x360?text=Sem+imagem";
          }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-3 hover:text-muted-foreground transition-colors">
          {post.title}
        </h3>

        {post.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.description}</p>
        )}

        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarImage src={post.photoURL} />
            <AvatarFallback>{post.createdBy?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">{post.createdBy}</p>
            <p className="text-xs text-muted-foreground">
              {formattedDate} · {readTime} min · 👁 {post.views || 0}
            </p>
          </div>
        </div>
      </div>
    </RouterLink>
  );
};

export { PostCard };

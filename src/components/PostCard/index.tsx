import { Link as RouterLink } from "react-router-dom";
import { CONSTANTS } from "../../utils/constants";
import { calculateReadTime, formatDateShort } from "../../utils/date";
import { ImageWithFallback } from "../ImageWithFallback";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { PostCardProps } from "./types";

const PostCard = ({ post }: PostCardProps) => {
  const readTime = calculateReadTime(post.body);
  const formattedDate = formatDateShort(post.createdAt);

  return (
    <RouterLink
      to={`/posts/${post.id}`}
      className="block bg-card rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      <div className="relative h-[200px] overflow-hidden">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          fallbackSrc={CONSTANTS.IMAGE.FALLBACK_PLACEHOLDER}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
              {formattedDate} · {readTime} min
            </p>
          </div>
        </div>
      </div>
    </RouterLink>
  );
};

export { PostCard };

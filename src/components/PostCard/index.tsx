import { Link as RouterLink, useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../utils/constants";
import { calculateReadTime, formatDateShort } from "../../utils/date";
import { ImageWithFallback } from "../ImageWithFallback";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { PostCardProps } from "./types";

const PostCard = ({ post }: PostCardProps) => {
  const readTime = calculateReadTime(post.body);
  const formattedDate = formatDateShort(post.createdAt);
  const navigate = useNavigate();

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <RouterLink
      to={`/posts/${post.id}`}
      className="group block bg-card rounded-2xl overflow-hidden cursor-pointer border border-transparent shadow-sm hover:shadow-xl hover:border-border/50 transition-all duration-300"
    >
      <div className="relative h-[200px] overflow-hidden">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          fallbackSrc={CONSTANTS.IMAGE.FALLBACK_PLACEHOLDER}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-2.5 group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>

        {post.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.description}</p>
        )}

        {post.tagsArray && post.tagsArray.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tagsArray.slice(0, 3).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(e) => handleTagClick(e, tag)}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/80 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer"
              >
                {tag}
              </button>
            ))}
            {post.tagsArray.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                +{post.tagsArray.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-border/50">
          <Avatar size="sm">
            <AvatarImage src={post.photoURL} />
            <AvatarFallback className="text-xs">{post.createdBy?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{post.createdBy}</p>
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

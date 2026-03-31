import { FiArrowLeft, FiEye } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { Comments } from "../../components/Comments";
import { ImageWithFallback } from "../../components/ImageWithFallback";
import { LikeButton } from "../../components/LikeButton";
import { PostDetailSkeleton } from "../../components/PostDetailSkeleton";
import { ShareButton } from "../../components/ShareButton";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useAuthValue } from "../../context/AuthContext";
import { usePostViews } from "../../hooks/usePostViews";
import { usePost } from "../../lib/hooks/usePostsQuery";
import { handleShare } from "../../utils/ShareContent";
import type { Post as PostType } from "../../utils/ShareContent/types";
import { sanitizeHtml } from "../../utils/sanitize";

const formatDate = (date: unknown): string => {
  if (!date) return "";
  const timestamp = date as { seconds?: number; toDate?: () => Date };
  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  if (timestamp.toDate && typeof timestamp.toDate === "function") {
    return timestamp.toDate().toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  if (date instanceof Date) {
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return "";
};

const calculateReadTime = (body: string | undefined): number => {
  if (!body) return 1;
  const wordsPerMinute = 200;
  const cleanText = body.replace(/<[^>]*>/g, "");
  const words = cleanText.split(/\s+/).filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

const Post = () => {
  const { user } = useAuthValue() || {};
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = usePost(id);

  usePostViews(id);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <PostDetailSkeleton />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Post não encontrado</p>
      </div>
    );
  }

  const readTime = calculateReadTime(String(post.body || ""));
  const formattedDate = formatDate(post.createdAt);
  const isOwner = user?.uid === post.uid;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex flex-col gap-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-relaxed">
          {post.title}
        </h1>

        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={post.photoURL} />
            <AvatarFallback>{post.createdBy?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <p className="text-sm text-muted-foreground font-medium">{post.createdBy}</p>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>

        <div className="aspect-video relative">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
          />
        </div>

        <div
          className="post-content prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(String(post.body || "")) }}
        />

        {post.tagsArray && post.tagsArray.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            {post.tagsArray.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
            <span className="text-xs text-muted-foreground">· {readTime} min de leitura</span>
          </div>
        )}

        <div className="border-t pt-4" />

        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-2">
            <LikeButton postId={post.id!} userId={user?.uid || ""} />
            <ShareButton post={post as PostType} onShare={handleShare} />
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <FiEye className="h-4 w-4" />
              {post.views || 0}
            </span>
          </div>

          <div className="flex gap-4">
            {isOwner && (
              <Button asChild variant="ghost" size="sm">
                <Link to={`/posts/edit/${post.id}`}>Editar post</Link>
              </Button>
            )}
          </div>
        </div>

        <Comments
          postId={post.id!}
          userId={user?.uid}
          userName={user?.name}
          userAvatar={user?.photoURL}
        />

        <div className="pt-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;

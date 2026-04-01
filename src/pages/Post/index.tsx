import { FiArrowLeft, FiBookmark, FiEye } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { Comments } from "../../components/Comments";
import { ImageWithFallback } from "../../components/ImageWithFallback";
import { LikeButton } from "../../components/LikeButton";
import { PostDetailSkeleton } from "../../components/PostDetailSkeleton";
import { RelatedPosts } from "../../components/RelatedPosts";
import { ShareButton } from "../../components/ShareButton";
import { TableOfContents } from "../../components/TableOfContents";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useAuthValue } from "../../context/AuthContext";
import { usePostViews } from "../../hooks/usePostViews";
import { useRelatedPosts } from "../../hooks/useRelatedPosts";
import { useSavedPosts } from "../../hooks/useSavedPosts";
import { useViewCount } from "../../hooks/useViewCount";
import { usePost } from "../../lib/hooks/usePostsQuery";
import { handleShare } from "../../utils/ShareContent";
import type { Post as PostType } from "../../utils/ShareContent/types";
import { calculateReadTime, formatDate } from "../../utils/date";
import { sanitizeHtml } from "../../utils/sanitize";

const Post = () => {
  const { user } = useAuthValue() || {};
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = usePost(id);

  usePostViews(id, user?.uid);
  const viewCount = useViewCount(id);
  const { isSaved, toggleSave } = useSavedPosts();
  const { relatedPosts, loading: relatedLoading } = useRelatedPosts(
    post?.id,
    post?.tagsArray || []
  );

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
    <div className="max-w-6xl mx-auto py-8">
      <div className="xl:grid xl:grid-cols-[1fr_250px] xl:gap-8">
        <div className="flex flex-col gap-8">
          <TableOfContents />
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSave(post.id!)}
                className={isSaved(post.id!) ? "text-primary" : ""}
              >
                <FiBookmark className={`h-4 w-4 ${isSaved(post.id!) ? "fill-current" : ""}`} />
              </Button>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <FiEye className="h-4 w-4" />
                {viewCount}
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

          <RelatedPosts posts={relatedPosts} loading={relatedLoading} />

          <div className="pt-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="sticky top-24">
            <TableOfContents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

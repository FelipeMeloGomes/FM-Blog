import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Image,
  Tag,
  TagLabel,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { LikeButton } from "../../components/LikeButton";
import { PostDetailSkeleton } from "../../components/PostDetailSkeleton";
import { ShareButton } from "../../components/ShareButton";
import { useAuthValue } from "../../context/AuthContext";
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

  if (isLoading) {
    return (
      <Container maxW="2xl" py={8}>
        <PostDetailSkeleton />
      </Container>
    );
  }

  if (!post) {
    return (
      <Box textAlign="center" py={20}>
        <Text color="text.secondary">Post não encontrado</Text>
      </Box>
    );
  }

  const readTime = calculateReadTime(String(post.body || ""));
  const formattedDate = formatDate(post.createdAt);
  const isOwner = user?.uid === post.uid;

  return (
    <Container maxW="2xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading
          fontFamily="heading"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="700"
          color="text.primary"
          lineHeight="tall"
        >
          {post.title}
        </Heading>

        <HStack spacing={4}>
          <Avatar size="sm" name={post.createdBy} />
          <VStack spacing={0} align="start">
            <Text fontSize="sm" color="text.secondary" fontWeight="medium">
              {post.createdBy}
            </Text>
            <Text fontSize="xs" color="text.muted">
              {formattedDate}
            </Text>
          </VStack>
        </HStack>

        <AspectRatio ratio={16 / 9}>
          <Image
            src={post.image}
            alt={post.title}
            objectFit="cover"
            borderRadius="md"
            loading="lazy"
            fallbackSrc="https://via.placeholder.com/800x450?text=Sem+imagem"
          />
        </AspectRatio>

        <Box
          className="post-content"
          sx={{
            "& p": {
              marginBottom: "1.5rem",
              lineHeight: "1.8",
              color: "text.secondary",
            },
            "& h2": {
              fontSize: "1.5rem",
              marginTop: "2rem",
              marginBottom: "1rem",
              fontFamily: "heading",
              fontWeight: "600",
              color: "text.primary",
            },
            "& h3": {
              fontSize: "1.25rem",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
              fontFamily: "heading",
              fontWeight: "600",
              color: "text.primary",
            },
            "& ul, & ol": {
              marginBottom: "1.5rem",
              paddingLeft: "1.5rem",
            },
            "& li": {
              marginBottom: "0.5rem",
            },
            "& img": {
              maxWidth: "100%",
              borderRadius: "8px",
              margin: "1rem 0",
            },
            "& blockquote": {
              borderLeft: "3px solid",
              borderColor: "border.default",
              paddingLeft: "1rem",
              marginLeft: 0,
              fontStyle: "italic",
              color: "text.secondary",
            },
            "& code": {
              bg: "bg.secondary",
              padding: "0.25rem 0.5rem",
              borderRadius: "sm",
              fontSize: "sm",
            },
            "& pre": {
              bg: "bg.secondary",
              padding: "1rem",
              borderRadius: "md",
              overflow: "auto",
              marginBottom: "1.5rem",
            },
          }}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(String(post.body || "")) }}
        />

        {post.tagsArray && post.tagsArray.length > 0 && (
          <Wrap spacing={2} align="center">
            {post.tagsArray.map((tag) => (
              <WrapItem key={tag}>
                <Tag size="sm" variant="subtle" colorScheme="gray">
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              </WrapItem>
            ))}
            <WrapItem>
              <Text fontSize="xs" color="text.muted">
                · {readTime} min de leitura
              </Text>
            </WrapItem>
          </Wrap>
        )}

        <Divider />

        <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <HStack spacing={2}>
            <LikeButton postId={post.id!} userId={user?.uid || ""} />
            <ShareButton post={post as PostType} onShare={handleShare} />
          </HStack>

          <HStack spacing={4}>
            {isOwner && (
              <Button as={RouterLink} to={`/posts/edit/${post.id}`} variant="ghost" size="sm">
                Editar post
              </Button>
            )}
          </HStack>
        </HStack>

        <Box pt={4}>
          <Button as={RouterLink} to="/" variant="ghost" leftIcon={<ArrowBackIcon />} size="sm">
            Voltar
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Post;

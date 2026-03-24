import { Avatar, Box, HStack, Heading, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
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
    <Box
      as={RouterLink}
      to={`/posts/${post.id}`}
      display="block"
      bg="bg.primary"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "lg",
      }}
      cursor="pointer"
    >
      <Box position="relative" overflow="hidden" height="200px">
        <Image
          src={post.image}
          alt={post.title}
          width="100%"
          height="100%"
          objectFit="cover"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
          fallbackSrc="https://via.placeholder.com/640x360?text=Sem+imagem"
        />
      </Box>

      <Box p={6}>
        <Heading
          as="h3"
          fontSize="lg"
          fontWeight="semibold"
          lineHeight="tight"
          mb={3}
          color="text.primary"
          noOfLines={2}
          _hover={{ color: "text.secondary" }}
        >
          {post.title}
        </Heading>

        {post.description && (
          <Text fontSize="sm" color="text.secondary" lineHeight="relaxed" mb={4} noOfLines={3}>
            {post.description}
          </Text>
        )}

        <HStack gap={3}>
          <Avatar size="sm" name={post.createdBy} />
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="text.primary">
              {post.createdBy}
            </Text>
            <Text fontSize="xs" color="text.muted">
              {formattedDate} · {readTime} min
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export { PostCard };

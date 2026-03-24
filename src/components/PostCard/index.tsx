import { AspectRatio, Avatar, Box, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
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
      border="1px"
      borderColor="border.subtle"
      borderRadius="md"
      overflow="hidden"
      _hover={{ borderColor: "border.hover", bg: "bg.secondary" }}
      transition="all 0.2s"
    >
      <AspectRatio ratio={16 / 9}>
        <Image
          src={post.image}
          alt={post.title}
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/640x360?text=Sem+imagem"
        />
      </AspectRatio>

      <VStack spacing={3} p={5} align="stretch">
        {post.tagsArray && post.tagsArray.length > 0 && (
          <HStack spacing={2} flexWrap="wrap">
            <Text fontSize="xs" color="text.muted" textTransform="uppercase" letterSpacing="wider">
              {post.tagsArray[0]}
            </Text>
            <Text fontSize="xs" color="text.tertiary">
              ·
            </Text>
            <Text fontSize="xs" color="text.muted">
              {readTime} min de leitura
            </Text>
          </HStack>
        )}

        <Heading
          fontFamily="heading"
          fontSize="md"
          fontWeight="600"
          noOfLines={2}
          color="text.primary"
          lineHeight="tall"
        >
          {post.title}
        </Heading>

        {post.description && (
          <Text fontSize="sm" color="text.secondary" noOfLines={3} lineHeight="tall">
            {post.description}
          </Text>
        )}

        <Box borderTop="1px" borderColor="border.subtle" pt={3} mt={2}>
          <HStack justify="space-between" align="center">
            <HStack spacing={2}>
              <Avatar size="xs" name={post.createdBy} />
              <Text fontSize="sm" color="text.secondary">
                {post.createdBy}
              </Text>
            </HStack>

            <HStack spacing={3}>
              {post.likes && (
                <HStack spacing={1}>
                  <Text fontSize="sm" color="text.muted">
                    ♥ {post.likes.length}
                  </Text>
                </HStack>
              )}
              {formattedDate && (
                <Text fontSize="xs" color="text.tertiary">
                  {formattedDate}
                </Text>
              )}
            </HStack>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export { PostCard };

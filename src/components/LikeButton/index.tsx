import { Box, Button, HStack, Text, useColorMode } from "@chakra-ui/react";
import { memo } from "react";
import { FiHeart } from "react-icons/fi";
import { useLikeButton } from "../../hooks/useLikeButton";
import type { LikeButtonProps } from "./types";

const LikeButtonComponent = ({ postId, userId }: LikeButtonProps) => {
  const { colorMode } = useColorMode();
  const { likeCount, liked, loading, handleLikeClick } = useLikeButton({
    postId,
    userId,
  });

  const isDark = colorMode === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      height="auto"
      px={3}
      py={1}
      borderRadius="md"
      bg={liked ? "red.50" : "transparent"}
      border="1px"
      borderColor={liked ? "red.200" : "border.subtle"}
      onClick={handleLikeClick}
      isDisabled={!postId || loading}
      _hover={{
        bg: liked ? "red.100" : isDark ? "whiteAlpha.100" : "gray.100",
      }}
      _active={{
        bg: liked ? "red.200" : isDark ? "whiteAlpha.200" : "gray.200",
      }}
      _disabled={{
        opacity: 0.5,
        cursor: "not-allowed",
      }}
      transition="all 0.2s"
    >
      <HStack spacing={2}>
        <Box
          as={FiHeart}
          size={16}
          color={liked ? "red.500" : "text.secondary"}
          fill={liked ? "currentColor" : "none"}
          transition="all 0.2s"
        />
        <Text fontSize="sm" fontWeight="medium" color={liked ? "red.500" : "text.secondary"}>
          {likeCount}
        </Text>
      </HStack>
    </Button>
  );
};

const LikeButton = memo(LikeButtonComponent);

LikeButton.displayName = "LikeButton";

export { LikeButton };

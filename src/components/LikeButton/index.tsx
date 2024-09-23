import { Button, Box, Text, Badge, Skeleton } from "@chakra-ui/react";
import { useLikeButton } from "../../hooks/useLikeButton";
import { LikeButtonProps } from "./types";
import { BiLike } from "react-icons/bi";
import {
  getButtonActiveStyle,
  getButtonColorScheme,
  getButtonHoverStyle,
  getIconColor,
} from "../../utils/LikeButtonStyles";

const LikeButton = ({ postId, userId }: LikeButtonProps) => {
  const { likeCount, liked, loading, handleLikeClick } = useLikeButton({
    postId,
    userId,
  });

  if (loading) {
    return (
      <Skeleton>
        <Text>Loading...</Text>
      </Skeleton>
    );
  }

  return (
    <Button
      width={{ base: "full", md: "auto" }}
      maxWidth="full"
      height="40px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="md"
      variant="outline"
      colorScheme={getButtonColorScheme(liked)}
      onClick={handleLikeClick}
      isDisabled={!postId}
      transition="background-color 0.3s ease, color 0.3s ease"
      _hover={getButtonHoverStyle(liked)}
      _active={getButtonActiveStyle(liked)}
    >
      <Box
        display="flex"
        alignItems="center"
        gap="2"
        flex="1"
        color={getIconColor(liked)}
      >
        <BiLike size="1.25em" />
        <Text fontWeight="semibold" p={1} fontSize="sm">
          {liked ? "Curtidas" : "Curtir"}
        </Text>
      </Box>
      <Badge
        colorScheme={getButtonColorScheme(liked)}
        fontSize="0.8em"
        borderRadius="full"
        px={2}
      >
        {likeCount}
      </Badge>
    </Button>
  );
};

export { LikeButton };

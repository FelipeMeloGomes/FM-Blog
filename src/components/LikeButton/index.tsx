import { Button, Box, Text, Badge } from "@chakra-ui/react";
import { useLikeButton } from "../../hooks/useLikeButton";
import { LikeButtonProps } from "./types";
import { BiLike } from "react-icons/bi";

const LikeButton = ({ postId, userId }: LikeButtonProps) => {
  const { likeCount, liked, loading, handleLikeClick } = useLikeButton({
    postId,
    userId,
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Button
      width={{ base: "full", md: "auto" }}
      maxWidth="150px"
      height="40px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="md"
      variant="outline"
      colorScheme={liked ? "red" : "gray"}
      onClick={handleLikeClick}
      isDisabled={!postId}
      transition="background-color 0.3s ease, color 0.3s ease"
      _hover={{ backgroundColor: liked ? "red.100" : "gray.100" }}
      _active={{ backgroundColor: liked ? "red.200" : "gray.200" }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap="2"
        flex="1"
        color={liked ? "red.600" : "gray.500"}
      >
        {liked ? <BiLike size="1.25em" /> : <BiLike size="1.25em" />}
        <Text fontWeight="semibold" p={1} fontSize="sm">
          {liked ? "Curtidas" : "Curtir"}
        </Text>
      </Box>
      <Badge
        colorScheme={liked ? "red" : "gray"}
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

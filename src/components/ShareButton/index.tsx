import { Box, Button, HStack, Text, useColorMode } from "@chakra-ui/react";
import { memo } from "react";
import { FiShare2 } from "react-icons/fi";
import type { ShareButtonProps } from "./types";

const ShareButtonComponent = ({ post, onShare }: ShareButtonProps) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      height="auto"
      px={3}
      py={1}
      borderRadius="md"
      bg="transparent"
      border="1px"
      borderColor="border.subtle"
      onClick={() => onShare(post)}
      _hover={{
        bg: isDark ? "whiteAlpha.100" : "gray.100",
      }}
      _active={{
        bg: isDark ? "whiteAlpha.200" : "gray.200",
      }}
      transition="all 0.2s"
    >
      <HStack spacing={2}>
        <Box as={FiShare2} size={16} color="text.secondary" />
        <Text fontSize="sm" fontWeight="medium" color="text.secondary">
          Compartilhar
        </Text>
      </HStack>
    </Button>
  );
};

const ShareButton = memo(ShareButtonComponent);

ShareButton.displayName = "ShareButton";

export { ShareButton };

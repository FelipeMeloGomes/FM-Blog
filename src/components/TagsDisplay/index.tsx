import { Badge, Flex, Text } from "@chakra-ui/react";
import { memo } from "react";
import type { TagsDisplayProps } from "./types";

const TagsDisplay = memo(({ tags }: TagsDisplayProps) => {
  return (
    <Flex width="100%" justifyContent="center" gap={2} flexWrap="wrap" p={1}>
      {tags?.map((tag) => (
        <Badge key={tag} colorScheme="blue" variant="solid" px={3} py={1} borderRadius="md">
          <Text fontSize="sm">{tag}</Text>
        </Badge>
      ))}
    </Flex>
  );
});

TagsDisplay.displayName = "TagsDisplay";

export { TagsDisplay };

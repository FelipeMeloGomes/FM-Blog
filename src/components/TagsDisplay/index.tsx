import { Badge, Flex, Text } from "@chakra-ui/react";
import { TagsDisplayProps } from "./types";

const TagsDisplay = ({ tags }: TagsDisplayProps) => {
  return (
    <Flex width="100%" justifyContent="center" gap={2} flexWrap="wrap" p={1}>
      {tags?.map((tag, index) => (
        <Badge
          key={`${tag}_${index}`}
          colorScheme="blue"
          variant="solid"
          px={3}
          py={1}
          borderRadius="md"
        >
          <Text fontSize="sm">{tag}</Text>
        </Badge>
      ))}
    </Flex>
  );
};

export { TagsDisplay };

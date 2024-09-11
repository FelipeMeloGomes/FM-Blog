import { Box, Flex, Text } from "@chakra-ui/react";
import { TagsDisplayProps } from "./types";

const TagsDisplay = ({ tags }: TagsDisplayProps) => {
  return (
    <Flex width="100%" justifyContent="center" gap={2} flexWrap="wrap" p={1}>
      {tags?.map((tag, index) => (
        <Box
          key={`${tag}_${index}`}
          bg="gray.200"
          color="gray.700"
          px={3}
          py={1}
          borderRadius="md"
        >
          <Text fontSize="sm">{tag}</Text>
        </Box>
      ))}
    </Flex>
  );
};

export { TagsDisplay };

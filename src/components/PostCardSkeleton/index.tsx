import {
  AspectRatio,
  Box,
  Divider,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

const PostCardSkeleton = () => {
  return (
    <Box border="1px" borderColor="border.subtle" borderRadius="md" overflow="hidden">
      <AspectRatio ratio={16 / 9}>
        <Skeleton />
      </AspectRatio>

      <VStack spacing={3} p={5} align="stretch">
        <HStack spacing={2}>
          <Skeleton height="16px" width="60px" />
          <Skeleton height="16px" width="40px" />
        </HStack>

        <Skeleton height="24px" width="90%" />
        <Skeleton height="24px" width="70%" />

        <SkeletonText noOfLines={3} spacing={2} mt={2} />

        <Divider my={2} />

        <HStack justify="space-between">
          <HStack>
            <SkeletonCircle size="6" />
            <Skeleton height="12px" width="80px" />
          </HStack>
          <Skeleton height="12px" width="60px" />
        </HStack>
      </VStack>
    </Box>
  );
};

export { PostCardSkeleton };

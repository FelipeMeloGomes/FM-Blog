import { HStack, Skeleton, SkeletonCircle, SkeletonText, VStack } from "@chakra-ui/react";

const PostDetailSkeleton = () => {
  return (
    <VStack spacing={8} align="stretch">
      <HStack spacing={2}>
        <Skeleton height="20px" width="80px" />
        <Skeleton height="20px" width="60px" />
      </HStack>

      <Skeleton height="48px" width="100%" />
      <Skeleton height="48px" width="80%" />

      <HStack mt={4}>
        <SkeletonCircle size="8" />
        <VStack align="start" spacing={1}>
          <Skeleton height="14px" width="150px" />
          <Skeleton height="12px" width="100px" />
        </VStack>
      </HStack>

      <Skeleton mt={6} height="400px" borderRadius="md" />

      <VStack mt={8} spacing={4}>
        <SkeletonText noOfLines={4} spacing={3} />
        <SkeletonText noOfLines={3} spacing={3} />
        <SkeletonText noOfLines={5} spacing={3} />
      </VStack>
    </VStack>
  );
};

export { PostDetailSkeleton };

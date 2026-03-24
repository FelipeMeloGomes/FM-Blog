import { SimpleGrid } from "@chakra-ui/react";
import { PostCardSkeleton } from "../PostCardSkeleton";

const PostListSkeleton = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <PostCardSkeleton key={i} />
      ))}
    </SimpleGrid>
  );
};

export { PostListSkeleton };

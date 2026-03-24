import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ResponsiveSkeletonCard } from "../PostSkeleton";

const HomeSkeleton = () => {
  return (
    <Flex direction="column" align="center" justify="center" width="100%" p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full" maxW="90%">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ResponsiveSkeletonCard key={i} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export { HomeSkeleton };

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const ResponsiveSkeletonCard = () => {
  return (
    <Card
      w="full"
      maxW="lg"
      mx="auto"
      my="4"
      shadow="lg"
      borderRadius="20px"
      p={4}
    >
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <SkeletonCircle size="12" />
            <Box textAlign="left" flex="1">
              <Skeleton height="20px" width="100%" mb="4" />
              <Skeleton height="16px" width="60%" />
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Skeleton height="20px" width="80%" mb="4" />
      </CardBody>
      <Skeleton height="200px" width="100%" />
      <CardBody>
        <Skeleton height="20px" width="80%" mb="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </CardBody>
      <CardFooter p={4} flexDirection="column" gap={2}>
        <Flex width="full" gap={2}>
          <Skeleton height="40px" width="100%" />
          <Skeleton height="40px" width="100%" />
        </Flex>
        <Box mt={2} width="full">
          <Skeleton height="40px" width="100%" />
        </Box>
      </CardFooter>
    </Card>
  );
};

export { ResponsiveSkeletonCard };

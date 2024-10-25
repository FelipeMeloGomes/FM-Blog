import { Box, Button, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NoPosts = () => (
  <Box textAlign="center" mb={6}>
    <Text mb={6}>Não foram encontrados posts</Text>
    <Button
      as={RouterLink}
      to="/posts/create"
      colorScheme="green"
      color="white"
      fontWeight="bold"
      borderRadius="lg"
      width="full"
      py={2.5}
      px={4}
      fontSize="base"
      _hover={{ bg: "green.600" }}
      _focus={{ boxShadow: "none" }}
    >
      Criar primeiro post
    </Button>
  </Box>
);

export { NoPosts };

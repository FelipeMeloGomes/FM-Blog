import { Box, Flex, Link as ChakraLink, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NotFoundImg from "./assets/NotFoundImg.webp";
import { TextField } from "../../components/TextField";

const NotFound = () => {
  return (
    <Box w="full" p={6} bg="green.500" textAlign="center">
      <TextField
        color="black"
        title="404"
        paragraph="Página Não Encontrada Desculpe."
      />
      <Flex justify="center" align="center" bg="green.500" mt={6}>
        <ChakraLink as={Link} to="/" variant="outline" colorScheme="teal">
          Home
        </ChakraLink>
      </Flex>
      <Box
        mt={8}
        w="full"
        maxW="400px"
        mx="auto"
        mb={8}
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
      >
        <Image
          src={NotFoundImg}
          alt="not found"
          loading="lazy"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
};

export { NotFound };

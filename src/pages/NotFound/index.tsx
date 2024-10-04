import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdError } from "react-icons/md";
import { ArrowBackIcon } from "@chakra-ui/icons";

const NotFound = () => {
  return (
    <Box bg="white" _dark={{ bg: "gray.900" }} minH="100vh" py={12}>
      <Container
        maxW="container.xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Flex flexDirection="column" alignItems="center" textAlign="center">
          <Box
            p={3}
            bg="blue.50"
            borderRadius="full"
            color="blue.500"
            display="inline-flex"
            alignItems="center"
          >
            <Icon as={MdError} boxSize={6} />
          </Box>
          <Heading
            mt={3}
            fontSize={useBreakpointValue({ base: "2xl", md: "3xl" })}
            fontWeight="semibold"
            color="gray.800"
            _dark={{ color: "white" }}
          >
            Página não encontrada
          </Heading>
          <Text mt={4} color="gray.500" _dark={{ color: "gray.400" }}>
            A página que você está procurando não existe. Aqui estão alguns
            links úteis:
          </Text>

          <Flex
            mt={6}
            gap={3}
            flexDirection={{ base: "column", sm: "row" }}
            width="full"
            justifyContent="center"
          >
            <Link to="/">
              <Button
                width="full"
                variant="outline"
                colorScheme="gray"
                leftIcon={<Icon as={ArrowBackIcon} boxSize={5} />}
                _hover={{ bg: "gray.100", dark: { bg: "gray.800" } }}
              >
                Voltar
              </Button>
            </Link>

            <Link to="/">
              <Button
                width="full"
                colorScheme="blue"
                _hover={{ bg: "blue.600", dark: { bg: "blue.500" } }}
              >
                Ir para a Home
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export { NotFound };

import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";

const Layout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <NavBar />
      <Box as="main" flex="1">
        <Container maxW="4xl" py={12}>
          <Outlet />
        </Container>
      </Box>
      <Box as="footer" py={8} borderTop="1px" borderColor="border.subtle">
        <Text fontSize="sm" color="text.muted" textAlign="center">
          © {new Date().getFullYear()} FM Blog — feito com React + Firebase
        </Text>
      </Box>
    </Flex>
  );
};

export { Layout };

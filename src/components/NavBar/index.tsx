import { Box, Container, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import { AvatarMenu } from "../AvatarMenu";
import { ColorModeToggle } from "../ColorModeToggle";
import { NavBarMobile } from "../NavBarMobile";
import { NavBarMenuToggle } from "../NavBarToggle";

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useAuthValue() || {};
  const { logout } = useAuthentication();

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      bg="bg.primary"
      borderBottom="1px"
      borderColor="border.subtle"
      zIndex={10}
    >
      <Container maxW="4xl" py={4}>
        <Flex justify="space-between" align="center">
          <Box
            as={RouterLink}
            to="/"
            fontFamily="heading"
            fontSize="xl"
            fontWeight="700"
            color="text.primary"
            _hover={{ color: "text.secondary" }}
            transition="color 0.2s"
          >
            FM Blog
          </Box>

          <HStack spacing={4} display={{ base: "none", md: "flex" }} align="center">
            <Box
              as={RouterLink}
              to="/"
              fontSize="sm"
              fontWeight="medium"
              color="text.secondary"
              _hover={{ color: "text.primary" }}
              transition="color 0.2s"
            >
              Início
            </Box>
            {user && (
              <Box
                as={RouterLink}
                to="/posts/create"
                fontSize="sm"
                fontWeight="medium"
                color="text.secondary"
                _hover={{ color: "text.primary" }}
                transition="color 0.2s"
              >
                Novo Post
              </Box>
            )}
            {user ? (
              <HStack spacing={2}>
                <ColorModeToggle />
                <AvatarMenu logout={logout} user={user} />
              </HStack>
            ) : (
              <HStack spacing={4}>
                <ColorModeToggle />
                <Box
                  as={RouterLink}
                  to="/login"
                  fontSize="sm"
                  fontWeight="medium"
                  color="text.secondary"
                  _hover={{ color: "text.primary" }}
                  transition="color 0.2s"
                >
                  Entrar
                </Box>
                <Box
                  as={RouterLink}
                  to="/register"
                  fontSize="sm"
                  fontWeight="medium"
                  color="text.primary"
                  border="1px"
                  borderColor="border.default"
                  px={4}
                  py={2}
                  borderRadius="sm"
                  _hover={{ borderColor: "text.primary" }}
                  transition="all 0.2s"
                >
                  Cadastrar
                </Box>
              </HStack>
            )}
          </HStack>

          <Box display={{ base: "block", md: "none" }}>
            <NavBarMenuToggle isOpen={isOpen} onToggle={onToggle} />
          </Box>
        </Flex>
      </Container>

      <NavBarMobile isOpen={isOpen} onToggle={onToggle} logout={logout} user={user} />
    </Box>
  );
};

export { NavBar };

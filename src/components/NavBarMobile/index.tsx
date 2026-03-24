import { Box, Collapse, Divider, HStack, Icon, Text, VStack, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import type { NavBarProps } from "./types";

const NavBarMobile = ({ isOpen, user, logout, onToggle }: NavBarProps) => {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const menuItems = [
    { text: "Início", to: "/", show: true },
    { text: "Entrar", to: "/login", show: !user },
    { text: "Cadastrar", to: "/register", show: !user },
    { text: "Novo Post", to: "/posts/create", show: !!user },
    { text: "Meu Perfil", to: "/profile", show: !!user },
    { text: "Meus Posts", to: "/dashboard", show: !!user },
    { text: "Sobre", to: "/about", show: true },
  ];

  return (
    <Collapse in={isOpen} animateOpacity>
      <Box
        display={{ base: "block", md: "none" }}
        bg="bg.primary"
        borderTop="1px"
        borderColor="border.subtle"
        py={4}
      >
        <VStack spacing={4} align="stretch">
          {menuItems
            .filter((item) => item.show)
            .map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Box
                  key={item.text}
                  as={RouterLink}
                  to={item.to}
                  onClick={onToggle}
                  py={2}
                  px={4}
                  fontSize="md"
                  fontWeight="medium"
                  color={isActive ? "text.primary" : "text.secondary"}
                  borderRadius="sm"
                  _hover={{ bg: "bg.secondary", color: "text.primary" }}
                  transition="all 0.2s"
                >
                  {item.text}
                </Box>
              );
            })}
          {user && (
            <Box
              as="button"
              onClick={logout}
              py={2}
              px={4}
              fontSize="md"
              fontWeight="medium"
              color="red.500"
              textAlign="left"
              _dark={{ _hover: { bg: "red.900" } }}
              _hover={{ bg: "red.50" }}
              transition="all 0.2s"
            >
              Sair
            </Box>
          )}

          <Divider borderColor="border.subtle" />

          <Box
            as="button"
            onClick={toggleColorMode}
            py={2}
            px={4}
            fontSize="md"
            fontWeight="medium"
            color="text.secondary"
            textAlign="left"
            _hover={{ bg: "bg.secondary", color: "text.primary" }}
            transition="all 0.2s"
          >
            <HStack spacing={3}>
              <Icon as={isDark ? FiSun : FiMoon} boxSize={5} />
              <Text>{isDark ? "Modo claro" : "Modo escuro"}</Text>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Collapse>
  );
};

export { NavBarMobile };

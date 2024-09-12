import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  Stack,
  Button,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import {
  MdHome,
  MdPerson,
  MdAdd,
  MdDashboard,
  MdCloud,
  MdInfo,
  MdLogout,
} from "react-icons/md";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useAuthValue() || {};
  const { logout } = useAuthentication();

  return (
    <Box bg="black" color="white" px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        w="100%"
      >
        <Flex alignItems={"center"}>
          <Button
            variant="link"
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
          >
            FM <span className="pl-2">Blog</span>
          </Button>
        </Flex>
        <Flex alignItems={"center"}>
          <IconButton
            size="lg"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Toggle Navigation"
            display={{ md: "none" }}
            onClick={onToggle}
            mr={4}
          />
        </Flex>

        <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
          <Stack direction={"row"} spacing={4}>
            <Button variant="link" as={RouterLink} to="/" leftIcon={<MdHome />}>
              Home
            </Button>
            {!user ? (
              <>
                <Button
                  variant="link"
                  as={RouterLink}
                  to="/login"
                  leftIcon={<MdPerson />}
                >
                  Entrar
                </Button>
                <Button
                  variant="link"
                  as={RouterLink}
                  to="/register"
                  leftIcon={<MdAdd />}
                >
                  Cadastrar
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="link"
                  as={RouterLink}
                  to="/posts/create"
                  leftIcon={<MdAdd />}
                >
                  Novo Post
                </Button>
                <Button
                  variant="link"
                  as={RouterLink}
                  to="/dashboard"
                  leftIcon={<MdDashboard />}
                >
                  Dashboard
                </Button>
                <Button
                  variant="link"
                  as={RouterLink}
                  to="/weather"
                  leftIcon={<MdCloud />}
                >
                  Clima
                </Button>
              </>
            )}
            <Button
              variant="link"
              as={RouterLink}
              to="/about"
              leftIcon={<MdInfo />}
            >
              Sobre
            </Button>
            {user && (
              <Button variant="link" onClick={logout} leftIcon={<MdLogout />}>
                Sair
              </Button>
            )}
          </Stack>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg="gray.700"
          p={4}
          gap={4}
          display={{ base: "flex", md: "none" }}
        >
          <Button
            variant="link"
            as={RouterLink}
            to="/"
            w="full"
            onClick={onToggle}
            leftIcon={<MdHome />}
          >
            Home
          </Button>
          {!user ? (
            <>
              <Button
                variant="link"
                as={RouterLink}
                to="/login"
                w="full"
                onClick={onToggle}
                leftIcon={<MdPerson />}
              >
                Entrar
              </Button>
              <Button
                variant="link"
                as={RouterLink}
                to="/register"
                w="full"
                onClick={onToggle}
                leftIcon={<MdAdd />}
              >
                Cadastrar
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="link"
                as={RouterLink}
                to="/posts/create"
                w="full"
                onClick={onToggle}
                leftIcon={<MdAdd />}
              >
                Novo Post
              </Button>
              <Button
                variant="link"
                as={RouterLink}
                to="/dashboard"
                w="full"
                onClick={onToggle}
                leftIcon={<MdDashboard />}
              >
                Dashboard
              </Button>
              <Button
                variant="link"
                as={RouterLink}
                to="/weather"
                w="full"
                onClick={onToggle}
                leftIcon={<MdCloud />}
              >
                Clima
              </Button>
            </>
          )}
          <Button
            variant="link"
            as={RouterLink}
            to="/about"
            w="full"
            onClick={onToggle}
            leftIcon={<MdInfo />}
          >
            Sobre
          </Button>
          {user && (
            <Button
              variant="link"
              onClick={logout}
              w="full"
              leftIcon={<MdLogout />}
            >
              Sair
            </Button>
          )}
        </Stack>
      </Collapse>
    </Box>
  );
};

export { NavBar };

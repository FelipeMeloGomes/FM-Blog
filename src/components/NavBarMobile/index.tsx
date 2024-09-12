import { Stack, Button, Collapse } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  MdHome,
  MdPerson,
  MdAdd,
  MdDashboard,
  MdCloud,
  MdInfo,
  MdLogout,
} from "react-icons/md";

const NavBarMobile = ({ isOpen, user, logout, onToggle }) => (
  <Collapse in={isOpen} animateOpacity>
    <Stack bg="gray.700" p={4} gap={4} display={{ base: "flex", md: "none" }}>
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
);

export { NavBarMobile };

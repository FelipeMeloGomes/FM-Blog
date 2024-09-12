import { Stack, Button } from "@chakra-ui/react";
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

const NavBarLinks = ({ user, logout }) => (
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
    <Button variant="link" as={RouterLink} to="/about" leftIcon={<MdInfo />}>
      Sobre
    </Button>
    {user && (
      <Button variant="link" onClick={logout} leftIcon={<MdLogout />}>
        Sair
      </Button>
    )}
  </Stack>
);

export { NavBarLinks };

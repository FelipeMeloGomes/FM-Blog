import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AvatarMenuProps } from "./types";

const AvatarMenu = ({ logout }: AvatarMenuProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleAboutClick = () => {
    navigate("/about");
  };
  const handleWeatherClick = () => {
    navigate("/weather");
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<Avatar size="sm" />}
        variant="link"
        cursor="pointer"
        _hover={{ backgroundColor: "gray.600" }}
        _active={{ backgroundColor: "gray.700" }}
        _focus={{ boxShadow: "none" }}
      />
      <MenuList borderRadius="md" bg="gray.700" border="none">
        <MenuItem
          bg="gray.700"
          minH="48px"
          color="white"
          display="flex"
          _hover={{ bg: "gray.600" }}
          onClick={handleProfileClick}
        >
          Perfil
        </MenuItem>
        <MenuItem
          minH="48px"
          bg="gray.700"
          color="white"
          _hover={{ bg: "gray.600" }}
          onClick={handleAboutClick}
        >
          Sobre
        </MenuItem>
        <MenuItem
          minH="48px"
          bg="gray.700"
          color="white"
          _hover={{ bg: "gray.600" }}
          onClick={handleWeatherClick}
        >
          Clima
        </MenuItem>
        <MenuDivider />
        <MenuItem
          minH="48px"
          bg="gray.700"
          color="white"
          _hover={{ bg: "gray.600" }}
          onClick={logout}
        >
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export { AvatarMenu };

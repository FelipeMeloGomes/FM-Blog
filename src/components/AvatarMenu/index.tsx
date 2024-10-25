import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useNavigation } from "../../utils/NavigationUtils";
import { AvatarMenuProps } from "./types";

const AvatarMenu = ({ logout }: AvatarMenuProps) => {
  const { handleProfileClick, handleAboutClick } = useNavigation();
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

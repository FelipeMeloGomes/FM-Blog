import { Avatar, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import type { AvatarMenuProps } from "./types";

const AvatarMenu = ({ logout, user }: AvatarMenuProps) => {
  return (
    <Menu>
      <MenuButton
        as={Avatar}
        size="sm"
        cursor="pointer"
        name={user?.name || user?.email || "Usuário"}
        _hover={{ opacity: 0.8 }}
        transition="opacity 0.2s"
      />
      <MenuList borderColor="gray.100" boxShadow="sm" minW="150px">
        <MenuItem as={RouterLink} to="/dashboard" fontSize="sm" _hover={{ bg: "gray.50" }}>
          Meus Posts
        </MenuItem>
        <MenuItem as={RouterLink} to="/about" fontSize="sm" _hover={{ bg: "gray.50" }}>
          Sobre
        </MenuItem>
        <MenuDivider />
        <MenuItem fontSize="sm" color="red.500" _hover={{ bg: "red.50" }} onClick={logout}>
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export { AvatarMenu };

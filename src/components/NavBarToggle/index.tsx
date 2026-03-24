import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import type { NavBarToggleProps } from "./types";

const NavBarMenuToggle = ({ isOpen, onToggle }: NavBarToggleProps) => (
  <IconButton
    size="md"
    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
    aria-label="Toggle Navigation"
    display={{ base: "flex", md: "none" }}
    onClick={onToggle}
    variant="ghost"
    color="gray.600"
    _hover={{ bg: "gray.100" }}
  />
);

export { NavBarMenuToggle };

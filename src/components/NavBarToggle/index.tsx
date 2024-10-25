import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { NavBarToggleProps } from "./types";

const NavBarMenuToggle = ({ isOpen, onToggle }: NavBarToggleProps) => (
  <IconButton
    size="lg"
    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
    aria-label="Toggle Navigation"
    display={{ md: "none" }}
    onClick={onToggle}
    mr={4}
  />
);

export { NavBarMenuToggle };

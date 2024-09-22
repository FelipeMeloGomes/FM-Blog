import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
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

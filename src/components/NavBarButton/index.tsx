import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { NavButtonProps } from "./types";

const NavButton = ({ text, icon, to, onClick }: NavButtonProps) => {
  return to ? (
    <Button
      variant="link"
      as={RouterLink}
      to={to}
      leftIcon={icon}
      fontSize={{ base: "lg", md: "xl" }}
      fontWeight="semibold"
      color="#e0e0e0"
      _hover={{ textDecoration: "none", color: "blue.500" }}
      _focus={{ boxShadow: "none" }}
      display="flex"
      alignItems="center"
      iconSpacing={2}
    >
      {text}
    </Button>
  ) : (
    <Button
      variant="link"
      onClick={onClick}
      leftIcon={icon}
      fontSize={{ base: "lg", md: "xl" }}
      fontWeight="semibold"
      color="blue.400"
      _hover={{ textDecoration: "none", color: "blue.500" }}
      _focus={{ boxShadow: "none" }}
      display="flex"
      alignItems="center"
      iconSpacing={2}
    >
      {text}
    </Button>
  );
};

export { NavButton };

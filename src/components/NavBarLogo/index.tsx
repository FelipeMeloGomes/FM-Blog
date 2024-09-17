import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavBarLogo = () => (
  <Button
    variant="link"
    as={RouterLink}
    to="/"
    fontSize={{ base: "2xl", md: "3xl" }}
    fontWeight="bold"
    letterSpacing="wide"
    color="blue.400"
    _hover={{ textDecoration: "none", color: "blue.500" }}
    display="flex"
    alignItems="center"
  >
    FM
    <span
      style={{ paddingLeft: "0.5rem", fontWeight: "normal", color: "#FFFFFF" }}
    >
      Blog
    </span>
  </Button>
);

export { NavBarLogo };

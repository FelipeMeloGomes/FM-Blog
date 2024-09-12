import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavBarLogo = () => (
  <Button variant="link" as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
    FM <span className="pl-2">Blog</span>
  </Button>
);

export { NavBarLogo };

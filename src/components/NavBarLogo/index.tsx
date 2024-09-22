import { Box, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavBarLogo = () => (
  <Box
    as={RouterLink}
    to="/"
    _hover={{ opacity: 0.9 }}
    transition="opacity 0.3s"
  >
    <Image
      src="/src/public/logo.png"
      alt="Logo"
      maxW="100px"
      objectFit="contain"
      opacity={1}
    />
  </Box>
);

export { NavBarLogo };

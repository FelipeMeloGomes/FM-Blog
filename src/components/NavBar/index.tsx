import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { NavBarLogo } from "../NavBarLogo";
import { NavBarMenuToggle } from "../NavBarToggle";
import { NavBarLinks } from "../NavBarLinks";
import { NavBarMobile } from "../NavBarMobile";

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useAuthValue() || {};
  const { logout } = useAuthentication();

  return (
    <Box bg="#191a23" color="white" px={4}>
      <Flex
        h={20}
        alignItems={"center"}
        justifyContent={"space-between"}
        w="100%"
      >
        <Flex alignItems={"center"}>
          <NavBarLogo />
        </Flex>
        <Flex alignItems={"center"}>
          <NavBarMenuToggle isOpen={isOpen} onToggle={onToggle} />
        </Flex>

        <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
          <NavBarLinks user={user} logout={logout} />
        </Flex>
      </Flex>
      <NavBarMobile
        isOpen={isOpen}
        onToggle={onToggle}
        logout={logout}
        user={user}
      />
    </Box>
  );
};

export { NavBar };

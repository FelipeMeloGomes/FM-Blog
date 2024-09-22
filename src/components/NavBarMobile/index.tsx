import { Stack, Button, Collapse } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { getButtonData } from "../NavBarMobileButton";
import { MdLogout } from "react-icons/md";
import { NavBarProps } from "./types";
import { ButtonConfig } from "../NavBarMobileButton/types";

const NavBarMobile = ({ isOpen, user, logout, onToggle }: NavBarProps) => {
  const buttonData: ButtonConfig[] = getButtonData(user);
  const location = useLocation();

  return (
    <Collapse in={isOpen} animateOpacity>
      <Stack bg="#191a23" p={4} gap={8} display={{ base: "flex", md: "none" }}>
        {buttonData
          .filter((button) => button.show)
          .map((button) => {
            const isActive = location.pathname === button.to;

            return (
              <Button
                key={button.text}
                variant="link"
                as={RouterLink}
                to={button.to}
                w="full"
                onClick={onToggle}
                leftIcon={button.icon}
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="semibold"
                color={isActive ? "white" : "blue.400"}
                _hover={{ textDecoration: "none", color: "blue.500" }}
                _focus={{ boxShadow: "none" }}
                display="flex"
                alignItems="center"
              >
                {button.text}
              </Button>
            );
          })}
        {user && (
          <Button
            variant="link"
            onClick={logout}
            w="full"
            leftIcon={<MdLogout />}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="semibold"
            color="blue.400"
            _hover={{ textDecoration: "none", color: "blue.500" }}
            _focus={{ boxShadow: "none" }}
            display="flex"
            alignItems="center"
          >
            Sair
          </Button>
        )}
      </Stack>
    </Collapse>
  );
};

export { NavBarMobile };

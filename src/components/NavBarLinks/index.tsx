import { Stack } from "@chakra-ui/react";
import { User, Logout } from "../NavBarLinks/types";
import { NavButton } from "../NavBarButton";
import {
  guestButtons,
  aboutButton,
  logoutButton,
  userButtons,
} from "../NavBarLinksButton";

interface NavBarLinksProps {
  user: User | null;
  logout: Logout;
}

const NavBarLinks = ({ user, logout }: NavBarLinksProps) => {
  return (
    <Stack direction={"row"} spacing={4}>
      {user === null &&
        guestButtons.map((button) => (
          <NavButton key={button.text} {...button} />
        ))}
      {user !== null &&
        userButtons.map((button) => (
          <NavButton key={button.text} {...button} />
        ))}
      <NavButton key={aboutButton.text} {...aboutButton} />
      {user !== null && (
        <NavButton key={logoutButton.text} {...logoutButton} onClick={logout} />
      )}
    </Stack>
  );
};

export { NavBarLinks };

import { Stack } from "@chakra-ui/react";
import { User, Logout } from "../NavBarLinks/types";
import { NavButton } from "../NavBarButton";
import { guestButtons, userButtons } from "../NavBarLinksButton";
import { AvatarMenu } from "../AvatarMenu";

interface NavBarLinksProps {
  user: User | null;
  logout: Logout;
}

const NavBarLinks = ({ user, logout }: NavBarLinksProps) => {
  return (
    <Stack direction={"row"} spacing={4}>
      <NavButton text="Home" to="/" />
      {user === null &&
        guestButtons.map((button) => (
          <NavButton key={button.text} {...button} />
        ))}
      {user !== null &&
        userButtons.map((button) => (
          <NavButton key={button.text} {...button} />
        ))}
      {user !== null && <AvatarMenu logout={logout} />}
    </Stack>
  );
};

export { NavBarLinks };

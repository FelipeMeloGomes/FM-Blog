import { Stack } from "@chakra-ui/react";
import { NavButton } from "../NavBarButton";
import { guestButtons, userButtons } from "../NavBarLinksButton";
import { AvatarMenu } from "../AvatarMenu";
import { NavBarProps } from "../NavBarMobile/types";

const NavBarLinks = ({ user, logout }: NavBarProps) => {
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

import { AvatarMenu } from "../AvatarMenu";
import { NavButton } from "../NavBarButton";
import { guestButtons, userButtons } from "../NavBarLinksButton";
import type { NavBarProps } from "../NavBarMobile/types";

const NavBarLinks = ({ user, logout }: NavBarProps) => {
  return (
    <div className="flex gap-4">
      <NavButton text="Home" to="/" />
      {user === null && guestButtons.map((button) => <NavButton key={button.text} {...button} />)}
      {user !== null && userButtons.map((button) => <NavButton key={button.text} {...button} />)}
      {user !== null && <AvatarMenu user={user || null} logout={logout} />}
    </div>
  );
};

export { NavBarLinks };

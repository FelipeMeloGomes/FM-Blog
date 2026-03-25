import { Link as RouterLink } from "react-router-dom";
import logo from "../../public/logo.webp";

const NavBarLogo = () => (
  <RouterLink to="/" className="hover:opacity-90 transition-opacity">
    <img src={logo} alt="Logo" className="max-w-[100px] object-contain" />
  </RouterLink>
);

export { NavBarLogo };

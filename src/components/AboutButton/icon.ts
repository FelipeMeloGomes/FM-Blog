import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { IconBaseProps } from "react-icons/lib";

const iconMap: Record<string, React.ComponentType<IconBaseProps>> = {
  Github: FaGithub,
  Linkedin: FaLinkedin,
};

export { iconMap };

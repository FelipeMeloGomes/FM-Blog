import { iconMap } from "./icon";
import type { AboutButtonProps } from "./types";

const AboutButton = ({ alt, iconName, iconColor, href, ...rest }: AboutButtonProps) => {
  const IconComponent = iconMap[iconName];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className="w-16 h-16 rounded-full bg-white shadow-md hover:scale-150 hover:-rotate-360 hover:translate-y-[-1em] hover:shadow-[0_0_20px_rgba(29,161,242,0.5)] transition-transform duration-500 flex items-center justify-center"
      {...rest}
    >
      {IconComponent && <IconComponent color={iconColor} width="64px" height="64px" />}
    </a>
  );
};

export { AboutButton };

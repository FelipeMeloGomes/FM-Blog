import { IconButton, Icon } from "@chakra-ui/react";
import { AboutButtonProps } from "./types";
import { iconMap } from "./icon";

const AboutButton = ({
  alt,
  iconName,
  iconColor,
  href,
  ...rest
}: AboutButtonProps) => {
  const IconComponent = iconMap[iconName] || Icon;

  return (
    <IconButton
      aria-label={alt}
      borderRadius="full"
      bg="white"
      boxShadow="md"
      _hover={{
        transform: "scale(1.5) rotate(-360deg) translateY(-1em)",
        boxShadow: "0 0 20px rgba(29,161,242,0.5)",
        transition: "transform 0.5s, box-shadow 0.5s",
      }}
      w="64px"
      h="64px"
      perspective="500px"
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      <IconComponent
        color={iconColor}
        width="64px"
        height="64px"
        _hover={{ transform: "scale(1.5)", transition: "transform 0.5s" }}
      />
    </IconButton>
  );
};

export { AboutButton };

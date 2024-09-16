import { HTMLChakraProps } from "@chakra-ui/react";

interface AboutButtonProps extends HTMLChakraProps<"button"> {
  alt: string;
  iconName: string;
  iconColor: string;
  href: string;
}

export type { AboutButtonProps };

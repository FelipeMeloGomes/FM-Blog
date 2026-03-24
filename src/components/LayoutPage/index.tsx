import { Box, useColorModeValue } from "@chakra-ui/react";
import type { LayoutPageProps } from "./types";

const LayoutPage = ({ children }: LayoutPageProps) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box textAlign="center" m={0} mx="auto" h="100vh" bg={bgColor}>
      {children}
    </Box>
  );
};

export { LayoutPage };

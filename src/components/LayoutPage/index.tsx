import { Box } from "@chakra-ui/react";
import { LayoutPageProps } from "./types";

const LayoutPage = ({ children }: LayoutPageProps) => {
  return (
    <Box textAlign="center" m={0} mx="auto" h="100vh">
      {children}
    </Box>
  );
};

export { LayoutPage };

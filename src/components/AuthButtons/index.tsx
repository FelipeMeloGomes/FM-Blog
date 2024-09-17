import { Button, Flex } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { AuthButtonsProps } from "./types";

const AuthButtons = ({ handleGoogleLogin, loading }: AuthButtonsProps) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="center"
      gap={8}
      mt={8}
      w="100%"
    >
      <Button
        onClick={handleGoogleLogin}
        colorScheme="blue"
        isLoading={loading}
        leftIcon={<FaGoogle />}
        w={{ base: "100%", md: "auto" }}
        maxW={{ base: "full", md: "none" }}
      >
        Google
      </Button>
    </Flex>
  );
};

export { AuthButtons };

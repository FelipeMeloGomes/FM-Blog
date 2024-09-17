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
      w="full"
    >
      <Button
        onClick={handleGoogleLogin}
        colorScheme="blue"
        isLoading={loading}
        leftIcon={<FaGoogle />}
        w="full"
      >
        Google
      </Button>
    </Flex>
  );
};

export { AuthButtons };

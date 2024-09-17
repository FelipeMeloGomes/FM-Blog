import { Button, Flex } from "@chakra-ui/react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { FaGithub, FaGoogle } from "react-icons/fa";

const AuthButtons = () => {
  const { loginWithGoogle, loginWithGithub, loading } = useAuthentication();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
    } catch (error) {
      console.error("Erro ao fazer login com GitHub:", error);
    }
  };

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
        isLoading={loading}
        colorScheme="blue"
        leftIcon={<FaGoogle />}
        w={{ base: "100%", md: "auto" }}
        maxW={{ base: "full", md: "none" }}
      >
        Google
      </Button>

      <Button
        onClick={handleGithubLogin}
        isLoading={loading}
        colorScheme="gray"
        leftIcon={<FaGithub />}
        w={{ base: "100%", md: "auto" }}
        maxW={{ base: "full", md: "none" }}
      >
        GitHub
      </Button>
    </Flex>
  );
};

export { AuthButtons };

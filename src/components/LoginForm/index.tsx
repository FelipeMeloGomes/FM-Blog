import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLock, FiMail } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import type { loginFormProps } from "./types";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const LoginForm = ({
  isLogin,
  onSubmit,
  resetPassword,
}: loginFormProps & { resetPassword?: boolean }) => {
  const {
    error,
    formData,
    setFormData,
    handleResetPasswordSubmit: handleResetPw,
    handleGoogleLogin: handleGoogle,
    handleSubmit: handleFormSubmit,
    loading,
  } = useAuthForm(isLogin, onSubmit);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleFormSubmit(e, formData);
  };

  const getTitle = () => {
    if (resetPassword) return "Recuperar Senha";
    if (isLogin) return "Bem-vindo de volta";
    return "Crie sua conta";
  };

  const getDescription = () => {
    if (resetPassword) return "Digite seu email para receber o link de recuperação";
    if (isLogin) return "Entre na sua conta para continuar";
    return "Preencha os dados para se cadastrar";
  };

  const getButtonText = () => {
    if (resetPassword) return "Enviar Link";
    if (isLogin) return "Entrar";
    return "Cadastrar";
  };

  const getLoadingText = () => {
    if (resetPassword) return "Enviando...";
    if (isLogin) return "Entrando...";
    return "Cadastrando...";
  };

  return (
    <Box w="full" maxW="md" mx="auto" borderRadius="lg" boxShadow="lg" overflow="hidden">
      <Stack spacing={6} p={8}>
        <Box textAlign="center">
          <Heading size="lg" fontWeight="bold" color="text.primary">
            {getTitle()}
          </Heading>
          <Text color="text.secondary" mt={2}>
            {getDescription()}
          </Text>
        </Box>

        {!resetPassword && (
          <>
            <Button
              variant="outline"
              size="lg"
              onClick={handleGoogle}
              leftIcon={<GoogleIcon />}
              h="44px"
              borderColor="border.default"
              _hover={{ bg: "bg.secondary" }}
            >
              Continuar com Google
            </Button>

            <HStack>
              <Divider />
              <Text fontSize="sm" color="text.secondary" whiteSpace="nowrap" px={2}>
                ou
              </Text>
              <Divider />
            </HStack>
          </>
        )}

        <Box as="form" onSubmit={resetPassword ? handleResetPw : handleSubmit}>
          <Stack spacing={4}>
            {!isLogin && !resetPassword && (
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="text.primary">
                  Nome de usuário
                </FormLabel>
                <Input
                  placeholder="Seu nome de usuário"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  h="44px"
                />
              </FormControl>
            )}

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="text.primary">
                E-mail
              </FormLabel>
              <InputGroup>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  h="44px"
                  pl={10}
                />
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={2}>
                  <FiMail color="gray" />
                </Box>
              </InputGroup>
            </FormControl>

            {!resetPassword && (
              <FormControl isRequired>
                <HStack justify="space-between">
                  <FormLabel fontSize="sm" color="text.primary">
                    Senha
                  </FormLabel>
                  {isLogin && (
                    <Link
                      as={RouterLink}
                      to="/resetPassword"
                      fontSize="sm"
                      color="text.secondary"
                      _hover={{ color: "text.primary" }}
                    >
                      Esqueceu a senha?
                    </Link>
                  )}
                </HStack>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    h="44px"
                    pl={10}
                  />
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={2}
                  >
                    <FiLock color="gray" />
                  </Box>
                  <InputRightElement h="44px">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}

            {!isLogin && !resetPassword && (
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="text.primary">
                  Confirmar Senha
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    h="44px"
                    pl={10}
                  />
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={2}
                  >
                    <FiLock color="gray" />
                  </Box>
                  <InputRightElement h="44px">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}

            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              variant="solid"
              size="lg"
              h="44px"
              isLoading={loading}
              loadingText={getLoadingText()}
            >
              {getButtonText()}
            </Button>
          </Stack>
        </Box>

        {!resetPassword && (
          <Text textAlign="center" fontSize="sm" color="text.secondary">
            {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
            <Link
              as={RouterLink}
              to={isLogin ? "/register" : "/login"}
              color="text.primary"
              fontWeight="medium"
              _hover={{ textDecoration: "underline" }}
            >
              {isLogin ? "Cadastre-se" : "Entrar"}
            </Link>
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export { LoginForm };

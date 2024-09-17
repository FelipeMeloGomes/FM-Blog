import { useAuthForm } from "../../hooks/useAuthForm";
import { Box } from "@chakra-ui/react";
import { FormEvent } from "react";
import { loginFormProps } from "./types";
import { PasswordResetForm } from "../PasswordResetForm";
import { LoginFormFields } from "../LoginFormFields";
import { AuthButtons } from "../AuthButtons";

const LoginForm = ({
  isLogin,
  onSubmit,
  resetPassword,
}: loginFormProps & { resetPassword?: boolean }) => {
  const {
    error,
    formData,
    setFormData,
    passwordVisible,
    setPasswordVisible,
    passwordVisibleTwo,
    setPasswordVisibleTwo,
    handleResetPasswordSubmit,
    handleGoogleLogin,
    handleSubmit,
    loading,
  } = useAuthForm(isLogin, onSubmit);

  return (
    <Box
      as="form"
      onSubmit={
        resetPassword
          ? handleResetPasswordSubmit
          : (e: FormEvent<HTMLFormElement>) => handleSubmit(e, formData)
      }
      display="flex"
      flexDirection="column"
      gap={4}
      mx="auto"
      p={6}
      w="600px"
      maxW="90%"
      bg="white"
      shadow="lg"
      borderRadius="md"
    >
      {resetPassword ? (
        <PasswordResetForm
          formData={formData}
          setFormData={setFormData}
          handleResetPasswordSubmit={handleResetPasswordSubmit}
          error={error}
        />
      ) : (
        <LoginFormFields
          isLogin={isLogin}
          formData={formData}
          setFormData={setFormData}
          passwordVisible={passwordVisible}
          setPasswordVisible={setPasswordVisible}
          passwordVisibleTwo={passwordVisibleTwo}
          setPasswordVisibleTwo={setPasswordVisibleTwo}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      )}
      {!resetPassword && (
        <AuthButtons handleGoogleLogin={handleGoogleLogin} loading={loading} />
      )}
    </Box>
  );
};

export { LoginForm };

import { useAuthForm } from "../../hooks/useAuthForm";
import { Box } from "@chakra-ui/react";
import { FormEvent } from "react";
import { loginFormProps } from "./types";
import { PasswordResetForm } from "../PasswordResetForm";
import { LoginFormFields } from "../LoginFormFields";

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
    handlePasswordReset,
    handleSubmit,
    loading,
  } = useAuthForm(isLogin, onSubmit);

  const handleResetPasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email = formData.email;
      if (email.trim() === "") {
        console.log("O e-mail está vazio");
        return;
      }
      await handlePasswordReset(email);
      console.log("E-mail de redefinição enviado com sucesso");
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição:", error);
    }
  };

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
      gap={10}
      mx="auto"
      p={8}
      w="500px"
      maxW="90%"
      bg="white"
      shadow="md"
      borderRadius="xl"
      textAlign="center"
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
    </Box>
  );
};

export { LoginForm };

import { useAuthForm } from "../../hooks/useAuthForm";
import { TextInputWithIcon } from "../TextInputWithIcon";
import { PasswordInputWithToggle } from "../PasswordInputWithToggle";
import { SubmitButton } from "../SubmitButton";
import { PasswordToggle } from "../../utils/PasswordToggle";
import { loginFormProps } from "./types";
import { SignUpPrompt } from "../SignUpPrompt";
import { Box } from "@chakra-ui/react";
import { FormEvent } from "react";

const LoginForm = ({ isLogin, onSubmit }: loginFormProps) => {
  const {
    error,
    formData,
    setFormData,
    passwordVisible,
    setPasswordVisible,
    passwordVisibleTwo,
    setPasswordVisibleTwo,
    handleSubmit,
    loading,
  } = useAuthForm(isLogin, onSubmit);

  return (
    <Box
      as="form"
      onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e, formData)}
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
      {!isLogin && (
        <TextInputWithIcon
          label="Nome de usuário"
          name="displayName"
          value={formData.displayName}
          iconName="User"
          minLength={6}
          maxLength={16}
          required
          onChange={(e) =>
            setFormData({
              ...formData,
              displayName: e.target.value,
            })
          }
          placeholder="Nome do usuário"
          alt="Insira seu nome"
        />
      )}

      <TextInputWithIcon
        label="Email"
        name="email"
        iconName="Sign"
        value={formData.email}
        minLength={6}
        required
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Insira seu email"
        alt="Insira seu email"
      />

      <PasswordInputWithToggle
        label="Senha"
        name="password"
        value={formData.password}
        iconName="Lock"
        minLength={6}
        maxLength={64}
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Insira sua senha"
        alt="Insira sua senha"
        passwordVisible={passwordVisibleTwo}
        togglePasswordVisibility={() => PasswordToggle(setPasswordVisibleTwo)}
      />
      {!isLogin && (
        <PasswordInputWithToggle
          iconName="Lock"
          label="Confirmar Senha"
          placeholder="Confirme a sua senha"
          alt="Confirme a  sua senha"
          minLength={6}
          maxLength={64}
          required
          value={formData.confirmPassword}
          passwordVisible={passwordVisible}
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword: e.target.value,
            })
          }
          togglePasswordVisibility={() => PasswordToggle(setPasswordVisible)}
          name={""}
        />
      )}

      {isLogin && (
        <>
          {!loading && (
            <SubmitButton
              alt="Entrar"
              disabled={formData.email === "" || formData.password.length < 6}
            >
              Entrar
            </SubmitButton>
          )}

          {loading && <SubmitButton disabled>Aguarde...</SubmitButton>}
        </>
      )}
      {!isLogin && (
        <SubmitButton
          alt="Cadastrar"
          disabled={formData.email === "" || formData.password.length < 6}
          type="submit"
        >
          Cadastrar
        </SubmitButton>
      )}

      {isLogin && (
        <SignUpPrompt
          message="Não tem uma conta?"
          linkText="Cadastre-se"
          linkUrl="/register"
        />
      )}
      {!isLogin && (
        <SignUpPrompt
          message="Já tem uma conta?"
          linkText="Entrar"
          linkUrl="/login"
        />
      )}
      {error && <p className="error">{error}</p>}
    </Box>
  );
};

export { LoginForm };

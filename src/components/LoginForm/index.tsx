import { useAuthForm } from "../../hooks/useAuthForm";
import { TextInputWithIcon } from "../TextInputWithIcon";
import { PasswordInputWithToggle } from "../PasswordInputWithToggle";
import { SubmitButton } from "../SubmitButton";
import { PasswordToggle } from "../../utils/PasswordToggle";
import { loginFormProps } from "./types";
import { SignUpPrompt } from "../SignUpPrompt";
import { Box, Button } from "@chakra-ui/react";
import { FormEvent } from "react";
import { Link } from "react-router-dom";

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
        <>
          <TextInputWithIcon
            label="Email para redefinição de senha"
            name="email"
            iconName="Sign"
            value={formData.email}
            minLength={6}
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Insira seu email"
            alt="Insira seu email"
          />
          <SubmitButton
            alt="Enviar e-mail de redefinição"
            disabled={formData.email === ""}
          >
            Enviar e-mail de redefinição
          </SubmitButton>
          <Box mt={4}>
            <Link to="/login">
              <Button>Voltar ao login</Button>
            </Link>
          </Box>
          {error && <p className="error">{error}</p>}
        </>
      ) : (
        <>
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
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Insira sua senha"
            alt="Insira sua senha"
            passwordVisible={passwordVisibleTwo}
            togglePasswordVisibility={() =>
              PasswordToggle(setPasswordVisibleTwo)
            }
          />
          {!isLogin && (
            <PasswordInputWithToggle
              iconName="Lock"
              label="Confirmar Senha"
              placeholder="Confirme a sua senha"
              alt="Confirme a sua senha"
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
              togglePasswordVisibility={() =>
                PasswordToggle(setPasswordVisible)
              }
              name=""
            />
          )}

          {isLogin && (
            <>
              {!loading && (
                <SubmitButton
                  alt="Entrar"
                  disabled={
                    formData.email === "" || formData.password.length < 6
                  }
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
          {isLogin && (
            <SignUpPrompt
              message="Esqueceu a senha?"
              linkText="Recupere através do seu e-mail"
              linkUrl="/resetPassword"
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
        </>
      )}
    </Box>
  );
};

export { LoginForm };

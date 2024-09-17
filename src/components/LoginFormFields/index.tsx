import { TextInputWithIcon } from "../TextInputWithIcon";
import { PasswordInputWithToggle } from "../PasswordInputWithToggle";
import { SubmitButton } from "../SubmitButton";
import { PasswordToggle } from "../../utils/PasswordToggle";
import { SignUpPrompt } from "../SignUpPrompt";
import { LoginFormFieldsProps } from "./types";
import { BiUser } from "react-icons/bi";
import { AuthButtons } from "../AuthButtons";

const LoginFormFields = ({
  isLogin,
  formData,
  setFormData,
  passwordVisible,
  setPasswordVisible,
  passwordVisibleTwo,
  setPasswordVisibleTwo,
  loading,
  error,
}: LoginFormFieldsProps) => (
  <>
    {!isLogin && (
      <TextInputWithIcon
        label="Nome de usuário"
        iconName={<BiUser />}
        name="displayName"
        value={formData.displayName}
        minLength={6}
        maxLength={16}
        required
        onChange={(e) =>
          setFormData({ ...formData, displayName: e.target.value })
        }
        placeholder="Nome do usuário"
        alt="Insira seu nome"
      />
    )}

    <TextInputWithIcon
      label="Email"
      name="email"
      value={formData.email}
      iconName={<BiUser />}
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
        label="Confirmar Senha"
        placeholder="Confirme a sua senha"
        alt="Confirme a sua senha"
        minLength={6}
        maxLength={64}
        required
        value={formData.confirmPassword}
        passwordVisible={passwordVisible}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        togglePasswordVisibility={() => PasswordToggle(setPasswordVisible)}
        name=""
      />
    )}

    {isLogin ? (
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
        <AuthButtons />
      </>
    ) : (
      <SubmitButton
        alt="Cadastrar"
        disabled={formData.email === "" || formData.password.length < 6}
        type="submit"
      >
        Cadastrar
      </SubmitButton>
    )}

    {isLogin && (
      <>
        <SignUpPrompt
          message="Não tem uma conta?"
          linkText="Cadastre-se"
          linkUrl="/register"
        />
        <SignUpPrompt
          message="Esqueceu a senha?"
          linkText="Recupere através do seu e-mail"
          linkUrl="/resetPassword"
        />
      </>
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
);

export { LoginFormFields };

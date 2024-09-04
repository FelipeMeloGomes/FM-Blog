import { useAuthForm } from "../../hooks/useAuthForm";
import { Link } from "react-router-dom";
import { TextInputWithIcon } from "../TextInputWithIcon";
import { PasswordInputWithToggle } from "../PasswordInputWithToggle";
import { SubmitButton } from "../SubmitButton";
import { Icon } from "../IconComponent";
import { PasswordToggle } from "../../utils/PasswordToggle";
import { loginFormProps } from "./types";

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
    <form
      onSubmit={(e) => handleSubmit(e, formData)}
      className="flex flex-col gap-2.5 mx-auto p-8 w-[500px] max-w-[90%] bg-white shadow-[0px_-2px_10px_rgba(0,0,0,0.15)] rounded-2xl text-center"
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
        icon={Icon}
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
          icon={Icon}
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
        <div>
          <p className="text-center text-black text-sm my-1">
            Não tem uma conta?{" "}
            <span className="text-sm text-black font-medium ml-1 cursor-pointer">
              <Link to="/register">Cadastre-se</Link>
            </span>
          </p>
        </div>
      )}
      {!isLogin && (
        <div>
          <p className="text-center text-black text-sm my-1">
            Já tem uma conta?{" "}
            <span className="text-sm text-black font-medium ml-1 cursor-pointer">
              <Link to="/login">Entrar</Link>
            </span>
          </p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export { LoginForm };

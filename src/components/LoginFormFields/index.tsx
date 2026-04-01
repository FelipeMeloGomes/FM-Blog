import { BiUser } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { FormField } from "../FormField";
import { PasswordInput } from "../PasswordInput";
import { SignUpPrompt } from "../SignUpPrompt";
import { Button } from "../ui/button";
import type { LoginFormFieldsProps } from "./types";

const LoginFormFields = ({
  isLogin,
  formData,
  setFormData,
  loading,
  error,
}: LoginFormFieldsProps) => (
  <>
    {!isLogin && (
      <FormField
        label="Nome de usuário"
        name="displayName"
        icon={<BiUser />}
        value={formData.displayName}
        minLength={6}
        maxLength={16}
        required
        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
        placeholder="Nome do usuário"
        autoComplete="username"
      />
    )}

    <FormField
      label="Email"
      name="email"
      type="email"
      icon={<FiMail />}
      value={formData.email}
      minLength={6}
      required
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      placeholder="Insira seu email"
      autoComplete="email"
    />

    <PasswordInput
      label="Senha"
      name="password"
      value={formData.password}
      minLength={6}
      maxLength={64}
      required
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      placeholder="Insira sua senha"
      autoComplete="current-password"
    />

    {!isLogin && (
      <PasswordInput
        label="Confirmar Senha"
        name="confirmPassword"
        value={formData.confirmPassword}
        minLength={6}
        maxLength={64}
        required
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        placeholder="Confirme a sua senha"
        autoComplete="new-password"
      />
    )}

    {isLogin && (
      <div className="flex justify-end">
        <SignUpPrompt
          message="Esqueceu a senha?"
          linkText="Recuperar Senha?"
          linkUrl="/resetPassword"
        />
      </div>
    )}

    {!isLogin && (
      <div className="flex justify-end">
        <SignUpPrompt message="Já tem uma conta?" linkText="Entrar" linkUrl="/login" />
      </div>
    )}

    {isLogin ? (
      <>
        {!loading && (
          <Button disabled={formData.email === "" || formData.password.length < 6}>Entrar</Button>
        )}
        {loading && <Button disabled>Aguarde...</Button>}
      </>
    ) : (
      <Button disabled={formData.email === "" || formData.password.length < 6} type="submit">
        Cadastrar
      </Button>
    )}
    {error && <p className="text-destructive text-sm">{error}</p>}
  </>
);

export { LoginFormFields };

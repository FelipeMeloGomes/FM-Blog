import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLock, FiMail } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { loginSchema, registerSchema, resetPasswordSchema } from "../../schemas";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { loginFormProps } from "./types";

const Link = ({
  to,
  children,
  className,
}: { to: string; children: React.ReactNode; className?: string }) => (
  <RouterLink to={to} className={className}>
    {children}
  </RouterLink>
);

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

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordData {
  email: string;
}

const LoginForm = ({
  isLogin,
  onSubmit,
  resetPassword,
}: loginFormProps & { resetPassword?: boolean }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string>("");
  const {
    login,
    loginWithGoogle,
    createUser,
    resetPassword: resetPasswordFn,
    loading,
  } = useAuthentication();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { displayName: "", email: "", password: "", confirmPassword: "" },
  });

  const resetForm = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });

  const getCurrentForm = () => {
    if (resetPassword) return { form: resetForm, schema: resetPasswordSchema };
    if (isLogin) return { form: loginForm, schema: loginSchema };
    return { form: registerForm, schema: registerSchema };
  };

  const currentForm = getCurrentForm();
  // biome-ignore lint/suspicious/noExplicitAny: Form type is dynamic based on resetPassword/isLogin
  const form = currentForm.form as any;
  // biome-ignore lint/suspicious/noExplicitAny: FormState type is dynamic
  const formState = form.formState as any;
  const errors = formState.errors;

  const onLoginSubmit = async (data: LoginData) => {
    setAuthError("");
    try {
      await login({ email: data.email, password: data.password });
      // biome-ignore lint/suspicious/noExplicitAny: onSubmit expects LoginFormData, data matches structure
      if (onSubmit) onSubmit(data as any);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro.";
      setAuthError(errorMessage);
    }
  };

  const onRegisterSubmit = async (data: RegisterData) => {
    setAuthError("");
    try {
      await createUser({
        email: data.email,
        password: data.password,
        displayName: data.displayName,
      });
      // biome-ignore lint/suspicious/noExplicitAny: onSubmit expects LoginFormData
      if (onSubmit) onSubmit(data as any);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro.";
      setAuthError(errorMessage);
    }
  };

  const onResetSubmit = async (data: ResetPasswordData) => {
    setAuthError("");
    try {
      await resetPasswordFn(data.email);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro.";
      setAuthError(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // biome-ignore lint/suspicious/noExplicitAny: Google login doesn't have form data
      if (onSubmit) onSubmit({} as any);
    } catch (err) {
      console.error(err);
    }
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

  const handleSubmit = resetPassword
    ? resetForm.handleSubmit(onResetSubmit)
    : isLogin
      ? loginForm.handleSubmit(onLoginSubmit)
      : registerForm.handleSubmit(onRegisterSubmit);

  return (
    <div className="w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
      <div className="p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">{getTitle()}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{getDescription()}</p>
        </div>

        {!resetPassword && (
          <>
            <Button variant="outline" size="lg" onClick={handleGoogleLogin} className="w-full h-11">
              <GoogleIcon />
              <span className="ml-2">Continuar com Google</span>
            </Button>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground whitespace-nowrap px-2">ou</span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && !resetPassword && (
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-sm">
                Nome de usuário
              </Label>
              <Input
                id="displayName"
                placeholder="Seu nome de usuário"
                {...registerForm.register("displayName")}
                className="h-11"
              />
              {errors.displayName && (
                <p className="text-xs text-destructive mt-1">{errors.displayName.message}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              E-mail
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...form.register("email")}
                className="h-11 pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground">
                <FiMail />
              </div>
            </div>
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          {!resetPassword && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm">
                  Senha
                </Label>
                {isLogin && (
                  <Link
                    to="/resetPassword"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Esqueceu a senha?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...form.register("password")}
                  className="h-11 pl-10 pr-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground">
                  <FiLock />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>
          )}

          {!isLogin && !resetPassword && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm">
                Confirmar Senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...registerForm.register("confirmPassword")}
                  className="h-11 pl-10 pr-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground">
                  <FiLock />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}

          {(authError || errors.root) && (
            <p className="text-sm text-destructive">{authError || errors.root?.message}</p>
          )}

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full h-11"
            disabled={loading}
          >
            {loading ? getLoadingText() : getButtonText()}
          </Button>
        </form>

        {!resetPassword && (
          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
            <Link
              to={isLogin ? "/register" : "/login"}
              className="font-medium text-foreground hover:underline"
            >
              {isLogin ? "Cadastre-se" : "Entrar"}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export { LoginForm };

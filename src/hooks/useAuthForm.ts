import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAuthentication } from "./useAuthentication";

interface FormData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthFormHook {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  passwordVisible: boolean;
  setPasswordVisible: Dispatch<SetStateAction<boolean>>;
  passwordVisibleTwo: boolean;
  setPasswordVisibleTwo: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    data?: FormData,
  ) => Promise<void>;
  handlePasswordReset: (email: string) => Promise<void>;
  loading: boolean;
}

export const useAuthForm = (
  isLogin?: boolean,
  onSubmit?: (formData: FormData) => void,
): AuthFormHook => {
  const {
    login,
    createUser,
    error: authError,
    loading,
    resetPassword,
  } = useAuthentication();

  const [formData, setFormData] = useState<FormData>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordVisibleTwo, setPasswordVisibleTwo] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    if (!e || typeof e.preventDefault !== "function") return;

    e.preventDefault();
    setError("");

    if (!isLogin && !validatePasswords()) return;

    try {
      await (isLogin ? login(formData) : createUser(formData));
      if (onSubmit) onSubmit(formData);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async (email: string) => {
    try {
      await resetPassword(email);
    } catch (error) {
      console.log(error);
    }
  };

  const validatePasswords = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas precisam ser iguais");
      return false;
    }

    if (!isPasswordStrong(formData.password)) {
      setError(
        "A senha é muito fraca. Ela deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número.",
      );
      return false;
    }

    return true;
  };

  const isPasswordStrong = (password: string): boolean => {
    const weakPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return weakPasswordRegex.test(password);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return {
    formData,
    setFormData,
    passwordVisible,
    setPasswordVisible,
    passwordVisibleTwo,
    setPasswordVisibleTwo,
    error,
    setError,
    handleSubmit,
    handlePasswordReset,
    loading,
  };
};

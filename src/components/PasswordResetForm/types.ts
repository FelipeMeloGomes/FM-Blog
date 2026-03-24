export interface AuthFormValues {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordResetFormProps {
  formData: AuthFormValues;
  setFormData: React.Dispatch<React.SetStateAction<AuthFormValues>>;
  handleResetPasswordSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
}

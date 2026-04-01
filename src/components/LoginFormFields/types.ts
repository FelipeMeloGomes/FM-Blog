export interface AuthFormValues {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormFieldsProps {
  isLogin: boolean;
  formData: AuthFormValues;
  setFormData: React.Dispatch<React.SetStateAction<AuthFormValues>>;
  loading: boolean;
  error: string | null;
}

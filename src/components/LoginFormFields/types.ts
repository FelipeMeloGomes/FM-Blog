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
  passwordVisible: boolean;
  setPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
  passwordVisibleTwo: boolean;
  setPasswordVisibleTwo: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, data: AuthFormValues) => void;
  loading: boolean;
  error: string | null;
}

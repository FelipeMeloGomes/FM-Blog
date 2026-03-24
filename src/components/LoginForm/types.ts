export interface LoginFormData {
  email: string;
  password: string;
  displayName?: string;
}

export interface loginFormProps {
  isLogin: boolean;
  resetPassword: boolean;
  onSubmit?: (data: LoginFormData) => void;
}

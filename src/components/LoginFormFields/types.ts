export interface LoginFormFieldsProps {
  isLogin: boolean;
  formData: {
    email: string;
    password: string;
    displayName: string;
    confirmPassword: string;
  };
  setFormData: (data: {
    email: string;
    password: string;
    displayName: string;
    confirmPassword: string;
  }) => void;
  passwordVisible: boolean;
  setPasswordVisible: (visible: boolean) => void;
  passwordVisibleTwo: boolean;
  setPasswordVisibleTwo: (visible: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, data: any) => void;
  loading: boolean;
  error: string | null;
}

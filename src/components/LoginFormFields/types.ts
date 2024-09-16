export interface FormData {
  email: string;
  password: string;
  displayName: string;
  confirmPassword: string;
}

type PartialFormData = Partial<FormData>;

export interface LoginFormFieldsProps {
  isLogin: boolean;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<PartialFormData>>;
  passwordVisible: boolean;
  setPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
  passwordVisibleTwo: boolean;
  setPasswordVisibleTwo: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, data: FormData) => void;
  loading: boolean;
  error: string | null;
}

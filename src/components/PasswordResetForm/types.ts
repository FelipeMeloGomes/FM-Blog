export interface FormData {
  email: string;
  password: string;
  displayName: string;
  confirmPassword: string;
}

type PartialFormData = Partial<FormData>;
export interface PasswordResetFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<PartialFormData>>;
  handleResetPasswordSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
}

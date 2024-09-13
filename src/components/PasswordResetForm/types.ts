export interface PasswordResetFormProps {
  formData: { email: string };
  setFormData: (data: { email: string }) => void;
  handleResetPasswordSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
}

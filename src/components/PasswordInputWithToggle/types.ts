export interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  alt?: string;
  passwordVisible: boolean;
  togglePasswordVisibility: () => void;
}

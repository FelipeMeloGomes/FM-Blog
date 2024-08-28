export type IconName =
  | "User"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Sun"
  | "Eye"
  | "Slash"
  | "CloudSun"
  | "Humidity"
  | "Windy"
  | "ArrowBack"
  | "Search"
  | "Github"
  | "Linkedin"
  | "Sign"
  | "Lock"
  | "Logout"
  | "Home";

export interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  alt?: string;
  passwordVisible: boolean;
  togglePasswordVisibility: () => void;
  iconName?: IconName;
}

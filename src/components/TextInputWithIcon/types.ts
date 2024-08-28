import { ChangeEvent } from "react";
import { IconProps } from "../IconComponent";

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

export interface TextInputWithIconProps {
  label: string;
  icon?: React.FC<IconProps>;
  name: string;
  value: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  alt?: string;
  iconName?: IconName;
}

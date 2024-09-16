import { ChangeEvent, ReactElement } from "react";

export interface TextInputWithIconProps {
  label: string;
  name: string;
  value: string;
  iconName: ReactElement;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  alt?: string;
}

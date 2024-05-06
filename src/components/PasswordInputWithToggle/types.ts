import { ChangeEvent, MouseEvent, ComponentType } from "react";

export interface PasswordInputProps {
    label: string;
    name: string;
    value: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    alt?: string;
    passwordVisible: boolean;
    togglePasswordVisibility: () => void;
    icon?: React.ComponentType<{ name: string }>;
    iconName?: string;
}

export interface IconProps {
    name: string;
    className?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export type IconComponent = ComponentType<IconProps>;

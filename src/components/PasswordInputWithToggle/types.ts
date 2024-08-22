import { ChangeEvent } from "react";
import { IconName } from "../IconComponent/icons";

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
    icon?: IconComponent;
    iconName?: IconName;
}

export interface IconProps {
    name: IconName;
    className?: string;
    onClick?: () => void;
}

export type IconMapping = {
    [key in IconName]: IconComponent;
};

export type IconComponent = React.ComponentType<IconProps>;

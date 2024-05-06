import { ChangeEvent } from "react";

export interface IconProps {
    name: string;
    className?: string;
}

export interface TextInputWithIconProps {
    label: string;
    icon?: React.FC<IconProps>;
    iconName?: string;
    name: string;
    value: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    alt?: string;
}
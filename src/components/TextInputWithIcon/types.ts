import { ChangeEvent } from "react";
import { IconProps } from "../IconComponent";

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
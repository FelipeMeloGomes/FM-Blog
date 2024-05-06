import { IconType } from "react-icons";

export interface IconMapping {
    [key: string]: IconType;
}

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "name"> {
    name: keyof IconMapping;
}

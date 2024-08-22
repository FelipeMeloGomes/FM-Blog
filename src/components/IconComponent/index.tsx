import { IconName, Icons } from "./icons";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
}

const Icon = ({ name, ...props }: IconProps) => {
    const IconComponent = Icons[name];
    return IconComponent ? <IconComponent {...props} /> : null;
};

export { Icon };

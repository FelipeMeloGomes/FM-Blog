import { TextInputWithIconProps } from "./types";
import { Icon } from "../IconComponent";

const TextInputWithIcon = ({
  label,
  iconName,
  name,
  value,
  minLength,
  maxLength,
  required,
  onChange,
  placeholder,
  alt,
}: TextInputWithIconProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-[#151717] font-medium">{label}</label>
      <div className="flex items-center border border-[#ecedec] rounded-lg h-12 pl-2.5 transition-colors duration-200 ease-in-out focus-within:border-black">
        {iconName && <Icon name={iconName} className="icon_font" />}
        <input
          type="text"
          name={name}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          onChange={onChange}
          className="ml-2.5 rounded-lg border-none w-[85%] h-full focus:outline-none"
          placeholder={placeholder}
          alt={alt}
        />
      </div>
    </div>
  );
};

export { TextInputWithIcon };

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { TextInputWithIconProps } from "./types";

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
    <div>
      <Label className="text-[#151717] font-medium">{label}</Label>
      <div className="relative">
        {iconName && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {iconName}
          </div>
        )}
        <Input
          type="text"
          name={name}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={alt}
          className="border-[#ecedec] rounded-md focus:border-black"
          style={{ paddingLeft: iconName ? "2.5rem" : "1rem" }}
        />
      </div>
    </div>
  );
};

export { TextInputWithIcon };

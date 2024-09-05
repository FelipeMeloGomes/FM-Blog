import { forwardRef, ReactElement } from "react";
import { IconName, PasswordInputProps } from "./types";
import { Icon } from "../IconComponent";

const PasswordInputWithToggle = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      label,
      name,
      value,
      minLength,
      maxLength,
      required,
      onChange,
      placeholder,
      alt,
      passwordVisible,
      togglePasswordVisibility,
      iconName,
    },
    ref,
  ) => {
    const renderIcon = (iconName?: IconName): ReactElement | null => {
      return iconName ? <Icon name={iconName} className="icon_font" /> : null;
    };

    const renderVisibilityIcon = (
      passwordVisible: boolean,
      togglePasswordVisibility: () => void,
    ): ReactElement | null => {
      const icon: IconName = passwordVisible ? "Eye" : "Slash";
      return (
        <Icon
          name={icon}
          className="icon icon_font"
          onClick={togglePasswordVisibility}
        />
      );
    };

    return (
      <div className="text-[#151717] font-medium">
        <label>{label}</label>
        <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-[10px] transition-all duration-200 ease-in-out focus-within:border-[#000]">
          {renderIcon(iconName)}
          <input
            type={passwordVisible ? "text" : "password"}
            name={name}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            onChange={onChange}
            className="ml-[10px] rounded-[10px] border-none w-[85%] h-full focus:outline-none"
            placeholder={placeholder}
            alt={alt}
            ref={ref}
          />
          {renderVisibilityIcon(passwordVisible, togglePasswordVisibility)}
        </div>
      </div>
    );
  },
);

export { PasswordInputWithToggle };

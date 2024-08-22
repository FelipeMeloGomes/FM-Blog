import { forwardRef, ReactElement } from "react";
import styles from "./PasswordInputWithToggle.module.css";
import { PasswordInputProps } from "./types";
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
        ref
    ) => {
        const renderIcon = (iconName?: iconName): ReactElement | null => {
            return iconName ? (
                <Icon name={iconName} className="icon_font" />
            ) : null;
        };

        const renderVisibilityIcon = (
            passwordVisible: boolean,
            togglePasswordVisibility: () => void
        ): ReactElement | null => {
            const icon = passwordVisible ? "Eye" : "Slash";
            return (
                <Icon
                    name={icon}
                    className="icon icon_font"
                    onClick={togglePasswordVisibility}
                />
            );
        };

        return (
            <div className={styles.flex_column}>
                <label>{label}</label>
                <div className={styles.inputForm}>
                    {renderIcon(iconName)}
                    <input
                        type={passwordVisible ? "text" : "password"}
                        name={name}
                        value={value}
                        minLength={minLength}
                        maxLength={maxLength}
                        required={required}
                        onChange={onChange}
                        className={styles.input}
                        placeholder={placeholder}
                        alt={alt}
                        ref={ref}
                    />
                    {renderVisibilityIcon(
                        passwordVisible,
                        togglePasswordVisibility
                    )}
                </div>
            </div>
        );
    }
);

export { PasswordInputWithToggle };

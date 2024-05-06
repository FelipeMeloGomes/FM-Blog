import { forwardRef, ReactElement } from "react";
import styles from "./PasswordInputWithToggle.module.css";
import { PasswordInputProps, IconComponent } from "./types";

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
            icon: Icon,
            iconName,
        },
        ref
    ) => {
        const renderIcon = (
            Icon: IconComponent | undefined,
            iconName?: string
        ): ReactElement | null => {
            return Icon ? (
                <Icon name={iconName || ""} className="icon_font" />
            ) : null;
        };

        const renderVisibilityIcon = (
            passwordVisible: boolean,
            Icon: IconComponent | undefined,
            togglePasswordVisibility: () => void
        ): ReactElement | null => {
            const icon = passwordVisible ? "eye" : "slash";
            return Icon ? (
                <Icon
                    name={icon}
                    className="icon icon_font"
                    onClick={togglePasswordVisibility}
                />
            ) : null;
        };

        return (
            <div className={styles.flex_column}>
                <label>{label}</label>
                <div className={styles.inputForm}>
                    {renderIcon(Icon, iconName)}
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
                        Icon,
                        togglePasswordVisibility
                    )}
                </div>
            </div>
        );
    }
);

export { PasswordInputWithToggle };

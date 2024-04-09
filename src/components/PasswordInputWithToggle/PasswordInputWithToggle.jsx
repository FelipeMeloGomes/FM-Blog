// React
import { forwardRef } from "react";

// Estilos Css
import styles from "./PasswordInputWithToggle.module.css";

const PasswordInputWithToggle = forwardRef(
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
        return (
            <div className={styles.flex_column}>
                <label>{label}</label>
                <div className={styles.inputForm}>
                    {Icon && <Icon name={iconName} className="icon_font" />}
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
                    {passwordVisible ? (
                        <Icon
                            name="eye"
                            className="icon icon_font"
                            onClick={() => {
                                togglePasswordVisibility();
                            }}
                        />
                    ) : (
                        <Icon
                            name="slash"
                            className="icon icon_font"
                            onClick={() => {
                                togglePasswordVisibility();
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }
);

export default PasswordInputWithToggle;

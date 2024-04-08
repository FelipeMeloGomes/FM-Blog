// React
import { forwardRef } from "react";

// Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
            Icon,
        },
        ref
    ) => {
        return (
            <div className={styles.flex_column}>
                <label>{label}</label>
                <div className={styles.inputForm}>
                    {Icon && <Icon className="icon_font" />}
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
                        <FaEye
                            className="icon icon_font"
                            onClick={() => {
                                togglePasswordVisibility();
                            }}
                        />
                    ) : (
                        <FaEyeSlash
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

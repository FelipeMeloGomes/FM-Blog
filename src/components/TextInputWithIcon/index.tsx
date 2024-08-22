// Estilos css
import styles from "./TextInputWithIcon.module.css";
import { TextInputWithIconProps } from "./types";
import { Icon } from "../IconComponent";

const TextInputWithIcon: React.FC<TextInputWithIconProps> = ({
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
}) => {
    return (
        <div className={styles.flex_column}>
            <label>{label}</label>
            <div className={styles.inputForm}>
                {iconName && <Icon name={iconName} className="icon_font" />}
                <input
                    type="text"
                    name={name}
                    value={value}
                    minLength={minLength}
                    maxLength={maxLength}
                    required={required}
                    onChange={onChange}
                    className={styles.input}
                    placeholder={placeholder}
                    alt={alt}
                />
            </div>
        </div>
    );
};

export { TextInputWithIcon };

// Estilos css
import styles from "./SubmitButton.module.css";

const SubmitButton = ({ children, type, alt, disabled }) => {
    return (
        <>
            <button
                alt={alt}
                disabled={disabled}
                className={styles.btn}
                type={type}
            >
                {children}
            </button>
        </>
    );
};

export default SubmitButton;

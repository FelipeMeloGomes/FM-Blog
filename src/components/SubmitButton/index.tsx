// Estilos css
import styles from "./SubmitButton.module.css";
import { SubmitButtonProps } from "./types";

const SubmitButton: React.FC<SubmitButtonProps> = ({
    children,
    type,
    disabled,
}) => {
    return (
        <>
            <button disabled={disabled} className={styles.btn} type={type}>
                {children}
            </button>
        </>
    );
};

export { SubmitButton };

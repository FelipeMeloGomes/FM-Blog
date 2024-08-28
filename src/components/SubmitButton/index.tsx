import styles from "./SubmitButton.module.css";
import { SubmitButtonProps } from "./types";

const SubmitButton = ({ children, type, disabled }: SubmitButtonProps) => {
  return (
    <button disabled={disabled} className={styles.btn} type={type}>
      {children}
    </button>
  );
};

export { SubmitButton };

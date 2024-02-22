// Estilos Css
import styles from "./LayoutPage.module.css";

const LayoutPage = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default LayoutPage;

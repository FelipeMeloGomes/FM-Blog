// Estilos Css
import styles from "./LayoutPage.module.css";

const LayoutPage = ({
    height = "100vh",
    minHeight = "100vh",
    textAlign = "center",
    margin = "0",
    children,
}) => {
    return (
        <section
            className={styles.container}
            style={{ height, minHeight, textAlign, margin }}
        >
            {children}
        </section>
    );
};

export default LayoutPage;

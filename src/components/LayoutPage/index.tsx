import styles from "./LayoutPage.module.css";
import { LayoutPageProps } from "./types";

const LayoutPage = ({
    height = "100vh",
    minHeight = "100vh",
    textAlign = "center",
    margin = "0",
    children,
}: LayoutPageProps) => {
    return (
        <section
            className={styles.container}
            style={{ height, minHeight, textAlign, margin }}
        >
            {children}
        </section>
    );
};

export { LayoutPage };

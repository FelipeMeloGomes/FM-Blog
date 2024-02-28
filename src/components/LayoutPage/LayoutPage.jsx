// Estilos Css
import styles from "./LayoutPage.module.css";

import PropTypes from "prop-types";

const LayoutPage = ({
    children,
    height = "",
    minHeight = "",
    textAlign = "",
    margin = "",
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

LayoutPage.propTypes = {
    height: PropTypes.string,
    minHeight: PropTypes.string,
    textAlign: PropTypes.string,
    margin: PropTypes.string,
};

LayoutPage.defaultProps = {
    height: "100vh",
    minHeight: "100vh",
    textAlign: "center",
    margin: "0",
};

export default LayoutPage;

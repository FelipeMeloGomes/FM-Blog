// Estilos Css
import styles from "./LayoutPage.module.css";

import PropTypes from "prop-types";

const LayoutPage = ({
    children,
    height = "",
    minHeight = "",
    textAlign = "",
}) => {
    return (
        <section
            className={styles.container}
            style={{ height, minHeight, textAlign }}
        >
            {children}
        </section>
    );
};

LayoutPage.propTypes = {
    height: PropTypes.string,
    minHeight: PropTypes.string,
    textAlign: PropTypes.string,
};

LayoutPage.defaultProps = {
    height: "100vh",
    minHeight: "100vh",
    textAlign: "center",
    marginBottom: "0",
};

export default LayoutPage;

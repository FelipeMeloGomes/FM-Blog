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
        <div
            className={styles.container}
            style={{ height, minHeight, textAlign }}
        >
            {children}
        </div>
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
};

export default LayoutPage;

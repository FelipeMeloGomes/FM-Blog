// Estilos css
import styles from "./Spinner.module.css";

import PropTypes from "prop-types";

const Spinner = ({
    startColor = "#000",
    middleColor = "#f6fcff",
    endColor = "#f6fcff",
    height = "",
    width = "",
}) => {
    return (
        <div className={styles.loader} style={{ height, width }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 66 66"
                height="100px"
                width="100px"
                className={styles.spinner}
            >
                <circle
                    stroke={`url(#gradient-${startColor}-${middleColor}-${endColor})`}
                    r="20"
                    cy="33"
                    cx="33"
                    strokeWidth="1"
                    fill="transparent"
                    className={styles.path}
                ></circle>
                <linearGradient
                    id={`gradient-${startColor}-${middleColor}-${endColor}`}
                >
                    <stop
                        stopOpacity="1"
                        stopColor={startColor}
                        offset="0%"
                    ></stop>
                    <stop
                        stopOpacity="1"
                        stopColor={middleColor}
                        offset="50%"
                    ></stop>
                    <stop
                        stopOpacity="0"
                        stopColor={endColor}
                        offset="100%"
                    ></stop>
                </linearGradient>
            </svg>
        </div>
    );
};

Spinner.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
};

Spinner.defaultProps = {
    height: "100vh",
    width: "",
};

export default Spinner;

// React
import React from "react";

// CSS
import styles from "./Spinner.module.css";

const Spinner = () => {
    return (
        <div className={styles.loader}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 66 66"
                height="100px"
                width="100px"
                className={styles.spinner}
            >
                <circle
                    stroke="url(#gradient)"
                    r="20"
                    cy="33"
                    cx="33"
                    stroke-width="1"
                    fill="transparent"
                    className={styles.path}
                ></circle>
                <linearGradient id="gradient">
                    <stop stop-opacity="1" stop-color="#000" offset="0%"></stop>
                    <stop
                        stop-opacity="1"
                        stop-color="#f6fcff"
                        offset="50%"
                    ></stop>
                    <stop
                        stop-opacity="0"
                        stop-color="#f6fcff"
                        offset="100%"
                    ></stop>
                </linearGradient>
            </svg>
        </div>
    );
};

export default Spinner;

// Hooks
import { memo } from "react";

// CSS
import styles from "./PageNotFound.module.css";

// React
import React from "react";

// img
import notFound from "../NotFound/Erro.png";

// React Router Dom
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className={styles.erro_page}>
            <div className={styles.typograph}>
                <h1>404</h1>
                <p>Página Não Encontrada Desculpe.</p>
            </div>
            <div className={styles.center}>
                <img
                    className={styles.container}
                    src={notFound}
                    alt="not found"
                />
            </div>
            <Link to="/" className="btn btn-outline">
                Retornar a Home
            </Link>
            <br />
        </div>
    );
};

export default memo(PageNotFound);
